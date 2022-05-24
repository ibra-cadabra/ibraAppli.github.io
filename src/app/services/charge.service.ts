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
import {Charge} from "../classes/charge";

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
  private dbPath = '/charges';
  private basePath = '/images';
  charge!: Charge;
  charges: Charge[] = [];
  private currentUser: User;
  private chargesRef: AngularFireList<Charge>;
  private chargesSubj = new Subject<Charge[]>();

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              private router: Router,
              private afStorage: AngularFireStorage) {
    this.currentUser = this.authService.currentUserValue;
    this.chargesRef = db.list(this.dbPath);
    this.getCharges().finally(() => console.log('get charges of ' + this.currentUser.username));
  }

  addCharge(charge: Charge) {
    this.charge = charge;
    if (this.charge.fileUpload?.file) {
      this.pushFileToStorage();
    } else this.createCharge(charge);
  }

  pushFileToStorage(): Observable<number | undefined> {
    const filePath = `${this.currentUser.username}/${this.basePath}/${this.charge.fileUpload?.file.name}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, this.charge.fileUpload?.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          if (this.charge.fileUpload) {
            this.charge.fileUpload.url = downloadURL;
            this.charge.fileUpload.name = this.charge.fileUpload.file.name;
            this.saveFileData(this.charge.fileUpload);
          }
          this.createCharge(this.charge);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  createCharge(charge: Charge) {
    this.charges.push(charge);
    firebase.database().ref(this.currentUser.username + '/charges').set(this.charges)
      .then(() => this.emitCharges())
      .catch((reason) => console.error(new Error(reason)))
      .finally(() => this.router.navigate(['/home']));

  }

  pushFileToStorageBis(inter: Intervention) {
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

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.afStorage.ref(this.currentUser.username + '/' + this.basePath);
    storageRef.child(name).delete();
  }

  getCharges() {
    return new Promise(
      ((resolve, reject) => {
        firebase.database().ref(this.currentUser.username + '/charges')
          .on('value', (data: DataSnapshot) => {
              this.charges = data.val() ? data.val() : [];
              this.emitCharges();
              resolve('true');
            },
            err => {
              reject(err);
            });
      }));
  }

  private emitCharges() {
    this.chargesSubj.next(this.charges);
  }
}
