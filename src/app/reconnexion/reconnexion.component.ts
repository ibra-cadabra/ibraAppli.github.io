import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Intervention} from "../classes/Intervention";
import {FileUpload} from "../classes/FileUpload";
import {InterventionService} from "../services/intervention.service";
import {Prestation} from "../classes/prestation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reconnexion',
  templateUrl: './reconnexion.component.html',
  styleUrls: ['./reconnexion.component.scss']
})
export class ReconnexionComponent implements OnInit {
  formGroup!: FormGroup;
  formGroupPresta!: FormGroup;
  intervention = new Intervention('RACCORDEMENT');
  prestaVue = false;
  presta!: Prestation;
  prestaTab: Prestation[] = [];

  autorisation = false;
  selectedAllFilesPresta: FileList[] = [];
  selectedFilePresta!: FileList;
  currentFileUpload?: FileUpload;
  currentFilePrestaUpload?: FileUpload;
  percentage = 0;
  submittedInter = false;
  submittedPresta = false;
  selected = new Date();
  interVue = true;
  selectedFile: FileList | undefined;

  constructor(private interService: InterventionService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log('presta vue ' + this.prestaVue);
    this.formGroup = this.fb.group({
      numControl: ['', Validators.required],
      capControl: new FormControl(''),
      typeRaccControl: new FormControl(''),
      comControl: new FormControl('')
    });
    this.formGroupPresta = this.fb.group({
      tailleControl: new FormControl(''),
      comPrestaControl: new FormControl(''),
      captureControl: new FormControl(''),
      typePrestationControl: new FormControl('', Validators.required)
    });
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files;
    this.autorisation = true;
  }

  selectFilePresta(event: any): void {
    if (event)
      this.selectedFilePresta = event.target.files;
  }

  valider(): void {
    this.submittedInter = true;
    // ON cr??e l'intervention
    this.intervention = new Intervention('RECONNEXION');
    // On initialise l'id des prestation ?? l'id de l'intervention
    if (this.prestaTab.length > 0) {
      this.prestaTab.forEach(value => {
        value.id = this.intervention.id;
        console.log(value);
      });
    }

    this.intervention.typeRaccordement = this.formGroup.value.typeRaccControl;
    this.intervention.commentaire = this.formGroup.value.comControl;
    this.intervention.numero = this.formGroup.value.numControl;

    this.intervention.jour = this.selected.getDate().toString();
    if (this.intervention.jour.length == 1)
      this.intervention.jour = '0' + this.intervention.jour;
    this.intervention.mois = (this.selected.getMonth() + 1).toString();
    if (this.intervention.mois.length == 1)
      this.intervention.mois = '0' + this.intervention.mois;
    this.intervention.annee = this.selected.getFullYear().toString();
    this.intervention.date = new Date();
    if (this.selectedFile?.item(0)) {
      const fic: File | null = this.selectedFile.item(0);
      this.selectedFile = undefined
      if (fic) {
        this.intervention.fileUpload = new FileUpload(fic);
        console.log('inter add fileupload ' + this.intervention.fileUpload);
      }
    }

    //this.interService.intervention = this.intervention;
    this.interService.createNewIntervention(this.intervention);

    if (this.prestaTab.length > 0) {
      console.log('inter add ptresta lendgt');

      this.interService.prestations = this.prestaTab;
      this.interService.createNewPrestation(this.prestaTab);
    }
  }

  saveInter(inter: Intervention): void {
    //this.submittedInter=true;
    this.interService.createIntervention(inter);
    alert('Intervention ajout??e avec succ??s');
  }

  goToPresta() {
    this.prestaVue = !this.prestaVue;
    this.interVue = !this.interVue;
  }

  addPresta() {
    this.submittedPresta = true;
    let presta = new Prestation(this.formGroupPresta.value.typePrestationControl);
    presta.commentaire = this.formGroupPresta.value.comPrestaControl;

    if (this.formGroupPresta.value.tailleControl)
      presta.taille = this.formGroupPresta.value.tailleControl;

    if (this.selectedFilePresta?.item(0)) {
      const fic: File | null = this.selectedFilePresta.item(0);
      // @ts-ignore
      this.selectedFilePresta = undefined
      if (fic) {
        this.currentFilePrestaUpload = new FileUpload(fic);
        presta.fileUpload = new FileUpload(fic);
        console.log('presta add fileupload ' + presta.fileUpload);
      }
    }
    this.prestaTab.push(presta);
    console.log('presta tab le ' + this.prestaTab.length);
    alert('Prestation ajout??e ! ' + this.formGroupPresta.value.typePrestationControl);
    this.formGroupPresta.reset();
  }

  showInter() {
    this.interVue = true;
    this.prestaVue = !this.prestaVue!
  }

  ngOnDestroy() {
    this.interService.intervention = this.intervention;
    this.interService.prestations = this.prestaTab;
  }
}
