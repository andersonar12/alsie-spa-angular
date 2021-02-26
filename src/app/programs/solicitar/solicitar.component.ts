import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ApiService } from '../../api.service'
import { environment } from '../../../environments/environment'
import { LineService } from '../../api/line.service'
import { Line } from '../../alsie-api.types'

declare var $: any
@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss'],
})
export class SolicitarComponent implements OnInit, OnDestroy {
  baseWhatsappInfoUrl: string = ''
  lines: any = []

  siteKey: string = ''

  itemForm = new FormGroup({
    line: new FormControl(1, Validators.required),
    program: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    recaptcha: new FormControl('', Validators.required),
  })

  constructor(
    /* private readonly lineService: LineService, */
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.siteKey = environment.reCaptchaKey
    this.baseWhatsappInfoUrl = environment.baseWhatsappInfoUrl
  }

  ngOnInit() {
    $('.main-container, .input-search, .error-message').hide()
    this.getLines()
  }

  submit() {
    console.log(this.itemForm)
    this.apiService.sendNewProgram(this.itemForm.value).subscribe(
      (res) => {
        console.log(res)
      },
      (error) => {
        console.log(error)
      },
      () => {
        $('form').hide()
        $('.message-feedback').show()
      }
    )
  }

  successCaptcha(event: any) {
    console.log(event)
   /*  this.apiService.sendCaptcha(event).subscribe((res) => {
      console.log(res)
    }) */
  }

  getLines() {
    this.apiService.getAllLines().subscribe(
      (response: any) => {
        this.lines = response

        this.lines.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name)
        })

        console.log(this.lines)
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
    $('.main-container, .input-search').show()
  }
}
