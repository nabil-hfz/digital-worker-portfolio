import { Selector } from "@ngxs/store";
import { EntriesState } from "./portfolios.state";
import { EntriesStateModel } from "./portfolio-state.model";



export class EntrySelector {
  @Selector([EntriesState])
  static filter(state: EntriesStateModel) {
    return state.filter;
  }

  @Selector([EntriesState])
  static filteredEntries(state: EntriesStateModel) {
    return state.filteredEntries;
  }

  @Selector([EntriesState])
  static selectedEntry(state: EntriesStateModel) {
    return state.selectedEntries;
  }

  @Selector([EntriesState])
  static loaded(state: EntriesStateModel) {
    return state.loaded;
  }
}
