function getCurrentTimestamp(): string {
  const now = new Date();
  return now.toISOString();
}

export function errorMessageLogger(message: string): void {
  console.error('\x1b[1m\x1b[31mError:\x1b[0m', message);
}

export function logWithTimestamp(message: string): void {
  const timestampStr = getCurrentTimestamp();
  console.log('\x1b[90m[' + timestampStr + ']\x1b[0m', message);
}

export function successMessageLogger(message: string): void {
  console.log('\x1b[1m\x1b[32mSuccess:\x1b[0m', message);
}

export function cliStartLogger(): void {
  console.log('\x1b[1m\x1b[32m\x1b[42mWelcome to Rabi Cache Terminal\x1b[0m');
}

export function exitCliLogger(): void {
  console.log('\x1b[1m\x1b[33mExiting...\x1b[0m');
}
