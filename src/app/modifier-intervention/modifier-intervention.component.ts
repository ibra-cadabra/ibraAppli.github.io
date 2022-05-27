import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../classes/FileUpload';
import { Intervention } from '../classes/Intervention';
import { Prestation } from '../classes/prestation';
import { InterventionService } from '../services/intervention.service';

@Component({
  selector: 'app-modifier-intervention',
  templateUrl: './modifier-intervention.component.html',
  styleUrls: ['./modifier-intervention.component.scss']
})
export class ModifierInterventionComponent implements OnInit {

  formGroup!: FormGroup;
  intervention = new Intervention('RACCORDEMENT');

  currentFileUpload?: FileUpload;
  currentFilePrestaUpload?: FileUpload;
  percentage = 0;
  submittedInter = false;
  selected!: Date;
  selectedFile: FileList | undefined;

  constructor(private interService: InterventionService,
    private location: Location,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getIntervention();
    this.selected = this.intervention.date;
    this.formGroup = this.fb.group({
      numControl: new FormControl(''),
      typeRaccControl: new FormControl(this.intervention.typeRaccordement, Validators.required),
      comControl: new FormControl('')
    });
  }
  getIntervention(){
    this.intervention = this.interService.intervention;
  }
  selectFile(event: any): void {
    this.selectedFile = event.target.files;
  }
  upload(): void {
    if(confirm("Enregistrer les modifications ?")){ 

      this.submittedInter = true;
    
      if(this.formGroup.value.numControl){
        this.intervention.numero = this.formGroup.value.numControl;
      }
      if(this.formGroup.value.typeRaccControl){
        this.intervention.typeRaccordement = this.formGroup.value.typeRaccControl;
      }
      if(this.formGroup.value.comControl){
        this.intervention.commentaire = this.formGroup.value.comControl;
      }
      this.interService.modifierIntervention(this.intervention);
    }
  }
  goBack(): void {
    this.location.back();
  }
}
