import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Globals } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-starter';
  version = 'Angular version 13.3.0';
  show: boolean = true;
  loadFooter = false;
  hideFooter: boolean = false;
  pathImage : string;

  ngOnInit() {
    setTimeout(() => (this.loadFooter = true), 2000);
    
  }
}
