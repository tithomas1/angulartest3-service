/**
 * Created by tithomas on 7/29/16
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// The selector in this component ties back into the main index.html
//
// Also, using moduleId (from commonjs) allows component-relative path/file
// references for styleUrls, templateUrl, etc. Anything in the HTML will
// still be site-relative

@Component({
    moduleId: module.id,
    selector: 'appComponent',
    styleUrls: ['app.component.css'],
    template: `
      <div class="Container" id="HeaderContainer">
        <p>
          <img src="images/CiscoLogo.gif" width="87" height="53" border="0" id="CiscoLogo">
          <img src="images/Docker.png" width="91" height="52" border="0" id="DockerLogo">
          <br />
        </p>
      </div>
      <h1>Docker API dashboard</h1>
      <nav>
        <a routerLink="/dashlet1" routerLinkActive="active">Containers</a>
        <a routerLink="/dashlet2" routerLinkActive="active">Dashlet2</a>
      </nav>
      <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { }