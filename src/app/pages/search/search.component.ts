import {Component, Inject, OnInit} from '@angular/core';
import {PageScrollService} from 'ngx-page-scroll-core';
import {DOCUMENT} from '@angular/common';
import {WPService} from '../../service/WPService';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  posts: any[];
  start = 0;
  perPage = 5;
  loading = true;
  searchTerms: string;


  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    private route: ActivatedRoute,
    private wpService: WPService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchTerms = params.get('q');
      if (!!this.searchTerms && this.searchTerms !== '') {
        this.getData();
      }
    });
  }

  previous(): void {
    this.start += this.perPage;
    this.getData();
  }

  next(): void {
    this.start = Math.max(0, this.start - this.perPage);
  }

  private getData(): void {
    this.loading = true;
    this.wpService.search(this.searchTerms, this.start, this.perPage).subscribe(r => {
      setTimeout(() => {
        this.posts = r;
        this.loading = false;
        this.pageScrollService.scroll({
          duration: 250,
          document: this.document,
          scrollTarget: '#main',
        });
      });
    }, () => this.loading = false);
  }
}
