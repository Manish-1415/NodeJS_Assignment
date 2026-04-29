import mongoose from "mongoose";

const connectServerWithDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);

        console.log("DB Connected Successfully ⚙️ ⚙️ ⚙️");

        console.log(`DB Name :- ${conn.connection.name}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
        throw error;
    }
}

export default connectServerWithDB;