import classNames from 'classnames';
import { FC } from 'react';
import { useTableItemActions } from '../hooks';
import { Gateway } from '../types';
import PeripheralList from './PeripheralList';

interface IGatewayListItemProps {
  removeAddAction: boolean;
  addAction: boolean;
  gateway: Gateway;
  selectedGateway: Gateway | null;
  toggleEditClick: (gateway: Gateway) => void;
}

const GatewayListItem: FC<IGatewayListItemProps> = ({
  removeAddAction,
  addAction,
  gateway,
  selectedGateway,
  toggleEditClick,
}) => {
  const { editButtonToggle, handleEditToggle } = useTableItemActions(
    removeAddAction,
    toggleEditClick,
  );

  if (editButtonToggle)
    return (
      <tr>
        <td>**</td>
        <td>**</td>
        <td>**</td>
        <td>
          {!gateway.peripheralDevices ? (
            <p>No devices</p>
          ) : (
            <div className="grid grid-flow-col items-center justify-start">
              <p>
                {gateway.peripheralDevices.length === 1
                  ? '1 Peripheral Device'
                  : `${gateway.peripheralDevices.length} Peripheral Devices`}
              </p>
              <div className="dropdown dropdown-left ml-4">
                <label className="btn btn-disabled m-1 min-h-[2rem] h-[2rem]">
                  Details
                </label>
              </div>
            </div>
          )}
        </td>
        <td>
          <button
            className="btn mt-1 min-h-[2rem] h-[2rem]"
            onClick={() => handleEditToggle(gateway)}
            disabled={
              (selectedGateway !== null && selectedGateway !== gateway) ||
              addAction
            }
          >
            {selectedGateway === gateway ? 'OK' : 'Edit'}
          </button>
        </td>
      </tr>
    );

  return (
    <tr>
      <td>{gateway.serialNumber}</td>
      <td>{gateway.name}</td>
      <td>{gateway.ipv4Address}</td>
      <td>
        {!gateway.peripheralDevices ? (
          <p>No devices</p>
        ) : (
          <div className="grid grid-flow-col items-center justify-start">
            <p>
              {gateway.peripheralDevices.length === 1
                ? '1 Peripheral Device'
                : `${gateway.peripheralDevices.length} Peripheral Devices`}
            </p>
            <div className="dropdown dropdown-left ml-4">
              <label
                tabIndex={0}
                className={classNames('btn m-1 min-h-[2rem] h-[2rem]', {
                  'btn-disabled': selectedGateway !== null || addAction,
                })}
              >
                Details
              </label>
              <div
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-fit"
              >
                <PeripheralList
                  peripheralDevices={gateway.peripheralDevices}
                  gatewayName={gateway.name}
                />
              </div>
            </div>
          </div>
        )}
      </td>
      <td>
        <button
          className="btn mt-1 min-h-[2rem] h-[2rem]"
          onClick={() => handleEditToggle(gateway)}
          disabled={
            (selectedGateway !== null && selectedGateway !== gateway) ||
            addAction
          }
        >
          {selectedGateway === gateway ? 'OK' : 'Edit'}
        </button>
      </td>
    </tr>
  );
};

export default GatewayListItem;
