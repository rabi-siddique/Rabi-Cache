import { createInterface } from 'readline';
import { CommandExecutor } from './src/CommandExecutor';
import { Cache } from './src/Cache';

const executor = new CommandExecutor(Cache.getInstance());

const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\x1b[32mYou're in Rabi Cache Terminal\x1b[0m");
function getCommandLineInput() {
  cli.question('\x1b[32mRabi:>>$ \x1b[0m', (userInput) => {
    try {
      if (userInput.toLowerCase() === 'exit') {
        console.log('\x1b[33mExiting...\x1b[0m');
        cli.close();
      } else {
        executor.executeCommand(userInput);
        getCommandLineInput();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      getCommandLineInput();
    }
  });
}

getCommandLineInput();

// Accepting connections
// Timer to expire keys
// Cache Eviction Policies
