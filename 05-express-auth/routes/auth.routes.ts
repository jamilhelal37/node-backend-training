import {
    register,
    login,
    profile, adminOnly
} from "../controllers/auth.controller.js";
import {
    Role
} from "../models/user.js";

import {
    authMiddleware
} from "../middleware/auth.middleware.js";
import express from "express";
import {requireRoles} from "../middleware/role.middleware.js";
const router = express.Router();


router.post(
    "/register",
    register
);

router.post(
    "/login",
    login
);

router.get(
    "/profile",
    authMiddleware,
    profile
);
router.get(
    "/admin",
    authMiddleware,
    requireRoles(Role.ADMIN),
    adminOnly
);

export default router;