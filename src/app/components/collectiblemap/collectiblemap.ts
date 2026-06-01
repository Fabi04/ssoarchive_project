import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-collectiblemap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collectiblemap.html',
  styleUrl: './collectiblemap.css',
})
export class Collectiblemap implements OnInit {

  collectibles: any[] = [];
  loading = true;

  selectedItem: any = null;

  selectedTypes: string[] = [];

  allTypes: string[] = ['Stars', 'Tokens', 'Spiders'];

  // FIX MAP LOGIC
  mapSize = 816;
  coordinateSystem = 408;
  mapScale = this.mapSize / this.coordinateSystem;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCollectibles();
  }

  openModal(item: any): void {
    this.selectedItem = item;
  }

  closeModal(): void {
    this.selectedItem = null;
  }

  toggleFilter(type: string): void {
    this.selectedTypes = this.selectedTypes.filter(t => t !== '__hidden__');

    const index = this.selectedTypes.indexOf(type);

    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
  }

  get filteredCollectibles(): any[] {
    if (this.selectedTypes.includes('__hidden__')) {
      return [];
    }

    if (this.selectedTypes.length === 0) {
      return this.collectibles;
    }

    return this.collectibles.filter(c =>
      this.selectedTypes.includes(c.collectible_type)
    );
  }

  showAll(): void {
    this.selectedTypes = [...this.allTypes];
  }

  hideAll(): void {
    this.selectedTypes = ['__hidden__'];
  }

  loadCollectibles(): void {
    this.loading = true;

    this.http
      .get<any[]>('http://localhost/ssoarchive/api/get_collectibles.php')
      .subscribe({
        next: (data) => {
          const apiData = data.map(item => ({
            ...item,
            x: Number(item.x),
            y: Number(item.y),
            found: false
          }));

          const saved = localStorage.getItem('collectibles');

          if (saved) {
            const savedData = JSON.parse(saved);

            apiData.forEach(c => {
              const match = savedData.find((s: any) => s.id == c.id);

              if (match) {
                c.found = match.found;
              }
            });
          }

          this.collectibles = apiData;
          this.loading = false;
        },

        error: (err) => {
          console.error('API hiba:', err);
          this.loading = false;
        }
      });
  }

  toggle(item: any): void {
    item.found = !item.found;

    localStorage.setItem(
      'collectibles',
      JSON.stringify(this.collectibles)
    );
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  getMapCoords(event: MouseEvent): void {
    const map = event.currentTarget as HTMLElement;
    const rect = map.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const realX = Math.round((clickX / rect.width) * this.coordinateSystem);
    const realY = Math.round((clickY / rect.height) * this.coordinateSystem);

    console.log('X:', realX, 'Y:', realY);
  }
}