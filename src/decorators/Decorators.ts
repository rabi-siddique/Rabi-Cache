import { RabiCache } from '../Cache';
import { ErrorMessages, Operations, SuccessMessages } from '../enums/enums';
import { logWithTimestamp, successMessageLogger } from '../utils/Logger';

export function logMessage(
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const result = originalMethod.apply(this, args);

    switch (key) {
      case Operations.INSERT: {
        successMessageLogger(SuccessMessages.Insertion);
        break;
      }
      case Operations.GET: {
        successMessageLogger(SuccessMessages.Get);
        break;
      }
      case Operations.DELETE: {
        successMessageLogger(SuccessMessages.Deletion);
        break;
      }
      case Operations.UPDATE: {
        successMessageLogger(SuccessMessages.Update);
        break;
      }
    }

    return result;
  };

  return descriptor;
}

export function validateKey(cache: RabiCache) {
  return function (
    target: unknown,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const keyArgument = args[0] as string;
      const invalidKeys = ['', "''", '""', 'null', 'undefined'];

      if (invalidKeys.includes(keyArgument)) {
        throw new Error(ErrorMessages.KeyEmpty);
      }

      if (['get', 'delete', 'update'].includes(key)) {
        if (!cache.hasOwnProperty(keyArgument)) {
          throw new Error(ErrorMessages.KeyNotPresent);
        }
      }

      const result = originalMethod.apply(this, args);

      logWithTimestamp(
        `Method ${key} called with arguments: ${JSON.stringify(args)}`
      );

      return result;
    };

    return descriptor;
  };
}
