export class Cache {
  private cache = {};
  constructor() {}

  public insert(key: string, value: unknown): void | never {
    if (key === '') {
      throw new Error('Invalid key. Key can not be an empty string.');
    }
    this.cache[key] = value;
    console.log('Insertion Successful in the cache');
  }

  public get(key: string): void | never {
    if (key === '') {
      throw new Error('Invalid key. Key can not be an empty string.');
    }
    if (!this.cache.hasOwnProperty(key)) {
      throw new Error('Invalid key. Key is not present in the cache');
    }

    console.log('Key Retrieval Successful', this.cache[key]);
    return this.cache[key];
  }

  public delete(key: string): void | never {
    if (key === '') {
      throw new Error('Invalid key. Key can not be an empty string.');
    }
    if (!this.cache.hasOwnProperty(key)) {
      throw new Error('Invalid key. Key is not present in the cache');
    }

    console.log('Key Deletion Successful');
    delete this.cache[key];
  }

  public update(key: string, newValue: unknown): void | never {
    if (key === '') {
      throw new Error('Invalid key. Key can not be an empty string.');
    }
    if (!this.cache.hasOwnProperty(key)) {
      throw new Error('Invalid key. Key is not present in the cache');
    }

    console.log('Key Update Successful');
    this.cache[key] = newValue;
  }
}
