import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { ApiService } from '../api.service'
import { Page, ProgramItem } from '../alsie-api.types'
import { LineService } from '../api/line.service'
import { ProgramQueryParams } from '../app.types'

declare var $: any

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
  /*   queryParams: ProgramQueryParams */

  baseUrlImg = environment.baseImageUrl
  id: number
  txt: any
  programItems: ProgramItem[] = []
  suscription: any

  spinner = true

  totalPages: any
  totalReg: number = 0
  page: number = 0
  size: number = 9

  isFirst = false
  isLast = false

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly lineService: LineService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.txt = this.activatedRoute.snapshot.paramMap.get('txt')
  }

  ngOnInit() {
    this.getProgramsBySearch()

    this.getProgramsByLineandPaginate()

    /* this.loadFromQueryParams() */
  }

  getProgramsByLineandPaginate() {
    this.apiService
      .getProgramsByLineandPaginate(this.id, this.page, this.size)
      .subscribe(
        (res: Page) => {
          let path = window.location.pathname.split('/')[2]

          console.log(path)

          if (path == 'search') {
            this.getProgramsBySearch()
          } else {
            this.spinner = false

            this.programItems = res.content
            this.totalReg = res.totalElements

            this.isFirst = res.first
            this.isLast = res.last
            this.totalPages = new Array(res['totalPages'])
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          this.cd.markForCheck()
        }
      )
  }

  getLineNameById(lineId: number): string {
    const line = this.lineService.getLineById(lineId)
    return line.name
  }

  getProgramsBySearch() {
    if (this.txt) {
      this.activatedRoute.paramMap.subscribe((params: any) => {
        this.txt = params.get('txt')

        this.apiService
          .getProgramsBySearch(this.txt, this.page, this.size)
          .subscribe(
            (res: Page) => {
              console.log(res)
              this.spinner = false

              if (res.content.length >= 1) {
                $('.error-message').hide()
                this.programItems = res.content
                this.totalReg = res.totalElements

                this.isFirst = res.first
                this.isLast = res.last
                this.totalPages = new Array(res['totalPages'])
              } else {
                $('.error-message').show()
              }
            },
            (error) => {
              console.log(error)
            },
            () => {
              this.cd.markForCheck()
            }
          )
      })
    } else {
      return
    }
  }

  /* ---------------------------------------- Paginador -----------------------------------------*/

  rewind(): void {
    if (!this.isFirst) {
      this.page--
      this.getProgramsByLineandPaginate()
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++
      this.getProgramsByLineandPaginate()
    }
  }

  setPage(page: number): void {
    this.page = page
    this.getProgramsByLineandPaginate()
  }

  /* ---------------------------------------- Paginador -----------------------------------------*/

  ngOnDestroy(){
    $('.error-message').hide()
  }
}

/* private loadFromQueryParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.spinner = true

      if (params) {
        this.queryParams = { ...this.queryParams, ...params }
      }

      const programFilter = {
        lineId: this.queryParams.linea,
        customText: this.queryParams.criterio,
        page: this.queryParams.pagina,
        size: this.queryParams.cantidad,
        sortBy: this.queryParams.ordenadoPor,
      }

      this.apiService.getAllPrograms(programFilter).subscribe(
        (page: Page) => {
          this.programItems = page.content
          this.totalReg = page.totalElements

          this.isFirst = page.first
          this.isLast = page.last
          this.totalPages = new Array(page.totalPages)
          this.spinner = false
        },
        (error) => {
          console.log(error)
          this.spinner = false
        },
        () => {
          this.spinner = false
          this.cd.markForCheck()
        }
      )
    })
  } 
  
    
  
  
  */
