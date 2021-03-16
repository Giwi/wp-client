import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {
/*
avatar_urls: {24: "https://secure.gravatar.com/avatar/4946915cccf21142b4c64372aa8931f6?s=24&d=identicon&r=g", 48: "https://secure.gravatar.com/avatar/4946915cccf21142b4c64372aa8931f6?s=48&d=identicon&r=g", 96: "https://secure.gravatar.com/avatar/4946915cccf21142b4c64372aa8931f6?s=96&d=identicon&r=g"}
description: "Co-Founder &amp; Chief Technology Officer"
id: 10
link: "https://blog.senx.io/author/mathias-herberts/"
name: "Mathias Herberts"
slug: "mathias-herberts"
 */
  @Input() author: any;
  constructor() { }

  ngOnInit(): void {
  }

}
