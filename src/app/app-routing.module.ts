import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {AjouterInterventionComponent} from "./ajouter-intervention/ajouter-intervention.component";
import {ListInterventionsComponent} from "./list-interventions/list-interventions.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ReconnexionComponent} from "./reconnexion/reconnexion.component";
import {SavComponent} from "./sav/sav.component";
import {AjouterChargeComponent} from "./ajouter-charge/ajouter-charge.component";
import {InterventionDetailsComponent} from "./intervention-details/intervention-details.component";
import { ListViewDetailsComponent } from './list-view-details/list-view-details.component';
import { ModifierInterventionComponent } from './modifier-intervention/modifier-intervention.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'modifierInter', component: ModifierInterventionComponent},
  {path: 'detailsInter/:id', component: InterventionDetailsComponent},
  {path: 'listInters', component: ListInterventionsComponent},
  {path: 'addInter', component: AjouterInterventionComponent},
  {path: 'addSav', component: SavComponent},
  {path: 'addCharge', component: AjouterChargeComponent},
  {path: 'listDetails', component: ListViewDetailsComponent},
  {path: 'addReconnexion', component: ReconnexionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {
}
