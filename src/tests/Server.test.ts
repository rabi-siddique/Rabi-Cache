import { CommandExecutor, ICommandExecutor } from '../Executor.js';
import { IServerInterface, Server } from '../Server.js';
import { ErrorMessages, Operations, SuccessMessages } from '../enums/enums.js';
import { Cache } from '../Cache.js';
import { Request, Response } from 'express';

describe('Server Test Cases', () => {
  let server: IServerInterface;
  let executor: ICommandExecutor;

  beforeAll(async () => {
    executor = new CommandExecutor(Cache.getInstance());
    server = new Server(executor);
    await server.start();
  });

  afterAll(() => {
    server.stop();
  });

  it('should insert data into cache when valid key-value pair is provided', () => {
    const req = {
      method: 'POST',
      body: {
        testKey: 'testValue',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    server.AddCacheData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(SuccessMessages.Insertion);
  });

  it('should update data in cache when valid key-value pair is provided', () => {
    const req = {
      method: 'PUT',
      body: {
        testKey: 'NewTestValue',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    server.UpdateCacheData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(SuccessMessages.Update);
  });

  it('should return value for specified key when GET request is made to /data/:key', () => {
    const req = {
      params: { key: 'testKey' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    server.GetCacheData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      data: { key: 'NewTestValue' },
      message: SuccessMessages.Get,
    });
  });

  it('should delete value for specified key when DELETE request is made to /data/:key', () => {
    const req = {
      params: { key: 'testKey' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    server.DeleteCacheData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(SuccessMessages.Deletion);
  });

  it('should return 500 error when DELETE request is made to non-existent key', () => {
    const req = {
      params: { key: 'nonExistentKey' },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    server.DeleteCacheData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should return 500 error when GET request is made to non-existent key', () => {
    const req = {
      params: { key: 'nonExistentKey' },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    server.GetCacheData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
