export const enum ErrorMessages {
  KeyNotPresent = 'Invalid key. Key is not present in the cache',
  KeyEmpty = 'Invalid key. Key cannot be an empty string or null/undefined',
  NoRabi = `Invalid Command. Make sure to start your command with 'Rabi'`,
  InvalidCommand = 'Invalid Command. Please type a command supported by our system',
  InvalidOperation = 'Invalid Operation. Allowed operations are insert, get, delete and update.',
}

export const enum SuccessMessages {
  Insertion = 'Insertion Successful in the cache',
  Get = 'Key Retrieval Successful',
  Deletion = 'Key Deletion Successful',
  Update = 'Key Update Successful',
}

export const enum Operations {
  INSERT = 'insert',
  GET = 'get',
  DELETE = 'delete',
  UPDATE = 'update',
}

export const CACHE_KEYWORD = 'Rabi';
