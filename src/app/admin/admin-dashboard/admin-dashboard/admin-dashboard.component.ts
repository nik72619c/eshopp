import { Router, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import {globalVariables} from '../../../../globalConfig/globalVariables.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  product: Product;
  productid: String;
  productname: String;
  producttype: String;
  productbrand: String;
  productprice: Number;
  productquantity: Number;
  isProductAdded: Boolean;

  constructor(private http: HttpClient,private router:Router) { 

    this.productid="";
    this.isProductAdded=false;
    this.router.events.subscribe(event=>{

      if(event instanceof NavigationStart){
        console.log('navigation started....');

      }
    });
    
  }


  
  ngOnInit() {

   
  }

  viewProducts(){

    console.log('insidde view products');
    this.router.navigate(['dashboard/products']);
  }

  addProduct(){

    this.isProductAdded=false;
    console.log('inside the add component function');

this.product = new Product(this.productid,this.productname,this.producttype,this.productbrand,this.productprice,this.productquantity);
console.log('product obtained is:-', this.product);
this.http.post('http://localhost:1234/addproduct',{product:this.product,

sessionId: localStorage.getItem('sessionID')
},{withCredentials: true}).toPromise().then(response=>{
  console.log('response for addproduct',response);
var obj:any=response;

  if(obj.status){

    this.isProductAdded=true;

  }


  else{

    this.isProductAdded=false;
  }
}).catch(err=>console.log('error in promise for addproduct',err));
  
  }

  logOut(){

    console.log('inside the logout function...');
    this.http.get('http://localhost:1234/logout',{withCredentials: true}).toPromise().then((response)=>{
let content:any=response;
console.log('content in logout',content);
    if(content.status==200){

      globalVariables.isAuthenticated=false;
      this.router.navigate(['/']);
      console.log('logged out by the front end function');

    }

    else{

      console.log('could not logout user...');
    }

    }).catch(err=>console.log('error in the http promise of loggind out user..'));

    globalVariables.isAuthenticated=false;
    this.router.navigate(['/']);

  }

  viewSellers(){

    this.router.navigate(['dashboard/sellers'])
  }
  
}
