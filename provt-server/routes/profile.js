const express = require('express');
const Profile = require('../models/profile');

const router = express.Router();

function profileFromParams(params) {
  return {
    _id: params.address,
    name: params.name,
    company: params.company,
    webiste: params.webiste,
    verified: params.verified,
  };
}

router.get('/', (req, res) => {
  Profile.find(req.query)
    .then(profiles => res.send(profiles));
});

router.get('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => res.send(profile));
});

router.post('/', (req, res) => {
  const profile = new Profile(profileFromParams(req.body));

  profile.save()
    .then(result => res.send(result));
});

router.put('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => profile.update(profileFromParams(req.body)))
    .then(result => res.send(result));
});

router.delete('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => profile.remove())
    .then(result => res.send(result));
});

module.exports = router;
