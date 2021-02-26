import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Observer } from 'rxjs'
import { retryWhen, delay, take } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Line } from '../alsie-api.types'
import { BrowserStorageService } from '../storage/browser-storage.service'
import { IdNotFoundError } from '../storage/id-not-found-error'

@Injectable({
  providedIn: 'root',
})
export class LineService {
  private readonly baseUrl = `${environment.baseAlsieApiUrl}lines/`

  constructor(
    private readonly browserStorageService: BrowserStorageService,
    private readonly http: HttpClient
  ) {}

  getLines(): Observable<Line[]> {
    const linesObservable = new Observable((observer: Observer<Line[]>) => {
      try {
        const storedLines = this.browserStorageService.get('lines')
        const lines: Line[] = JSON.parse(storedLines)
        observer.next(lines)
      } catch (error) {
        this.http.get<Line[]>(this.baseUrl).subscribe(
          (response: Line[]) => {
            this.browserStorageService.set('lines', response)
            observer.next(response)
          },
          (error) => {
            observer.error(error)
          },
          () => observer.complete()
        )
      }
    })

     
    return linesObservable.pipe(
      retryWhen((errors) => errors.pipe(delay(1000), take(5)))
    )
  }

  getLineById(id: number): Line {
    const line = this.getLinesFromStorage().find((li) => li.id === id)
    if (!line) {
      throw new IdNotFoundError(id, 'Line')
    }

    return line
  }

  private getLinesFromStorage(): Line[] {
    const storedLines = this.browserStorageService.get('lines')
    const result: Line[] = JSON.parse(storedLines)

    return result
  }
}
