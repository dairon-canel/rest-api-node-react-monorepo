import { format } from 'date-fns';
import { FC, useState } from 'react';
import { PeripheralDevice } from '../types';

interface IPeripheralListItemProps {
  key: number;
  pd: PeripheralDevice;
  addEnabled: boolean;
}

const PeripheralListItem: FC<IPeripheralListItemProps> = ({
  key,
  pd,
  addEnabled,
}) => {
  const [editButtonState, setEditButtonState] = useState({
    buttonText: 'Edit',
    enabled: false,
  });
  const handleEditToggle = () => {
    if (!editButtonState.enabled) {
      return setEditButtonState({
        buttonText: 'Ok',
        enabled: true,
      });
    }
    return setEditButtonState({
      buttonText: 'Edit',
      enabled: false,
    });
  };
  if (editButtonState.enabled) {
    return (
      <tr key={key}>
        <td>{pd.uid}</td>
        <td>**</td>
        <td>
          {pd.dateCreated
            ? format(new Date(pd.dateCreated), 'yyyy/mm/dd')
            : 'Not Available'}
        </td>
        <td>**</td>
        <td>
          <button
            className="btn mt-1 min-h-[2rem] h-[2rem]"
            key={pd.uid}
            disabled={addEnabled}
            onClick={handleEditToggle}
          >
            {editButtonState.buttonText}
          </button>
        </td>
      </tr>
    );
  }
  return (
    <tr key={key}>
      <td>{pd.uid}</td>
      <td>{pd.vendor}</td>
      <td>
        {pd.dateCreated
          ? format(new Date(pd.dateCreated), 'yyyy/mm/dd')
          : 'Not Available'}
      </td>
      <td>{pd.status}</td>
      <td>
        <button
          className="btn mt-1 min-h-[2rem] h-[2rem]"
          disabled={addEnabled}
          onClick={handleEditToggle}
          key={pd.uid}
        >
          {editButtonState.buttonText}
        </button>
      </td>
    </tr>
  );
};

export default PeripheralListItem;
