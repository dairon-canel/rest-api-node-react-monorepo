import { closeDB, initializeDB } from '../config';
import request from 'supertest';
import app from '../app';

describe('Gateway API endpoints', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  it('should return a list of all gateways', () => {});
});

/* describe('Gateway Controller', () => {
  it('should return a list of all gateways', () => {});
  it('should return a specific gateway by serial number', () => {});
  it('should return a 404 error if gateway with given serial number does not exist', () => {});
  it('should add a new gateway', () => {});
  it('should return an error if trying to add a gateway with a duplicate serial number', () => {});
  it('should edit a gateway by serial number', () => {});
  it('should return an error if trying to edit a non-existent gateway', () => {});
  it('should delete a gateway by id', () => {});
  it('should return an error if trying to delete a non-existent gateway', () => {});
  it('should add a peripheral to a gateway', () => {});
  it('should return an error if trying to add a peripheral to a non-existent gateway', () => {});
  it('should return an error if trying to add a peripheral with a duplicate UID', () => {});
  it('should delete a peripheral from a gateway', () => {});
  it('should return an error if trying to delete a peripheral from a non-existent gateway', () => {});
  it('should return an error if trying to delete a non-existent peripheral', () => {});
  it('should edit a peripheral from a gateway', () => {});
  it('should return an error if trying to edit a peripheral from a non-existent gateway', () => {});
  it('should return an error if trying to edit a non-existent peripheral', () => {});
  it('should limit the number of peripherals per gateway', () => {});
  it('should return a 400 error if peripheral limit is exceeded', () => {});
  it('should return the number of peripherals attached to a gateway', () => {});
  it('should return a list of all peripherals attached to a gateway', () => {});
  it('should return a 404 error if trying to retrieve peripherals for a non-existent gateway', () => {});
  it('should return a list of all gateways with their peripherals', () => {});
  it('should return the total number of gateways', () => {});
  it('should return the total number of peripherals', () => {});
  it('should return a list of all gateways sorted by name', () => {});
  it('should return a list of all gateways sorted by online status', () => {});
  it('should return a list of all peripherals sorted by UID', () => {});
  it('should return a list of all peripherals sorted by vendor', () => {});
  it('should return a list of all peripherals sorted by date added', () => {});
}); */
