const router = require('express').Router();
const { Category, Product } = require('../../models');

const productAttributes = ['id', 'product_name', 'price', 'stock', 'category_id'];

const sendError = (res, err) => {
  console.error(err);
  res.status(500).json(err);
}

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: { model: Product, attributes: productAttributes } });
    if(!categories) return res.status(404).json({message: 'No categories found'});
    res.json(categories);
  } catch (err) {
    sendError(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id }, include: { model: Product, attributes: productAttributes } });
    if(!category) return res.status(404).json({message: 'No category found with this id'});
    res.json(category);
  } catch (err) {
    sendError(res, err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({ category_name: req.body.category_name });
    res.json(newCategory);
  } catch (err) {
    sendError(res, err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, { where: { id: req.params.id } });
    if(!updatedCategory) return res.status(404).json({message:'No category found with this id'});
    res.json(updatedCategory);
  } catch (err) {
    sendError(res, err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({ where: { id: req.params.id } });
    if (!deletedCategory) return res.status(404).json({message: 'No category found with that id.'});
    res.json(deletedCategory);
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = router;
