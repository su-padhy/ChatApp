const express = require('express')
const router = express.Router();
const apichannels = require('./api.channels');
const apiusers = require('./api.users');
const apichats = require('./api.message')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

router.get('/', (req, res) => {
    res.send('👍');
});

router.get('/channels',jsonParser, apichannels.findAll)
      .get("/channels/:id", apichannels.findOne) 
      .post('/channels',jsonParser,apichannels.createChannel)
      .delete("/channels/:id", apichannels.delete)
      .put("/channels/:id", jsonParser,apichannels.update);

router.get('/users',jsonParser, apiusers.findAll)
      .get("/users/:id", apiusers.findOne) 
      .post('/users',jsonParser,apiusers.createUser)
      .delete("/users/:id", apiusers.delete)
      .put("/users/:id", jsonParser,apiusers.update);

router.get('/chats',jsonParser, apichats.findAll)
      .get("/chats/:id", apichats.findOne) 
      .post('/chats',jsonParser,apichats.createChat)
      .delete("/chats/:id", apichats.delete)
      .put("/chats/:id", jsonParser,apichats.update);

module.exports = router