import { IEntryResumedRes } from './responses/entry-resumed-res';
import { Controller, HttpServer } from "../index";
import { NextFunction, Request, RequestHandler } from "express";




import { CreateEntryReqBody } from './requests/create-entry/create-entry-req-body';
import { checkIfIsValidCreateEntryReqBody } from './requests/create-entry/create-entry-validation';

import { HttpResponseError } from "../../utils/http-response-error";
import { EntriesListResumedRes } from "./responses/entry-list-resumed-res";
import { entryRepository } from "../../repository/entry/entry-repository";
import { buildImageUrl } from '../../utils/url-builders';

export class EntryController implements Controller {

  url = `/portfolio`;

  initialize(httpServer: HttpServer): void {
    httpServer.post({
      path: this.url,
      requestHandler: this.createEntry.bind(this),
    },);

    httpServer.get({
      path: `${this.url}`,
      requestHandler: this.getEntriesList.bind(this),

    },);

    httpServer.get({
      path: `${this.url}/:id`,
      requestHandler: this.getEntryById.bind(this),

    },);
    httpServer.put({
      path: `${this.url}/:id`,
      requestHandler: this.updateEntryById.bind(this),

    });

    httpServer.delete({
      path: `${this.url}/:id`,
      requestHandler: this.deleteEntryById.bind(this),

    });
  }

  private readonly createEntry: RequestHandler = async (req: any, res, next) => {

    const reqBody: CreateEntryReqBody = Object.assign({}, req.body);

    checkIfIsValidCreateEntryReqBody(reqBody);




    const imageUrl = buildImageUrl(req, req.file.filename)

    const newEntry = await entryRepository.createEntry(reqBody, imageUrl);


    res.status(200).send({
      message: 'Entry was created successfully',
      data: newEntry,
    });
    next();
  };


  private readonly getEntriesList: RequestHandler = async (req, res, next) => {

    const visiblity = req.query.visiblity ?? true;
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;

    const select = { title: 1, customerLink: 1, isVisible: 1, imageUrl: 1 }
    const entries = await entryRepository.findDocuments({}, select, page, limit);

    const responseList: IEntryResumedRes[] = entries.map(
      (entry) => {
        const { id, title, imageUrl, isVisible, customerLink, ...rest } = entry;
        return { id, title, imageUrl, isVisible, customerLink } as IEntryResumedRes;
      }
    );

    res.send(new EntriesListResumedRes(responseList));
    next();
  };

  private readonly getEntryById: RequestHandler = async (req, res, next) => {
    return this.handleGetEntryById(
      req,
      res,
      next);
  };

  private async handleGetEntryById(
    req: Request,
    res: any,
    next: NextFunction,

  ) {
    let id = req.params.id;
    if (!id?.length) {
      throw new HttpResponseError(
        400,
        "BAD_REQUEST",
        "Please, inform an id on the route"
      );
    }


    // const getEntryByIdCached = req.cacheOf(
    //   "entryId_param",
    //   entryRepository.getEntryById
    // );
    const entry = await entryRepository.getEntryById(id);

    if (entry == null) {
      throw new HttpResponseError(
        404,
        "NOT_FOUND",
        "Entry ID " + id + " not found"
      );
    }
    res.send(entry);
    next();
  }

  private readonly updateEntryById: RequestHandler = async (req: any, res, next) => {

    const reqBody: CreateEntryReqBody = Object.assign({}, req.body);

    checkIfIsValidCreateEntryReqBody(reqBody);

    let id = req.params.id;
    if (!id?.length) {
      throw new HttpResponseError(
        400,
        "BAD_REQUEST",
        "Please, inform an id on the route"
      );
    }

    const entry = await entryRepository.getEntryById(id);

    if (entry == null) {
      throw new HttpResponseError(
        404,
        "NOT_FOUND",
        "Entry ID " + id + " not found"
      );
    }



    entry.title = reqBody.title;
    entry.description = reqBody.description;
    if (reqBody.isVisible != null)
      entry.isVisible = reqBody.isVisible;

    entry.customerLink = reqBody.customerLink;

    if (req.file.filename && req.file.filename.length) {
      const imageUrl = buildImageUrl(req, req.file.filename);
      entry.imageUrl = imageUrl;
    }



    const updatedEntry = await entryRepository.updateDocument(id, entry);



    res.status(200).send({
      message: 'Entry was updated successfully',
      data: updatedEntry,
    });
    next();
  };
  private readonly deleteEntryById: RequestHandler = async (req: any, res, next) => {

    let id = req.params.id;
    if (!id?.length) {
      throw new HttpResponseError(
        400,
        "BAD_REQUEST",
        "Please, inform an id on the route"
      );
    }

    let entry = await entryRepository.getEntryById(id);

    if (entry == null) {
      throw new HttpResponseError(
        404,
        "NOT_FOUND",
        "Entry ID " + id + " not found"
      );
    }

    entry = await entryRepository.deleteDocument(id);


    res.status(200).send({
      message: 'Entry was deleted successfully',
      data: entry,
    });
    next();
  };
}


