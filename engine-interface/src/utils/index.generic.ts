
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