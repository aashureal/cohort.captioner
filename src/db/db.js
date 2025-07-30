const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connect to Database");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectToDatabase;
