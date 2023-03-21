export const addPeripheral = async (serialNumber: string) => {
  fetch(`/gateways/${serialNumber}/peripherals`, {
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
};
