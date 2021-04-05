const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.channel = require("./channel.model.js")(mongoose);
db.chats= require("./chat.model.js")(mongoose);
db.user= require("./user.model.js")(mongoose);
db.company= require("./company.model.js")(mongoose);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

module.exports = db;