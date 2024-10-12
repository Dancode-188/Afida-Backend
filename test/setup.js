const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  const collections = Object.values(mongoose.connection.collections);
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});
