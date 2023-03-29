import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product_Rating } from 'src/app/Models/product';
import { OrdersService } from 'src/app/Services/orders.service';
import { ProductsService } from 'src/app/Services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.component.html',
  styleUrls: ['./previous-order.component.css']
})
export class PreviousOrderComponent implements OnInit {

  prd: any;
  prdRate: Product_Rating = {} as Product_Rating;

  constructor(
    private prdServe: ProductsService,
    private Orderserve: OrdersService,
    private route: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.Orderserve.getOrdersByUser().subscribe({
      next: (res) => {
        console.log(res);
        this.prd = res;
      },
      error: (err) => { console.log(err.error.error) }
    })
  }

  rateProduct(prd_id: any) {
 
  }



  addRating(prdId: any, star: any) {
    this.prdRate.prd_id = prdId;
    this.prdRate.star = star;
    if (this.prdRate.review!='') {
      this.prdServe.addRating(this.prdRate).subscribe({
        next: (res) => {
          // console.log(res);
          // this.prd = res;
        },
        error: (err) => { 
          Swal.fire({
            icon: 'error',
            title: 'Please Enter Your Comment...',
          })
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Your Comment...',
      })
    }
    console.log(this.prdRate);
  }

}
