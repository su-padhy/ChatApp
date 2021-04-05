module.exports = mongoose => {
    const Company = mongoose.model(
      "company",
      mongoose.Schema(
        {
          compid: Number,         
          name: String,          
          email: String
          
        },
        { timestamps: true }
      )
    );
  
    return Company;
  };