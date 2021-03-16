import {Component, OnInit} from '@angular/core';
import {WPService} from './service/WPService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pages: any[] = [];
  title: string;
  description: string;
  searchTerms: string;

  constructor(private router: Router, private wpService: WPService) {
  }

  ngOnInit(): void {
    this.wpService.getPages(0, 10).subscribe(r => this.pages = r);
    this.wpService.getBlogInfo().subscribe(r => {
      this.title = r.name;
      this.description = r.description;
    });
  }

  search(): void {
    if (this.searchTerms) {
      this.router.navigate(['search', {q: this.searchTerms}]);
    }
  }
}
