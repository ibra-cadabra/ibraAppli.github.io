import {Injectable} from '@angular/core';
import firebase from "firebase/compat/app";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {DataSnapshot} from "@angular/fire/compat/database/interfaces";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "../classes/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [];
  usersSubj = new Subject<User[]>();
  isAuth = false;
  currentUserSubject!: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(private af: AngularFireDatabase) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.getUsers().finally(() => console.log('get users completed !'));
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getUsers(): Promise<unknown> {
    return new Promise(
      ((resolve, reject) => {
        firebase.database().ref('users')
          .on('value', (data: DataSnapshot) => {
              this.users = data.val() ? data.val() : [];
              this.emitUsers();
              resolve('true');
            },
            err => {
              reject(err + ' error get users');
            });
      }));
  }

  createUser(usr: User) {
    return new Promise(
      (resolve, reject) => {
        if (this.verifyUserExist(usr)) {
          console.error('user exist !');
          alert('Cet utilisateur existe déjà !');
        } else {
          this.users.push(usr);
          this.saveUsers()
            .then((value) => resolve(value))
            .catch(reason => reject(reason))
            .finally(() => console.log('create user completed !'));
        }
      });
  }

  getUserById(id: number): Observable<User> {
    const clt = this.users.find(c => c.id == id)!;
    return of(clt);
  }

  saveUsers() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('users').set(this.users)
          .then(() => this.emitUsers())
          .catch(reason => reject(reason))
          .finally(() => console.log('save users completed !'));
      });
  }

  updateUser(usr: User): void {
    this.users.forEach(
      (value, index) => {
        if (value.username === usr.username && value.password === usr.password) {
          this.users[index].username = usr.username;
          this.users[index].password = usr.password;
          this.saveUsers()
            .catch(() => console.error(new Error('update error')))
            .finally(() => console.log('update user completed !'))
          ;
        }
      });
  }

  verifyUserExist(usr: User): boolean {
    let bool = false;
    this.users.forEach(
      (value) => {
        if (value.username === usr.username) bool = true;
      });
    return bool;
  }

  emitUsers(): void {
    this.usersSubj.next(this.users);
  }

  /* Sign in */
  SignIn(username: string, password: string): boolean {
    let sign = false;
    this.users.forEach(
      (usr) => {
        if (usr.username == username && usr.password == password) {
          this.isAuth = true;
          sign = true;
          localStorage.setItem('user', JSON.stringify(usr));
          this.currentUserSubject.next(this.currentUserValue);
          console.log(this.currentUserValue.username + ' You\'re in!');
        }
      });
    return sign;
  }

  /* Sign out */
  SignOut() {
    this.isAuth = false;
  }
}


/*
  currentAbonneSubject!: BehaviorSubject<Abonne>;
  currentUser!: Observable<Abonne>;
  abonnes: Abonne[] = [];
  aboSub = new Subscription();
  isAuth = false;

  constructor(private aboServ: AbonneService,
              private router: Router) {
    this.aboSub = this.aboServ.aboSubj.subscribe(
      value => this.abonnes = value);
    this.aboServ.emitAbonnes();

    // @ts-ignore
    this.currentAbonneSubject = new BehaviorSubject<Abonne>(JSON.parse(localStorage.getItem('currentAbonne')));
    this.currentUser = this.currentAbonneSubject.asObservable();

  }

  public get currentUserValue(): Abonne {
    return this.currentAbonneSubject.value;
  }

  login(username: string, password: string): Observable<Abonne> {
    let abonne!: Abonne;
    this.abonnes.map(value => {
      if (username == value.username && password == value.password) {
        // store user details in local storage to keep user logged in
        localStorage.setItem('currentAbonne', JSON.stringify(value));
        this.currentAbonneSubject.next(value);
        abonne = value;
        this.isAuth = true;
        this.router.navigate(['/accueil']).then();

      }
    });
    return of(abonne);
  }

  logout() {
// remove user data from local storage for log out
    localStorage.removeItem('currentUser');
    this.currentAbonneSubject.next(new Abonne('', ''));
    this.isAuth = false;
  }
*/

