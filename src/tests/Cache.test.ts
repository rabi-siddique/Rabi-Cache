import { ErrorMessages } from '../enums/enums.js';
import { ICache } from '../Cache.js';
import { Cache } from '../Cache.js';
describe('Caching Data', () => {
  let cache: ICache;

  beforeEach(() => {
    cache = Cache.getInstance();
  });
  it('should instantiate Cache', () => {
    expect(cache).toBeInstanceOf(Cache);
  });

  it('should return the same instance for subsequent calls', () => {
    const anotherCache = Cache.getInstance();
    expect(anotherCache).toBe(cache);
  });

  // Behaviors of Insert
  it('should insert a key-value pair and get it by its value', () => {
    cache.insert('Rabi', 'Siddique');
    expect(cache.get('Rabi')).toBe('Siddique');
  });
  it('should throw an error when inserting an empty key', () => {
    const cache = Cache.getInstance();
    expect(() => cache.insert('', 'Siddique')).toThrow(ErrorMessages.KeyEmpty);
  });

  // Behaviors of Update

  it('should update the value of an existing key in the cache', () => {
    cache.insert('Game', 'On');
    cache.update('Game', 'Well Played');
    expect(cache.get('Game')).toEqual('Well Played');
  });

  it('should throw an error when updating an empty key', () => {
    expect(() => {
      cache.update('', 'Well Played');
    }).toThrow(ErrorMessages.KeyEmpty);
  });

  it('should throw an error when trying to update a non-existent key', () => {
    expect(() => {
      cache.update('NonExistentKeyA', 'Well Played');
    }).toThrow(ErrorMessages.KeyNotPresent);
  });

  // Behaviors of Delete

  it('should remove the key from the cache when deleting an existing key', () => {
    cache.insert('keyToDelete', 'value');
    cache.delete('keyToDelete');
    expect(() => cache.get('keyToDelete')).toThrow(ErrorMessages.KeyNotPresent);
  });

  it('should throw an error when deleting an empty key', () => {
    expect(() => {
      cache.delete('');
    }).toThrow(ErrorMessages.KeyEmpty);
  });

  it('should throw an error when trying to delete a non-existent key', () => {
    expect(() => {
      cache.delete('NonExistentKeyB');
    }).toThrow(ErrorMessages.KeyNotPresent);
  });

  // Behaviors of Get
  it('should throw an error when trying to retrieve a non-existent key', () => {
    expect(() => cache.get('NonExistentKeyC')).toThrow(
      ErrorMessages.KeyNotPresent
    );
  });
  it('should throw an error when getting an empty key', () => {
    expect(() => {
      cache.get('');
    }).toThrow(ErrorMessages.KeyEmpty);
  });
});
