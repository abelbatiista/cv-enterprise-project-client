import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  public items: string[] = [];

  public constructor(
    private _router: Router
  ) {
    this.fillBreadcrum();
  }

  public ngOnInit(): void {
  }

  private fillBreadcrum(): void {
    this._router.events.subscribe((): void => {
      this.items = [];
      const itemsNoUpper = this._router.url.split('/').slice(1);
      itemsNoUpper.forEach((item: string): void => {
        this.items.push(item.charAt(0).toUpperCase() + item.slice(1));
      });
    });
  }

}
