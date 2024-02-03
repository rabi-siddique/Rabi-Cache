import { ErrorMessages } from '../enums/enums';
import { checkCommand } from '../utils/Validators';
describe('Delete Command Test Cases', () => {
  it("should handle keys with multiple spaces without any errors with 'delete' command", () => {
    const command = 'Rabi   delete   key';
    expect(checkCommand(command)).toEqual(['key']);
  });

  it("should handle keys with spaces without any errors with 'delete' command", () => {
    const command = 'Rabi delete "key with spaces"';
    expect(checkCommand(command)).toEqual(['key with spaces']);
  });
  it("should validate a valid 'delete' command with 'Rabi' prefix and supported operation", () => {
    const command = 'Rabi delete key';
    expect(() => checkCommand(command)).not.toThrow();
  });

  it("should extract key from a valid 'delete' command", () => {
    const command = 'Rabi delete key';
    expect(checkCommand(command)).toEqual(['key']);
  });

  it("should extract key from a valid 'delete' command using double quotes", () => {
    const command = 'Rabi delete "key"';
    expect(checkCommand(command)).toEqual(['key']);
  });

  it("should extract key from a valid 'delete' command using single quotes", () => {
    const command = "Rabi delete 'key'";
    expect(checkCommand(command)).toEqual(['key']);
  });

  it("should throw error when there are spaces in key param of 'delete' command", () => {
    const commandA = 'Rabi delete " "';
    const commandB = 'Rabi delete " " ';
    const commandC = 'Rabi delete " "            ';
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandC)).toThrow(ErrorMessages.InvalidCommand);
  });

  it("should throw error when there are spaces in key param of 'delete' command using single quotes", () => {
    const commandA = "Rabi delete ''";
    const commandB = "Rabi delete '' ";
    const commandC = "Rabi delete ''       ";
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandC)).toThrow(ErrorMessages.InvalidCommand);
  });

  it('should throw error when key is not provided', () => {
    const commandA = 'Rabi delete';
    const commandB = 'Rabi delete ';
    const commandC = 'Rabi delete       ';
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandC)).toThrow(ErrorMessages.InvalidCommand);
  });
});
