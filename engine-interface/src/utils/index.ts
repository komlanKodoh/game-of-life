/**
 * Returns the next index in a string where the target string is found
 *
 * @param str string that should be processed
 * @param target the character whose index you desire
 * @param start index from which we should start processing
 */
export const next_occurrence = (str: string, target: string, start: number) => {
  for (let i = start; i < str.length; i++) {
    if (str[i] === target) {
      return i;
    }
  }

  return null;
};

/**
 * Transform a number value to a pixel string value
 */
export const to_pixel = (measure: number) => `${measure}px`;

/**
 * Sorts an array of numbers;
 */
export const sort_number = <T extends number[]>(arr: T) =>
  arr.sort((a, b) => a - b) as T;
