import {LOCALE_ID, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {RaccordementService} from "./services/raccordement.service";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReconnexionService} from "./services/reconnexion.service";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AjouterInterventionComponent} from './ajouter-intervention/ajouter-intervention.component';
import {InterventionService} from "./services/intervention.service";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {ListInterventionsComponent} from './list-interventions/list-interventions.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {InterventionDetailsComponent} from './intervention-details/intervention-details.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {registerLocaleData} from "@angular/common";
import * as fr from '@angular/common/locales/fr';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterComponent} from './register/register.component';
import {ReconnexionComponent} from './reconnexion/reconnexion.component';
import {SavComponent} from './sav/sav.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {AjouterChargeComponent} from './ajouter-charge/ajouter-charge.component';
import {ChargeService} from "./services/charge.service";
import {ChargeDetailsComponent} from './charge-details/charge-details.component';
import {PrestationDetailsComponent} from './prestation-details/prestation-details.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppUpdateService} from "./services/app-update.service";
import {MatChipsModule} from "@angular/material/chips";
import { ListViewDetailsComponent } from './list-view-details/list-view-details.component';
import { ModifierInterventionComponent } from './modifier-intervention/modifier-intervention.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    AjouterInterventionComponent,
    ListInterventionsComponent,
    InterventionDetailsComponent,
    LoginPageComponent,
    RegisterComponent,
    ReconnexionComponent,
    SavComponent,
    AjouterChargeComponent,
    ChargeDetailsComponent,
    PrestationDetailsComponent,
    ListViewDetailsComponent,
    ModifierInterventionComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyBiOIRHpkgxTpgUkT_Z3UJv7ccWHAcEvWM",
            authDomain: "technicien-fibre-project.firebaseapp.com",
            databaseURL: "https://technicien-fibre-project-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "technicien-fibre-project",
            storageBucket: "technicien-fibre-project.appspot.com",
            messagingSenderId: "440216714195",
            appId: "1:440216714195:web:d15cac034a4fb5192f8d26",
            measurementId: "G-RCY150N2EK"
        }),
        AngularFirestoreModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatNativeDateModule,
        MaterialFileInputModule,
        MDBBootstrapModule.forRoot(),
        MatDatepickerModule,
        MatCardModule,
        MatMenuModule,
        MatListModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        MatChipsModule
    ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    RaccordementService,
    ReconnexionService,
    AuthService,
    AppUpdateService,
    AuthGuardService,
    ChargeService,
    InterventionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
