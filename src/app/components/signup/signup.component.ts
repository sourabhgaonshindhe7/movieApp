// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, password, role } = this.signupForm.value;
      if (this.authService.register(username, password, role)) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Username already exists';
      }
    }
  }
}
