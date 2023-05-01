const router = require("express").Router();
const userControlers = require("../../controlers/users");

const { validateBody, auth, upload } = require("../../middlewares");
const schema = require("../../schema/contacts");

// Register routes
router.post(
  "/register",
  validateBody(schema.authSchema),
  userControlers.register
);

// Login routes
router.post("/login", validateBody(schema.authSchema), userControlers.login);

// Logout routes
router.post("/logout", auth, userControlers.logout);

// Current routes
router.post("/current", auth, userControlers.current);

// Add avatar 
router.patch("/avatars", auth, upload.single("avatar"), userControlers.uploadAvatar)

module.exports = router;
