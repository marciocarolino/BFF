import axios from 'axios';
import { setupMock } from '../mockService';
import { NotFoundException } from '@nestjs/common';
import MockAdapter from 'axios-mock-adapter';

describe('setupMock', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = setupMock();
  });

  afterEach(() => {
    mock.restore();
  });

  it('should handle successful GET request', async () => {
    const response = await axios.get('/configurations');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  it('should handle NotFoundException', async () => {
    expect.assertions(1);
    try {
      await axios.put('/configurations/non-existent-id', {});
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
