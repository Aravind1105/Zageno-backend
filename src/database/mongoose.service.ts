import mongoose, { ConnectOptions } from "mongoose";

class MongooseService {
  connect() {
    mongoose
      .connect("mongodb://localhost:27017/zageno-shopping-list", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      } as ConnectOptions)
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.error(`MongoDB connection failed.`, err);
      });
  }

  close() {
    mongoose.connection.close();
  }
}
export default new MongooseService();
