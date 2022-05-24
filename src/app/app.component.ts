import {Component} from '@angular/core';
import {AppUpdateService} from "./services/app-update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'techFibreApplication';

  constructor(private appUpdate: AppUpdateService) {

  }


}
