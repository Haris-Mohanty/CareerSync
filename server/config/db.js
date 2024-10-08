import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Connected to MongoDb Database ${mongoose.connection.host}.`.bgBrightGreen
        .black
    );
  } catch (err) {
    console.log(`MongoDb Database Error ${err}.`.bgBrightRed.white);
    process.exit(1);
  }
};

export default connectDb;
