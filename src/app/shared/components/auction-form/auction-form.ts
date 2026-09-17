import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuctionService } from '../../../core/services/auction-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';


@Component({
  selector: 'app-auction-form',
  standalone: false,
  templateUrl: './auction-form.html',
  styleUrl: './auction-form.css',
})
export class AuctionForm implements OnInit {

  isBrowser: boolean;
  auctionForm: FormGroup;
  isEditMode = signal(false);


  constructor(
    @Inject(PLATFORM_ID) platformId: object, private fb: FormBuilder, private auctionService: AuctionService, private router: Router,
    private toastService: ToastService, private route: ActivatedRoute,
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
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true)
      this.loadAuction(id);
      this.auctionForm.get('imageUrl')?.disable();
      this.auctionForm.get('reservePrice')?.disable();
      this.auctionForm.get('auctionEnd')?.disable();
    }

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
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.updateAuction(id);
    } else {
      this.createAuction(auction);
    }


  }




  loadAuction(id: string) {
    this.auctionService.getAuctionById(id).subscribe({
      next: auction => {
        this.auctionForm.patchValue({
          make: auction.make,
          model: auction.model,
          year: auction.year,
          color: auction.color,
          milleage: auction.milleage,
          imageUrl: auction.imageUrl,
          reservePrice: auction.reservePrice,
          auctionEnd: new Date(auction.auctionEnd)
        });
      },
      error: error => {
        console.error('Failed to load auction:', error);
      }
    });
  }




  createAuction(auction: any) {
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

  updateAuction(id: string) {

    const updateDto = {
      make: this.auctionForm.value.make,
      model: this.auctionForm.value.model,
      year: this.auctionForm.value.year,
      color: this.auctionForm.value.color,
      milleage: this.auctionForm.value.milleage
    };


    this.auctionService.updateAuction(id, updateDto)
      .subscribe({
        next: () => {

          this.toastService.success(
            'Auction Updated',
            'Auction updated successfully.'
          );

          this.router.navigate(['/detail', id]);

        },
        error: error => {
          console.error(error);
        }
      });

  }

}
