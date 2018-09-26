import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {globalVariables} from '../../../globalConfig/globalVariables.js';

@Component({
  selector: 'adminLogin',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username:String;
  password:String;

  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute) { 
    this.username="";
    this.password="";
  }

  ngOnInit() {
    this.http.post('http://localhost:1234/verifySession',{sessionId: localStorage.
    getItem('sessionID')},{withCredentials: true}).toPromise().then(response=>{
      let content:any=response;
      console.log('the content on the immediate login post request is...',content);
      if(content.status==200){

        console.log('inside the if condition of immediate login post req');
        globalVariables.isAuthenticated=true;
let returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/';
console.log('return url in ngOnInit...', returnUrl);
this.router.navigate([returnUrl]);

      }

      else{

        console.log('inside the else condition of immediate login post req');
        globalVariables.isAuthenticated=false;
        this.router.navigate(['/']);

      }
    }).catch(error=>{

      console.log('error occured in the post req..',error);
      globalVariables.isAuthenticated=false;
      this.router.navigate(['/']);
    });

  }

  loginUser() {

var adminObject={

  username: this.username,
  password: this.password,

};

console.log("the adminObject is ", adminObject);
if(!(adminObject.username=="" || adminObject.password=="")){



this.http.post('http://localhost:1234/fetchUser',adminObject,{withCredentials: true}).toPromise().then((response)=>{
  let content:any=response;
console.log('content ',content);

if(content.status==200 && content.role=="admin"){

  console.log('inside if...');
  localStorage.setItem('sessionID',content.sessionID);
  globalVariables.isAuthenticated=true;
  this.router.navigate(['/dashboard']);
}

else if(content.status==200 && content.role=="user"){
  console.log('insie if...');
  localStorage.setItem('sessionID',content.sessionID);
  globalVariables.isAuthenticated=true;
  this.router.navigate(['/profile']);
}

}).catch(err=>console.log('error obtained in promise', err));

}

else{

  console.log('kindly fill the credentials');
  globalVariables.isAuthenticated=false;
  this.router.navigate(['/']);
}
    
  }

  registerUser(){

    
  }

  // makeSession(){

  //   this.http.get('http://localhost:1234/makeSession',{withCredentials: true}).toPromise().then(response=>{

  //   console.log("response",response);
  //   }).catch(error=>console.log('error in makeSession Promise',error));
  // }

  // checkSession(){
    
  //   this.http.get('http://localhost:1234/verifySession',{withCredentials: true}).toPromise().then(response=>{

  //   console.log("response",response);
  //   }).catch(error=>console.log('error in verifySession Promise',error));


  // }


}