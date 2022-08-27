const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
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
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No tag found with this particular id' }); 
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
  Tag.create({
    tag_name: req.body.tag_name
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
        if (!categoryData[0]) {
            res.status(404).json({ message: 'No tag found with this particular id' });
            return;
        }
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
    if (!categoryData) {
        res.status(404).json({ message: 'No tag found with this particular id' });
        return;
    }
    res.json(categoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
});
});

module.exports = router;
