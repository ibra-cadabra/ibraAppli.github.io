import {FileUpload} from "./FileUpload";

export class Charge {
  id: number;
  typeCharge: string;
  montant: number;
  commentaire?: string;
  jour!: string;
  mois!: string;
  annee!: string;
  date: Date;
  fileUpload?: FileUpload;

  constructor() {
    this.id = Number.parseInt(new Date().getUTCFullYear().toString() + new Date().getUTCMonth().toString() + new Date().getUTCMinutes().toString() + new Date().getMilliseconds().toString());
    this.typeCharge = '';
    this.commentaire = '';
    this.montant = 0.0;
    this.date = new Date();
  }
}
