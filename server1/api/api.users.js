

const db = require('../db/model');


exports.findAll = (req, res) => {
        
  const firstname = req.query.firstname;
  var condition = firstname ? { firstname: { $regex: new RegExp(firstname), $options: "i" } } : {};
       db.mongoose
        .connect(db.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
        
         console.log("connected to the database");

         let result= db.user.find(condition).lean().sort([['updatedAt', 'descending']]).exec(function (err, users) {
          return res.json(users);
         });

          
         
         console.log(result);

         //res.send(result);
        })
        .catch(err => {
          console.log("Cannot connect to the database!", err);
          process.exit();
        });

  }
  exports.createUser = (req, res) => {
    db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
     
      if (!req.body.firstname) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const newuser = new db.user(
        {
            orgid: req.body.orgid,  
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            usertype: req.body.usertype,
            photo: req.body.photo,
            account: req.body.account,
            userid:req.body.userid,
            password:req.body.password
            
  
              
          
          
          
      
      });
  
      newuser.save(function (err, tut) {
          if (err) return console.error(err);
          
        });

     console.log("connected to the database");
     res.send("A new user is created");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

}

exports.findOne = (req, res) => {
  const id = req.params.id;

  db.user.findById(id)
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

  db.user.findByIdAndRemove(id)
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

  db.user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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