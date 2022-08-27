const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', (req, res) => {
  Category.findAll({
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(categoryData => res.json(categoryData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'Category was not found using that ID' });
      return;
    }
    res.json(categoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData[0]) {
      res.status(404).json({ message: 'Category was not found using that ID' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
        res.status(404).json({ message: 'Category was not found using that ID' });
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;