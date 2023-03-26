import { FC, useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import {
  CreatePeripheralInput,
  createPeripheralSchema,
  Gateway,
  PeripheralDevice,
} from '../types';
import { useForm } from 'react-hook-form';
import PeripheralListItem from './PeripheralListItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTableAddAction } from '../hooks';
import { usePeripheral } from '../hooks/usePeripheral';

interface IPeripheralListProps {
  gateway: Gateway;
}

const PeripheralList: FC<IPeripheralListProps> = ({ gateway }) => {
  const {
    peripherals,
    isLoading,
    isError,
    error,
    isRefetching,
    createPeripheral,
  } = usePeripheral({
    serialNumber: gateway.serialNumber,
  });
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

  const [networkStatus, setNetworkStatus] = useState<'OFFLINE' | 'ONLINE'>(
    'OFFLINE',
  );

  const {
    register: createRegister,
    formState: { errors: createFormErrors },
    handleSubmit: handleCreateFormSubmit,
  } = useForm<CreatePeripheralInput>({
    resolver: zodResolver(createPeripheralSchema),
  });

  const createForm = (vendor: CreatePeripheralInput) => {
    console.log({
      serialNumber: gateway.serialNumber,
      peripheral: { ...vendor, status: networkStatus },
    });
    createPeripheral({
      serialNumber: gateway.serialNumber,
      peripheral: { ...vendor, status: networkStatus },
    });
    addButtonState.action();
  };

  /*  useEffect(() => {
    setCurrentGateway(gateway);
  }, []); */

  /* const createForm = async (event: FormEvent<HTMLFormElement>) => {
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
  }; */

  /* const handleDelete = () => {
    deletePeripheral({
      serialNumber: gateway.serialNumber,
      uid: (selectedItem as PeripheralDevice).uid,
    });
    addButtonState.action();
  }; */

  /* const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
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
  }; */

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Something happened...</div>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-1 w-full text-center">
            {gateway.name}
          </h3>
          {error ? <div>{error}</div> : null}
          <form
            id="add_peripheral_form"
            onSubmit={handleCreateFormSubmit(createForm)}
          ></form>
          <form
            id="edit_peripheral_form"
            onSubmit={event => {
              /* handleEdit(event) */
            }}
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
              {isLoading || isRefetching
                ? null
                : peripherals && peripherals?.length >= 0
                ? peripherals?.map((peripheral, key) => (
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
                  ))
                : null}
              <tr className={classNames({ hidden: !addButtonState.enabled })}>
                <td>Serial number</td>
                <td>
                  <div className="form-element">
                    <input
                      form="add_peripheral_form"
                      type="text"
                      id="vendor"
                      placeholder="Vendor"
                      className="input input-bordered input-sm"
                      {...createRegister('vendor')}
                    />
                    <p>{createFormErrors.vendor?.message}</p>
                  </div>
                </td>
                <td>{format(new Date(), 'yyyy/mm/dd')}</td>
                <td>
                  <button
                    type="button"
                    className="btn mt-1 min-h-[1.3rem] h-[1.3rem]"
                    onClick={() => {
                      if (networkStatus === 'OFFLINE')
                        setNetworkStatus('ONLINE');
                      if (networkStatus === 'ONLINE')
                        setNetworkStatus('OFFLINE');
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
                      isLoading,
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
                isLoading,
              })}
              onClick={() => {} /* handleDelete */}
            >
              Delete
            </button>
            <button
              className={classNames('btn mt-1 min-h-[2rem] h-[2rem]', {
                'btn-disabled': isLoading,
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
