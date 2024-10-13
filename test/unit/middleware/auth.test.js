require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../../../middleware/auth");

describe("Authentication Middleware", () => {
  it("should call next() for a valid token", () => {
    const user = { id: "123" };
    const token = jwt.sign(user, process.env.TOKEN_SECRET);
    const req = {
      header: jest.fn().mockReturnValue(`Bearer ${token}`),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toMatchObject(user);
  });

  it("should return 401 for missing token", () => {
    const req = {
      header: jest.fn().mockReturnValue(null),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Access Denied" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 for invalid token", () => {
    const req = {
      header: jest.fn().mockReturnValue("Bearer invalidtoken"),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid Token" });
    expect(next).not.toHaveBeenCalled();
  });
});
