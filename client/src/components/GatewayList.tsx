import { useGateways } from '../hooks';
//import { addPeripheral } from '../services';

function GatewayList() {
  const { gateways, loading, error } = useGateways();

  return (
    <div className="overflow-x-auto  flex flex-col items-center px-4 py-4 border-t border-base-300">
      <h1 className="text-xl text-base-100 mb-3 font-semibold">
        List of Gateways
      </h1>
      <table className="table w-full">
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
                    <p>
                      {gateway.peripheralDevices.length === 1
                        ? '1 Peripheral Device'
                        : `${gateway.peripheralDevices.length} Peripheral Devices`}
                    </p>
                  )}
                  <button /* onClick={() => addPeripheral(gateway.serialNumber)} */
                  >
                    Add Peripheral
                  </button>
                </td>
                <td>
                  <div className="dropdown dropdown-left">
                    <label tabIndex={key} className="btn m-1">
                      Actions
                    </label>
                    <ul
                      tabIndex={key}
                      className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
                    >
                      <li>
                        <a>Delete Gateway</a>
                      </li>
                      <li>
                        <a>View Peripherals</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GatewayList;

/* (
                    gateway.peripheralDevices.map(peripheral => (
                      <div key={peripheral.uid}>
                        {`UID: ${peripheral.uid} Vendor: ${peripheral.vendor}{' '}
                        Created:
                        ${peripheral.dateCreated} Status: ${peripheral.status}`}
                        <button /* onClick={() => addPeripheral(gateway.serialNumber)}
                        >
                          Remove Peripheral
                        </button>
                        <button /* onClick={() => addPeripheral(gateway.serialNumber)} 
                        >
                          Update Peripheral
                        </button>
                      </div>
                    ))
                  ) */
