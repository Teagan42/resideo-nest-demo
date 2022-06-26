export interface StringConstraints {
  minLength: number;
  maxLength: number;
  minSymbols: number;
  minDigits: number;
  allowedSymbols: string;
}

export interface Config {
  password: StringConstraints;
  username: StringConstraints;
}

export const CoreConfig: Config = {
  password: {
    minLength: 5,
    maxLength: 20,
    minSymbols: 1,
    minDigits: 1,
    allowedSymbols: "@#$%^&*_-=+",
  },
  username: {
    minLength: 5,
    maxLength: 20,
    minSymbols: 0,
    minDigits: 0,
    allowedSymbols: "@._"
  }
}
