import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { useTableItemAddAction } from '../hooks';
import { Gateway, PeripheralDevice } from '../types';

interface IPeripheralListItemProps {
  removeAddAction: boolean;
  addAction: boolean;
  peripheral: PeripheralDevice;
  selectedPeripheral: PeripheralDevice | null;
  toggleEditClick: (item: Gateway | PeripheralDevice) => void;
  networkStatus: 'offline' | 'online';
  setNetworkStatus: React.Dispatch<React.SetStateAction<'offline' | 'online'>>;
}

const PeripheralListItem: FC<IPeripheralListItemProps> = ({
  removeAddAction,
  addAction,
  peripheral,
  selectedPeripheral,
  toggleEditClick,
  networkStatus,
  setNetworkStatus,
}) => {
  const { editButtonToggle, handleEditToggle } = useTableItemAddAction(
    removeAddAction,
    toggleEditClick,
  );

  useEffect(() => {
    setNetworkStatus('offline');
  }, []);

  return (
    <>
      {editButtonToggle ? (
        <>
          <td>{peripheral.uid}</td>
          <td>
            <fieldset>
              <input
                form="edit_peripheral_form"
                type="text"
                id="vendor"
                placeholder={selectedPeripheral?.vendor || 'Vendor'}
                required
                className="input input-bordered input-sm"
              />
            </fieldset>
          </td>
          <td>
            {peripheral.dateCreated
              ? format(new Date(peripheral.dateCreated), 'yyyy/mm/dd')
              : 'Not Available'}
          </td>
          <td>
            <button
              type="button"
              className="btn mt-1 min-h-[1.3rem] h-[1.3rem]"
              onClick={() => {
                if (networkStatus === 'offline') setNetworkStatus('online');
                if (networkStatus === 'online') setNetworkStatus('offline');
              }}
            >
              {networkStatus}
            </button>
          </td>
          <td>
            <button
              form="edit_peripheral_form"
              type="submit"
              className="btn mt-1 min-h-[2rem] h-[2rem]"
              onClick={event => {
                handleEditToggle(peripheral, false);
                event.currentTarget.form?.requestSubmit();
              }}
              disabled={
                (selectedPeripheral !== null &&
                  selectedPeripheral !== peripheral) ||
                addAction
              }
            >
              {selectedPeripheral === peripheral ? 'OK' : 'Edit'}
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{peripheral.uid}</td>
          <td>{peripheral.vendor}</td>
          <td>
            {peripheral.dateCreated
              ? format(new Date(peripheral.dateCreated), 'yyyy/mm/dd')
              : 'Not Available'}
          </td>
          <td>{peripheral.status}</td>
          <td>
            <button
              className="btn mt-1 min-h-[2rem] h-[2rem]"
              onClick={() => handleEditToggle(peripheral, true)}
              disabled={
                (selectedPeripheral !== null &&
                  selectedPeripheral !== peripheral) ||
                addAction
              }
            >
              {selectedPeripheral === peripheral ? 'OK' : 'Edit'}
            </button>
          </td>
        </>
      )}
    </>
  );
};

export default PeripheralListItem;
