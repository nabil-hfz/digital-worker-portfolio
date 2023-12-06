
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { FilterPortfolioEntryModel, PortfolioEntryModel } from "../../../models/portfolio-entry.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: "root",
})
export class EntriesService {
  entriesUrl = `${environment.apiUrl}/portfolio`;

  constructor(private http: HttpClient) { }

  addNewEntry(entry: PortfolioEntryModel): Observable<PortfolioEntryModel> {
    return this.http.post<PortfolioEntryModel>(`${this.entriesUrl}`, entry);
  }

  updateEntry(entry: PortfolioEntryModel): Observable<PortfolioEntryModel> {
    const { id, ...rest } = entry;
    return this.http.put<PortfolioEntryModel>(`${this.entriesUrl}/${id}`, rest);
  }

  deleteEntry(id: string): Observable<PortfolioEntryModel> {
    return this.http.delete<PortfolioEntryModel>(`${this.entriesUrl}/${id}`);
  }


  getFilteredEntries(
    filter: Partial<FilterPortfolioEntryModel>,
    entriesLemgth?: number
  ) {
    let params = new HttpParams();


    params = params.append("page", entriesLemgth ?? 0);
    params = params.append("limit", filter?.limit ?? 20);

    return this.http.get<any>(this.entriesUrl, { params }).pipe(
      map((res) => {
        return res?.data;
      })
    );
  }

  getEntry(id: string): Observable<PortfolioEntryModel> {
    return this.http.get<PortfolioEntryModel>(`${this.entriesUrl}/${id}`);
  }


  findByName(name: string): Observable<PortfolioEntryModel[]> {
    let params = new HttpParams().set('name', name);
    return this.http.get<PortfolioEntryModel[]>(`${this.entriesUrl}`, { params });
  }



}
