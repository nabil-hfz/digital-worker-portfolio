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
};

type GetParams = {
  path: string;
  requestHandler: RequestHandler;
};

type PutParams = {
  path: string;
  requestHandler: RequestHandler;
  fileFields?: any[];
};

type DeleteParams = {
  path: string;
  requestHandler: RequestHandler;
};


export interface Controller {
  initialize(httpServer: HttpServer): void;

}

export class HttpServer {
  constructor(public readonly express: Express) { }

  get(params: GetParams): void {
    this.express.get(
      params.path,
      this._catchErrorHandler(params.requestHandler)
    );
  }

  post(param: PostParams): void {

    this.express.post(
      param.path,
      upload.single('image'),
      this._catchErrorHandler(param.requestHandler)
    );

  }

  put(
    params: PutParams,
  ): void {
    this.express.put(
      params.path,
      upload.single('image'),
      this._catchErrorHandler(params.requestHandler)
    );
  }


  delete(
    params: DeleteParams,
  ): void {
    this.express.delete(
      params.path,
      this._catchErrorHandler(params.requestHandler)
    );
  }

  private readonly _catchErrorHandler = (
    requestHandler: RequestHandler,
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
    
      try {
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
        // console.error('Error happened ', e)
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
