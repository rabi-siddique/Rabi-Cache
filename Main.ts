import { createInterface } from 'readline';
import { CommandExecutor } from './CommandExecutor';
import { Cache } from './Cache';

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
    } catch (error) {
      getCommandLineInput();
      console.error(error.message);
    }
  });
}

getCommandLineInput();

// Accepting connections
// Running prev command with arrow keys
// Timer to expire keys
