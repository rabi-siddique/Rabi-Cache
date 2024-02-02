import { ErrorMessages } from '../enums/enums';
import { checkCommand } from '../utils/Validators';
describe('Checking Commands', () => {
  it("should throw error valid 'get' command with case sensitive 'Rabi' prefix", () => {
    const command = 'rabi get key';
    expect(() => checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'insert' command with case sensitive 'Rabi' prefix", () => {
    const command = 'rabi insert key';
    expect(() => checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'update' command with case sensitive 'Rabi' prefix", () => {
    const command = 'rabi update key';
    expect(() => checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'delete' command with case sensitive 'Rabi' prefix", () => {
    const command = 'rabi delete key';
    expect(() => checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'get' command with incorrect prefix", () => {
    const command = 'InvalidPrefix get key';
    expect(() => checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'insert' command with incorrect prefix", () => {
    const command = 'InvalidPrefix insert key';
    expect(() => checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'update' command with incorrect prefix", () => {
    const command = 'InvalidPrefix update key';
    expect(() => checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  it("should throw error valid 'delete' command with incorrect prefix", () => {
    const command = 'InvalidPrefix delete key';
    expect(() => checkCommand(command)).toThrow(ErrorMessages.NoRabi);
  });

  //
  it("should throw error for valid 'get' command with missing key", () => {
    const commandA = 'Rabi get ';
    const commandB = 'Rabi get';
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
  });

  it("should throw error for valid 'insert' command with missing key and value", () => {
    const commandA = 'Rabi insert ';
    const commandB = 'Rabi insert';
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
  });

  it("should throw error for valid 'update' command with missing key and value", () => {
    const commandA = 'Rabi update ';
    const commandB = 'Rabi update';
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
  });

  it("should throw error for valid 'delete' command with missing key", () => {
    const commandA = 'Rabi delete ';
    const commandB = 'Rabi delete';
    expect(() => checkCommand(commandA)).toThrow(ErrorMessages.InvalidCommand);
    expect(() => checkCommand(commandB)).toThrow(ErrorMessages.InvalidCommand);
  });

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
});
