"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const starlink_1 = require("../controllers/starlink");
const router = (0, express_1.Router)();
router.get('/', starlink_1.getData);
router.get('/:id', starlink_1.getStarlink);
router.post('/', starlink_1.postData);
exports.default = router;
//# sourceMappingURL=starlink.js.map