import { CreateEntryReqBody } from '../../controllers/entry-controller/requests/create-entry/create-entry-req-body';
import EntryFullResModel, { IEntryFullRes } from '../../controllers/entry-controller/responses/entry-full-res';

import { Repository } from "../repository";

import { Model } from 'mongoose';


export class EntryRepository extends Repository<IEntryFullRes> {
  constructor(model: Model<IEntryFullRes>) {
    super(model);
  }

  async createEntry(request: CreateEntryReqBody, imageUrl: string)
    : Promise<IEntryFullRes> {

    let data = {
      title: request.title,
      description: request.description,
      isVisible: request.isVisible ?? true,
      customerLink: request.customerLink,
      imageUrl: imageUrl,
      createdDate: new Date(),

    } as IEntryFullRes;

    return this.createDocument(data);
  }

  async getEntryById(EntryId: string): Promise<IEntryFullRes | null> {
    return this.getDocument(EntryId);
  }

}

export const entryRepository = new EntryRepository(EntryFullResModel);
