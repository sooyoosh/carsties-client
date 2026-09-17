import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update implements OnInit{

  constructor( private route: ActivatedRoute,){}

  ngOnInit() {
     const id = this.route.snapshot.paramMap.get('id');
    
     
  }



}
