import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core'
import { Router } from '@angular/router'
import { environment } from '../environments/environment'
import { LineService } from './api/line.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  baseUrlImg = environment.baseImageUrl
  dataSearch: any
  page: number = 1

  constructor(
    private readonly lineService: LineService,
    private cd: ChangeDetectorRef,
    private route: Router
  ) {}

  ngOnInit() {
    this.backTopScroll()
  }

  programSearch(txt: any) {
    if (txt) {
      this.route.navigate(['/programas/search', txt])
    }
  }

  /* Funcion para el scroll - */
  backTopScroll() {
    let scrollToTopButton: any = document.getElementById('js-top')

    const scrollFunc = () => {
      let y = window.scrollY

      if (y > 0) {
        scrollToTopButton.className = 'top-link show'
      } else {
        scrollToTopButton.className = 'top-link hide'
      }
    }

    window.addEventListener('scroll', scrollFunc)

    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop

      if (c > 0) {
        window.requestAnimationFrame(scrollToTop)

        window.scrollTo(0, c - c / 10)
      }
    }

    scrollToTopButton.onclick = function (e: any) {
      e.preventDefault()
      scrollToTop()
    }
  }
  /* Funcion para el scroll - */
}
