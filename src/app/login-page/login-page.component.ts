import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../classes/user";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  loginSubs = new Subscription();

  constructor(
    private af: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

// for accessing to form fields
  get fval() {
    return this.loginForm.controls;
  }

  login() {
    this.loading = true;
    this.submitted = true;
    if (this.loginForm.invalid)
      return;

    if (this.authenticationService.SignIn(this.loginForm.value.username, this.loginForm.value.password))
      this.router.navigate(['/home']);
    else
      alert('username ou mot de passe erroné !');
    this.loading = false;
  }

  register() {
    let user = new User(this.loginForm.value.username, this.loginForm.value.password, 'user');
    this.authenticationService.createUser(user).then();
  }
}
