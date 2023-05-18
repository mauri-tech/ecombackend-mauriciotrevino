// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', // In case the associated category is deleted, the product will also be deleted
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', 
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tagged_products',
  foreignKey: 'product_id',
  onDelete: 'CASCADE', 
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'product_tags',
  foreignKey: 'tag_id',
  onDelete: 'CASCADE', 
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
