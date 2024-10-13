require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../../models/User");
const bcrypt = require("bcryptjs");

describe("User Model", () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should create & save user successfully", async () => {
    const validUser = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      smartWalletAddress: "0x1234567890123456789012345678901234567890",
    });
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.smartWalletAddress).toBe(validUser.smartWalletAddress);
  });

  it("should fail to save user with missing required fields", async () => {
    const userWithoutRequiredField = new User({ name: "John Doe" });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
    expect(err.errors.smartWalletAddress).toBeDefined();
  });

  it("should fail to save user with invalid email format", async () => {
    const userWithInvalidEmail = new User({
      name: "John Doe",
      email: "invalid-email",
      password: "password123",
      smartWalletAddress: "0x1234567890123456789012345678901234567890",
    });
    let err;
    try {
      await userWithInvalidEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });

  it("should fail to save user with duplicate email", async () => {
    const user1 = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      smartWalletAddress: "0x1234567890123456789012345678901234567890",
    });
    await user1.save();

    const user2 = new User({
      name: "Jane Doe",
      email: "john@example.com",
      password: "password456",
      smartWalletAddress: "0x0987654321098765432109876543210987654321",
    });
    let err;
    try {
      await user2.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.code).toBe(11000); // MongoDB duplicate key error code
  });

  it("should hash password before saving", async () => {
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      smartWalletAddress: "0x1234567890123456789012345678901234567890",
    });
    const savedUser = await user.save();
    expect(savedUser.password).not.toBe("password123");
    const isMatch = await bcrypt.compare("password123", savedUser.password);
    expect(isMatch).toBe(true);
  });

  it("should set default date when not provided", async () => {
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      smartWalletAddress: "0x1234567890123456789012345678901234567890",
    });
    const savedUser = await user.save();
    expect(savedUser.date).toBeDefined();
    expect(savedUser.date instanceof Date).toBe(true);
  });
});
