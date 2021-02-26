import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core'
import { ApiService } from '../../api.service'
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../../environments/environment'

declare var $: any
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit, OnDestroy {
  baseWhatsappInfoUrl: string = ''
  program: any
  spinner: boolean = true

  constructor(
    private http: ApiService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    /*  $('.main-container').hide() */
    this.getDescriptionProgram()
    this.baseWhatsappInfoUrl = environment.baseWhatsappInfoUrl
  }

  getDescriptionProgram() {
    const id = this.route.snapshot.paramMap.get('idProgram')

    this.http.getProgramDescription(id).subscribe(
      (res: any) => {
        console.log(res)

        this.spinner = false

        this.program = res.content
      },
      (error) => {
        console.log(error)
      },
      () => {
        this.cd.markForCheck()
      }
    )
  }

  ngOnDestroy() {
    /* $('.main-container').show() */
  }
}
