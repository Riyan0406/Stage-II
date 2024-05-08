import * as Joi from "joi";
import { join } from "path";

export const register = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
    .message(
      "Password must be at least 8 character long and contain at at least one lowercase latter, one uppercase latter, and one number"
    ),
});

export const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const update = Joi.object({
  bio: Joi.string().allow(""),
  fullname: Joi.string().required(),
  profilePicture: Joi.string().allow(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
    .message(
      "Password must be at least 8 character long and contain at at least one lowercase latter, one uppercase latter, and one number"
    ),
});
