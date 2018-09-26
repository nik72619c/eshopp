import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Content } from '../../../../node_modules/@angular/compiler/src/render3/r3_ast';
import {globalVariables} from '../../../globalConfig/globalVariables.js';
import {RequestOptions, Request, RequestMethod} from '@angular/http';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  products: any;

  columns=[

    {name: 'productid'},
    {name: 'productname'},
    {name: 'productbrand'},
    {name:'productprice'},
    {name: 'productquantity'}
  ];
  rows=[];
  constructor( private http: HttpClient,private router: Router) {

    console.log('inside the product component...');
    this.rows=[];

    let object={};
    console.log('productvire component loaded ...');

// // var options = new RequestOptions({
// //   method: RequestMethod.Get,
// //   withCredentials: true,
// //   params: {
// //     sessionId: localStorage.getItem('sessionID')
// //   }
// })
    this.http.post('http://localhost:1234/getproducts',{sessionId: localStorage.getItem('sessionID')},{
      withCredentials: true
      
    }).subscribe((response)=>{
      let temp:any=response;  
    if(temp.status==200){

      this.products=temp.data;
      console.log('response',response);

   for(let i=0;i<this.products.length;i++){

     object={


productid: this.products[i].productid,
productname: this.products[i].productname,
productbrand: this.products[i].productbrand,
productprice: this.products[i].productprice,
productquantity: this.products[i].productquantity

    }

    this.rows.push(object);
   }
    console.log('rows',this.rows);
    this.rows=[...this.rows];

  }
  else if(temp.status==403){

    console.log('jaha jaana tha vahi gaya');
    globalVariables.isAuthenticated=false;
    this.router.navigate(['/']);
    
  }
  
    });

   }

  ngOnInit() {

   
  }

  

}
