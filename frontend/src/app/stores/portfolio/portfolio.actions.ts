import { FilterPortfolioEntryModel, PortfolioEntryModel } from "../../models/portfolio-entry.model";


export namespace EntriesAction {
  export class GetFilteredEntries {
    static readonly type = "[Entriess] Get Filtered Entries";
    constructor() {}
  }

  export class GetMoreEntries {
    static readonly type = "[Entries] Get More Entries";
    constructor() {}
  }

  export class LoadOneAfterDelete{
    static readonly type = "[Entries] Load One After Delete";
    constructor() {}
  }

  export class GetAllEntries {
    static readonly type = "[Entriess] Get All Entries";
    constructor() {}
  }

  export class AddNewEntry {
    static readonly type = "[Entries] Add New Entries";
    constructor(public payload: PortfolioEntryModel) {}
  }

  export class EditEntry {
    static readonly type = "[Entries] Edit Entries";
    constructor(public payload: PortfolioEntryModel) {}
  }

  export class DeleteEntry {
    static readonly type = "[Entries] Delete Entries";
    constructor(public id: string) {}
  }

  export class SetFilter {
    static readonly type = "[Entries] Set Filter";
    constructor(public payload: Partial<FilterPortfolioEntryModel>) {}
  }

  export class GetEntry {
    static readonly type = "[Entries] Get Entries";
    constructor(public id: string) {}
  }
}
