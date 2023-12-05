import {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { ErrorResponseBody, HttpResponseError, } from "../utils/http-response-error";
import { logWarn } from "../utils/logger";
const multer = require('multer')
var path = require('path');



// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

type PostParams = {
  path: string;
  requestHandler: RequestHandler;
  fileFields?: any[];
  customClaims?: string[];
};

type GetParams = {
  path: string;
  requestHandler: RequestHandler;
  customClaims?: string[];
};

type PutParams = {
  path: string;
  requestHandler: RequestHandler;
  fileFields?: any[];
  customClaims?: string[];
};

type DeleteParams = {
  path: string;
  requestHandler: RequestHandler;
  customClaims?: string[];
};


export interface Controller {
  initialize(httpServer: HttpServer): void;

}

export class HttpServer {
  constructor(public readonly express: Express) { }

  get(params: GetParams): void {
    this.express.get(
      params.path,
      this._catchErrorHandler(params.requestHandler, params.customClaims)
    );
  }

  post(param: PostParams): void {

    this.express.post(
      param.path,
      upload.single('image'),
      this._catchErrorHandler(param.requestHandler, param.customClaims)
    );

  }

  put(
    params: PutParams,
  ): void {
    this.express.put(
      params.path,
      upload.single('image'),
      this._catchErrorHandler(params.requestHandler, params.customClaims)
    );
  }


  delete(
    params: DeleteParams,
  ): void {
    this.express.delete(
      params.path,
      this._catchErrorHandler(params.requestHandler, params.customClaims)
    );
  }

  private readonly _catchErrorHandler = (
    requestHandler: RequestHandler,
    customClaims?: string[]
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const checkCustomClaim = () => {
        if (customClaims?.length) {
          // assert(req.authenticated != null);
          // assert(req.auth != null);

          if (!req.authenticated) {
            throw new HttpResponseError(
              403,
              "FORBIDDEN",
              "You should be authenticated on a Firebase Auth account that have this/these custom claims: " +
              customClaims
            );
          }
          for (const claim of customClaims) {
            if ((req.auth!.customClaims ?? {})[claim]) {
              return;
            }
          }
          throw new HttpResponseError(
            403,
            "FORBIDDEN",
            `Only ${customClaims.toString().replace(/,/g, ", ")} can access`
          );
        }
      };
      try {
        checkCustomClaim.toString();
        // checkCustomClaim();
        // noinspection ES6RedundantAwait
        await Promise.resolve(requestHandler(req, res, next));
      } catch (e: any) {
        const userInfo = !req.auth?.uid?.length ? "" : ` uid: ${req.auth.uid}`;

        if (e instanceof HttpResponseError) {
          logWarn(
            `[${req.method.toUpperCase()}] ${req.path}${userInfo} - ${e.internalLog
            }`
          );
          res.statusCode = e.status;
          res.send(
            new ErrorResponseBody({
              status: e.status,
              code: e.code,
              description: e.description,
            })
          );
          // next();
          return;
        }
        console.error('Error happened ', e)
        // logError(`[${req.method.toUpperCase()}] ${req.path}${userInfo}`);
        // logError(e.stack);
        // logError.toString();
        res.statusCode = 500;
        res.send(
          new ErrorResponseBody({
            status: 500,
            code: "INTERNAL_ERROR",
            description: "An internal error occurred, please contact support " + e,
          })
        );
        return;
        next();
      }
    };
  };
}
