import { object, string, TypeOf, nativeEnum } from 'zod';

const payload = {
  body: object({
    Peripheral: string({
      required_error: 'Peripheral id is required',
    }).uuid('Invalid Peripheral id'),
    uid: string({
      required_error: 'Peripheral id is required',
    }).uuid('Invalid Peripheral id'),
    vendor: string({
      required_error: 'Vendor is required',
    }).min(3, 'Vendor should be at least 3 characters long'),
    status: nativeEnum({ online: 'ONLINE', offline: 'OFFLINE' }),
  }),
};

const params = {
  params: object({
    uid: string({
      required_error: 'uid is required',
    }),
  }),
};

export const createPeripheralSchema = object({
  ...payload,
});

export const updatePeripheralSchema = object({
  ...payload,
  ...params,
});

export const deletePeripheralSchema = object({
  ...params,
});

export const getPeripheralSchema = object({
  ...params,
});

export type CreatePeripheralInput = TypeOf<typeof createPeripheralSchema>;
export type UpdatePeripheralInput = TypeOf<typeof updatePeripheralSchema>;
export type ReadPeripheralInput = TypeOf<typeof getPeripheralSchema>;
export type DeletePeripheralInput = TypeOf<typeof deletePeripheralSchema>;
