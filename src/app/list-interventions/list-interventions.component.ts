import {Component, OnDestroy, OnInit} from '@angular/core';
import {InterventionService} from "../services/intervention.service";
import {Intervention} from "../classes/Intervention";
import {map, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-interventions',
  templateUrl: './list-interventions.component.html',
  styleUrls: ['./list-interventions.component.scss']
})
export class ListInterventionsComponent implements OnInit {

  fileUploads?: any[];
  interventions: Intervention[] = [];
  inteSubs = new Subscription();

  constructor(private interServ: InterventionService,
              private router: Router) {
    this.interventions = interServ.interventions;
  }

  ngOnInit(): void {
    this.interServ.intersSubj.subscribe(value => {
      this.interventions = this.interServ.interventions;
    });
    console.log('get inter2 ' + this.interventions.length);
    this.interServ.getFiles(6).snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }
}
