import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">

      <div class="logo">
        <a routerLink="/" class="logo-link" (click)="closeMenu()">
          <span>SSO Archive</span>
        </a>
      </div>

      <button class="hamburger" (click)="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-links" [class.open]="menuOpen">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMenu()">
          <i class="fa fa-home"></i>
          <span>Home</span>
        </a>

        <a routerLink="/horses" routerLinkActive="active" (click)="closeMenu()">
          <i class="fa fa-table"></i>
          <span>Horse Database</span>
        </a>

        <a routerLink="/horse-page" routerLinkActive="active" (click)="closeMenu()">
          <i class="fa fa-horse"></i>
          <span>Horse Page</span>
        </a>

        <a routerLink="/collectibles" routerLinkActive="active" (click)="closeMenu()">
         <i class="fa fa-gem"></i>
          <span>Collectibles</span>
        </a>

        <a routerLink="/accessories" routerLinkActive="active" (click)="closeMenu()">
          <i class="fa-solid fa-hat-cowboy"></i>
          <span>Accessories</span>
        </a>
      </div>

    </nav>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;

      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 14px 30px;

      background: rgba(34, 20, 8, 0.92);
      backdrop-filter: blur(10px);

      border-bottom: 2px solid #9b6b42;

      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }

    .logo-link {
      color: #f5d7a1;
      text-decoration: none;
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: 0.25s ease;
    }

    .logo-link:hover {
      color: white;
      text-shadow: 0 0 10px rgba(245, 215, 161, 0.5);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .nav-links a {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;

      padding: 10px 18px;
      border-radius: 14px;

      text-decoration: none;
      color: #f5f5f5;
      font-size: 15px;
      font-weight: 600;

      transition: all 0.25s ease;
      overflow: hidden;
    }

    .nav-links a:hover {
      transform: translateY(-2px);
      background: linear-gradient(to right, #b07a4f, #8a5b35);
      color: white;
      box-shadow: 0 6px 16px rgba(0,0,0,0.35);
    }

    .active {
      background: linear-gradient(to right, #d6a26d, #9c6539);
      color: white !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.35);
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;

      background: transparent;
      border: none;
      cursor: pointer;
    }

    .hamburger span {
      width: 28px;
      height: 3px;
      background: #f5d7a1;
      border-radius: 10px;
      transition: 0.3s;
    }

    @media screen and (max-width: 900px) {

      .hamburger {
        display: flex;
      }

      .nav-links {
        position: absolute;
        top: 65px;
        left: 0;

        width: 100%;

        flex-direction: column;
        align-items: center;

        background: rgba(34, 20, 8, 0.98);

        padding: 20px;

        display: none;

        border-bottom: 2px solid #9b6b42;
      }

      .nav-links.open {
        display: flex;
      }

      .nav-links a {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}