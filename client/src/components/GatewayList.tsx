import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { FC, FormEvent, ReactElement, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTableAddAction } from '../hooks';
import { useGateway } from '../hooks/useGateway';
import {
  Gateway,
  createGatewaySchema,
  CreateGatewayInput,
  editGatewaySchema,
  EditGatewayInput,
} from '../types';
import GatewayListItem from './GatewayListItem';

interface IGatewayList {
  setModalElement: React.Dispatch<React.SetStateAction<ReactElement | null>>;
}

const GatewayList: FC<IGatewayList> = ({ setModalElement }) => {
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

  const {
    gateways,
    isRefetching,
    isLoading,
    isError,
    error,
    createGateway,
    editGateway,
    deleteGateway,
  } = useGateway();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateGatewayInput>({
    resolver: zodResolver(createGatewaySchema),
  });

  const sendForm = (values: CreateGatewayInput) => {
    try {
      createGateway(values);
      addButtonState.action();
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
  };

  const handleDelete = () => {
    const serialNumber = (selectedItem as Gateway).serialNumber;
    if (serialNumber) {
      deleteGateway(serialNumber);
    }
    addButtonState.action();
  };

  const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { name, ipv4Address } = event.target as typeof event.target & {
        name: { value: string };
        ipv4Address?: { value: string };
      };
      console.log(name, ipv4Address);
      editGateway({
        serialNumber: (selectedItem as Gateway).serialNumber,
        gateway: {
          name: name?.value || (selectedItem as Gateway).name,
          ipv4Address:
            ipv4Address?.value || (selectedItem as Gateway).ipv4Address,
        },
      });
      addButtonState.action();
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
  };

  return (
    <div className="overflow-x-auto flex flex-col items-center px-4 py-4 border-t border-base-300">
      <h1 className="text-xl text-base-100 mb-3 font-semibold">
        List of Gateways
      </h1>
      {error ? <div>{error}</div> : null}
      <form id="add_gateway_form" onSubmit={handleSubmit(sendForm)}></form>
      <form id="edit_gateway_form" onSubmit={event => handleEdit(event)}></form>
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Something happened...</div>
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
                <div className="form-element">
                  <input
                    form="add_gateway_form"
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="input input-bordered input-sm"
                    {...register('name')}
                  />
                  <p>{errors.name?.message}</p>
                </div>
              </td>
              <td>
                <div className="form-element">
                  <input
                    form="add_gateway_form"
                    type="text"
                    id="ipv4Address"
                    placeholder="Ipv4 Address"
                    className="input input-bordered input-sm"
                    {...register('ipv4Address')}
                  />
                  <p>{errors.ipv4Address?.message}</p>
                </div>
              </td>
              <td>New Devices</td>
              <td>
                <button
                  type="submit"
                  form="add_gateway_form"
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
      )}

      <div className="grid grid-flow-col gap-48">
        <button
          className={classNames('btn mt-1 self-end min-h-[2rem] h-[2rem]', {
            hidden: !selectedItem,
            isLoading,
          })}
          onClick={handleDelete}
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
  );
};

export default GatewayList;
