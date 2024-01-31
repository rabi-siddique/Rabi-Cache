import { RabiCache } from '../Cache';
import {
  CACHE_KEYWORD,
  ErrorMessages,
  Operations,
  SuccessMessages,
} from '../enums/enums';
import { logWithTimestamp, successMessageLogger } from '../utils/Logger';
import { isValidOperation } from '../utils/Validators';

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

export function validateCommand(
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (args: string) {
    let command = args;

    command.trim();
    const commandWords = command.split(' ').filter(Boolean);

    if (commandWords[0] !== CACHE_KEYWORD) {
      throw new Error(ErrorMessages.NoRabi);
    }

    if (commandWords.length > 4) {
      throw new Error(ErrorMessages.InvalidCommand);
    }

    if (!isValidOperation(commandWords[1])) {
      throw new Error(ErrorMessages.InvalidOperation);
    }
    if (
      commandWords.length === 4 &&
      commandWords[0] === CACHE_KEYWORD &&
      (commandWords[1] === Operations.INSERT ||
        commandWords[1] === Operations.UPDATE)
    ) {
      originalMethod.apply(this, [commandWords.join(' ')]);
    } else if (
      commandWords.length === 3 &&
      commandWords[0] === CACHE_KEYWORD &&
      (commandWords[1] === Operations.GET ||
        commandWords[1] === Operations.DELETE)
    ) {
      originalMethod.apply(this, [commandWords.join(' ')]);
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  };

  return descriptor;
}
