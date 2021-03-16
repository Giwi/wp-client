import {Component, Input, OnInit} from '@angular/core';
import {WPService} from '../../service/WPService';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {

  @Input() pageId: string;
  @Input() slug: string;

  page: any;

  constructor(private wpService: WPService) {
  }

  ngOnInit(): void {
    if (this.pageId) {
      this.wpService.getPageById(this.pageId).subscribe(r => this.page = r);
    } else if (this.slug) {
      this.wpService.getPage(this.slug).subscribe(r => {
        if (r.length > 0) {
          this.page = r[0];
        }
      });
    }
  }
}
