import {LogLevel} from "@nestjs/common";

export const LOGGER_CONTEXT = Symbol(
  'Logger Context injection token',
);

export const LOGGER_LEVELS = Symbol(
  'Logger levels injection token',
);

export const LoggerContextProvider = (context: string) => {
  return {
    provide: LOGGER_CONTEXT,
    useValue: context,
  };
};

export const LoggerLevelProvider = (levels: LogLevel[]) => {
  return {
    provide: LOGGER_LEVELS,
    useValue: levels,
  }
}
