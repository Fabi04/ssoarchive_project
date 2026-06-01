import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderHorses } from '../../components/header-horses/header-horses';

@Component({
  selector: 'app-horse-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderHorses, FormsModule, RouterLink],
  templateUrl: './horse-page.html',
  styleUrl: './horse-page.css',
})
export class HorsePageComponent implements OnInit {

  searchText: string = '';
  horses: any[] = [];
  latestHorse: any = null;
  private timeout: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      console.log('Selected horse ID:', id);

      return;
    }
    this.loadHorses();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/horse-page') {
          this.loadHorses();
        }
      });

  }

  loadHorses(): void {
    this.http.get<any[]>('http://localhost/ssoarchive/api/get_breeds.php')
      .subscribe({
        next: (data) => {
          this.horses = data;
          this.cd.detectChanges();

          this.latestHorse = data.length ? data[0] : null;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('API error:', err);
        }
      });
  }
  searchHorses(): void {
    console.log("RAW SEARCH TEXT:", this.searchText);

    const query = (this.searchText ?? '').trim();

    console.log("TRIMMED QUERY:", query);

    const url = query
      ? `http://localhost/ssoarchive/api/search_breeds.php?q=${encodeURIComponent(query)}&t=${Date.now()}`
      : `http://localhost/ssoarchive/api/get_breeds.php?t=${Date.now()}`;

    console.log("URL USED:", url);

    this.http.get<any[]>(url).subscribe(data => {
      console.log("RESULT:", data);

      this.horses = [...data];

    });
  }
  onSearchChange(): void {
    console.log("INPUT WORKS:", this.searchText);
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.searchHorses();
    }, 100);
  }
}
