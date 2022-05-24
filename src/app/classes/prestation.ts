import {FileUpload} from "./FileUpload";

export class Prestation {
  public id: number;
  public type: String;
  public taille?: number;
  public commentaire?: String;
  public photo?: String;
  public fileUpload?: FileUpload;

  constructor(type: string) {
    this.id = 0;
    this.type = type;
  }
}
