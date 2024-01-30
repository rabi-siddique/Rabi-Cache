export function logMessage(
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const result = originalMethod.apply(this, args);

    switch (key) {
      case 'insert': {
        console.log('Insertion Successful in the cache');
        break;
      }
      case 'get': {
        console.log('Key Retrieval Successful', result);
        break;
      }
      case 'delete': {
        console.log('Key Deletion Successful');
        break;
      }
      case 'update': {
        console.log('Key Update Successful');
        break;
      }
    }
  };

  return descriptor;
}

export function validateKey(
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
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
