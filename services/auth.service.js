import * as userService from "./user.service.js";
import {
  signToken,
  hashPassword,
  compareHashPassword,
} from "../middleware/token.js";

export const register = async (body) => {
  if (!body.username || !body.email) {
    throw new Error("Required Paramaters");
  }
  const user = await userService.findOneRecord(
    {
      $or: [{ username: body.username }, { email: body.email }],
    },
    "-password"
  );
  if (user) throw new Error("User Email Or Username already exists");

  const payload = {};
  if (body.username) payload.username = body.username;
  if (body.email) payload.email = body.email;
  if (body.fullName) payload.fullName = body.fullName;
  if (body.password) {
    const password = hashPassword(body?.password);
    payload.password = password;
  }
  const createUser = await userService.createrecord(payload);
  const record = await userService.findOneRecord(
    { _id: createUser?._id },
    "-password"
  );
  return record;
};

// login
export const login = async (body) => {
  if (!body.email || !body.password)
    throw new Error("Required email and password");

  const user = await userService.findOneRecord({ email: body.email });
  if (!user) throw new Error("User Email Not Found!");

  const comparePass = compareHashPassword(body.password, user.password);
  if (comparePass !== true) throw new Error("Invalid Password ");

  const accessToken = signToken(user?._id, "access");
  const refreshToken = signToken(user?._id, "refresh");
  const object = {
    _id: user._id,
    username: user.username,
    email: user.email,
    status: user.status,
    accessToken,
    refreshToken,
  };
  return object;
};

// profile
export const userAllProfiles = async (loggedInUser) => {
  const condition = { _id: { $ne: loggedInUser } };
  console.log(condition);
  const user = await userService.findAllRecord(condition, "-password -__v");
  return user;
};
