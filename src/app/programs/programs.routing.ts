import { Routes } from '@angular/router'
import { DescriptionComponent } from './description/description.component'
import { ProgramsComponent } from './programs.component'
import { SolicitarComponent } from './solicitar/solicitar.component'

export const ProgramsRoutes: Routes = [
  {
    path: 'line/:id',
    component: ProgramsComponent,
  },
  {
    path: 'description/:id',
    component: DescriptionComponent,
  },
  {
    path: 'solicitar',
    component: SolicitarComponent,
  },
  {
    path: 'search/:txt',
    component: ProgramsComponent,
  },
]
