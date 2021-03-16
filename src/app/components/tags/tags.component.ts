import {Component, OnInit} from '@angular/core';
import {WPService} from '../../service/WPService';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: any[];

  constructor(private wpService: WPService) {
  }

  ngOnInit(): void {
    this.wpService.getTags().subscribe(r => this.tags = r);
  }

}
