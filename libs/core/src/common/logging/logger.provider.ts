export const LOGGER_CONTEXT = Symbol(
  'Logger Context injection token',
);

export const LoggerProvider = (context: string) => {
  return {
    provide: LOGGER_CONTEXT,
    useValue: context,
  };
};
