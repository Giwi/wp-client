import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpErrorHandler} from './service/http-error-handler.service';
import {WPService} from './service/WPService';
import { PostsComponent } from './pages/posts/posts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import {NgxPageScrollCoreModule} from 'ngx-page-scroll-core';
import { LoaderComponent } from './components/loader/loader.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './pages/category/category.component';
import { TagComponent } from './pages/tag/tag.component';
import { TagsComponent } from './components/tags/tags.component';
import { PageDetailComponent } from './components/page-detail/page-detail.component';
import { PagesComponent } from './components/pages/pages.component';
import { PageComponent } from './pages/page/page.component';
import {FormsModule} from '@angular/forms';
import { SearchComponent } from './pages/search/search.component';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    CategoriesComponent,
    PostDetailComponent,
    AuthorCardComponent,
    LoaderComponent,
    FeaturedComponent,
    CategoryComponent,
    TagComponent,
    TagsComponent,
    PageDetailComponent,
    PagesComponent,
    PageComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LazyLoadImageModule,
    NgxPageScrollCoreModule.forRoot({
      scrollOffset: 120
    }),
    LoggerModule.forRoot({serverLoggingUrl: '', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.OFF, enableSourceMaps: true}),
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    ShareButtonsModule,
    ShareIconsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule {
}
