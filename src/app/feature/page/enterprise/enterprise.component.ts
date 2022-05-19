import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {

  public title: string = '';
  public date: Date = new Date();

  public constructor() {
    this.title = 'MegaCV';
    this.date = new Date('05/14/2022');
  }

  public ngOnInit(): void {
  }

}
