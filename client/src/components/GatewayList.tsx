import { useGateways } from '../hooks';
//import { addPeripheral } from '../services';

function GatewayList() {
  const { gateways, loading, error } = useGateways();

  return (
    <div className="overflow-x-auto">
      <h1>List of Gateways</h1>
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
            gateways?.map(gateway => (
              <tr key={gateway.serialNumber}>
                <td>{gateway.serialNumber}</td>
                <td>{gateway.name}</td>
                <td>{gateway.ipv4Address}</td>
                <td>
                  {!gateway.peripheralDevices ? (
                    <p>No devices yet..</p>
                  ) : (
                    gateway.peripheralDevices.map(peripheral => (
                      <div key={peripheral.uid}>
                        {`UID: ${peripheral.uid} Vendor: ${peripheral.vendor}{' '}
                        Created:
                        ${peripheral.dateCreated} Status: ${peripheral.status}`}
                        <button /* onClick={() => addPeripheral(gateway.serialNumber)} */
                        >
                          Remove Peripheral
                        </button>
                        <button /* onClick={() => addPeripheral(gateway.serialNumber)} */
                        >
                          Update Peripheral
                        </button>
                      </div>
                    ))
                  )}
                  <button /* onClick={() => addPeripheral(gateway.serialNumber)} */
                  >
                    Add Peripheral
                  </button>
                </td>
                <td>
                  <button /* onClick={() => addPeripheral(gateway.serialNumber)} */
                  >
                    Actions
                  </button>
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
