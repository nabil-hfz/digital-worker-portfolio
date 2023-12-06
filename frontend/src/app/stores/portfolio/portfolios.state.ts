import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { tap } from "rxjs/operators";



import { EntriesAction } from "./portfolio.actions";
import { EntriesService } from "./api/portfolio.service";
import { FilterPortfolioEntryModel, PortfolioEntryModel } from "../../models/portfolio-entry.model";
import { convertSnap } from "../../utils/state-helper";
import { EntriesStateModel } from "./portfolio-state.model";

@State<EntriesStateModel>({
  name: "entries",
  defaults: {
    filteredEntries: [],
    selectedEntries: null,
    filter: {
      limit: 20,
      name: undefined,
    },
    loaded: true,
  },
})
@Injectable()
export class EntriesState {
  constructor(private entriesService: EntriesService) { }

  @Action(EntriesAction.AddNewEntry)
  async addEntry(
    ctx: StateContext<EntriesStateModel>,
    { payload }: EntriesAction.AddNewEntry
  ) {
    try {
      ctx.setState(
        patch({
          loaded: false,
          filteredEntries: append<PortfolioEntryModel>([payload]),
        })
      );

      // const res = await this.entriesService.addNewEntry(payload);
      // const { filteredEntries } = ctx.getState();

      const res = this.entriesService.addNewEntry(payload).pipe(tap((addedEntry) => {
        const { filteredEntries } = ctx.getState();


        ctx.patchState({
          loaded: true,
          filteredEntries: [
            ...filteredEntries.map((entry, index) => {
              if (index === filteredEntries.length - 1) {
                return { ...payload, id: addedEntry.id };
              }

              return { ...entry };
            }),
          ],
        });

        ctx.patchState({ selectedEntries: { ...payload, id: addedEntry.id } });
      }));

    } catch (error) {
      const { filteredEntries } = ctx.getState();

      ctx.setState(
        patch({
          loaded: true,
          filteredEntries: removeItem<PortfolioEntryModel>(filteredEntries.length - 1),
        })
      );
    }
  }

  @Action(EntriesAction.EditEntry)
  async editEntry(
    ctx: StateContext<EntriesStateModel>,
    { payload }: EntriesAction.EditEntry
  ) {
    const { selectedEntries, filteredEntries } = ctx.getState();
    try {
      ctx.setState(
        patch({
          loaded: false,
          filteredEntries: updateItem<PortfolioEntryModel>(
            (entry) => entry?.id === selectedEntries?.id,
            { ...selectedEntries, ...payload }
          ),
        })
      );
      await this.entriesService.updateEntry({
        ...selectedEntries,
        ...payload,
      });

      ctx.patchState({ loaded: true });
    } catch (error) {
      ctx.setState(
        patch({
          loaded: true,
          filteredEntries: removeItem<PortfolioEntryModel>(filteredEntries.length),
        })
      );
      throw error;
    }
  }

  @Action(EntriesAction.DeleteEntry)
  async deleteEntry(
    ctx: StateContext<EntriesStateModel>,
    { id }: EntriesAction.DeleteEntry
  ) {
    const { filteredEntries } = ctx.getState();
    const deletedEntry = filteredEntries.find((entry) => entry?.id === id);

    try {
      ctx.setState(
        patch({
          loaded: false,
          filteredEntries: removeItem<PortfolioEntryModel>((entry) => entry?.id === id),
        })
      );
      await this.entriesService.deleteEntry(id);

      ctx.patchState({ loaded: true });
    } catch (error) {
      ctx.setState(
        patch({
          loaded: true,
          filteredEntries: append<PortfolioEntryModel>([deletedEntry!]),
        })
      );
      throw error;
    }
  }

  @Action(EntriesAction.GetFilteredEntries, { cancelUncompleted: true })
  getfilteredEntries(ctx: StateContext<EntriesStateModel>) {
    try {
      const { filter } = ctx.getState();
      ctx.patchState({ loaded: false });
      return this.entriesService.getFilteredEntries(filter!).pipe(
        tap((entries) => {
          ctx.patchState({
            filteredEntries: [...entries.map((e: any) => ({ ...e }))],
            loaded: true,
          });
        })
      );
    } catch (error) {
      ctx.patchState({ loaded: true });
      throw new Error("something failed");
    }
  }

  @Action(EntriesAction.GetMoreEntries, { cancelUncompleted: true })
  getMoreEntries(ctx: StateContext<EntriesStateModel>) {
    try {
      const { filter, filteredEntries } = ctx.getState();

      ctx.patchState({ loaded: false });
      return this.entriesService
        .getFilteredEntries(filter!, filteredEntries.length)
        .pipe(
          tap((entries) => {
            ctx.patchState({
              filteredEntries: [
                ...filteredEntries,
                ...entries.map((e: any) => ({ ...e })),
              ],
              loaded: true,
            });
          })
        );
    } catch (error) {
      ctx.patchState({ loaded: true });
      throw new Error("something failed");
    }
  }

  @Action(EntriesAction.LoadOneAfterDelete)
  loadOne({ patchState, getState, dispatch }: StateContext<EntriesStateModel>) {
    const filter: Partial<FilterPortfolioEntryModel> = { ...getState().filter };
    patchState({ filter: { ...filter, limit: 1 } });
    return dispatch(new EntriesAction.GetMoreEntries()).pipe(
      tap((res) => {
        patchState({ filter: { ...filter } });
      })
    );
  }

  @Action(EntriesAction.GetEntry)
  getEntry(
    ctx: StateContext<EntriesStateModel>,
    { id }: EntriesAction.GetEntry
  ) {
    const { filteredEntries } = ctx.getState();
    const selectedEntry = filteredEntries.find((entry) => entry.id === id);

    if (selectedEntry) {
      ctx.patchState({ selectedEntries: { ...selectedEntry } });
    } else {
      ctx.patchState({ loaded: false });
      return this.entriesService.getEntry(id).pipe(
        tap((res) => {
          const entry = convertSnap<PortfolioEntryModel>(res);
          ctx.patchState({
            selectedEntries: entry ? { ...entry, imageUrl: entry?.imageUrl } : null,
            loaded: true,
          });
        })
      );
    }
  }

  @Action(EntriesAction.SetFilter)
  setFilter(
    { patchState }: StateContext<EntriesStateModel>,
    { payload }: EntriesAction.SetFilter
  ) {
    patchState({ filter: { ...payload } });
  }
}
