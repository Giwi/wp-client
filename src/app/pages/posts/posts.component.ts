import {Component, Inject, OnInit} from '@angular/core';
import {WPService} from '../../service/WPService';
import {PageScrollService} from 'ngx-page-scroll-core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[];
  start = 0;
  perPage = 5;
  loading = true;

  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    private wpService: WPService) {
  }

  ngOnInit(): void {
    this.getData();
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
    this.wpService.getPosts(this.start, this.perPage).subscribe(r => {
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
