/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MediaController } from './../controllers/media/media.controller';
import type {
  Request as ExRequest,
  Response as ExResponse,
  RequestHandler,
  Router,
} from 'express';
const multer = require('multer');

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  MediaType: {
    dataType: 'refEnum',
    enums: [
      'PROFILE_IMAGE',
      'PRODUCT_IMAGE',
      'CAROUSEL_IMAGE',
      'STORE_LOGO',
      'BLOG_THUMBNAIL',
    ],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserLoginType: {
    dataType: 'refEnum',
    enums: ['TRADITIONAL', 'GOOOGLE'],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserDetail: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      deletedAt: { dataType: 'datetime', required: true },
      user: { ref: 'User', required: true },
      address: { dataType: 'string', required: true },
      profileImage: { ref: 'Media', required: true },
      avatar: { dataType: 'string' },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TokenEnum: {
    dataType: 'refEnum',
    enums: ['REFRESH_TOKEN'],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  User: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      deletedAt: { dataType: 'datetime', required: true },
      fullName: { dataType: 'string', required: true },
      email: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true },
      phone: { dataType: 'string' },
      isVerified: { dataType: 'boolean', required: true },
      loginType: { ref: 'UserLoginType', required: true },
      userDetails: { ref: 'UserDetail', required: true },
      token: { ref: 'Token', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AdminPermission: {
    dataType: 'refEnum',
    enums: ['CAROUSEL', 'PRODUCT', 'USERS', 'ORDERS', 'LOGS'],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Role: {
    dataType: 'refEnum',
    enums: ['ADMIN', 'USER', 'SUPER_ADMIN', 'NONE'],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Token: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      deletedAt: { dataType: 'datetime', required: true },
      token: { dataType: 'string', required: true },
      type: { ref: 'TokenEnum', required: true },
      user: { ref: 'User', required: true },
      admin: { ref: 'Admin', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  LogAction: {
    dataType: 'refEnum',
    enums: [
      'ADD_CAROUSEL',
      'UPDATE_CAROUSEL',
      'DELETE_CAROUSEL',
      'ADD_PRODUCT',
      'UPDATE_PRODUCT',
      'DELETE_PRODUCT',
      'ADD_CATEGORY',
      'UPDATE_CATEGORY',
      'DELETE_CATEGORY',
    ],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Admin: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      deletedAt: { dataType: 'datetime', required: true },
      name: { dataType: 'string', required: true },
      email: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true },
      permissions: {
        dataType: 'array',
        array: { dataType: 'refEnum', ref: 'AdminPermission' },
        required: true,
      },
      phoneNumber: { dataType: 'string', required: true },
      isActive: { dataType: 'boolean', required: true },
      role: { ref: 'Role', required: true },
      token: { ref: 'Token', required: true },
      logs: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'Log' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Log: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      deletedAt: { dataType: 'datetime', required: true },
      action: { ref: 'LogAction', required: true },
      actionBy: { ref: 'Admin', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Media: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      deletedAt: { dataType: 'datetime', required: true },
      mimeType: { dataType: 'string', required: true },
      fileName: { dataType: 'string', required: true },
      fileType: { ref: 'MediaType', required: true },
      path: {
        dataType: 'union',
        subSchemas: [{ dataType: 'string' }, { dataType: 'undefined' }],
        required: true,
      },
      isThumbnail: { dataType: 'boolean', required: true },
      userDetail: { ref: 'UserDetail', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: 'throw-on-extras',
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(
  app: Router,
  opts?: { multer?: ReturnType<typeof multer> },
) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const upload = opts?.multer || multer({ limits: { fileSize: 8388608 } });

  app.post(
    '/user',
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.registerUser),

    async function UserController_registerUser(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: 'registerUser',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/media',
    upload.fields([
      {
        name: 'file',
        maxCount: 1,
      },
    ]),
    ...fetchMiddlewares<RequestHandler>(MediaController),
    ...fetchMiddlewares<RequestHandler>(MediaController.prototype.upload),

    async function MediaController_upload(
      request: ExRequest,
      response: ExResponse,
      next: any,
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        file: {
          in: 'formData',
          name: 'file',
          required: true,
          dataType: 'file',
        },
        mediaType: {
          in: 'formData',
          name: 'mediaType',
          required: true,
          dataType: 'string',
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new MediaController();

        await templateService.apiHandler({
          methodName: 'upload',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
