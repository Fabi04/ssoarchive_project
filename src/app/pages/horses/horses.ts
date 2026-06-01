import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { TableComponent } from '../../components/table/table';
import { HeaderHorses } from '../../components/header-horses/header-horses';
import { Body } from '../../components/body/body';

@Component({
  selector: 'app-horses',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableComponent, Body, HeaderHorses],
  templateUrl: './horses.html',
})
export class HorsesComponent implements OnInit {
  breeds: any[] = [];
    selectedCoat: any = null;
  constructor(
    private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
  
    this.loadBreeds();

    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/horses') {
          this.loadBreeds();
        }
      });
  }

  loadBreeds() {
    this.http.get<any[]>('http://localhost/ssoarchive/api/get_breeds.php')
      .subscribe({
        next: data => {
          this.breeds = data;
          this.cd.detectChanges(); 
          console.log('Breeds loaded:', data);
        },
        error: err => console.error('Hiba a lekérésnél:', err)
      });
  }
}