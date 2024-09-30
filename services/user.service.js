import { User } from "../models/user.model.js";

export const createrecord = async (object) => {
  const record = await User.create(object);
  return record;
};

export const findOneRecord = async (conditions, select) => {
  const record = await User.findOne(conditions).select(select);
  return record;
};

export const findAllRecord = async (conditions, select) => {
  const record = await User.find(conditions).select(select);
  return record;
};

export const updateRecord = async (condition, body) => {
  const option = { new: true };
  const record = await User.findOneAndUpdate(condition, body, option);
  return record;
};
