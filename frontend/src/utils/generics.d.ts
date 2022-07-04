import { ActionReducer } from "@ngrx/store";

export type ToAppState< T extends { [key: string ]: ActionReducer < any, any> } > =  { [K in keyof T]: ExtractStateType < T[K] > } ; 


type ExtractStateType<T extends ActionReducer<any, any>> =
  T extends ActionReducer<infer StateType, any> ? StateType : null;

export  type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }