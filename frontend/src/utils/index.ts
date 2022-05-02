export const to_pixel = (dimension: number) => {
  return `${dimension}px`;
};

export const sort_number = <T extends number [] > (arr: T) => arr.sort((a, b) => a - b) as T ;
