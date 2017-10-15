const express = require('express');
const File = require('../models/file');

const router = express.Router();

router.get('/', (req, res) => {
  File.find(req.query)
    .then(files => res.send(files));
});

router.get('/:id', (req, res) => {
  File.findById(req.params.id)
    .then(file => res.send(file));
});

router.post('/', (req, res) => {
  const file = new File(req.body);

  file.save()
    .then(result => res.send(result));
});

router.put('/:id', (req, res) => {
  File.findById(req.params.id)
    .then(file => file.update(req.body))
    .then(result => res.send(result));
});

router.delete('/:id', (req, res) => {
  File.findById(req.params.id)
    .then(file => file.remove())
    .then(result => res.send(result));
});

module.exports = router;
