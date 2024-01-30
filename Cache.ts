import { validateKey, logMessage } from './Decorators';

export interface ICache {
  insert(key: string, value: unknown): void;
  get(key: string): unknown;
  delete(key: string): void;
  update(key: string, newValue: unknown): void;
}

export class Cache implements ICache {
  private cache = {};
  private static instance: Cache;
  private constructor() {}

  public static getInstance(): Cache {
    if (!this.instance) {
      this.instance = new Cache();
    }
    return this.instance;
  }

  @validateKey
  @logMessage
  public insert(key: string, value: unknown): void {
    this.cache[key] = value;
  }

  @validateKey
  @logMessage
  public get(key: string): unknown {
    return this.cache[key];
  }

  @validateKey
  @logMessage
  public delete(key: string): void {
    delete this.cache[key];
  }

  @validateKey
  @logMessage
  public update(key: string, newValue: unknown): void {
    this.cache[key] = newValue;
  }
}
