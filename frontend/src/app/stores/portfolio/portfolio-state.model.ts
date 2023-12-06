
import { FilterPortfolioEntryModel, PortfolioEntryModel } from "../../models/portfolio-entry.model";

export interface EntriesStateModel {
  filteredEntries: PortfolioEntryModel[];
  selectedEntries: PortfolioEntryModel | null;
  filter: Partial<FilterPortfolioEntryModel>;
  loaded: boolean;
}
