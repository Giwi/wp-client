import { Component, OnInit } from '@angular/core';
import {WPService} from '../../service/WPService';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  pages: any[];

  constructor(private wpService: WPService) {
  }

  ngOnInit(): void {
    this.wpService.getPages(0, 20).subscribe(r => this.pages = r);
  }

}
