

const db = require('../db/model');


exports.findAll = (req, res) => {
        
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
       db.mongoose
        .connect(db.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
        
         console.log("connected to the database");

         let result= db.channel.find(condition).lean().sort([['updatedAt', 'ascending']]).exec(function (err, channels) {
          return res.json(channels);
         });

          
         
         console.log(result);

         //res.send(result);
        })
        .catch(err => {
          console.log("Cannot connect to the database!", err);
          process.exit();
        });

  }
  exports.createChannel = (req, res) => {
    db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
     
      if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const newchannel = new db.channel(
        {
          channelid: Math.floor(Math.random() * 1000) + 1,  
          title: req.body.title,
          users: req.body.users, 
          type: req.body.type,
          orgid:"1"
          
      
      });
  
      newchannel.save(function (err, tut) {
          if (err) return console.error(err);
          
        });

     console.log("connected to the database");
     res.send("A new channel is created");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

}

exports.findOne = (req, res) => {
  const id = req.params.id;

  db.channel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Channel with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Channel with id=" + id });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  db.channel.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Channel with id=${id}. Maybe Channel was not found!`
        });
      } else {
        res.send({
          message: "Channel was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Channel with id=" + id
      });
    });
};
exports.update = (req, res) => {


  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  db.channel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update channel with id=${id}. Maybe Channel was not found!"
        });
      } else res.send({ message: "channel is updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });

 
};