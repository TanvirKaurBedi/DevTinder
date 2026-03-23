const mongoose = require("mongoose");

const connectDb = async () => {
  const str =
    "mongodb+srv://tanvirkaurbedi_db_user:Waheguru%40123@devtinder-cluster.nlljufe.mongodb.net/?appName=devtinder-cluster";
  await await mongoose.connect(str, {
    dbName: "devTinder",
  });
};

module.exports = connectDb;
