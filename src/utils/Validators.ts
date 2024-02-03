import { ErrorMessages } from '../enums/enums';

export function isValidOperation(value: string): boolean {
  const validOperations = ['insert', 'get', 'delete', 'update', 'show'];
  return validOperations.includes(value);
}

export function checkCommand(
  command: string
): [string] | [string, string] | never {
  command.trim();

  // Validating Rabi
  if (!command.startsWith('Rabi ')) {
    throw new Error(ErrorMessages.NoRabi);
  }

  command = command.substring(4).trim();

  // Validating Operation
  if (
    !(
      command.startsWith('insert') ||
      command.startsWith('update') ||
      command.startsWith('delete') ||
      command.startsWith('get')
    )
  ) {
    throw new Error(ErrorMessages.InvalidOperation);
  }

  if (command.startsWith('insert')) {
    command = command.substring(7);
    return checkAndExtractKeyAndValue(command.trim());
  } else if (command.startsWith('update')) {
    command = command.substring(7);
    return checkAndExtractKeyAndValue(command.trim());
  } else if (command.startsWith('delete')) {
    command = command.substring(7);
    return checkAndExtractKey(command.trim());
  } else if (command.startsWith('get')) {
    command = command.substring(4);
    return checkAndExtractKey(command.trim());
  } else {
    throw new Error(ErrorMessages.InvalidCommand);
  }
}

function checkAndExtractKey(command: string): [string] | never {
  // When key is wrapped in "" quotes
  if (command[0] === '"' && command.at(-1) === '"') {
    if (getCharFrequency(command, '"') === 2) {
      const [key] = [removeFirstAndLastChar(command)];
      if (key.trim().length === 0) {
        throw new Error(ErrorMessages.InvalidCommand);
      }
      return [key];
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }
  // When key is wrapped in '' quotes
  else if (command[0] === "'" && command.at(-1) === "'") {
    if (getCharFrequency(command, "'") === 2) {
      const [key] = [removeFirstAndLastChar(command)];
      if (key.trim().length === 0) {
        throw new Error(ErrorMessages.InvalidCommand);
      }
      return [key];
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }
  // When key is not wrapped in "" or ''
  else {
    const splittedCommand = command.split(' ').filter((part) => part !== '');
    const isMissingKeyParams =
      splittedCommand.length === 1 && splittedCommand[0] === '';
    const hasMoreThanOneParam = splittedCommand.length > 1;

    if (hasMoreThanOneParam || isMissingKeyParams) {
      throw new Error(ErrorMessages.InvalidCommand);
    } else {
      return [command];
    }
  }
}

function checkAndExtractKeyAndValue(command: string): [string, string] | never {
  // When key and value is wrapped in "" quotes
  if (command[0] === '"' && command.at(-1) === '"') {
    if (getCharFrequency(command, '"') === 4) {
      const splitIndex = findSplitIndex(command, '"');
      const [key, value] = getKeyAndValue(splitIndex, command);
      if (key.trim().length === 0 || value.trim().length === 0) {
        throw new Error(ErrorMessages.InvalidCommand);
      }
      return [key, value];
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }
  // When key and value is wrapped in '' quotes
  else if (command[0] === "'" && command.at(-1) === "'") {
    if (getCharFrequency(command, "'") === 4) {
      const splitIndex = findSplitIndex(command, "'");
      const [key, value] = getKeyAndValue(splitIndex, command);
      if (key.trim().length === 0 || value.trim().length === 0) {
        throw new Error(ErrorMessages.InvalidCommand);
      }
      return [key, value];
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }

  // When there is inconsistency in quotes
  else if (
    (command[0] === "'" && command.at(-1) !== "'") ||
    (command[0] === '"' && command.at(-1) !== '"') ||
    (command[0] !== "'" && command.at(-1) === "'") ||
    (command[0] !== '"' && command.at(-1) === '"')
  ) {
    throw new Error(ErrorMessages.InvalidCommand);
  }
  // When key and value is not wrapped in "" or ''
  else {
    const splittedCommand = command.split(' ').filter((part) => part !== '');
    const isMissingKeyAndValueParams =
      splittedCommand.length === 1 && splittedCommand[0] === '';
    const hasMoreThanTwoParams = splittedCommand.length > 2;
    const hasTwoParams = splittedCommand.length === 2;

    if (!hasMoreThanTwoParams && !isMissingKeyAndValueParams && hasTwoParams) {
      return [splittedCommand[0], splittedCommand[1]];
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }
}

function findSplitIndex(command: string, match: string): number {
  let count: number = 0;

  for (let i = 0; i < command.length; i++) {
    if (count === 2) {
      return i;
    }
    if (command[i] === match) {
      count += 1;
    }
  }

  return -1;
}

function getKeyAndValue(splitIndex: number, command: string): [string, string] {
  const key = removeFirstAndLastChar(command.substring(0, splitIndex).trim());
  const value = removeFirstAndLastChar(command.substring(splitIndex).trim());
  return [key, value];
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
