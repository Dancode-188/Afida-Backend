require("dotenv").config();
const mongoose = require("mongoose");
const Contribution = require("../../../models/Contribution");

describe("Contribution Model", () => {

  beforeEach(async () => {
    await Contribution.deleteMany({});
  });

  it("should create & save contribution successfully", async () => {
    const validContribution = new Contribution({
      donor: new mongoose.Types.ObjectId(),
      project: new mongoose.Types.ObjectId(),
      amount: 100,
    });
    const savedContribution = await validContribution.save();
    expect(savedContribution._id).toBeDefined();
    expect(savedContribution.amount).toBe(validContribution.amount);
    expect(savedContribution.donor).toEqual(validContribution.donor);
    expect(savedContribution.project).toEqual(validContribution.project);
  });

  it("should fail to save contribution with invalid amount", async () => {
    const invalidContribution = new Contribution({
      donor: new mongoose.Types.ObjectId(),
      project: new mongoose.Types.ObjectId(),
      amount: -100,
    });
    let err;
    try {
      await invalidContribution.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.amount).toBeDefined();
  });

  it("should fail to save contribution without required fields", async () => {
    const invalidContribution = new Contribution({
      amount: 100,
    });
    let err;
    try {
      await invalidContribution.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.donor).toBeDefined();
    expect(err.errors.project).toBeDefined();
  });

  it("should set default date when not provided", async () => {
    const contribution = new Contribution({
      donor: new mongoose.Types.ObjectId(),
      project: new mongoose.Types.ObjectId(),
      amount: 100,
    });
    const savedContribution = await contribution.save();
    expect(savedContribution.date).toBeDefined();
    expect(savedContribution.date instanceof Date).toBe(true);
  });

  it("should fail to save contribution with amount of zero", async () => {
    const invalidContribution = new Contribution({
      donor: new mongoose.Types.ObjectId(),
      project: new mongoose.Types.ObjectId(),
      amount: 0,
    });
    let err;
    try {
      await invalidContribution.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.amount).toBeDefined();
  });
});
