/**
 * Object type with the key of type **TKey** and value of **TValue**
 *
 *
 * ```ts
 * let obj : ObjectMap< string, AnyTypeYouWant >
 *
 * // this is the same as the object
 *
 * let obj : { [key: string] : AnyTypeYouWant }
 *
 * ```
 */
export type ObjectMap<TKey extends string | number | symbol, TValue> = {
  [key in TKey]: TValue;
};


/**
 * Delimit a region of the plane where the universe is rendered
 */
export type Bounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};