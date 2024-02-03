import { Parser } from '../Parser';
import { ErrorMessages } from '../enums/enums';

describe('Delete Command Test Cases', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });
  it("should handle keys with multiple spaces without any errors with 'delete' command", () => {
    const command = 'Rabi   delete   key';
    expect(parser.checkCommand(command)).toEqual(['delete', 'key']);
  });

  it("should handle keys with spaces without any errors with 'delete' command", () => {
    const command = 'Rabi delete "key with spaces"';
    expect(parser.checkCommand(command)).toEqual(['delete', 'key with spaces']);
  });
  it("should validate a valid 'delete' command with 'Rabi' prefix and supported operation", () => {
    const command = 'Rabi delete key';
    expect(() => parser.checkCommand(command)).not.toThrow();
  });

  it("should extract key from a valid 'delete' command", () => {
    const command = 'Rabi delete key';
    expect(parser.checkCommand(command)).toEqual(['delete', 'key']);
  });

  it("should extract key from a valid 'delete' command using double quotes", () => {
    const command = 'Rabi delete "key"';
    expect(parser.checkCommand(command)).toEqual(['delete', 'key']);
  });

  it("should extract key from a valid 'delete' command using single quotes", () => {
    const command = "Rabi delete 'key'";
    expect(parser.checkCommand(command)).toEqual(['delete', 'key']);
  });

  it("should throw error when there are spaces in key param of 'delete' command", () => {
    const commandA = 'Rabi delete " "';
    const commandB = 'Rabi delete " " ';
    const commandC = 'Rabi delete " "            ';
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

  it("should throw error when there are spaces in key param of 'delete' command using single quotes", () => {
    const commandA = "Rabi delete ''";
    const commandB = "Rabi delete '' ";
    const commandC = "Rabi delete ''       ";
    const commandD = 'Rabi delete "     "';
    const commandE = 'Rabi delete "     " ';
    const commandF = 'Rabi delete   "     "        ';
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
    const commandA = 'Rabi delete';
    const commandB = 'Rabi delete ';
    const commandC = 'Rabi delete       ';
    const commandD = "Rabi delete '     '";
    const commandE = "Rabi delete '     ' ";
    const commandF = "Rabi delete   '     '        ";
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
});
