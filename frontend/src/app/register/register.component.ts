import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public route: RoutesService,
    private auth: AuthService,
    public router: Router) { }

  ngOnInit(): void {
    if (this.auth.getLogin()) {
      this.router.navigate(['dashboard']);
    }
  }

  hide = true;
  registerUserData =<any>{};

  register = false;
  
 async registerUser(f: NgForm) {
    const value = f.value;
    console.log(value);
    const { name, email, password } = value;
    const resp = await this.auth.registerUser({ name, email, password });
    console.log(resp);
    if (resp.status) {
      //this.tab();
      this.router.navigate(['login'])
    }
  }

  tab() {
    this.register = !this.register;
  }
}
  