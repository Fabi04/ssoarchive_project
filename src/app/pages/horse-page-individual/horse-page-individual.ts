import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-horse-page-individual',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './horse-page-individual.html',
  styleUrl: './horse-page-individual.css',
})
export class HorsePageIndividual implements OnInit, OnDestroy {

  horse: any = null;
  coats: any[] = [];
  loading = true;
  currentId: string | null = null;
  selectedCoat: any = null;
  private cache = new Map<string, any>();
  safeVideoUrl: SafeResourceUrl | null = null;
  currentCoatIndex = 0;
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer

  ) { }
  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  get currentCoat(): any {
    return this.coats[this.currentCoatIndex] ?? null;
  }

  get currentCoatImage(): string {
    return this.currentCoat?.coat_image || this.horse?.breed_image || '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentId = id;

      if (!id) {
        this.loading = false;
        return;
      }

      this.loadHorse(id);
    });
  }

  loadHorse(id: string): void {
    this.loading = true;
    this.stopCarousel();

    const cache = this.cache.get(id);

    if (cache) {
      this.setHorseData(cache);
      return;
    }

    this.http
      .get<any>(`http://localhost/ssoarchive/api/get_horse_by_id.php?id=${id}`)
      .subscribe({
        next: (data) => {
          this.cache.set(id, data);
          this.setHorseData(data);

        },
        error: (err) => {
          console.error('API ERROR:', err);
          this.loading = false;
        }
      });

  }
  setHorseData(data: any): void {
    this.horse = data.horse;
    this.coats = data.coats ?? [];

    this.safeVideoUrl = this.horse?.breed_link
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.horse.breed_link)
      : null;

    this.currentCoatIndex = 0;

    if (this.coats.length > 0) {
      this.startCarousel();
    }

    this.loading = false;
    this.cd.detectChanges();
  }

  startCarousel(): void {
    this.stopCarousel();

    this.interval = setInterval(() => {
      this.nextCoat();
    }, 3000);
  }

  stopCarousel(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  nextCoat(): void {
    if (this.coats.length === 0) return;

    this.currentCoatIndex =
      (this.currentCoatIndex + 1) % this.coats.length;

    this.cd.detectChanges();
  }

  prevCoat(): void {
    if (this.coats.length === 0) return;

    this.currentCoatIndex =
      (this.currentCoatIndex - 1 + this.coats.length) % this.coats.length;

    this.cd.detectChanges();
  }

  goToCoat(index: number): void {
    this.currentCoatIndex = index;
    this.cd.detectChanges();
  }

  openCoatModal(coat: any): void {
    this.selectedCoat = coat;
  }

  closeCoatModal(): void {
    this.selectedCoat = null;
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }
}