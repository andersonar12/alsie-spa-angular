import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import {
  Page,
  ProgramItem,
  ProgramFilter,
  Program,
  Line,
} from './alsie-api.types'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /* getAll(filter: ProgramFilter): Observable<any> {
    return this.http.get<Page>(`${environment.baseAlsieApiUrl}programs`, {
      params: filter,
    })
  } */

  getAllLines() {
    return this.http.get<Line>(`${environment.baseAlsieApiUrl}lines`)
  }

  /* assets/data/lines.json <- prueba */

  getAllPrograms(pag: number, size: number) {
    return this.http.get<Program>(`${environment.baseAlsieApiUrl}programs`, {
      params: { page: pag.toString(), size: size.toString(), sortBy: 'name' },
    })
  }

  getProgramsByLine(id: number): Observable<any> {
    return this.http.get<Page>(`${environment.baseAlsieApiUrl}programs`, {
      params: { lineId: id.toString(), sortBy: 'name' },
    })
  }

  getProgramsBySearch(
    txt: string,
    page: number,
    size: number
  ): Observable<any> {
    return this.http.get<Page>(`${environment.baseAlsieApiUrl}programs`, {
      params: {
        customText: txt,
        page: page.toString(),
        size: size.toString(),
        sortBy: 'name',
      },
    })
  }

  sendCaptcha(token: string): Observable<any> {
    return this.http.post(`${environment.baseAlsieApiUrl}recaptcha`, null, {
      headers: {
        'captcha-response': token,
      },
    })
  }

  getProgramsByLineandPaginate(
    id: number,
    page: number,
    size: number
  ): Observable<any> {
    return this.http.get<Page>(`${environment.baseAlsieApiUrl}programs`, {
      params: {
        lineId: id.toString(),
        page: page.toString(),
        size: size.toString(),
        sortBy: 'name',
      },
    })
  }

  sendNewProgram(item: any) {
    console.log(item)
    const body = {
      lineId: Number(item.line),
      programName: item.program,
      programDescription: item.description,
      firstName: item.name,
      lastName: item.lastname,
      email: item.email,
      phone: Number(item.contact),
    }

    return this.http.post(`${environment.baseAlsieApiUrl}programs`, body, {
      headers: {
        'captcha-response': item.recaptcha,
      },
    })
  }

  getProgramDescription(id: any): Observable<any> {
    return this.http.get<ProgramItem>(`${environment.baseAlsieApiUrl}modules`, {
      params: {
        programId: id.toString(),
      },
    })
  }
}
