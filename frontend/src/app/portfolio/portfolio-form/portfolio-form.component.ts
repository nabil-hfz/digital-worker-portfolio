import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LinkValidators } from '../../utils/validators/link.validators';
import { EntriesService } from '../../stores/portfolio/api/portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioEntryModel } from '../../models/portfolio-entry.model';

@Component({
  selector: 'portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrl: './portfolio-form.component.css'
})
export class PortfolioFormComponent implements OnInit {
  id: any = null;

  get isAdding() {
    let res = !this.id || !this.id?.length;
    return res;
  }

  portfolioForm: FormGroup = new FormGroup({
    title: new FormControl(history.state?.data?.title ?? '', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(history.state?.data?.description ?? ''),
    imageUrl: new FormControl(history.state?.data?.imageUrl, Validators.required),
    customerLink: new FormControl(history.state?.data?.customerLink ?? '', [Validators.required, LinkValidators.shouldBeValidLink]),
    isVisible: new FormControl(history.state?.data?.isVisible ?? false),
  });

  constructor(private service: EntriesService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.id = this.route.snapshot?.paramMap?.get('id');
    let data = history.state?.data;
    console.log(data);

  }

  get title() {
    return this.portfolioForm.get('title');
  }

  get customerLink() {
    return this.portfolioForm.get('customerLink');
  }

  onSubmit() {

    console.log('this.portfolioForm.valid is ', this.portfolioForm.value);

    if (!this.portfolioForm.valid) return;
    const formData = new FormData();
    Object.keys(this.portfolioForm.value).forEach(key => {
      if (key === 'image') {
        formData.append(key, this.portfolioForm.get(key)!.value);
      } else {

        formData.append(key, this.portfolioForm.get(key)!.value);
        console.log('key is ', key, ' value: ', formData.get(key));
      }
    });

    if (this.isAdding) {
      this.service.create(formData).subscribe(data => {
        console.log(data);
        this.router.navigate(['/portfolios']);
      });
    } else {
      formData.append('id', this.id)
      this.service.update(formData, this.id).subscribe(data => {
        console.log(data);
        this.router.navigate(['/portfolios']);
      });
    }

  }
}
