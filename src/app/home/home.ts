import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { KioskStoreService } from '../services/kiosk-store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  private store = inject(KioskStoreService);
  private router = inject(Router);

  navigateToCategory(categoryName: string) {
    this.store.setCategory(categoryName);
    this.router.navigate(['/menu']);
  }
}
