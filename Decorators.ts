import {
  CACHE_KEYWORD,
  ErrorMessages,
  Operations,
  SuccessMessages,
} from './enums';

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
        console.log(SuccessMessages.Insertion);
        break;
      }
      case Operations.GET: {
        console.log(SuccessMessages.Get, result);
        break;
      }
      case Operations.DELETE: {
        console.log(SuccessMessages.Deletion);
        break;
      }
      case Operations.UPDATE: {
        console.log(SuccessMessages.Update);
        break;
      }
    }

    return result;
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
      throw new Error(ErrorMessages.KeyEmpty);
    }

    if (['get', 'delete', 'update'].includes(key)) {
      if (!this.cache.hasOwnProperty(keyArgument)) {
        throw new Error(ErrorMessages.KeyNotPresent);
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
