import { ErrorMessages } from '../enums/enums';

export function isValidOperation(value: string): boolean {
  const validOperations = ['insert', 'get', 'delete', 'update'];
  return validOperations.includes(value);
}

export function checkCommand(command: string) {
  command.trim();

  // Validating Rabi
  if (!command.startsWith('Rabi ')) {
    throw new Error(ErrorMessages.NoRabi);
  }

  command = command.substring(4).trim();

  // Validating Operation
  if (
    !(
      command.startsWith('insert ') ||
      command.startsWith('update ') ||
      command.startsWith('delete ') ||
      command.startsWith('get ')
    )
  ) {
    throw new Error(ErrorMessages.InvalidOperation);
  }

  if (command.startsWith('insert ')) {
    command = command.substring(8);
  } else if (command.startsWith('update ')) {
    command = command.substring(8);
  } else if (command.startsWith('delete ')) {
    command = command.substring(8);
  } else if (command.startsWith('get ')) {
    command = command.substring(4);
  }

  command = command.trim();

  // Validating Parameters
  if (command.startsWith('get ')) {
    return checkAndExtractKey(command.substring(4));
  } else if (command.startsWith('delete ')) {
    return checkAndExtractKey(command.substring(8));
  }
}

function checkAndExtractKey(command: string): string | never {
  // When key is wrapped is "" quotes
  if (command[0] === '"' && command.at(-1) === '"') {
    if (getCharFrequency(command, '"') === 2) {
      return removeFirstAndLastChar(command);
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }
  // When key is wrapped is '' quotes
  else if (command === "'" && command.at(-1) === '"') {
    if (getCharFrequency(command, '"') === 2) {
      return removeFirstAndLastChar(command);
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }
  // When key is not wrapped in "" or ''
  else {
    if (command.split(' ').length > 1) {
      throw new Error(ErrorMessages.InvalidCommand);
    } else {
      return command;
    }
  }
}

function getCharFrequency(command: string, target: string): number {
  let count: number = 0;

  for (let char of command) {
    if (char === target) {
      count += 1;
    }
  }

  return count;
}

function removeFirstAndLastChar(inputString: string): string {
  return inputString.substring(1, inputString.length - 1);
}
