import { Interface, createInterface } from 'readline';
import { ICommandExecutor } from './Executor';
import { cliStartLogger, errorMessageLogger, exitCliLogger } from './utils/Logger';
import { Parser } from './Parser';

export class CommandLineInterface {
  private executor: ICommandExecutor;
  private cli: Interface;
  constructor(executor: ICommandExecutor) {
    this.executor = executor;
    this.cli = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public startCommandLine(): void {
    cliStartLogger();
    this.getCommandLineInput();
  }

  public getCommandLineInput(): void {
    this.cli.question('\x1b[1m\x1b[32mRabi:>>$ \x1b[0m', (userInput) => {
      try {
        if (userInput.toLowerCase() === 'exit') {
          exitCliLogger();
          this.cli.close();
        } else {
          const parser = new Parser();
          const [operation, key, value] = parser.validateAndParseCommand(userInput);
          this.executor.performOperation(operation, key, value);
          this.getCommandLineInput();
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          errorMessageLogger(error.message);
        }
        this.getCommandLineInput();
      }
    });
  }
}
