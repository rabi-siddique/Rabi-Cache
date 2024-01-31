export function isValidOperation(value: string): boolean {
  const validOperations = ['insert', 'get', 'delete', 'update'];
  return validOperations.includes(value);
}
