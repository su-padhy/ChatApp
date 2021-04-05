module.exports = mongoose => {
    const Channel = mongoose.model(
      "Channel",
      mongoose.Schema(
        {
            
          title:String,
          users: String, 
          type: String,
          orgid:String
          
          
        },
        { timestamps: true }
      )
    );
  
    return Channel;
  };