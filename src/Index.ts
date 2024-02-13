import { CommandExecutor } from './Executor';
import { Cache } from './Cache';
import { CommandLineInterface } from './CommandLineInterface';
import { Server } from './Server';

const executor = new CommandExecutor(Cache.getInstance());
const cmd = new CommandLineInterface(executor)
const server = new Server(executor)
cmd.startCommandLine();
server.start()
