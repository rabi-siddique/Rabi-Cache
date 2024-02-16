import { CommandExecutor } from './Executor.js';
import { Cache } from './Cache.js';
import { CommandLineInterface } from './CommandLineInterface.js';
import { Worker } from 'worker_threads';

const executor = new CommandExecutor(Cache.getInstance());
const cmd = new CommandLineInterface(executor);
cmd.startCommandLine();

// Running the server on a seperate thread
const worker = new Worker('./dist/src/Server.js', {
  workerData: { executor },
});

worker.on('error', (err) => {
  console.error('Error in worker thread:', err);
});
