type AnyFunction = (...args: any[]) => ReturnType<any>;
export function describeAndApply<Func extends AnyFunction>(
    fn: Func,
    description: (...args: Parameters<Func>) => string,
): ((...args: Parameters<Func>) => ReturnType<Func>) {
  return function(...args: Parameters<Func>): ReturnType<Func> {
    return fn.apply(
        this.describe(`${this.description || ''}\n  - ${description(...args)}`),
        args,
    );
  };
}