import { Parser } from '../Parser';
import { ErrorMessages } from '../enums/enums';

describe('Update Command Test Cases', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });
  it("should handle keys with multiple spaces without any errors with 'update' command", () => {
    const command = 'Rabi   update   keyA            valueA';
    expect(parser.validateAndParseCommand(command)).toEqual([
      'update',
      'keyA',
      'valueA',
    ]);
  });

  it("should handle keys with spaces without any errors with 'update' command", () => {
    const command = 'Rabi update "key with spaces" "value with spaces"';
    expect(parser.validateAndParseCommand(command)).toEqual([
      'update',
      'key with spaces',
      'value with spaces',
    ]);
  });

  it("should validate a valid 'update' command with 'Rabi' prefix and supported operation", () => {
    const command = 'Rabi update key value';
    expect(() => parser.validateAndParseCommand(command)).not.toThrow();
  });

  it("should extract key from a valid 'update' command", () => {
    const command = 'Rabi update key value';
    expect(parser.validateAndParseCommand(command)).toEqual([
      'update',
      'key',
      'value',
    ]);
  });

  it("should handle empty key and value in 'update' command", () => {
    const command = 'Rabi update "" ""';
    expect(() => parser.validateAndParseCommand(command)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should handle spaces in key and value in 'update' command", () => {
    const command = 'Rabi update " " " "';
    expect(() => parser.validateAndParseCommand(command)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should handle empty key and value in 'update' command using single quotes", () => {
    const command = "Rabi update '' ''";
    expect(() => parser.validateAndParseCommand(command)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should handle spaces in key and value in 'update' command using single quotes", () => {
    const command = "Rabi update ' ' ' '";
    expect(() => parser.validateAndParseCommand(command)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should extract key from a valid 'update' command using double quotes", () => {
    const command = 'Rabi update "key3" "value3"';
    expect(parser.validateAndParseCommand(command)).toEqual([
      'update',
      'key3',
      'value3',
    ]);
  });

  it("should throw error if there quote inconsistency using 'update' command", () => {
    const commandA = "Rabi update 'key2' 'value2";
    const commandB = 'Rabi update "key2" "value2';
    const commandC = "Rabi update key2' 'value2'";
    const commandD = 'Rabi update key2" "value2"';
    expect(() => parser.validateAndParseCommand(commandA)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.validateAndParseCommand(commandB)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.validateAndParseCommand(commandC)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.validateAndParseCommand(commandD)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should extract key from a valid 'update' command using single quotes", () => {
    const command = "Rabi update 'key2' 'value2'";
    expect(parser.validateAndParseCommand(command)).toEqual([
      'update',
      'key2',
      'value2',
    ]);
  });
});
