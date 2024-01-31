import { ICache } from './Cache';
import { validateCommand } from '../decorators/Decorators';
import { ErrorMessages, Operations } from '../enums/enums';

export class CommandExecutor {
  private cache: ICache;
  constructor(cache: ICache) {
    this.cache = cache;
  }

  @validateCommand
  public executeCommand(command: string): void {
    const [keyword, operation, key, value] = command.split(' ');
    this.performOperation(operation, key, value);
  }

  private performOperation(
    operation: string,
    key: string,
    value?: string
  ): void {
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
        this.cache.get(key);
        break;
      }
      default: {
        throw new Error(ErrorMessages.InvalidOperation);
      }
    }
  }
}
