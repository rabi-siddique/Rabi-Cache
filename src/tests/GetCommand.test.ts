import { ErrorMessages } from '../enums/enums';
import { checkCommand } from '../utils/Validators';
describe('Get Command Test Cases', () => {
  it("should handle keys with multiple spaces without any errors with 'get' command", () => {
    const command = 'Rabi   get   key';
    expect(checkCommand(command)).toEqual(['key']);
  });

  it("should handle keys with spaces without any errors with 'get' command", () => {
    const command = 'Rabi get "key with spaces"';
    expect(checkCommand(command)).toEqual(['key with spaces']);
  });

  it("should validate a valid 'get' command with 'Rabi' prefix and supported operation", () => {
    const command = 'Rabi get key';
    expect(() => checkCommand(command)).not.toThrow();
  });

  it("should extract key from a valid 'get' command", () => {
    const command = 'Rabi get key';
    expect(checkCommand(command)).toEqual(['key']);
  });

  it("should extract key from a valid 'get' command using double quotes", () => {
    const command = 'Rabi get "key"';
    expect(checkCommand(command)).toEqual(['key']);
  });

  it("should extract key from a valid 'get' command using single quotes", () => {
    const command = "Rabi get 'key'";
    expect(checkCommand(command)).toEqual(['key']);
  });

  it("should throw error when there are spaces in key param of 'get' command", () => {
    const commandA = 'Rabi get " "';
    const commandB = 'Rabi get " " ';
    const commandC = 'Rabi get " "            ';
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandC)).toThrow(ErrorMessages.InvalidCommand);
  });

  it("should throw error when there are spaces in key param of 'get' command using single quotes", () => {
    const commandA = "Rabi get ''";
    const commandB = "Rabi get '' ";
    const commandC = "Rabi get ''       ";
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandC)).toThrow(ErrorMessages.InvalidCommand);
  });

  it('should throw error when key is not provided', () => {
    const commandA = 'Rabi get';
    const commandB = 'Rabi get ';
    const commandC = 'Rabi get       ';
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandC)).toThrow(ErrorMessages.InvalidCommand);
  });
});
