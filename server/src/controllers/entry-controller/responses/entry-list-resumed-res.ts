import { IEntryResumedRes } from "./entry-resumed-res";

export class EntriesListResumedRes {
  constructor(public readonly entries: IEntryResumedRes[]) {}
}
