const Joi = require('joi');

function validateProduct(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    imageUrl: Joi.string().uri(),
  });
  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.description,
      imageUrl: req.file.path,
    };
    const { error } = schema.validate(product);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: 'Validation error' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Validation error' });
  }

  next();
}

module.exports = validateProduct;
