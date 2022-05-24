import {Component, OnInit} from '@angular/core';
import {InterventionService} from "../services/intervention.service";
import {ChargeService} from "../services/charge.service";
import {RaccordementService} from "../services/raccordement.service";
import {ReconnexionService} from "../services/reconnexion.service";
import {SwUpdate, VersionReadyEvent} from "@angular/service-worker";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private interService: InterventionService,
              private racService: RaccordementService,
              private swUpdate: SwUpdate,
              private recoService: ReconnexionService,
              private chargeService: ChargeService) {

    const updatesAvailable = this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })));
  }

  ngOnInit(): void {
  }

}
