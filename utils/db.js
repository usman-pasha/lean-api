import mongoose from "mongoose";

const db = async (url) => {
  console.log(`Connecting to db`);
  try {
    const connection = await mongoose.connect(url);
    console.log(`Successfully connected to mongo db server!`);
    return connection;
  } catch (error) {
    throw new Error(
      "Mongodb connection failed plz check the connection string"
    );
  }
};

export default db;
