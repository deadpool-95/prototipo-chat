import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  formulario=new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  
  constructor(private authService: AuthService,
            private router:Router) { 
              
            }

  ngOnInit(): void {
    
  }

  login(){
    //console.log(this.formulario.value);
    this.authService.sendLogin(this.formulario.value)
      .subscribe((resp:any) => {
        //console.log(resp);
        localStorage.setItem('token',resp.token);
        localStorage.setItem('user',JSON.stringify(resp.user));
        console.log("Autenticado",localStorage.getItem('user'));
        this.router.navigate(['chat']);
      });
  }

}
