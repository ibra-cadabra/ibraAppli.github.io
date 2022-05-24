import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Intervention} from "../classes/Intervention";
import {Prestation} from "../classes/prestation";
import {FileUpload} from "../classes/FileUpload";
import {InterventionService} from "../services/intervention.service";
import {Router} from "@angular/router";
import {ChargeService} from "../services/charge.service";
import {Charge} from "../classes/charge";

@Component({
  selector: 'app-ajouter-charge',
  templateUrl: './ajouter-charge.component.html',
  styleUrls: ['./ajouter-charge.component.scss']
})
export class AjouterChargeComponent implements OnInit {
  formGroup!: FormGroup;
  charge!: Charge;
  percentage = 0;
  submitted = false;
  selected = new Date();
  selectedFile: FileList | undefined;
  currentFileUpload: FileList | undefined;

  constructor(private chargeService: ChargeService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      montantControl: new FormControl(''),
      typeControl: new FormControl('', Validators.required),
      comControl: new FormControl(''),
      capControl: new FormControl('')
    });
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files;
  }

  upload(): void {
    this.submitted = true;
    // ON crée l'intervention
    this.charge = new Charge();

    this.charge.typeCharge = this.formGroup.value.typeControl;
    this.charge.commentaire = this.formGroup.value.comControl;
    this.charge.montant = this.formGroup.value.montantControl;
    if (this.charge.jour.length == 1)
      this.charge.jour = '0' + this.charge.jour;
    this.charge.mois = (this.selected.getMonth() + 1).toString();
    if (this.charge.mois.length == 1)
      this.charge.mois = '0' + this.charge.mois;
    this.charge.annee = this.selected.getFullYear().toString();
    this.charge.date = new Date();
    if (this.selectedFile?.item(0)) {
      const fic: File | null = this.selectedFile.item(0);
      this.selectedFile = undefined
      if (fic) {
        this.charge.fileUpload = new FileUpload(fic);
        // @ts-ignore
        this.currentFileUpload = new FileUpload(fic);
        console.log('add fileupload charge ' + this.charge.fileUpload);
      }
    }

    this.chargeService.charge = this.charge;
    this.chargeService.addCharge(this.charge);

  }

  ngOnDestroy() {
    this.chargeService.charge = this.charge;
  }
}
