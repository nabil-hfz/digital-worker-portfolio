import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PortfolioEntryModel } from '../../models/portfolio-entry.model';
import { EntriesService } from '../../stores/portfolio/api/portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {
  isLoading = true;
  hasError = false;
  portfolioEntry: PortfolioEntryModel | null = null;

  constructor(private service: EntriesService, private route: ActivatedRoute, private router: Router) { }

  delayForLoader: number = 500;
  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id') as string;

    setTimeout(() => {
      this.service.getById(id).subscribe({
        next: (entry) => {
          this.portfolioEntry = entry;
          this.isLoading = false;
        },
        error: (err) => {
          this.hasError = true;
          this.isLoading = false;
          throw err;
        }
      });
    }, this.delayForLoader);
  }

  updateEntry() {
    this.router.navigate(['/portfolios/', this.portfolioEntry?.id, 'edit'], { state: { data: this.portfolioEntry } });
  }
  deleteEntry() {
    this.isLoading = true;

    setTimeout(() => {
      this.service.delete(this.portfolioEntry!.id).subscribe({
        next: (_) => {
          this.isLoading = false;
          this.router.navigate(['/portfolios/']);
        },
        error: (err) => {
          this.isLoading = false;
          throw err;
        }
      });
    }, this.delayForLoader);
  }
}
