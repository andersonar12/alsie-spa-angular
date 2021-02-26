import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LinesComponent } from './lines/lines.component'

const routes: Routes = [
  {
    path: 'lineas',
    component: LinesComponent,
  },
  { /* CREADA RUTA DE PROGRAMAS DE ACUERDO A LOS ESTANDARES DE ANGULAR, APLICANDO "LAZY-LOADING" O "CARGA PEREZOSA"*/
    path: 'programas',
    loadChildren: () =>
      import('./programs/programs.module').then((m) => m.ProgramsModule),
  },
  { path: '', redirectTo: '/lineas', pathMatch: 'full' }, // redirect to `first-component`
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
