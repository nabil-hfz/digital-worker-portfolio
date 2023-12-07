import mongoose, { Schema, Document } from 'mongoose';
import { Nullable } from "../../../utils/types";

export interface IEntryFullRes extends Document {
  title: string;
  description: Nullable<string>;
  customerLink: string;
  isVisible: boolean;
  imageUrl: string;
  createdDate: Date;
}


const entryFullResSchema = new Schema({
  title: { type: String, required: true },
  customerLink: { type: String, required: true },
  isVisible: { type: Boolean, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: false },
  createdDate: { type: Date, required: true },
});

// Transform _id to id in toJSON
entryFullResSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toHexString();  
    delete ret._id;
    delete ret.__v;  
  },
  virtuals: true,  
});

const EntryFullResModel = mongoose.model<IEntryFullRes>('EntryFullRes', entryFullResSchema);

export default EntryFullResModel;
