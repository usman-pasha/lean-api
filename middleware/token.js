import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const { hashSync, compareSync } = bcryptjs;

export const signToken = (id, type) => {
  try {
    let validatity;
    let secretKey;
    switch (type) {
      case "access":
        validatity = "1d";
        secretKey = "usangghb";
        break;
      case "refresh":
        validatity = "7d";
        secretKey = "tdyuhdh";
        break;
      default:
        throw new Error("Invalid Token Type");
    }
    const token = jwt.sign({ id }, secretKey, {
      expiresIn: validatity,
      audience: "usman",
    });
    return token;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const hashPassword = (password) => {
  const record = hashSync(password, 10);
  return record;
};

export const compareHashPassword = (password, hashPassword) => {
  const record = compareSync(password, hashPassword);
  return record;
};
