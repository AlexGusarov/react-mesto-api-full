const { celebrate, Joi } = require('celebrate');
const userValidator = require('validator');
const { httpRegex } = require('../constants');

const validateCreatingCard = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .custom((value) => {
          if (userValidator.isURL(value)) {
            return value;
          }
        }),
    }),
});

const validateCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
});

const validateUserAuth = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(httpRegex),
    }),
});

const validateUserLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
});

const validateUserUpdate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
});

const validateUserID = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string().length(24).hex().required(),
    }),
});

const validateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().custom((value) => {
        if (userValidator.isURL(value)) {
          return value;
        }
      }),
    }),
});

module.exports = {
  validateCreatingCard,
  validateCardId,
  validateUserAuth,
  validateUserLogin,
  validateUserUpdate,
  validateUserID,
  validateAvatar,
};
