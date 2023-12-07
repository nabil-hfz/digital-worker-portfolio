import { Component, HostListener, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPortfolioEntryModel, PortfolioEntryModel } from '../../models/portfolio-entry.model';
import { Router } from '@angular/router';
import { EntriesService } from '../../stores/portfolio/api/portfolio.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio-grid.component.html',
  styleUrl: './portfolio-grid.component.css',
  encapsulation: ViewEncapsulation.Emulated  

})
export class PortfolioListComponent implements OnInit {
  isLoading = true;

  entries: PortfolioEntryModel[] = [];

  delayForLoader: number = 200;
  constructor(public service: EntriesService, public router: Router) {

  }
  ngOnInit(): void {
    let filter = { limit: 100 } as FilterPortfolioEntryModel;

    setTimeout(() => {
      this.service.getFilteredEntries(filter).subscribe({
        next: (entries) => {
          this.entries = entries;
          this.isLoading = false;
        }, error: (err) => {

          this.isLoading = false;
          throw err;
        }
      });
    }, this.delayForLoader);
  }


  navigateToForm() {
    this.router.navigate(['/portfolios/add']);
  }


  onCardPressed(entry: PortfolioEntryModel) {
    let words = entry.title.split(' ');
    this.router.navigate(['/portfolios/', entry.id, words.join('-')]);

  }
}

