export interface Dimension {
  width: number;
  height: number;
}

export const createDimension = (width: number, height: number): Dimension => ({
  width,
  height,
});
