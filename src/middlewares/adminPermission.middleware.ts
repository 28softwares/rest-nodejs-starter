import { Role } from '../constants/appConstant';
import { AdminPermission } from '../entities/admin/Admin.entity';
import express from 'express';

const verifyAdminPermissions = (permission: AdminPermission) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (
      !req.user &&
      !(req.user.role === Role.ADMIN || req.user.role === Role.SUPER_ADMIN)
    ) {
      return res.status(403).json({
        message: 'Permission not Allowed',
        data: null,
      });
    }

    //allowed all actions to SUPERADMIN
    if (req.user.role === Role.SUPER_ADMIN) {
      return next();
    }

    console.log('req.user.permissions', req.user.permissions);
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        message: `${permission} is not allowed to this admin, Contact your superadmin for permission`,
        data: null,
      });
    }
    return next();
  };
};

export default verifyAdminPermissions;
