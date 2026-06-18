const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Handle both regular MongoDB and MongoDB Atlas URIs
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/cims";

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    // For development, disable SSL verification if needed
    if (mongoURI.includes("mongodb+srv")) {
      options.tls = true;
      options.tlsInsecure = true; // For development only
    }

    const conn = await mongoose.connect(mongoURI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);

    // Try localhost as fallback
    if (
      process.env.MONGODB_URI &&
      process.env.MONGODB_URI.includes("mongodb+srv")
    ) {
      console.log("Attempting to connect to local MongoDB instead...");
      try {
        const localConn = await mongoose.connect(
          "mongodb://localhost:27017/cims",
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },
        );
        console.log("✅ Connected to local MongoDB");
        return localConn;
      } catch (localError) {
        console.error("❌ Local MongoDB also unavailable");
      }
    }

    console.log(
      "⚠️  Continuing without database. API will return errors for database operations.",
    );
    return null;
  }
};

module.exports = connectDB;

