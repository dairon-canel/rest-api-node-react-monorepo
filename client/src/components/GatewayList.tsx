import classNames from 'classnames';
import { FC, FormEvent, ReactElement } from 'react';
import { useGateways, useTableAddAction } from '../hooks';
import { Gateway } from '../types';
import GatewayListItem from './GatewayListItem';

interface IGatewayList {
  setModalElement: React.Dispatch<React.SetStateAction<ReactElement | null>>;
}

const GatewayList: FC<IGatewayList> = ({ setModalElement }) => {
  const {
    gateways,
    loading,
    error,
    createGateway,
    deleteGateway,
    editGateway,
  } = useGateways();
  const {
    removeAddAction,
    selectedItem,
    addAction,
    toggleEditClick,
    addButtonState,
  } = useTableAddAction({
    buttonCancelText: 'Cancel',
    buttonAddText: 'Add Gateway',
  });

  const sendForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, ipv4Address } = event.target as typeof event.target & {
      serialNumber: { value: string };
      name: { value: string };
      ipv4Address: { value: string };
    };

    try {
      createGateway({
        name: name.value,
        ipv4Address: ipv4Address.value,
      });
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
  };

  const handleDelete = () => {
    const serialNumber = (selectedItem as Gateway).serialNumber;
    if (serialNumber) deleteGateway(serialNumber);
    addButtonState.action();
  };

  const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { name, ipv4Address } = event.target as typeof event.target & {
        name: { value: string };
        ipv4Address: { value: string };
      };
      editGateway({
        serialNumber: (selectedItem as Gateway).serialNumber,
        gateway: {
          name: name?.value || (selectedItem as Gateway).name,
          ipv4Address:
            ipv4Address?.value || (selectedItem as Gateway).ipv4Address,
        },
      });
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
  };

  return (
    <div className="overflow-x-auto flex flex-col items-center px-4 py-4 border-t border-base-300">
      <h1 className="text-xl text-base-100 mb-3 font-semibold">
        List of Gateways
      </h1>
      <form id="add_gateway_form" onSubmit={event => sendForm(event)}></form>
      <form id="edit_gateway_form" onSubmit={event => handleEdit(event)}></form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something happened...</div>
      ) : !gateways ? (
        <div>No gateways yet...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Name</th>
              <th>IP Address</th>
              <th>Peripherals</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gateways?.map((gateway, key) => (
              <tr key={key}>
                <GatewayListItem
                  removeAddAction={removeAddAction}
                  gateway={gateway}
                  selectedGateway={selectedItem as Gateway | null}
                  addAction={addAction}
                  setModalElement={setModalElement}
                  toggleEditClick={toggleEditClick}
                />
              </tr>
            ))}
            <tr className={classNames({ hidden: !addButtonState.enabled })}>
              <td>New Gateway</td>
              <td>
                <fieldset>
                  <input
                    form="add_gateway_form"
                    type="text"
                    id="name"
                    placeholder="Name"
                    required
                    className="input input-bordered input-sm"
                  />
                </fieldset>
              </td>
              <td>
                <fieldset>
                  <input
                    form="add_gateway_form"
                    type="text"
                    id="ipv4Address"
                    placeholder="Ipv4 Address"
                    required
                    className="input input-bordered input-sm"
                  />
                </fieldset>
              </td>
              <td>New Devices</td>
              <td>
                <button
                  type="submit"
                  form="add_gateway_form"
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
      )}

      <div className="grid grid-flow-col gap-48">
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
  );
};

export default GatewayList;
