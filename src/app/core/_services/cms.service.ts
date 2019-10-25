import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, from } from 'rxjs';
import { catchError, map, tap, switchMap, shareReplay } from 'rxjs/operators';
import { createClient, Entry, EntryCollection } from 'contentful';
import { environment } from '@environments/environment';
import { Page } from '@models/page';
import { Preset } from '@models/preset';
import { ExternalLink } from '@models/external-link';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  constructor(private http: HttpClient) {}

  private client = createClient({
    space: environment.space,
    accessToken: environment.accessToken
  });

  private preset$ = new Map<string, Observable<Preset>>();
  private page$ = new Map<string, Observable<Page>>();
  private externalLinks$: Observable<ExternalLink[]>;

  /** GET preset by id. Will 404 if id not found */
  getPreset(id: string): Observable<Preset> {
    if (!this.preset$.get(id)) {
      const promise: Promise<EntryCollection<Preset>> = this.client.getEntries<Preset>({
        content_type: 'presets',
        'sys.id': id
      });
      // const promise: Promise<Entry<Preset>> = this.client.getEntry(id);
      const response = from(promise).pipe(
        tap(_ => console.log(`fetched preset: ${id}`)),
        map(_ => {
          return new Preset(_.items[0]);
        }),
        shareReplay(1),
        catchError(this.handleError<Preset>(`getPreset: ${id}`))
      );
      this.preset$.set(id, response);
    }
    return this.preset$.get(id);
  }

  /** Shortcut to GET main preset
   * If param includeNavigation == true it will get the navigation
   * and append it to the returned object
   * @param includeNavigation - optional value to get navigation
   */
  getMainPresets(): Observable<Preset> {
    return this.getPreset(environment.presets);
  }

  /** GET page by slug. Will 404 if id not found */
  getPage(slug: string): Observable<Page> {
    if (!this.page$.get(slug)) {
      const promise: Promise<EntryCollection<Page>> = this.client.getEntries<Page>({
        content_type: 'page',
        'fields.slug': slug
      });
      const response = from(promise).pipe(
        tap(_ => console.log(`fetched page: ${slug}`)),
        map(_ => {
          return new Page(_.items[0]);
        }),
        shareReplay(1),
        catchError(this.handleError<Page>(`getPage: ${slug}`))
      );
      this.page$.set(slug, response);
    }
    return this.page$.get(slug);
  }

  /** GET all external links */
  getExternalLinks(): Observable<ExternalLink[]> {
    if (!this.externalLinks$) {
      const promise: Promise<EntryCollection<ExternalLink>> = this.client.getEntries<ExternalLink>({
        content_type: 'externalLink'
      });
      this.externalLinks$ = from(promise).pipe(
        tap(_ => console.log('fetched external links')),
        map(_ => {
          return _.items.map(element => new ExternalLink(element));
        }),
        shareReplay(1),
        catchError(this.handleError('getExternalLinks', []))
      );
    }
    return this.externalLinks$;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
