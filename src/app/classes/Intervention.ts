import {Prestation} from "./prestation";
import {FileUpload} from "./FileUpload";

export class Intervention {
  public id: number;
  public numero: string;
  public operateur?: string;
  public typeIntervention: string;
  public prestaComp?: Prestation[];
  public typeRaccordement?: string;
  public jour!: string;
  public mois!: string;
  public annee!: string;
  public commentaire?: string;
  public date: Date;
  public fileUpload?: FileUpload;

  constructor(typeInter: string) {
    this.id = Number.parseInt(new Date().getUTCFullYear().toString() + new Date().getUTCMonth().toString() + new Date().getUTCMinutes().toString() + new Date().getMilliseconds().toString());
    this.numero = '';
    this.typeIntervention = typeInter;
    this.date = new Date();
  }

}
