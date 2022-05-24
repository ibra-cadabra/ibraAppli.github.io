import {Component, Input, OnInit} from '@angular/core';
import {FileUpload} from '../classes/FileUpload';
import {InterventionService} from "../services/intervention.service";
import {Intervention} from "../classes/Intervention";

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrls: ['./intervention-details.component.scss']
})
export class InterventionDetailsComponent implements OnInit {

  @Input() intervention!: Intervention;

  //@Input() fileUpload!: FileUpload;

  constructor(private interService: InterventionService) {
  }

  ngOnInit(): void {
    this.intervention = this.interService.intervention;
  }

  deleteFileUpload(): void {
    this.interService.deleteInterventionFile(this.intervention);
  }
}
