import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuctionService } from '../../../core/services/auction-service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';


@Component({
  selector: 'app-auction-form',
  standalone: false,
  templateUrl: './auction-form.html',
  styleUrl: './auction-form.css',
})
export class AuctionForm {

  isBrowser: boolean;
  auctionForm: FormGroup;



  constructor(
    @Inject(PLATFORM_ID) platformId: object, private fb: FormBuilder, private auctionService: AuctionService, private router: Router,
    private toastService: ToastService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.auctionForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: [null as number | null, Validators.required],
      color: ['', Validators.required],
      milleage: [null as number | null, Validators.required],
      imageUrl: ['', Validators.required],
      reservePrice: [null as number | null, Validators.required],
      auctionEnd: [null as Date | null, Validators.required],
    });


  }



  isInvalid(controlName: string): boolean {
    const control = this.auctionForm.get(controlName);

    return !!control &&
      control.invalid &&
      control.touched;
  }

  submit() {


    if (this.auctionForm.invalid) {
      this.auctionForm.markAllAsTouched();
      return;
    }

    const auction = this.auctionForm.getRawValue();

    this.auctionService.createAuction(auction)
      .subscribe({
        next: (result: any) => {
          this.toastService.success(
            'Auction Created',
            'Your auction was created successfully.'
          );
          this.router.navigate([`detail`, result.id])
        },
        error: error => {
          console.error('Create auction failed:', error);
        }
      });
  }














}
