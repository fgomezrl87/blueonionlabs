"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const import_1 = require("../controllers/import");
const router = (0, express_1.Router)();
router.get('/', import_1.getData);
router.get('/:id', import_1.getStarlink);
router.post('/', import_1.postData);
exports.default = router;
//# sourceMappingURL=import.js.map