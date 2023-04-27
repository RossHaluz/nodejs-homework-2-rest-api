const express = require("express");
const ctrl = require("../../controlers/contacts");

const { validateBody } = require("../../middlewares");
const { auth } = require("../../middlewares");
const schema = require("../../schema/contacts");

const router = express.Router();

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", auth, ctrl.getById);

router.post("/", auth, validateBody(schema.addSchema), ctrl.add);

router.put(
  "/:contactId",
  auth,
  validateBody(schema.addPutSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  auth,
  validateBody(schema.addPatchSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", auth, ctrl.removeById);

module.exports = router;
