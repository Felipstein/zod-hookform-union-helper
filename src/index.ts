type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type Flatten<T> = {
  [P in keyof T]: T[P];
};

export type UnifiedErrors<T> = Flatten<UnionToIntersection<T>>;

export function unifyErrors<T>(errors: T): UnifiedErrors<T> {
  return errors as UnifiedErrors<T>;
}
