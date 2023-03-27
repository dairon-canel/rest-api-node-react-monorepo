import supertest from 'supertest';
import createServer from '../utils/server';
import mongoose from 'mongoose';
import * as GatewayService from '../service/gateway.service';

const app = createServer();

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
