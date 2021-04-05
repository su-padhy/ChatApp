

const db = require('../db/model');


exports.findAll = async function (req, res) {
  
  const pageOptions = {
    page: parseInt(req.query._page, 10) || 0,
    limit: parseInt(req.query._limit, 10) || 10
}
  const channel = req.query.channel;

  var condition = channel ? { channel: { $regex: new RegExp(channel), $options: "i" } } : {};

   db.chats.find(condition)
   .skip(pageOptions.page * pageOptions.limit)
    .sort([['updatedAt', 'descending']])
    .limit(pageOptions.limit)
    .then(data => {
      res.send(data);
      //console.log(data);
      
    })
    .catch(err => {
      console.log(err);
    });

  }
  exports.createChat = (req, res) => {
    
     
      if (!req.body.message) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const newchat = new db.chats(
        {
             
          from:req.body.from,
          dest:req.body.dest,  
          message: req.body.message,
          messagetype:req.body.messagetype,
          channel: req.body.channel
    
          
          
          
      
      });
  
      newchat.save(function (err, tut) {
          if (err) return console.error(err);
          
        });

     console.log("connected to the database");
     res.send("A new chat is created");
    
    

}

exports.findOne = (req, res) => {
  const id = req.params.id;

  db.chats.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  db.chats.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
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

  db.chats.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update user with id=${id}. Maybe user was not found!"
        });
      } else res.send({ message: "user is updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });

 
};