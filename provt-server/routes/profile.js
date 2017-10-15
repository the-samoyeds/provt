const express = require('express');
const Profile = require('../models/profile');

const router = express.Router();

router.get('/', (req, res) => {
  Profile.find(req.query)
    .then(profiles => res.send(profiles));
});

router.get('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => res.send(profile));
});

router.post('/', (req, res) => {
  const profile = new Profile(req.body);

  profile.save()
    .then(result => res.send(result));
});

router.put('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => profile.update(req.body))
    .then(result => res.send(result));
});

router.delete('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => profile.remove())
    .then(result => res.send(result));
});

module.exports = router;
