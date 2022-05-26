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
