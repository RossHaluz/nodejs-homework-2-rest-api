const express = require("express");
const ctrl = require('../../controlers/contacts')

const {validateBody} = require('../../middlewares');
const schema = require('../../schema/contacts')

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.add);

router.put("/:contactId", validateBody(schema.addPutSchema),  ctrl.updateById);

router.delete("/:contactId", ctrl.removeById);

module.exports = router;
