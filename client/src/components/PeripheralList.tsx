import { FC, FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import { Gateway, PeripheralDevice } from '../types';
import PeripheralListItem from './PeripheralListItem';
import { useGateways, useTableAddAction } from '../hooks';

interface IPeripheralListProps {
  gateway: Gateway;
}

const PeripheralList: FC<IPeripheralListProps> = ({ gateway }) => {
  const {
    loading,
    currentGateway,
    createPeripheral,
    deletePeripheral,
    setCurrentGateway,
    editPeripheral,
  } = useGateways();
  const {
    removeAddAction,
    selectedItem,
    addAction,
    toggleEditClick,
    addButtonState,
  } = useTableAddAction({
    buttonCancelText: 'Cancel',
    buttonAddText: 'Add Peripheral Device',
  });

  const [networkStatus, setNetworkStatus] = useState<'offline' | 'online'>(
    'offline',
  );

  useEffect(() => {
    setCurrentGateway(gateway);
  }, []);

  const addPeripheralForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { vendor } = event.target as typeof event.target & {
      vendor: { value: string };
    };

    try {
      createPeripheral({
        gateway_id: gateway.serialNumber,
        vendor: vendor.value,
        status: networkStatus,
      });
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
  };

  const handleDelete = () => {
    deletePeripheral({
      serialNumber: gateway.serialNumber,
      uid: (selectedItem as PeripheralDevice).uid,
    });
    addButtonState.action();
  };

  const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { vendor } = event.target as typeof event.target & {
        vendor: { value: string };
      };

      if (currentGateway?.serialNumber)
        editPeripheral({
          serialNumber: currentGateway?.serialNumber,
          uid: (selectedItem as PeripheralDevice).uid,
          peripheral: {
            uid: (selectedItem as PeripheralDevice).uid,
            vendor: vendor.value,
            status: networkStatus,
          },
        });
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
  };

  return (
    <>
      {!gateway.peripheralCount ? (
        <p>No devices</p>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-1 w-full text-center">
            {gateway.name}
          </h3>
          <form
            id="add_peripheral_form"
            onSubmit={event => addPeripheralForm(event)}
          ></form>
          <form
            id="edit_peripheral_form"
            onSubmit={event => handleEdit(event)}
          ></form>
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>uid</th>
                <th>vendor</th>
                <th>dateCreated</th>
                <th>status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentGateway?.peripheralDevices.map((peripheral, key) => (
                <tr key={key}>
                  <PeripheralListItem
                    removeAddAction={removeAddAction}
                    key={key}
                    peripheral={peripheral}
                    selectedPeripheral={selectedItem as PeripheralDevice}
                    addAction={addAction}
                    toggleEditClick={toggleEditClick}
                    networkStatus={networkStatus}
                    setNetworkStatus={setNetworkStatus}
                  />
                </tr>
              ))}
              <tr className={classNames({ hidden: !addButtonState.enabled })}>
                <td>{gateway.peripheralDevices.length + 1}</td>
                <td>
                  <fieldset>
                    <input
                      form="add_peripheral_form"
                      type="text"
                      id="vendor"
                      placeholder="Vendor"
                      className="input input-bordered input-sm"
                    />
                  </fieldset>
                </td>
                <td>{format(new Date(), 'yyyy/mm/dd')}</td>
                <td>
                  <button
                    type="button"
                    className="btn mt-1 min-h-[1.3rem] h-[1.3rem]"
                    onClick={() => {
                      if (networkStatus === 'offline')
                        setNetworkStatus('online');
                      if (networkStatus === 'online')
                        setNetworkStatus('offline');
                    }}
                  >
                    {networkStatus}
                  </button>
                </td>
                <td>
                  <button
                    type="submit"
                    form="add_peripheral_form"
                    className={classNames('btn mt-1 min-h-[2rem] h-[2rem]', {
                      loading,
                    })}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="grid grid-flow-col gap-2">
            <button
              className={classNames('btn mt-1 self-end min-h-[2rem] h-[2rem]', {
                hidden: !selectedItem,
                loading,
              })}
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className={classNames('btn mt-1 min-h-[2rem] h-[2rem]', {
                'btn-disabled': loading,
              })}
              onClick={addButtonState.action}
            >
              {addButtonState.buttonText}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PeripheralList;
