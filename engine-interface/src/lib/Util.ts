import { Bounds, Cell } from '..';
import { sort_number } from '../utils';

/**
 *
 * Checks if a given cell is within the given bounds
 *
 * @param cell
 * @param Bounds
 */
export const isWithinBounds = (
  [row, column]: Cell,
  { left, right, top, bottom }: Bounds
) => {
  return left <= column && column <= right && top <= row && row <= bottom;
};

/**
 * Create adequate bound object from unsorted boundaries array.
 *
 * @param raw_boundaries
 * @returns
 */
export const createBounds = ([vertical, horizontal]: [
  vertical: [number, number],
  horizontal: [number, number]
]) => {
  const [v_low, v_high] = sort_number(vertical);
  const [h_low, h_high] = sort_number(horizontal);

  return {
    horizontal_low: h_low,
    horizontal_high: h_high,

    vertical_low: v_low,
    vertical_high: v_high,
  };
};
