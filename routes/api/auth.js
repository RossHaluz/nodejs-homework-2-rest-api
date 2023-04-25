const router = require("express").Router();
const userControlers = require("../../controlers/users");

const { validateBody } = require("../../middlewares");
const schema = require("../../schema/contacts");

// Register routes
router.post(
  "/register",
  validateBody(schema.authSchema),
  userControlers.register
);

// Login routes
router.post("/login", validateBody(schema.authSchema), userControlers.login);

module.exports = router;
