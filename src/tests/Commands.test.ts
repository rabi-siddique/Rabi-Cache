import { Parser } from '../Parser';
import { ErrorMessages } from '../enums/enums';
describe('Checking Commands', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });
  it("should throw error valid 'get' command with case sensitive 'Rabi' prefix", () => {
    const command = 'rabi get key';
    expect(() => parser.checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'insert' command with case sensitive 'Rabi' prefix", () => {
    const command = 'rabi insert key';
    expect(() => parser.checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'update' command with case sensitive 'Rabi' prefix", () => {
    const command = 'rabi update key';
    expect(() => parser.checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'delete' command with case sensitive 'Rabi' prefix", () => {
    const command = 'rabi delete key';
    expect(() => parser.checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'get' command with incorrect prefix", () => {
    const command = 'InvalidPrefix get key';
    expect(() => parser.checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'insert' command with incorrect prefix", () => {
    const command = 'InvalidPrefix insert key';
    expect(() => parser.checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'update' command with incorrect prefix", () => {
    const command = 'InvalidPrefix update key';
    expect(() => parser.checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'delete' command with incorrect prefix", () => {
    const command = 'InvalidPrefix delete key';
    expect(() => parser.checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error for valid 'get' command with missing key", () => {
    const commandA = 'Rabi get ';
    const commandB = 'Rabi get';
    expect(() => parser.checkCommand(commandA)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandB)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should throw error for valid 'insert' command with missing key and value", () => {
    const commandA = 'Rabi insert ';
    const commandB = 'Rabi insert';
    expect(() => parser.checkCommand(commandA)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandB)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should throw error for valid 'update' command with missing key and value", () => {
    const commandA = 'Rabi update ';
    const commandB = 'Rabi update';
    expect(() => parser.checkCommand(commandA)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandB)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });

  it("should throw error for valid 'delete' command with missing key", () => {
    const commandA = 'Rabi delete ';
    const commandB = 'Rabi delete';
    expect(() => parser.checkCommand(commandA)).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => parser.checkCommand(commandB)).toThrow(
      ErrorMessages.InvalidCommand
    );
  });
});
