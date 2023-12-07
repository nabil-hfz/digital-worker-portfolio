
import { Nullable } from "../../../utils/types";
import mongoose, { Document, Model } from 'mongoose';


export interface IEntryResumedRes  {
  id: Nullable<string>;
  title: string;
  customerLink: string;
  isVisible: boolean;
  imageUrl: string;
}
