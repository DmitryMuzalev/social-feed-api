const toNumber = (value: string | undefined, defaultValue: number) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : defaultValue;
};

export const config = {
  bcryptSaltRounds: toNumber(process.env.BCRYPT_SALT_ROUNDS, 10),
};
