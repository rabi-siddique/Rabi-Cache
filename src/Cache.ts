import { validateKey, logMessage } from './decorators/Decorators';

export interface ICache {
  insert(key: string, value: unknown): void;
  get(key: string): unknown;
  delete(key: string): void;
  update(key: string, newValue: unknown): void;
  show(): void;
}

export interface RabiCache {
  [key: string]: any;
}

export class Cache implements ICache {
  private static cache: RabiCache = {};
  private static instance: Cache;
  private constructor() {}

  public static getInstance(): Cache {
    if (!this.instance) {
      this.instance = new Cache();
    }
    return this.instance;
  }

  @validateKey(Cache.cache)
  @logMessage
  public insert(key: string, value: unknown): void {
    Cache.cache[key] = value;
  }

  @validateKey(Cache.cache)
  @logMessage
  public get(key: string): unknown {
    return Cache.cache[key];
  }

  @validateKey(Cache.cache)
  @logMessage
  public delete(key: string): void {
    delete Cache.cache[key];
  }

  @validateKey(Cache.cache)
  @logMessage
  public update(key: string, newValue: unknown): void {
    Cache.cache[key] = newValue;
  }

  public show() {
    console.log(Cache.cache);
  }
}
