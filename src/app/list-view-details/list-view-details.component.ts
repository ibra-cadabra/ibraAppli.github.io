import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Intervention } from '../classes/Intervention';
import { InterventionService } from '../services/intervention.service';

@Component({
  selector: 'app-list-view-details',
  templateUrl: './list-view-details.component.html',
  styleUrls: ['./list-view-details.component.scss']
})
export class ListViewDetailsComponent implements OnInit, OnDestroy {

  @Input() intervention!: Intervention;

  constructor(private interService: InterventionService,
    private router: Router) { }

  ngOnInit(): void {
    //this.intervention = this.interService.intervention;
  }

  goToDetails(inter: Intervention) {
    this.interService.intervention = inter;
    this.router.navigate(['detailsInter']);
  }

  ngOnDestroy (){
    this.interService.intervention = this.intervention;
  }
}
