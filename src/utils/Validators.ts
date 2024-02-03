export function isValidOperation(value: string): boolean {
  const validOperations = ['insert', 'get', 'delete', 'update', 'show'];
  return validOperations.includes(value);
}
