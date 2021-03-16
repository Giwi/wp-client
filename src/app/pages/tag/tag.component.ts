import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageScrollService} from 'ngx-page-scroll-core';
import {DOCUMENT} from '@angular/common';
import {WPService} from '../../service/WPService';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  posts: any[];
  tag: any;
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

        this.wpService.getTags().subscribe(tags => {
          const fTag = tags.filter(c => c.slug === params.get('slug'));
          if (fTag.length > 0) {
            this.tag = fTag[0];
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
    this.wpService.getPosts(this.start, this.perPage, [], [this.tag.id])
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
