import {Component, OnInit} from '@angular/core';
import {WPService} from '../../service/WPService';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  cats: any[];

  constructor(private wpService: WPService) {
  }

  ngOnInit(): void {
    this.wpService.getCategories().subscribe(r => this.cats = r);
  }

}
