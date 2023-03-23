import classNames from 'classnames';
import { FC } from 'react';
import { useTableItemAddAction } from '../hooks';
import { Gateway, PeripheralDevice } from '../types';
import PeripheralList from './PeripheralList';

interface IGatewayListItemProps {
  removeAddAction: boolean;
  addAction: boolean;
  gateway: Gateway;
  selectedGateway: Gateway | null;
  toggleEditClick: (item: Gateway | PeripheralDevice) => void;
}

const GatewayListItem: FC<IGatewayListItemProps> = ({
  removeAddAction,
  addAction,
  gateway,
  selectedGateway,
  toggleEditClick,
}) => {
  const { editButtonToggle, handleEditToggle } = useTableItemAddAction(
    removeAddAction,
    toggleEditClick,
  );

  return (
    <tr>
      {editButtonToggle ? (
        <>
          <td>{gateway.serialNumber}</td>
          <td>
            <fieldset>
              <input
                form="edit_gateway_form"
                type="text"
                id="name"
                placeholder={selectedGateway?.name || 'Name'}
                required
                className="input input-bordered input-sm"
              />
            </fieldset>
          </td>
          <td>
            <fieldset>
              <input
                form="edit_gateway_form"
                type="text"
                id="ipv4Address"
                placeholder={selectedGateway?.ipv4Address || 'IPv4 Address'}
                required
                className="input input-bordered input-sm"
              />
            </fieldset>
          </td>
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
              id="edit_gateway_form_button"
              type="submit"
              form="edit_gateway_form"
              onClick={event => {
                handleEditToggle(gateway, false);
                event.currentTarget.form?.requestSubmit();
              }}
              className="btn mt-1 min-h-[2rem] h-[2rem]"
              disabled={
                (selectedGateway !== null && selectedGateway !== gateway) ||
                addAction
              }
            >
              {selectedGateway === gateway ? 'OK' : 'Edit'}
            </button>
          </td>
        </>
      ) : (
        <>
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
              id="edit_button"
              className="btn mt-1 min-h-[2rem] h-[2rem]"
              onClick={() => handleEditToggle(gateway, true)}
              disabled={
                (selectedGateway !== null && selectedGateway !== gateway) ||
                addAction
              }
            >
              {selectedGateway === gateway ? 'OK' : 'Edit'}
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default GatewayListItem;
