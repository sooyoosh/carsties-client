import { Component, effect, input, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: false,
  templateUrl: './countdown.html',
  styleUrl: './countdown.css',
})
export class Countdown implements OnDestroy{

  endDate = input.required<string | Date>();

  remaining = signal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  expired = signal(false);

  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {

    effect(() => {

      const endDate = this.endDate();

      this.stopCountdown();

      this.updateCountdown(endDate);

      if (!this.expired()) {
        this.intervalId = setInterval(() => {
          this.updateCountdown(endDate);
        }, 1000);
      }

    });

  }

  private updateCountdown(endDate: string | Date): void {

    const difference =
      new Date(endDate).getTime() - Date.now();

    if (difference <= 0) {

      this.expired.set(true);

      this.remaining.set({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });

      this.stopCountdown();

      return;
    }

    this.expired.set(false);

    const totalSeconds = Math.floor(difference / 1000);

    this.remaining.set({
      days: Math.floor(totalSeconds / 86400),

      hours: Math.floor(
        (totalSeconds % 86400) / 3600
      ),

      minutes: Math.floor(
        (totalSeconds % 3600) / 60
      ),

      seconds: totalSeconds % 60
    });
  }

  private stopCountdown(): void {

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }








}
