import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHorses } from '../../components/header-horses/header-horses';
import { Collectiblemap } from '../../components/collectiblemap/collectiblemap';
@Component({
  selector: 'app-collectibles',
  imports: [CommonModule, HeaderHorses, Collectiblemap],
  templateUrl: './collectibles.html',
  styleUrl: './collectibles.css',
})
export class CollectiblesComponent {

}
