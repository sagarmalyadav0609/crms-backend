
const express = require("express");
const router = express.Router();

const { AdminControllers } = require("../../controllers");
const { Middleware } = require("../../middlewares");

router.post(
  "/",

  AdminControllers.PlanController.createPlan
);

router.get(
  "/",
//   Middleware.AdminAuthMiddleware.authenticateAdmin,
  AdminControllers.PlanController.getAllPlans
);

router.get(
  "/:id",
//   Middleware.AdminAuthMiddleware.authenticateAdmin,
  AdminControllers.PlanController.getPlanById
);

router.patch(
  "/update/:id",
//   Middleware.AdminAuthMiddleware.authenticateAdmin,
  AdminControllers.PlanController.updatePlan
);

module.exports = router;
