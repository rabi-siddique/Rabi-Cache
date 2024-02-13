import { ICache } from './Cache';
import { ErrorMessages, Operations } from './enums/enums';

export interface ICommandExecutor {
  performOperation(
    operation: string,
    key: string,
    value?: string
  ): void | unknown;
}

export class CommandExecutor implements ICommandExecutor {
  private cache: ICache;
  constructor(cache: ICache) {
    this.cache = cache;
  }

  public performOperation(
    operation: string,
    key: string,
    value?: string
  ): void | unknown {
    switch (operation) {
      case Operations.INSERT: {
        this.cache.insert(key, value);
        break;
      }
      case Operations.UPDATE: {
        this.cache.update(key, value);
        break;
      }
      case Operations.DELETE: {
        this.cache.delete(key);
        break;
      }
      case Operations.GET: {
        return this.cache.get(key);
      }
      case Operations.SHOW: {
        this.cache.show();
        break;
      }
      default: {
        throw new Error(ErrorMessages.InvalidOperation);
      }
    }
  }
}
