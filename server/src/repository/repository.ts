import mongoose, { Document, Model } from 'mongoose';
import { InvalidDataException } from '../exceptions/data-excption';
import { uuid } from '../utils/types';




export abstract class Repository<T extends Document> {
  constructor(private model: Model<T>) { }

  // Get a single document by ID
  public async getDocument(documentId: uuid): Promise<T | null> {
    try {
      return await this.model.findById(documentId).exec();
    } catch (error) {
      // console.error(`Error getting document: ${documentId}`, error);
      throw new InvalidDataException({ error: error.message });
    }
  }


  // public async getDocuments(page: number = 1, limit: number = 10): Promise<T[]> {
  //   try {
  //     return await this.model.find()
  //       .skip((page - 1) * limit)
  //       .limit(limit)
  //       .exec();
  //   } catch (error) {
  //     console.error("Error getting documents", error);
  //     throw new InvalidDataException({ error: error.message });
  //   }
  // }


  public async createDocument(data: Partial<T>): Promise<T> {
    try {
      const doc = new this.model(data);
      return await doc.save() as T;
    } catch (error) {
      // console.error("Error creating document", error);
      throw new InvalidDataException({ error: error.message });
    }
  }


  public async updateDocument(documentId: uuid, updateData: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(documentId, updateData, { new: true }).exec();
    } catch (error) {
      // console.error(`Error updating document: ${documentId}`, error);
      throw new InvalidDataException({ error: error.message });
    }
  }

  // Delete a document
  // public async deleteDocument(documentId: uuid): Promise<T | null> {
  //   try {
  //     return await this.model.findByIdAndDelete(documentId).exec();
  //   } catch (error) {
  //     console.error(`Error deleting document: ${documentId}`, error);
  //     throw new InvalidDataException({ error: error.message });
  //   }
  // }
  public async deleteDocument(documentId: uuid): Promise<T | null> {
    try {
      const result = await this.model.findByIdAndDelete(documentId).exec();
      return result.value;
    } catch (error) {
      // console.error(`Error deleting document: ${documentId}`, error);
      throw new InvalidDataException({ error: error.message });
    }
  }


  public async findDocuments(filter: any, select?: any, page: number = 1, limit: number = 10): Promise<T[]> {
    try {
      return await this.model.find()
        // .find(filter)

        // .select(select ? { ...select } : {})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    } catch (error) {
      console.error("Error finding documents", error);
      throw new InvalidDataException({ error: error.message });
    }
  }
}
