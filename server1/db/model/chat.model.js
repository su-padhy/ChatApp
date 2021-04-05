module.exports = mongoose => {
    const Chat = mongoose.model(
      "Chat",
      mongoose.Schema(
        {
            
          from:String,
          dest:String,  
          message: String,
          messagetype:String,
          channel: String
        },
        { timestamps: true }
      )
    );
  
    return Chat;
  };