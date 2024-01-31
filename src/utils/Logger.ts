function getCurrentTimestamp(): string {
  const now = new Date();
  return now.toISOString();
}

export function errorMessageLogger(message: string): void {
  console.error(`\x1b[1m\x1b[31mError: ${message}\x1b[0m`);
}

export function logWithTimestamp(message: string): void {
  const timestampStr = getCurrentTimestamp();
  console.log(`[${timestampStr}] ${message}`);
}

export function successMessageLogger(message: string): void {
  console.log(`\x1b[1m\x1b[33m${message}\x1b[0m`);
}

export function cliStartLogger() {
  console.log("\x1b[1m\x1b[32m\x1b[42mYou're in Rabi Cache Terminal\x1b[0m");
}

export function exitCliLogger() {
  console.log('\x1b[1m\x1b[33mExiting...\x1b[0m');
}
