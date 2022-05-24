import {Injectable} from '@angular/core';
import {Intervention} from "../classes/Intervention";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUpload} from "../classes/FileUpload";
import {finalize, Observable, Subject} from "rxjs";
import firebase from "firebase/compat/app";
import {User} from "../classes/user";
import {Router} from "@angular/router";
import DataSnapshot = firebase.database.DataSnapshot;
import {AuthService} from "./auth.service";
import {Prestation} from "../classes/prestation";

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  private dbPath = '/interventions';
  private basePath = '/images';
  interventionsRef: AngularFireList<Intervention>;
  interventions: Intervention[] = [];
  intervention!: Intervention;
  prestation!: Prestation;
  prestationTab!: Prestation[];
  prestations: Prestation[] = [];
  currentUser!: User;
  intersSubj = new Subject<Intervention[]>();
  prestasSubj = new Subject<Prestation[]>();

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              private router: Router,
              private afStorage: AngularFireStorage) {
    this.currentUser = this.authService.currentUserValue;
    this.interventionsRef = db.list(this.dbPath);
    this.getPrestations()
      .then(value => this.getInterventions().then(() => console.log('get inters of ' + this.currentUser.username)))
      .finally(() => console.log('get prestas of ' + this.currentUser.username));
  }

  createNewIntervention(inter: Intervention) {
    this.intervention = inter;
    if (this.intervention?.fileUpload?.file)
      this.pushFileToStorage();
    else
      this.createIntervention(this.intervention);
    alert(this.intervention.typeRaccordement + ' enregistré avec succès !');
  }

  createIntervention(inter: Intervention) {
    this.getInterventions().then(value => {
      this.interventions.push(inter);
      firebase.database().ref(this.currentUser.username + '/interventions').set(this.interventions)
        .then(() => this.emitInterventions())
        .catch((reason) => console.error(new Error(reason)))
        .finally(() => this.router.navigate(['/home']));
    });
  }

  createNewPrestation(prestaT: Prestation[]) {
    this.prestationTab = prestaT;
    this.prestationTab.forEach(value => {
      if (value.fileUpload) {
        this.pushFileToStoragePrestaComp(value);
      } else
        this.createPrestation(value);
    });
  }

  private createPrestation(presta: Prestation) {
    this.getPrestations().then((value) => {
      this.prestations.push(presta);
      firebase.database().ref(this.currentUser.username + '/prestations').set(this.prestations)
        .then(() => this.emitPrestations())
        .catch((reason) => console.error(new Error(reason)))
    });
  }

  private pushFileToStorage(): Observable<number | undefined> {
    const filePath = `${this.currentUser.username}/${this.basePath}/${this.intervention.fileUpload?.file.name}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, this.intervention.fileUpload?.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          if (this.intervention.fileUpload) {
            this.intervention.fileUpload.url = downloadURL;
            this.intervention.fileUpload.name = this.intervention.fileUpload.file.name;
            this.saveFileData(this.intervention.fileUpload);
          }
          this.createIntervention(this.intervention);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  private pushFileToStorageBis(inter: Intervention) {
    const filePath = `${this.currentUser.username}/${this.basePath}/${inter.fileUpload?.file.name}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, inter.fileUpload?.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          // @ts-ignore
          inter.fileUpload?.url = downloadURL;
          // @ts-ignore
          inter.fileUpload?.name = inter.fileUpload?.file.name;
          // @ts-ignore
          this.saveFileData(inter.fileUpload);
        });
      })
    ).subscribe();
  }

  private pushFileToStoragePrestaComp(presta: Prestation) {
    const filePath = `${this.currentUser.username}/${this.basePath}/${presta.fileUpload?.file.name}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, presta.fileUpload?.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          // @ts-ignore
          presta.fileUpload?.url = downloadURL;
          // @ts-ignore
          presta.fileUpload?.name = presta.fileUpload.file.name;
          // @ts-ignore
          this.saveFileData(presta.fileUpload);
          this.createPrestation(presta);
        });
      })
    ).subscribe();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteInterventionFile(inter: Intervention | undefined): void {
    // @ts-ignore
    this.deleteFileDatabase(inter?.fileUpload?.key)
      .then(() => {
        this.deleteFileStorage(inter?.fileUpload?.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string | undefined): void {
    const storageRef = this.afStorage.ref(this.currentUser.username + '/' + this.basePath);
    // @ts-ignore
    storageRef.child(name).delete();
  }

  deleteIntervention(inter: Intervention) {
    const index = this.interventions.indexOf(inter);
    if (index !== -1) {
      this.interventions.splice(index, 1);
      this.saveInterventions();
    }
  }

  private saveInterventions() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(this.currentUser.username + '/interventions').set(this.interventions)
          .then(() => this.emitInterventions())
          .catch(reason => reject(reason))
          .finally();
      });
  }

  getInterventions(): Promise<unknown> {
    return new Promise(
      ((resolve, reject) => {
        firebase.database().ref(this.currentUser.username + '/interventions')
          .on('value', (data: DataSnapshot) => {
              this.interventions = data.val() ? data.val() : [];
              this.emitInterventions();
              resolve('true');
            },
            err => {
              reject(err);
            });
      }));
  }

  private getPrestations(): Promise<unknown> {
    return new Promise(
      ((resolve, reject) => {
        firebase.database().ref(this.currentUser.username + '/prestations')
          .on('value', (data: DataSnapshot) => {
              this.prestations = data.val() ? data.val() : [];
              this.emitPrestations();
              resolve('true');
            },
            err => {
              reject(err);
            });
      }));
  }

  private addPrestation(presta: Prestation) {
    this.prestationTab.push(presta);
  }

  private emitInterventions(): void {
    this.intersSubj.next(this.interventions);
  }

  private emitPrestations(): void {
    this.prestasSubj.next(this.prestations);
  }

}


