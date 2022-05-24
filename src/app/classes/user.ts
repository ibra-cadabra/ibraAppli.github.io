export class User {
  id: number;
  username: string;
  password: string;
  typeUser: string;
  jourAdhesion: string;
  moisAdhesion: string;
  anneeAdhesion: string;

  constructor(username: string, password: string, type: string) {
    let date = new Date();
    let heure = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let secondes = String(date.getUTCMilliseconds()).padStart(2, '0');
    this.anneeAdhesion = date.getFullYear().toString();
    this.moisAdhesion = String(date.getMonth() + 1).padStart(2, '0');
    this.jourAdhesion = String(date.getDate()).padStart(2, '0');
    this.typeUser = type;
    this.id = Number.parseInt(this.jourAdhesion + this.moisAdhesion + this.anneeAdhesion + heure + minutes + secondes);
    this.username = username;
    this.password = password;
  }
}
