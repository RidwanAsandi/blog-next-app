import mongoose from "mongoose";

const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ridwanasandi09:TsP3zZAAkTSvWyLg@cluster0.t2ldlwe.mongodb.net/blog-app"
  );
  console.log("DB Connected");
};

export default ConnectDB;
