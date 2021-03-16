import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostsComponent} from './pages/posts/posts.component';
import {PostDetailComponent} from './pages/post-detail/post-detail.component';
import {CategoryComponent} from './pages/category/category.component';
import {TagComponent} from './pages/tag/tag.component';
import {PageComponent} from './pages/page/page.component';
import {SearchComponent} from './pages/search/search.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'search', component: SearchComponent},
  { path: ':slug', component: PostDetailComponent },
  { path: 'category/:slug', component: CategoryComponent },
  { path: 'tag/:slug', component: TagComponent },
  { path: 'page/:slug', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
