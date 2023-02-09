import express from "express";
import { body } from "express-validator";

import jwtMiddleware from "../auth/middleware/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import permissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";
import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middleware/users.middleware";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(UsersController.listUsers)
      .post(
        body("email").isEmail(),
        body("password")
          .isLength({ min: 5 })
          .withMessage("Must include password (5+ characters)"),
        body("firstName").isString(),
        body("lastName").isString(),
        body("username").isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app.get(`/users/:userId`, [
      UsersMiddleware.validateUserExists,
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      UsersController.getUserById,
    ]);

    this.app.param(`userIds`, UsersMiddleware.extractUserIds);
    this.app.delete(`/users/:userIds`, [
      UsersMiddleware.validateUsersExists,
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      UsersController.removeUsers,
    ]);

    this.app.put(`/users/:userId`, [
      body("email").isEmail(),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Must include password (5+ characters)"),
      body("firstName").isString(),
      body("lastName").isString(),
      body("username").isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      UsersController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      body("email").isEmail().optional(),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be 5+ characters")
        .optional(),
      body("firstName").isString().optional(),
      body("lastName").isString().optional(),
      body("username").isString().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      UsersController.patch,
    ]);

    this.app.put(`/users/:userId/permissionFlags/:permissionFlags`, [
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      UsersController.updatePermissionFlags,
    ]);

    return this.app;
  }
}
