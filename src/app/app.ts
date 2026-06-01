import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Body } from "./components/body/body";
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { TableComponent } from './components/table/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, RouterOutlet, NavbarComponent, Header, Footer, Body, DataTablesModule, TableComponent],
  template: `
    <app-navbar></app-navbar>
   <router-outlet #outlet="outlet" (activate)="onActivate()"></router-outlet>
    <app-footer></app-footer>
    
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('first-ng-app');
  onActivate() {

    window.scrollTo(0, 0);
  }
}