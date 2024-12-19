import User from "../models/User";
import bcrypt from "bcrypt";
import { getUserIdFromToken } from "../config/jwtProvider";

export const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      throw new Error(`User With The Same Email ID ${email} Already Exists!`);
    }

    password = await bcrypt.hash(password, 8);

    const user = await User.create({ firstName, lastName, email, password });

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    // .populate("address");

    if (!user) {
      throw new Error(`No User Found With ${userId} ID!`);
    }

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw Error(`No User Found With ${email} Email!`);
    }

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserProfileByToken = async (token) => {
  try {
    const userId = getUserIdFromToken(token);

    const user = await User.findById(userId);

    if (!user) {
      throw Error(`No User Found With ${userId} ID!`);
    }

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const findAllUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (e) {
    throw new Error(e.message);
  }
};
