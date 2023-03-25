import { object, string, TypeOf, nativeEnum } from 'zod';

const payload = {
  body: object({
    gateway_id: string({
      required_error: 'Gateway id is required',
    })
      .length(9, 'Gateway id must be 9 characters long')
      .startsWith('GW_', "Gateway id must start with 'GL_'"),
    vendor: string({
      required_error: 'Vendor is required',
    }).min(3, 'Vendor should be at least 3 characters long'),
    status: nativeEnum({ online: 'ONLINE', offline: 'OFFLINE' }),
  }),
};

const params = {
  params: object({
    uid: string()
      .optional()
      .transform(e => (e === '' ? undefined : e)),
    serialNumber: string()
      .optional()
      .transform(e => (e === '' ? undefined : e)),
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
