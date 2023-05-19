const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

const productAttributes = ['id', 'product_name', 'price', 'stock'];
const categoryAttributes = ['category_name'];
const tagAttributes = ['tag_name'];

const sendError = (res, err, statusCode = 500) => {
  console.error(err);
  res.status(statusCode).json(err);
};

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: productAttributes,
      include: [
        {
          model: Category,
          attributes: categoryAttributes,
        },
        {
          model: Tag,
          as: 'tags', // Specify the alias for the association
          attributes: tagAttributes,
        },
      ],
    });
    res.json(products);
  } catch (err) {
    sendError(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: productAttributes,
      include: [
        {
          model: Category,
          attributes: categoryAttributes,
        },
        {
          model: Tag,
          as: 'tags', // Specify the alias for the association
          attributes: tagAttributes,
        },
      ],
    });
    if (!product)
      return res.status(404).json({ message: 'No product found with this id' });
    res.json(product);
  } catch (err) {
    sendError(res, err);
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      const productTags = await ProductTag.bulkCreate(productTagIdArr);
      return res.json(productTags);
    }
    res.json(product);
  } catch (err) {
    sendError(res, err, 400);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    res.json(updatedProductTags);
  } catch (err) {
    sendError(res, err, 400);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.destroy({ where: { id: req.params.id } });
    if (!product)
      return res.status(404).json({ message: 'No product found with this id' });
    res.json(product);
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = router;