import { Parser } from '../Parser';
import { ErrorMessages } from '../enums/enums';

describe('Insert Command Test Cases', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });
  it("should handle keys with multiple spaces without any errors with 'insert' command", () => {
    const command = 'Rabi   insert   keyA            valueA';
    expect(parser.checkCommand(command)).toEqual(['insert', 'keyA', 'valueA']);
  });

  it("should handle keys with spaces without any errors with 'insert' command", () => {
    const command = 'Rabi insert "key with spaces" "value with spaces"';
    expect(parser.checkCommand(command)).toEqual([
      'insert',
      'key with spaces',
      'value with spaces',
    ]);
  });

  it("should validate a valid 'insert' command with 'Rabi' prefix and supported operation", () => {
    const command = 'Rabi insert key value';
    expect(() => parser.checkCommand(command)).not.toThrow();
  });

  it("should extract key from a valid 'insert' command", () => {
    const command = 'Rabi insert key value';
    expect(parser.checkCommand(command)).toEqual(['insert', 'key', 'value']);
  });

  it("should extract key from a valid 'insert' command using double quotes", () => {
    const command = 'Rabi insert "key3" "value3"';
    expect(parser.checkCommand(command)).toEqual(['insert', 'key3', 'value3']);
  });

  it("should handle empty key and value in 'insert' command", () => {
    const command = 'Rabi insert "" ""';
    expect(() => parser.checkCommand(command)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should handle spaces in key and value in 'insert' command", () => {
    const command = 'Rabi insert " " " "';
    expect(() => parser.checkCommand(command)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should handle empty key and value in 'insert' command using single quotes", () => {
    const command = "Rabi insert '' ''";
    expect(() => parser.checkCommand(command)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should handle spaces in key and value in 'insert' command using single quotes", () => {
    const command = "Rabi insert ' ' ' '";
    expect(() => parser.checkCommand(command)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should throw error if there quote inconsistency using 'insert' command", () => {
    const commandA = "Rabi insert 'key2' 'value2";
    const commandB = 'Rabi insert "key2" "value2';
    const commandC = "Rabi insert key2' 'value2'";
    const commandD = 'Rabi insert key2" "value2"';
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
  });

  it("should extract key from a valid 'insert' command using single quotes", () => {
    const command = "Rabi insert 'key2' 'value2'";
    expect(parser.checkCommand(command)).toEqual(['insert', 'key2', 'value2']);
  });
});
