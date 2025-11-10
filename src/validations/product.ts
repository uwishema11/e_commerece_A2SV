import Joi from 'joi';

export const productSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  stock_quantity: Joi.number().required(),
  price: Joi.number().required(),
  category_name: Joi.string().required(),
  image_url: Joi.string(),
});
