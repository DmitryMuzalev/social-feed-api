const toPositiveInt = (value: string | undefined, defaultValue: number) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : defaultValue;
};

export const config = {
  port: toPositiveInt(process.env.PORT, 3000),
  bcryptSaltRounds: toPositiveInt(process.env.BCRYPT_SALT_ROUNDS, 10),
};
