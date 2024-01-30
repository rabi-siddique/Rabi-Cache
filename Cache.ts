export class Cache {
  private cache = {};
  constructor() {}

  @validateKey
  public insert(key: string, value: unknown): void | never {
    this.cache[key] = value;
    console.log('Insertion Successful in the cache');
  }

  @validateKey
  public get(key: string): void | never {
    console.log('Key Retrieval Successful', this.cache[key]);
    return this.cache[key];
  }

  @validateKey
  public delete(key: string): void | never {
    console.log('Key Deletion Successful');
    delete this.cache[key];
  }

  @validateKey
  public update(key: string, newValue: unknown): void | never {
    console.log('Key Update Successful');
    this.cache[key] = newValue;
  }
}

function validateKey(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const [keyArgument, ...restArgs] = args;

    if (keyArgument === '') {
      throw new Error('Invalid key. Key cannot be an empty string.');
    }

    if (['get', 'delete', 'update'].includes(key)) {
      if (!this.cache.hasOwnProperty(keyArgument)) {
        throw new Error('Invalid key. Key is not present in the cache');
      }
    }

    const result = originalMethod.apply(this, args);

    console.log(
      `Method ${key} called with arguments: ${JSON.stringify(
        args
      )}. Result: ${result}`
    );
    return result;
  };

  return descriptor;
}
