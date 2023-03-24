import { closeDB, initializeDB } from '../config';
import request from 'supertest';
import app from '../app';

describe('API endpoints', () => {
  it('should return a 200 status code for the / endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for the database endpoint', async () => {
    const response = await request(app).get('/gateways');
    expect(response.status).toBe(200);
  });
});

describe('Gateway Controller', () => {
  it('should return a list of all gateways', () => {
    /* test code */
  });
  it('should return a specific gateway by serial number', () => {
    /* test code */
  });
  it('should return a 404 error if gateway with given serial number does not exist', () => {
    /* test code */
  });
  it('should add a new gateway', () => {
    /* test code */
  });
  it('should return an error if trying to add a gateway with a duplicate serial number', () => {
    /* test code */
  });
  it('should edit a gateway by serial number', () => {
    /* test code */
  });
  it('should return an error if trying to edit a non-existent gateway', () => {
    /* test code */
  });
  it('should delete a gateway by id', () => {
    /* test code */
  });
  it('should return an error if trying to delete a non-existent gateway', () => {
    /* test code */
  });
  it('should add a peripheral to a gateway', () => {
    /* test code */
  });
  it('should return an error if trying to add a peripheral to a non-existent gateway', () => {
    /* test code */
  });
  it('should return an error if trying to add a peripheral with a duplicate UID', () => {
    /* test code */
  });
  it('should delete a peripheral from a gateway', () => {
    /* test code */
  });
  it('should return an error if trying to delete a peripheral from a non-existent gateway', () => {
    /* test code */
  });
  it('should return an error if trying to delete a non-existent peripheral', () => {
    /* test code */
  });
  it('should edit a peripheral from a gateway', () => {
    /* test code */
  });
  it('should return an error if trying to edit a peripheral from a non-existent gateway', () => {
    /* test code */
  });
  it('should return an error if trying to edit a non-existent peripheral', () => {
    /* test code */
  });
  it('should limit the number of peripherals per gateway', () => {
    /* test code */
  });
  it('should return a 400 error if peripheral limit is exceeded', () => {
    /* test code */
  });
  it('should return the number of peripherals attached to a gateway', () => {
    /* test code */
  });
  it('should return a list of all peripherals attached to a gateway', () => {
    /* test code */
  });
  it('should return a 404 error if trying to retrieve peripherals for a non-existent gateway', () => {
    /* test code */
  });
  it('should return a list of all gateways with their peripherals', () => {
    /* test code */
  });
  it('should return the total number of gateways', () => {
    /* test code */
  });
  it('should return the total number of peripherals', () => {
    /* test code */
  });
  it('should return a list of all gateways sorted by name', () => {
    /* test code */
  });
  it('should return a list of all gateways sorted by online status', () => {
    /* test code */
  });
  it('should return a list of all peripherals sorted by UID', () => {
    /* test code */
  });
  it('should return a list of all peripherals sorted by vendor', () => {
    /* test code */
  });
  it('should return a list of all peripherals sorted by date added', () => {
    /* test code */
  });
});
