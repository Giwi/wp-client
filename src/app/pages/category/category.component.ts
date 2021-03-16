import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WPService} from '../../service/WPService';
import {PageScrollService} from 'ngx-page-scroll-core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  posts: any[];
  category: any;
  start = 0;
  perPage = 5;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    private wpService: WPService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('slug')) {

        this.wpService.getCategories().subscribe(cats => {
          const fCat = cats.filter(c => c.slug === params.get('slug'));
          if (fCat.length > 0) {
            this.category = fCat[0];
            this.getData();
          }
        });
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
    this.wpService.getPosts(this.start, this.perPage, [this.category.id])
      .subscribe(res => {
        this.posts = res;
        this.loading = false;
        this.pageScrollService.scroll({
          duration: 250,
          document: this.document,
          scrollTarget: '#main',
        });
      });
  }

}
