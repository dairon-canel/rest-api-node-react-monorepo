import { FC, useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import { PeripheralDevice } from '../types';
import PeripheralListItem from './PeripheralListItem';

interface IPeripheralListProps {
  peripheralDevices: PeripheralDevice[];
  gatewayName: string;
}

const PeripheralList: FC<IPeripheralListProps> = ({
  peripheralDevices,
  gatewayName,
}) => {
  const [selectedPeripheral, setSelectedPeripheral] =
    useState<PeripheralDevice | null>(null);
  const [addAction, setAddAction] = useState<boolean>(false);

  const [removeAddAction, setRemoveAddAction] = useState<boolean>(false);

  const handleAddToggle = () => {
    if (!addButtonState.enabled) {
      setAddAction(true);
      return setAddButtonState({
        buttonText: 'Cancel',
        enabled: true,
        action: () => {
          setAddAction(false);
          setAddButtonState({
            buttonText: 'Add Peripheral Device',
            enabled: false,
            action: handleAddToggle,
          });
        },
      });
    }
    return setAddButtonState({
      buttonText: 'Add Peripheral Device',
      enabled: false,
      action: () => {},
    });
  };

  const [addButtonState, setAddButtonState] = useState({
    buttonText: 'Add Peripheral Device',
    enabled: false,
    action: handleAddToggle,
  });

  const toggleEditClick = (peripheral: PeripheralDevice) => {
    if (selectedPeripheral !== peripheral) {
      setRemoveAddAction(true);
      setAddButtonState({
        buttonText: 'Cancel',
        enabled: false,
        action: () => {
          setRemoveAddAction(false);
          setAddButtonState({
            buttonText: 'Add Peripheral Device',
            enabled: false,
            action: handleAddToggle,
          });
          setSelectedPeripheral(null);
        },
      });
      return setSelectedPeripheral(peripheral);
    }
    setAddButtonState({
      buttonText: 'Add Gateway',
      enabled: false,
      action: handleAddToggle,
    });
    return setSelectedPeripheral(null);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-1 w-full text-center">
        {gatewayName}
      </h3>
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
          {peripheralDevices.map((peripheral, key) => (
            <PeripheralListItem
              removeAddAction={removeAddAction}
              key={key}
              peripheral={peripheral}
              selectedPeripheral={selectedPeripheral}
              addAction={addAction}
              toggleEditClick={toggleEditClick}
            />
          ))}
          <tr className={classNames({ hidden: !addButtonState.enabled })}>
            <td>{peripheralDevices.length + 1}</td>
            <td>ADD</td>
            <td>{format(new Date(), 'yyyy/mm/dd')}</td>
            <td>ADD</td>
            <td>
              <button className="btn mt-1 min-h-[2rem] h-[2rem]">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn w-full mt-1 min-h-[2rem] h-[2rem]"
        disabled={!(peripheralDevices.length <= 10)}
        onClick={addButtonState.action}
      >
        {addButtonState.buttonText}
      </button>
    </div>
  );
};

export default PeripheralList;
