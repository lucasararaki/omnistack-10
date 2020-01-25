const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

async function index(req, res) {
  const devs = await Dev.find();
  
  res.json(devs);
}

async function store(req, res) {
  const { github_username, techs, lat, lng } = req.body;

  let dev = await Dev.findOne({ github_username });

  const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

  const { name = login, avatar_url, bio } = apiResponse.data;

  const techsArray = parseStringAsArray(techs);

  const location = {
    type: 'Point',
    coordinates: [ lat, lng ]
  }
  
  dev = await Dev.create({
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location
  });

  return res.json({
    dev
  });
}

module.exports = {
  index,
  store
};
