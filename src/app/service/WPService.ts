/* tslint:disable:typedef */
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from './http-error-handler.service';
import {NGXLogger} from 'ngx-logger';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class WPService {
  private readonly handleError: HandleError;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('WPService');
  }

  getBlogInfo() {
    return this.http.get<any>(`${environment.endpoint}/wp-json/`, {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any[]>('exec', [], false))
      );
  }

  getPosts(start = 0, perPage = 3, categories: string[] = [], tags: string[] = []) {
    let url = `${environment.endpoint}/wp-json/wp/v2/posts?_embed&per_page=${perPage}&offset=${start}`;
    if (categories.length > 0) {
      url += `&categories=${categories.join(',')}`;
    }
    if (tags.length > 0) {
      url += `&tags=${tags.join(',')}`;
    }
    return this.http.get<any[]>(url,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any[]>('exec', [], false))
      );
  }

  getPages(start = 0, perPage = 3, categories: string[] = [], tags: string[] = []) {
    let url = `${environment.endpoint}/wp-json/wp/v2/pages?_embed&per_page=${perPage}&offset=${start}`;
    if (categories.length > 0) {
      url += `&categories=${categories.join(',')}`;
    }
    if (tags.length > 0) {
      url += `&tags=${tags.join(',')}`;
    }
    return this.http.get<any[]>(url,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any[]>('exec', [], false))
      );
  }

  getPost(slug: string) {
    return this.http.get<any[]>(`${environment.endpoint}/wp-json/wp/v2/posts/?_embed&slug=${slug}`,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any[]>('exec', [], false))
      );
  }

  getPage(slug: string) {
    return this.http.get<any[]>(`${environment.endpoint}/wp-json/wp/v2/pages/?_embed&slug=${slug}`,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any[]>('exec', [], false))
      );
  }

  getPostById(id: string) {
    return this.http.get<any>(`${environment.endpoint}/wp-json/wp/v2/posts/${id}?_embed`,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any>('exec', undefined, false))
      );
  }

  getPageById(id: string) {
    return this.http.get<any>(`${environment.endpoint}/wp-json/wp/v2/pages/${id}?_embed`,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any>('exec', undefined, false))
      );
  }

  getCategories() {
    return this.http.get<any[]>(`${environment.endpoint}/wp-json/wp/v2/categories`,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any[]>('exec', [], false))
      );
  }

  getTags() {
    return this.http.get<any[]>(`${environment.endpoint}/wp-json/wp/v2/tags`,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any[]>('exec', [], false))
      );
  }

  search(searchTerms: string, start = 0, perPage = 3) {
    return this.http.get<any[]>(`${environment.endpoint}/wp-json/wp/v2/posts?_embed&search=${encodeURIComponent(searchTerms)}`,
      {headers: {Accept: 'application/json;UTF-8'}})
      .pipe(
        tap(r => this.logger.debug(`exec data ${r}`)),
        catchError(this.handleError<any[]>('exec', [], false))
      );
  }
}
