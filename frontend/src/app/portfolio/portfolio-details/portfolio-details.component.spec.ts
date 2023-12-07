



// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { PortfolioDetailsComponent } from './portfolio-details.component';
// import { EntriesService } from '../../stores/portfolio/api/portfolio.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { of, throwError } from 'rxjs';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortfolioDetailsComponent } from './portfolio-details.component';
import { EntriesService } from '../../stores/portfolio/api/portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppError } from '../../common/app-error';

describe('PortfolioDetailsComponent', () => {
  let component: PortfolioDetailsComponent;
  let fixture: ComponentFixture<PortfolioDetailsComponent>;
  let mockService: jasmine.SpyObj<EntriesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('EntriesService', ['getById', 'delete']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => 'test-id' } } };

    await TestBed.configureTestingModule({
      declarations: [PortfolioDetailsComponent],
      providers: [
        { provide: EntriesService, useValue: mockService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] // To ignore any unrecognized elements and attributes
    })
      .compileComponents();

    fixture = TestBed.createComponent(PortfolioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Mock data
  // const mockPortfolioEntry = {
  //   title: "Test 9",
  //   customerLink: "http://localhost:8080",
  //   isVisible: true,
  //   imageUrl: "http://localhost:8080/uploads/image-1701961604905.png",
  //   description: "Description adsjflkasjdflkaj slkfjsalkdfj lkasj flkasjdf lkadsjlkf jsalkdf jlksdajflksadjf kdsajlk jsalk jflksajflks ajlkj flksadj lfksjalkf jlksajdfkasjdfkhjeqw iohtrqiwueh vncxam bnvkhegfjq hwwoiq fjwoieqjf  ",
  //   createdDate: "2023-12-07T15:06:44.908Z",
  //   id: "6571df849351c94ff4d89b86"
  // };

  // it('should fetch portfolio entry on init', waitForAsync(() => {
  //   mockService.getById.and.returnValue(of(mockPortfolioEntry));
  //   fixture.detectChanges(); // ngOnInit()

  // fixture.whenStable().then(() => {
  //   expect(component.portfolioEntry).toEqual(mockPortfolioEntry);
  //   expect(component.isLoading).toBe(false);
  // });
  // }));


 

});

