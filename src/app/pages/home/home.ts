import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Body } from '../../components/body/body';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Header, Body], 
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {}