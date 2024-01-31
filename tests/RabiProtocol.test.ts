import { validateCommand, validateKey } from '../decorators/Decorators';
import { ErrorMessages } from '../enums/enums';
import { RabiCache } from '../src/Cache';
describe('Protocol Validation', () => {
  it('should not throw error when the insert command is complete and valid', () => {
    const target = {};
    const key = 'testKey';
    const descriptor = {
      value: jest.fn(),
    };

    const validateCommandFn = validateCommand(target, key, descriptor).value;
    expect(() => validateCommandFn('Rabi insert key value')).not.toThrow(
      ErrorMessages.InvalidCommand
    );
  });
  it('should throw error when the insert command is incomplete or invalid', () => {
    const target = {};
    const key = 'testKey';
    const descriptor = {
      value: jest.fn(),
    };

    const validateCommandFn = validateCommand(target, key, descriptor).value;
    expect(() => validateCommandFn('Rabi insert testKey')).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => validateCommandFn('Rabi insert')).toThrow(
      ErrorMessages.InvalidCommand
    );
    expect(() => validateCommandFn('rabi insert')).toThrow(
      ErrorMessages.NoRabi
    );
    expect(() => validateCommandFn('rabi insert key value')).toThrow(
      ErrorMessages.NoRabi
    );

    expect(() => validateCommandFn('rabi insert "key www" value')).toThrow(
      ErrorMessages.NoRabi
    );
    expect(() => validateCommandFn('Rabi deebee key value')).toThrow(
      ErrorMessages.InvalidOperation
    );
  });

  it('should throw error when the key contains an empty string or null/undefined', () => {
    const cache: RabiCache = {
      key1: 'value1',
      key2: 'value2',
    };

    const target = {};
    const key = 'get';
    const descriptor = {
      value: jest.fn(),
    };

    const validateKeyFn = validateKey(cache);
    const modifiedDescriptor = validateKeyFn(target, key, descriptor);

    expect(modifiedDescriptor.value).toBe(descriptor.value);

    expect(() => modifiedDescriptor.value('')).toThrow(ErrorMessages.KeyEmpty);
    expect(() => modifiedDescriptor.value('""')).toThrow(
      ErrorMessages.KeyEmpty
    );
    expect(() => modifiedDescriptor.value('null')).toThrow(
      ErrorMessages.KeyEmpty
    );
    expect(() => modifiedDescriptor.value('undefined')).toThrow(
      ErrorMessages.KeyEmpty
    );
  });
});
