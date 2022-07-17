import { Dimension } from './Dimension';

export const to_pixel = (dimension: number) => {
  return `${dimension}px`;
};

export const sort_number = <T extends number[]>(arr: T) =>
  arr.sort((a, b) => a - b) as T;

export const fitDimension = (object: Dimension, container: Dimension): Dimension => {
  // first assume that we follow the width;

  const resultingHeight = object.height * (container.width / object.width);

  if (resultingHeight < container.height)
    return { width: container.width, height: resultingHeight };
    
  else {
    return {
      width: object.width * (container.height / object.height),
      height: container.height,
    };
  }
};

/**
 * Assigned only defined values to destination object
 */

export function assignDefined<
  T extends { [key: string]: any },
  U extends { [key: string]: any }[]
>(target: T, ...sources: U) {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const val = source[key];
      if (val !== undefined) {
        target[key as keyof T] = val;
      }
    }
  }
  return target as T &
    {
      [K in keyof U]: { [P in keyof U[K]]: Exclude<U[K][P], undefined> };
    }[number];
}


export function toRGB(hex: String) {

  console.log( hex )
  const red = parseInt(hex.slice(1,3), 16)
  const green = parseInt(hex.slice(3,5), 16)
  const blue = parseInt(hex.slice(5,7), 16)

  return {
    red,
    green,
    blue
  }
}