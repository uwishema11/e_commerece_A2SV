import Joi from 'joi';

export const userSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().uppercase().valid('ADMIN', 'USER', 'SUPERADMIN'),
  image_url: Joi.string().uri().optional(),
  password: Joi.string()
    .required()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .strict()
    .messages({
      'string.pattern.base':
        'Password must contain at least one letter, one number, and one special character.',
    }),

  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .messages({
      'any.only': 'Password and confirm_password must match.',
    }),
});

export const resetPasswordSchema = Joi.object().keys({
  password: Joi.string()
    .required()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .strict()
    .messages({
      message:
        'Password must contain at least one letter, one number, and one special character.',
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .messages({
      'any.only': 'Password and confirm_password must match.',
    }),
});
