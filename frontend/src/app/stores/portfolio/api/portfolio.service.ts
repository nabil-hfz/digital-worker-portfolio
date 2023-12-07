
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { FilterPortfolioEntryModel, PortfolioEntryModel } from "../../../models/portfolio-entry.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { DataService } from "./data-service";


@Injectable({
  providedIn: "root",
})
export class EntriesService extends DataService<PortfolioEntryModel> {

  constructor(httpClient: HttpClient) {
    let url = `${environment.apiUrl}/portfolio`;
    super(url, httpClient);
  }


  getFilteredEntries(
    filter: Partial<FilterPortfolioEntryModel>,
  ) {
    let params = new HttpParams();


    params = params.append("page", filter?.page ?? 1);
    params = params.append("limit", filter?.limit ?? 100);

    return this.getAll(params).pipe(
      map((res) => {
        return res.entries;
      })
    );
  }
}

