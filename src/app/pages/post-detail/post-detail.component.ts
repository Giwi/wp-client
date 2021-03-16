import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WPService} from '../../service/WPService';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any;
  categories: any[] = [];
  tags: any[] = [];
  content: string;

  constructor(
    private route: ActivatedRoute,
    private wpService: WPService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('slug')) {
        this.wpService.getPost(params.get('slug')).subscribe(r => {
          if (r.length > 0) {
            this.post = r[0];
            const terms = [];
            this.post._embedded['wp:term'].forEach(t => t.forEach(item => terms.push(item)));
            this.categories = terms.filter(t => t.taxonomy === 'category');
            this.tags = terms.filter(t => t.taxonomy === 'post_tag');
            this.content = this.post.content.rendered.replace(new RegExp(environment.endpoint, 'gi'), '');
          }
        });
      }
    });
  }

}
