import bcrypt from "bcrypt";

export function hash(plain) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plain, salt);
}

export function comparePlainWithHash(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}
