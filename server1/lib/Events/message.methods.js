const db = require('../../db/model');

exports.createMessage=(...args)=>
{
    console.log(args[0]);
    const newchat = new db.chats(args[0]);
  
      newchat.save(function (err, tut) {
          if (err) return console.error(err);
          
        });                    
    
}
exports.createUser=(...args)=>
{
    console.log(args[0]);
    const newchat = new db.chats(args[0]);
  
      newchat.save(function (err, tut) {
          if (err) return console.error(err);
          
        });                    
    
}