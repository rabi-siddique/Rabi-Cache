import { ErrorMessages } from '../enums/enums';

export function isValidOperation(value: string): boolean {
  const validOperations = ['insert', 'get', 'delete', 'update'];
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
    return ['', ''];
  } else if (command.startsWith('update')) {
    command = command.substring(7);
    return ['', ''];
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
  // When key is wrapped is "" quotes
  if (command[0] === '"' && command.at(-1) === '"') {
    if (getCharFrequency(command, '"') === 2) {
      return [removeFirstAndLastChar(command)];
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }
  // When key is wrapped is '' quotes
  else if (command[0] === "'" && command.at(-1) === "'") {
    if (getCharFrequency(command, "'") === 2) {
      return [removeFirstAndLastChar(command)];
    } else {
      throw new Error(ErrorMessages.InvalidCommand);
    }
  }
  // When key is not wrapped in "" or ''
  else {
    if (
      command.split(' ').length > 1 ||
      (command.split(' ').length === 1 && command.split(' ')[0] === '')
    ) {
      throw new Error(ErrorMessages.InvalidCommand);
    } else {
      return [command];
    }
  }
}

// function checkAndExtractKeyAndValue(command: string): string | never {
//   if (true) {
//   }
//   // When key and value is not wrapped in "" or ''
//   else {
//     if (
//       command.split(' ').length > 1 ||
//       (command.split(' ').length === 1 && command.split(' ')[0] === '')
//     ) {
//       throw new Error(ErrorMessages.InvalidCommand);
//     } else {
//       return command;
//     }
//   }
// }

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
