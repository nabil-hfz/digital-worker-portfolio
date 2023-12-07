import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PortfolioFormComponent } from './portfolio-form.component';
import { NO_ERRORS_SCHEMA, forwardRef } from '@angular/core';
import { EntriesService } from '../../stores/portfolio/api/portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { of } from 'rxjs';
import { PortfolioEntryModel } from '../../models/portfolio-entry.model';
import { ImageSelectorComponent } from '../../shared/image-selector/image-selector.component';

describe('PortfolioFormComponent', () => {
  let component: PortfolioFormComponent;
  let fixture: ComponentFixture<PortfolioFormComponent>;
  let mockService: jasmine.SpyObj<EntriesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('EntriesService', ['getFilteredEntries']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = jasmine.createSpyObj('ActivatedRoute', ['history']);

    await TestBed.configureTestingModule({
      declarations: [PortfolioFormComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,

      ],
      providers: [
        { provide: EntriesService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PortfolioFormComponent);
    component = fixture.componentInstance;
  });
  // let component: PortfolioFormComponent;
  // let fixture: ComponentFixture<PortfolioFormComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [PortfolioFormComponent],
  //     imports: [ReactiveFormsModule], // Import ReactiveFormsModule for form testing
  //   }).compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PortfolioFormComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.portfolioForm.get('title')?.value).toEqual('');
    expect(component.portfolioForm.get('description')?.value).toEqual('');
    expect(component.portfolioForm.get('imageUrl')?.value).toBeNull();
    expect(component.portfolioForm.get('customerLink')?.value).toEqual('');
    expect(component.portfolioForm.get('isVisible')?.value).toBe(false);
  });










  it('should mark the title field as invalid when empty', () => {
    const titleControl = component.portfolioForm.get('title');
    titleControl?.setValue('');
    expect(titleControl?.invalid).toBe(true);
    expect(titleControl?.hasError('required')).toBe(true);
  });

  it('should mark the customerLink field as invalid when empty', () => {
    const customerLinkControl = component.portfolioForm.get('customerLink');
    customerLinkControl?.setValue('');
    expect(customerLinkControl?.invalid).toBe(true);
    expect(customerLinkControl?.hasError('required')).toBe(true);
  });

  it('should mark the image field as invalid when null', () => {
    const imageControl = component.portfolioForm.get('imageUrl');
    imageControl?.setValue(null);
    expect(imageControl?.invalid).toBe(true);
    expect(imageControl?.hasError('required')).toBe(true);
  });

});


// describe('PortfolioFormComponent', () => {
//   let component: PortfolioFormComponent;
//   let fixture: ComponentFixture<PortfolioFormComponent>;
//   let mockService: jasmine.SpyObj<EntriesService>;
//   let mockRouter: jasmine.SpyObj<Router>;
//   let mockRoute: jasmine.SpyObj<ActivatedRoute>;

//   beforeEach(async () => {
//     mockService = jasmine.createSpyObj('EntriesService', ['create', 'update']);
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);
//     mockRoute = jasmine.createSpyObj('ActivatedRoute', ['history']);

//     await TestBed.configureTestingModule({
//       declarations: [PortfolioFormComponent],
//       imports: [
//         FormsModule,
//         MatFormFieldModule,
//         ReactiveFormsModule,

//       ],
//       providers: [
//         { provide: EntriesService, useValue: mockService },
//         { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: mockRoute },
//         {
//           provide: NG_VALUE_ACCESSOR,
//           useExisting: forwardRef(() => ImageSelectorComponent),
//           multi: true,
//         }
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PortfolioFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should call create method when form is valid and isAdding is true', () => {
//     component.id = null;
//     const data = new PortfolioEntryModel(
//       "6571df849351c94ff4d89b86",
//       "Test 9",
//       "Description adsjflkasjdflkaj slkfjsalkdfj lkasj flkasjdf lkadsjlkf jsalkdf jlksdajflksadjf kdsajlk jsalk jflksajflks ajlkj flksadj lfksjalkf jlksajdfkasjdfkhjeqw iohtrqiwueh vncxam bnvkhegfjq hwwoiq fjwoieqjf  ",
//       "http://localhost:8080/uploads/image-1701961604905.png",
//       "http://localhost:8080",
//       true,
//       new Date(),
//     );
//     component.portfolioForm.setValue(data);

//     mockService.create.and.returnValue(of(data));

//     component.onSubmit();

//     expect(mockService.create).toHaveBeenCalledWith(jasmine.any(FormData));
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['/portfolios']);
//   });

  // it('should call update method when form is valid and isAdding is false', () => {
  //   component.id = '123';
  //   component.portfolioForm.setValue({
  //     title: 'Test Title',
  //     description: 'Test Description',
  //     image: 'Test Image',
  //     customerLink: 'https://example.com',
  //     isVisible: true,
  //   });

  //   mockService.update.and.returnValue(of({}));

  //   component.onSubmit();

  //   expect(mockService.update).toHaveBeenCalledWith(jasmine.any(FormData), '123');
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/portfolios']);
  // });
// });