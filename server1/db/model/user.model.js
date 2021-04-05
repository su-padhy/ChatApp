module.exports = mongoose => {
    const User = mongoose.model(
      "User",
      mongoose.Schema(
        {
          
          orgid: String,  
          firstname: String,
          lastname: String,
          email: String,
          usertype: String,
          photo: String,
          account: String,
          userid:String,
          password:String
         
        },
        { timestamps: true }
      )
    );
  
    return User;
  };