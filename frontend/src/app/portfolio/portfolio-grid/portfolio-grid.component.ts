import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioEntryModel } from '../../models/portfolio-entry.model';
import { Router } from '@angular/router';
// import { PortfolioEntryModel } from '../../models/portfolio-entry.model';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio-grid.component.html',
  styleUrl: './portfolio-grid.component.css'
})
export class PortfolioListComponent {
  cols: number = 3;

  entries: PortfolioEntryModel[] = [
    new PortfolioEntryModel(
      1,
      'Modern Web Design',
      'A complete redesign of a tech blog, focusing on responsive and modern UI/UX principles.',
      'https://picsum.photos/id/237/200/300',
      'https://techblog.com',
      true,
      new Date(2021, 3, 4),

    ),
    new PortfolioEntryModel(
      2,
      'E-commerce Storefront',
      'Developed an engaging and intuitive e-commerce platform for a fashion retailer, featuring a seamless shopping experience.',
      'https://picsum.photos/id/235/200/300',
      'https://fashionretailer.com',
      true,
      new Date(2020, 12, 3),
    ),
    new PortfolioEntryModel(
      3,
      'Mobile App Development',
      'Created a cross-platform mobile application for a fitness tracker, emphasizing user-friendly design and robust functionality.',
      'https://picsum.photos/id/234/200/300',
      'https://fitnesstrackerapp.com',
      false, // This entry is set to not visible.
      new Date(2023, 2, 11),

    ),
    new PortfolioEntryModel(
      4,
      'Mobile App Development',
      'Created a cross-platform mobile application for a fitness tracker, emphasizing user-friendly design and robust functionality.',
      'https://picsum.photos/id/234/200/300',
      'https://fitnesstrackerapp.com',
      false, // This entry is set to not visible.
      new Date(2023, 2, 11),

    ),
    new PortfolioEntryModel(
      5,
      'Modern Web Design',
      'A complete redesign of a tech blog, focusing on responsive and modern UI/UX principles.',
      'https://picsum.photos/id/237/200/300',
      'https://techblog.com',
      true,
      new Date(2021, 3, 4),

    ),
    new PortfolioEntryModel(
      6,
      'E-commerce Storefront',
      'Developed an engaging and intuitive e-commerce platform for a fashion retailer, featuring a seamless shopping experience.',
      'https://picsum.photos/id/235/200/300',
      'https://fashionretailer.com',
      true,
      new Date(2020, 12, 3),
    ),
  ];

  constructor(private router: Router) { }

  navigateToForm() {

    console.log('navigateToForm /portfolio-form');
    this.router.navigate(['/portfolio-form']);
  }


}

