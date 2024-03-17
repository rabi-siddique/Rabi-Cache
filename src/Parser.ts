import { ErrorMessages, Operations } from './enums/enums';

export class Parser {
  public validateAndParseCommand(
    command: string
  ): [string, string] | [string, string, string] | never {
    command = command.trim();

    if (!command.startsWith('Rabi ')) {
      throw new Error(ErrorMessages.NoRabi);
    }

    command = command.substring(4).trim();

    let operation: string;
    let keyAndValues: [string, string] | [string];

    switch (true) {
      case command.startsWith('insert'):
        operation = Operations.INSERT;
        keyAndValues = this.checkAndExtractKeyAndValue(
          command.substring(7).trim()
        );
        break;
      case command.startsWith('update '):
        operation = Operations.UPDATE;
        keyAndValues = this.checkAndExtractKeyAndValue(
          command.substring(7).trim()
        );
        break;
      case command.startsWith('delete '):
        operation = Operations.DELETE;
        keyAndValues = this.checkAndExtractKey(command.substring(7).trim());
        break;
      case command.startsWith('get '):
        operation = Operations.GET;
        keyAndValues = this.checkAndExtractKey(command.substring(4).trim());
        break;
      case command.startsWith('show'):
        if (command.split(' ').length > 1) {
          throw new Error(ErrorMessages.InvalidCommand);
        }
        operation = Operations.SHOW;
        keyAndValues = [''];
        break;
      default:
        throw new Error(ErrorMessages.InvalidCommand);
    }

    return [operation, ...keyAndValues];
  }
  private checkAndExtractKey(command: string): [string] | never {
    const firstChar = command[0];
    const lastChar = command.at(-1);
    const isDoubleQuotes = firstChar === '"' && lastChar === '"';
    const isSingleQuotes = firstChar === "'" && lastChar === "'";

    if (isDoubleQuotes || isSingleQuotes) {
      const target = isDoubleQuotes ? '"' : "'";
      if (this.getCharFrequency(command, target) === 2) {
        const [key] = [this.removeFirstAndLastChar(command)];
        if (key.trim().length === 0) {
          throw new Error(ErrorMessages.InvalidCommand);
        }
        return [key];
      } else {
        throw new Error(ErrorMessages.InvalidCommand);
      }
    }

    const splittedCommand = command
      .trim()
      .split(' ')
      .filter((part) => part !== '');
    const isValidCommand = splittedCommand.length === 1;

    if (!isValidCommand) {
      throw new Error(ErrorMessages.InvalidCommand);
    }

    return [command];
  }

  private checkAndExtractKeyAndValue(
    command: string
  ): [string, string] | never {
    const firstChar = command[0];
    const lastChar = command.at(-1);
    const isDoubleQuotes = firstChar === '"' && lastChar === '"';
    const isSingleQuotes = firstChar === "'" && lastChar === "'";

    if (isSingleQuotes || isDoubleQuotes) {
      const target = isDoubleQuotes ? '"' : "'";

      if (this.getCharFrequency(command, target) === 4) {
        const splitIndex = this.findSplitIndex(command, target);
        const [key, value] = this.getKeyAndValue(splitIndex, command);
        if (key.trim().length === 0 || value.trim().length === 0) {
          throw new Error(ErrorMessages.InvalidCommand);
        }
        return [key, value];
      } else {
        throw new Error(ErrorMessages.InvalidCommand);
      }
    }

    if (
      (firstChar === '"' && lastChar !== '"') ||
      (firstChar === "'" && lastChar !== "'") ||
      (firstChar !== '"' && lastChar === '"') ||
      (firstChar !== "'" && lastChar === "'")
    ) {
      throw new Error(ErrorMessages.InvalidCommand);
    }

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

  private findSplitIndex(command: string, match: string): number {
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

  private getKeyAndValue(
    splitIndex: number,
    command: string
  ): [string, string] {
    const key = this.removeFirstAndLastChar(
      command.substring(0, splitIndex).trim()
    );
    const value = this.removeFirstAndLastChar(
      command.substring(splitIndex).trim()
    );
    return [key, value];
  }

  private getCharFrequency(command: string, target: string): number {
    let count: number = 0;

    for (let char of command) {
      if (char === target) {
        count += 1;
      }
    }

    return count;
  }

  private removeFirstAndLastChar(inputString: string): string {
    return inputString.substring(1, inputString.length - 1);
  }
}
