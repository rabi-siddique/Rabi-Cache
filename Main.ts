import { createInterface } from 'readline';
import { CommandExecutor } from './src/CommandExecutor';
import { Cache } from './src/Cache';
import {
  cliStartLogger,
  errorMessageLogger,
  exitCliLogger,
} from './utils/Logger';

const executor = new CommandExecutor(Cache.getInstance());

const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
});

cliStartLogger();
function getCommandLineInput() {
  cli.question('\x1b[1m\x1b[32mRabi:>>$ \x1b[0m', (userInput) => {
    try {
      if (userInput.toLowerCase() === 'exit') {
        exitCliLogger();
        cli.close();
      } else {
        executor.executeCommand(userInput);
        getCommandLineInput();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        errorMessageLogger(error.message);
      }
      getCommandLineInput();
    }
  });
}

getCommandLineInput();

// Accepting connections
// Timer to expire keys
// Cache Eviction Policies
// Allow key values to be in double quotes as well
