import { useGateways } from '../hooks';
import { format } from 'date-fns';
//import { addPeripheral } from '../services';

function GatewayList() {
  const { gateways, loading, error } = useGateways();

  return (
    <div className="overflow-x-auto flex flex-col items-center px-4 py-4 border-t border-base-300">
      <h1 className="text-xl text-base-100 mb-3 font-semibold">
        List of Gateways
      </h1>
      <label htmlFor="modal-add-form" className="btn mb-3">
        Add Gateway
      </label>
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
                          <div className="overflow-x-auto">
                            <h3 className="text-lg font-bold mb-1 w-full text-center">
                              {gateway.name}
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
                                {gateway.peripheralDevices.map((pd, key) => (
                                  <tr key={key}>
                                    <td>{pd.uid}</td>
                                    <td>{pd.vendor}</td>
                                    <td>
                                      {pd.dateCreated
                                        ? format(
                                            new Date(pd.dateCreated),
                                            'yyyy/mm/dd',
                                          )
                                        : 'Not Available'}
                                    </td>
                                    <td>{pd.status}</td>
                                    <td>
                                      <button className="btn mt-1 min-h-[2rem] h-[2rem]">
                                        Edit
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <button className="btn w-full mt-1 min-h-[2rem] h-[2rem]">
                              Add Peripheral Device
                            </button>
                          </div>
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
