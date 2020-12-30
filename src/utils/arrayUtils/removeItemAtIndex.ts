export const removeItemAtIndex = <T>(array: T[], index: number) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];
