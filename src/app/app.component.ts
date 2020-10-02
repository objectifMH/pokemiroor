import { Component } from '@angular/core';

import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemirroor';

  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;
  faUserCircle = faUserCircle;

}
