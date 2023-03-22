import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { PeripheralDevice } from '../types';

interface IPeripheralListItemProps {
  removeAddAction: boolean;
  addAction: boolean;
  peripheral: PeripheralDevice;
  selectedPeripheral: PeripheralDevice | null;
  toggleEditClick: (peripheral: PeripheralDevice) => void;
}

const PeripheralListItem: FC<IPeripheralListItemProps> = ({
  removeAddAction,
  addAction,
  peripheral,
  selectedPeripheral,
  toggleEditClick,
}) => {
  const [editButtonToggle, setEditButtonToggle] = useState(removeAddAction);

  useEffect(() => {
    if (!removeAddAction) setEditButtonToggle(false);
  }, [removeAddAction]);

  const handleEditToggle = (peripheral: PeripheralDevice) => {
    if (editButtonToggle) {
      setEditButtonToggle(!editButtonToggle);
      return toggleEditClick(peripheral);
    }
    setEditButtonToggle(!editButtonToggle);
    return toggleEditClick(peripheral);
  };

  if (editButtonToggle) {
    return (
      <tr>
        <td>{peripheral.uid}</td>
        <td>**</td>
        <td>
          {peripheral.dateCreated
            ? format(new Date(peripheral.dateCreated), 'yyyy/mm/dd')
            : 'Not Available'}
        </td>
        <td>**</td>
        <td>
          <button
            className="btn mt-1 min-h-[2rem] h-[2rem]"
            onClick={() => handleEditToggle(peripheral)}
            disabled={
              (selectedPeripheral !== null &&
                selectedPeripheral !== peripheral) ||
              addAction
            }
          >
            {selectedPeripheral === peripheral ? 'OK' : 'Edit'}
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
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
          onClick={() => handleEditToggle(peripheral)}
          disabled={
            (selectedPeripheral !== null &&
              selectedPeripheral !== peripheral) ||
            addAction
          }
        >
          {selectedPeripheral === peripheral ? 'OK' : 'Edit'}
        </button>
      </td>
    </tr>
  );
};

export default PeripheralListItem;
