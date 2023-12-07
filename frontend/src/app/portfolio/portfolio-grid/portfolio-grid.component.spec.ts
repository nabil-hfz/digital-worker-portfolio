import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EntriesService } from '../../stores/portfolio/api/portfolio.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PortfolioListComponent } from './portfolio-grid.component';
import { PortfolioEntryModel } from '../../models/portfolio-entry.model';

describe('PortfolioListComponent', () => {
  let component: PortfolioListComponent;
  let fixture: ComponentFixture<PortfolioListComponent>;
  let mockService: jasmine.SpyObj<EntriesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('EntriesService', ['getFilteredEntries']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PortfolioListComponent],
      providers: [
        { provide: EntriesService, useValue: mockService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PortfolioListComponent);
    component = fixture.componentInstance;
  });

  it('should fetch entries on init', waitForAsync(() => {
    // public id: string,
    // public title: string,
    // public description: string,
    // public imageUrl: string,
    // public customerLink: string,
    // public isVisible: boolean,
    // public createdDate: Date,
    new Date
    const mockEntries = [new PortfolioEntryModel(
      "6571df849351c94ff4d89b86",
      "Test 9",
      "Description adsjflkasjdflkaj slkfjsalkdfj lkasj flkasjdf lkadsjlkf jsalkdf jlksdajflksadjf kdsajlk jsalk jflksajflks ajlkj flksadj lfksjalkf jlksajdfkasjdfkhjeqw iohtrqiwueh vncxam bnvkhegfjq hwwoiq fjwoieqjf  ",
      "http://localhost:8080",
      "http://localhost:8080/uploads/image-1701961604905.png",
      true,
      new Date(),
    )];
    mockService.getFilteredEntries.and.returnValue(of(mockEntries));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.entries).toEqual(mockEntries);
      expect(component.isLoading).toBeFalse();
    });
  }));

  // it('should navigate to the form on navigateToForm call', () => {
  //   component.navigateToForm();
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/portfolios/add']);
  // });
  
  // it('should navigate to the specific entry on onCardPressed call', () => {
  //   const testEntry = new PortfolioEntryModel(
  //     "6571df849351c94ff4d89b86",
  //     "Test 9",
  //     "Description adsjflkasjdflkaj slkfjsalkdfj lkasj flkasjdf lkadsjlkf jsalkdf jlksdajflksadjf kdsajlk jsalk jflksajflks ajlkj flksadj lfksjalkf jlksajdfkasjdfkhjeqw iohtrqiwueh vncxam bnvkhegfjq hwwoiq fjwoieqjf  ",
  //     "http://localhost:8080",
  //     "http://localhost:8080/uploads/image-1701961604905.png",
  //     true,
  //     new Date(),
  //   );
  //   component.onCardPressed(testEntry);
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/portfolios/', '6571df849351c94ff4d89b86',  "Test-9"]);
  // });
  
  

});
