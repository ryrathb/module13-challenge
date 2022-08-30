const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
    .then(categoryData => {
      res.json(categoryData);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body
  })
  .then(categoryData => res.json(categoryData))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
  .then(categoryData => {
      res.json(categoryData);
  })
  .catch(error => {
      console.log(error); 
      res.status(500).json(error);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    res.json(categoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
});
});

module.exports = router;
