import {Component, Input, OnInit} from '@angular/core';
import {FileUpload} from '../classes/FileUpload';
import {InterventionService} from "../services/intervention.service";
import {Intervention} from "../classes/Intervention";
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrls: ['./intervention-details.component.scss']
})
export class InterventionDetailsComponent implements OnInit {

  @Input() intervention!: Intervention;

  //@Input() fileUpload!: FileUpload;

  constructor(private interService: InterventionService,
    private router: ActivatedRoute,
    private location: Location){
  }

  ngOnInit(): void {
    //this.intervention = this.interService.intervention;
    this.getIntervention();
  }

  deleteFileUpload(): void {
    this.interService.deleteInterventionFile(this.intervention);
  }

  getIntervention(){
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.interService.getInterventionById(id)
    .subscribe(inter => this.intervention = inter);
  }
  goBack(): void {
    this.location.back();
  }
}
