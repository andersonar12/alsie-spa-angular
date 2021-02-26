import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

import { ApiService } from './api.service'
import { HttpClientModule } from '@angular/common/http'
import { FilterPipe } from './pipes/filter.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
/* import { NgxPaginationModule } from 'ngx-pagination' */
import { NoopAnimationsModule } from '@angular/platform-browser/animations' // <-- import the module

import { LineService } from './api/line.service'
import { BrowserStorageService } from './storage/browser-storage.service'
import { LinesComponent } from './lines/lines.component'
import { RouterModule } from '@angular/router'
@NgModule({
  declarations: [AppComponent, FilterPipe, LinesComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    /* NgxPaginationModule, <-paginador dinamico*/

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NoopAnimationsModule,
  ],
  providers: [ApiService, LineService, BrowserStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
