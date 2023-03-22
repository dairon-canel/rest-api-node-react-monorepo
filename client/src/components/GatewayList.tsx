import classNames from 'classnames';
import { useState } from 'react';
import { useGateways } from '../hooks';
import PeripheralList from './PeripheralList';
//import { addPeripheral } from '../services';

const GatewayList = () => {
  const { gateways, loading, error } = useGateways();

  const [addButtonState, setAddButtonState] = useState({
    buttonText: 'Add Gateway',
    enabled: false,
  });

  const handleAddToggle = () => {
    if (!addButtonState.enabled) {
      return setAddButtonState({
        buttonText: 'Cancel',
        enabled: true,
      });
    }
    return setAddButtonState({
      buttonText: 'Add Gateway',
      enabled: false,
    });
  };

  return (
    <div className="overflow-x-auto flex flex-col items-center px-4 py-4 border-t border-base-300">
      <h1 className="text-xl text-base-100 mb-3 font-semibold">
        List of Gateways
      </h1>
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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something happened...</p>
          ) : !gateways ? (
            <p>No gateways yet...</p>
          ) : (
            gateways?.map((gateway, key) => (
              <tr key={gateway.serialNumber}>
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
                          className="btn m-1 min-h-[2rem] h-[2rem]"
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
                  <button className="btn mt-1 min-h-[2rem] h-[2rem]">
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
          <tr className={classNames({ hidden: !addButtonState.enabled })}>
            <td>Serial</td>
            <td>Name</td>
            <td>IP</td>
            <td></td>
            <td>
              <button className="btn mt-1 min-h-[2rem] h-[2rem]">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn mt-1 min-h-[2rem] h-[2rem]"
        onClick={handleAddToggle}
      >
        {addButtonState.buttonText}
      </button>
    </div>
  );
};

export default GatewayList;
