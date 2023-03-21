import { useGateways } from '../hooks/gateway';

function GatewayList() {
  const { gateways, loading, error } = useGateways();

  /* function addPeripheral(gatewaySerialNumber) {
    fetch(`http://yourapi.com/gateways/${gatewaySerialNumber}/peripherals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: 1234,
        vendor: 'Example Vendor',
        dateCreated: '2023-03-21T12:34:56.789Z',
        status: 'online',
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  } */

  return (
    <div>
      <h1>List of Gateways</h1>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>IP Address</th>
            <th>Peripherals</th>
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
                      </div>
                    ))
                  )}
                  <button /* onClick={() => addPeripheral(gateway.serialNumber)} */
                  >
                    Add Peripheral
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
