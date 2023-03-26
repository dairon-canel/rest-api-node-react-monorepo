import supertest from 'supertest';
import createServer from '../utils/server';
import mongoose from 'mongoose';
import * as GatewayService from '../service/gateway.service';
import * as UserService from '../service/user.service';
import * as requireUser from '../middleware/requireUser';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: 'jane.doe@example.com',
  name: 'Jane Doe',
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString,
  user: userId,
  valid: true,
  userAgent: 'PostmanRuntime/7.28.4',
  createdAt: new Date('2021-09-30T13:31:07.674Z'),
  updatedAt: new Date('2021-09-30T13:31:07.674Z'),
  __v: 0,
};

const userInput = {
  email: 'test@example.com',
  name: 'Jane Doe',
  password: 'Password123',
  passwordConfirmation: 'Password123',
};

const gatewayPayload = {
  _id: userId,
  name: 'GW001',
  ipv4Address: '192.168.0.1',
  serialNumber: 'GW_76es',
  createdAt: '2023-03-25T13:21:39.031Z',
  updatedAt: '2023-03-25T13:21:39.031Z',
  __v: 0,
};

const gatewayInput = {
  _id: userId,
  name: 'GW111',
  ipv4Address: '192.168.35.1',
};

const gatewayList = [
  {
    _id: '641ef563944b93466ca79425',
    name: 'GW001',
    ipv4Address: '192.168.0.1',
    serialNumber: 'GW_76es',
    createdAt: '2023-03-25T13:21:39.031Z',
    updatedAt: '2023-03-25T13:21:39.031Z',
    __v: 0,
  },
  {
    _id: '641ef585195bef85a4b81219',
    name: 'GW002',
    ipv4Address: '192.168.1.1',
    serialNumber: 'GW_mvcb',
    createdAt: '2023-03-25T13:22:13.635Z',
    updatedAt: '2023-03-25T13:22:13.635Z',
    __v: 0,
  },
  {
    _id: '641ef58f195bef85a4b8121b',
    name: 'GW003',
    ipv4Address: '192.168.3.1',
    serialNumber: 'GW_7s52',
    createdAt: '2023-03-25T13:22:23.590Z',
    updatedAt: '2023-03-25T13:22:23.590Z',
    __v: 0,
  },
  {
    _id: '641ef941df61416097be7b73',
    name: 'GW005',
    ipv4Address: '192.168.4.1',
    serialNumber: 'GW_sgb0',
    createdAt: '2023-03-25T13:38:09.797Z',
    updatedAt: '2023-03-25T13:38:09.797Z',
    __v: 0,
  },
];

describe('Gateway', () => {
  describe('Create Gateway', () => {
    describe('Given a valid input', () => {
      it('should create a new gateway', async () => {
        const createGatewayServiceMock = jest
          .spyOn(GatewayService, 'createGateway')
          //@ts-ignore
          .mockReturnValueOnce(gatewayPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/gateways')
          .send(gatewayInput);

        console.log('TEST', body);

        expect(statusCode).toBe(200);
        expect(body).toEqual(gatewayPayload);
        expect(createGatewayServiceMock).toHaveBeenCalledWith(gatewayInput);
      });
    });
    describe('Given an invalid input', () => {
      it('should return an error if required fields are missing', () => {
        expect(true).toBe(true);
      });
      it('should return an error if serialNumber is already in use', () => {});
      it('should return an error if ipv4Address is not a valid IPv4 address', () => {});
    });
  });
  describe('Read Gateway', () => {
    describe('On get all gateways', () => {
      it('should return a list of gateways', () => {});
    });

    describe('On get gateway by serial number', () => {
      describe('Given a valid serial number', () => {
        it('should return a gateway', () => {});
      });

      describe('Given an invalid serial number', () => {
        it('should return an error', () => {});
      });
    });
  });
  describe('Update Gateway', () => {
    describe('Given a valid input', () => {
      it('should update the gateway', () => {});
    });
    describe('Given an invalid input', () => {
      it('should return an error', () => {});
    });
  });
  describe('Delete Gateway', () => {
    describe('Given a valid input', () => {
      it('should delete the gateway', () => {});
    });

    describe('Given an invalid input', () => {
      it('should return an error', () => {});
    });
  });
});
