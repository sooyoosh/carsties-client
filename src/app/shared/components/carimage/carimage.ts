import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-carimage',
  standalone: false,
  templateUrl: './carimage.html',
  styleUrl: './carimage.css',
})
export class Carimage {
  imageUrl = input.required<string>();

  isLoading = signal(true);

  onImageLoad(): void {
    this.isLoading.set(false);
  }
}
