import { Parser } from '../Parser';
import { ErrorMessages } from '../enums/enums';

describe('Get Command Test Cases', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });
  it("should handle keys with multiple spaces without any errors with 'get' command", () => {
    const command = 'Rabi   get   key';
    expect(parser.checkCommand(command)).toEqual(['get', 'key']);
  });

  it("should handle keys with spaces without any errors with 'get' command", () => {
    const command = 'Rabi get "key with spaces"';
    expect(parser.checkCommand(command)).toEqual(['get', 'key with spaces']);
  });

  it("should validate a valid 'get' command with 'Rabi' prefix and supported operation", () => {
    const command = 'Rabi get key';
    expect(() => parser.checkCommand(command)).not.toThrow();
  });

  it("should extract key from a valid 'get' command", () => {
    const command = 'Rabi get key';
    expect(parser.checkCommand(command)).toEqual(['get', 'key']);
  });

  it("should extract key from a valid 'get' command using double quotes", () => {
    const command = 'Rabi get "key"';
    expect(parser.checkCommand(command)).toEqual(['get', 'key']);
  });

  it("should extract key from a valid 'get' command using single quotes", () => {
    const command = "Rabi get 'key'";
    expect(parser.checkCommand(command)).toEqual(['get', 'key']);
  });

  it("should throw error when there are spaces in key param of 'get' command", () => {
    const commandA = 'Rabi get " "';
    const commandB = 'Rabi get " " ';
    const commandC = 'Rabi get " "            ';
    const commandD = 'Rabi get "     "';
    const commandE = 'Rabi get "     " ';
    const commandF = 'Rabi get   "     "        ';
    expect(() => parser.checkCommand(commandA)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandB)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandC)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandD)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandE)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandF)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should throw error when there are spaces in key param of 'get' command using single quotes", () => {
    const commandA = "Rabi get ''";
    const commandB = "Rabi get '' ";
    const commandC = "Rabi get ''       ";
    const commandD = "Rabi get '     '";
    const commandE = "Rabi get '     ' ";
    const commandF = "Rabi get   '     '        ";
    expect(() => parser.checkCommand(commandA)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandB)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandC)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandD)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandE)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandF)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it('should throw error when key is not provided', () => {
    const commandA = 'Rabi get';
    const commandB = 'Rabi get ';
    const commandC = 'Rabi get       ';
    expect(() => parser.checkCommand(commandA)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandB)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandC)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });
});
