require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../../../middleware/auth");

describe("Authentication Middleware", () => {
  it("should call next() for a valid token", () => {
    const user = { id: "123" };
    const token = jwt.sign(user, process.env.TOKEN_SECRET);
    const req = { header: jest.fn().mockReturnValue(token) };
    const res = {};
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toMatchObject(user);
  });
});
