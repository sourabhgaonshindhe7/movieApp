import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser.role === 'admin') {
          this.router.navigate(['/']);
        } else if (currentUser.role === 'user') {
          this.router.navigate(['/user/comment']);
        } else {
          this.errorMessage = 'User role not recognized';
        }
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }

}
