import { createInterface } from 'readline';
import { CommandExecutor } from './CommandExecutor';
import { Cache } from './Cache';

const executor = new CommandExecutor(Cache.getInstance());

const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getCommandLineInput() {
  cli.question('Rabo: >>$ ', (userInput) => {
    if (userInput.toLowerCase() === 'exit') {
      cli.close();
    } else {
      executor.executeCommand(userInput);
      getCommandLineInput();
    }
  });
}

getCommandLineInput();
