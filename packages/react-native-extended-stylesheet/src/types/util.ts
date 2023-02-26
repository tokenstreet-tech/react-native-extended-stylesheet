export type TypesafeExtract<T extends U, U> = T extends U ? T : never;
