require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("../../../models/Project");

describe("Project Model", () => {
  beforeEach(async () => {
    await Project.deleteMany({});
  });

  it("should create & save project successfully", async () => {
    const validProject = new Project({
      name: "Test Project",
      description: "A test project description",
      category: "Technology",
      targetAmount: 10000,
      organizer: new mongoose.Types.ObjectId(),
    });
    const savedProject = await validProject.save();
    expect(savedProject._id).toBeDefined();
    expect(savedProject.name).toBe(validProject.name);
    expect(savedProject.description).toBe(validProject.description);
    expect(savedProject.category).toBe(validProject.category.toLowerCase());
    expect(savedProject.targetAmount).toBe(validProject.targetAmount);
    expect(savedProject.organizer).toEqual(validProject.organizer);
  });

  it("should fail to save project without required fields", async () => {
    const invalidProject = new Project({
      name: "Invalid Project",
    });
    let err;
    try {
      await invalidProject.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
    expect(err.errors.category).toBeDefined();
    expect(err.errors.targetAmount).toBeDefined();
    expect(err.errors.organizer).toBeDefined();
  });

  it("should fail to save project with invalid target amount", async () => {
    const invalidProject = new Project({
      name: "Invalid Project",
      description: "A test project description",
      category: "Technology",
      targetAmount: -1000,
      organizer: new mongoose.Types.ObjectId(),
    });
    let err;
    try {
      await invalidProject.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.targetAmount).toBeDefined();
  });

  it("should set default date when not provided", async () => {
    const project = new Project({
      name: "Test Project",
      description: "A test project description",
      category: "Technology",
      targetAmount: 10000,
      organizer: new mongoose.Types.ObjectId(),
    });
    const savedProject = await project.save();
    expect(savedProject.date).toBeDefined();
    expect(savedProject.date instanceof Date).toBe(true);
  });

  it("should convert category to lowercase", async () => {
    const project = new Project({
      name: "Test Project",
      description: "A test project description",
      category: "TECHNOLOGY",
      targetAmount: 10000,
      organizer: new mongoose.Types.ObjectId(),
    });
    const savedProject = await project.save();
    expect(savedProject.category).toBe("technology");
  });

  it("should fail to save project with category shorter than 2 characters", async () => {
    const invalidProject = new Project({
      name: "Invalid Project",
      description: "A test project description",
      category: "A",
      targetAmount: 10000,
      organizer: new mongoose.Types.ObjectId(),
    });
    let err;
    try {
      await invalidProject.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.category).toBeDefined();
  });

  it("should fail to save project with category longer than 50 characters", async () => {
    const invalidProject = new Project({
      name: "Invalid Project",
      description: "A test project description",
      category: "A".repeat(51),
      targetAmount: 10000,
      organizer: new mongoose.Types.ObjectId(),
    });
    let err;
    try {
      await invalidProject.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.category).toBeDefined();
  });
});
