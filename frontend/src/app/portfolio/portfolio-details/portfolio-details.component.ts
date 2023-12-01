import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {
  public form : FormGroup= new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    customerLink: new FormControl('', Validators.required),
    isVisible: new FormControl(true),  
    createdDate: new FormControl(new Date()),  
  });

  ngOnInit() {
  
  }

  onSubmit() {
    console.log(this.form?.value);

  }
}
