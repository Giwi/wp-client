import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {WPService} from '../../service/WPService';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  @Input() slug;
  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;

  posts = [];

  constructor(private wpService: WPService) {
  }

  ngOnInit(): void {
    this.wpService.getCategories().subscribe(cats => {
      const fCat = cats.filter(c => c.slug === this.slug);
      if (fCat.length > 0) {
        const id = fCat[0].id;
        this.wpService.getPosts(0, 5, [id])
          .subscribe(res => this.posts = res);
      }
    });
  }
}
