import { FC, FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import { Gateway, PeripheralDevice } from '../types';
import PeripheralListItem from './PeripheralListItem';
import { useGateways, useTableAddAction } from '../hooks';

interface IPeripheralListProps {
  gateway: Gateway;
  gatewayName: string;
  setSelectedGateway: React.Dispatch<React.SetStateAction<Gateway | null>>;
}

const PeripheralList: FC<IPeripheralListProps> = ({
  gateway,
  gatewayName,
  setSelectedGateway,
}) => {
  const { loading } = useGateways();
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

  const sendPeripheralForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { vendor } = event.target as typeof event.target & {
      vendor: { value: string };
    };

    try {
      console.log({
        peripheral: {
          uid: gateway.peripheralDevices.length + 1,
          vendor: vendor.value,
          status: networkStatus,
        },
      });
      /* createGateway({
        gateway: {
          serialNumber: serialNumber.value,
          name: name.value,
          ipv4Address: ipv4Address.value,
        },
      }); */
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
  };

  return (
    <>
      {!gateway.peripheralDevices ? (
        <p>No devices</p>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-1 w-full text-center">
            {gatewayName}
          </h3>
          <form
            id="add_peripheral_form"
            onSubmit={event => sendPeripheralForm(event)}
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
              {gateway.peripheralDevices.map((peripheral, key) => (
                <PeripheralListItem
                  removeAddAction={removeAddAction}
                  key={key}
                  peripheral={peripheral}
                  selectedPeripheral={selectedItem as PeripheralDevice}
                  addAction={addAction}
                  toggleEditClick={toggleEditClick}
                />
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
          <div className="grid grid-flow-col gap-48">
            <button
              className={classNames('btn mt-1 self-end min-h-[2rem] h-[2rem]', {
                hidden: !selectedItem,
                loading,
              })}
              onClick={() => {}}
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
