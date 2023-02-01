import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SignUpCredentials } from 'src/app/interfaces/credentials';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
    displayPopup?: boolean;
    popupHeading?: string;
    popupText?: string;

    constructor(
        private authenticationService: AuthenticationService,
        private location: Location,
        private router: Router
    ) {}

    signup(credentials: SignUpCredentials): void {
        const { username, email, password } = credentials;

        if (
            username.trim() === '' ||
            email.trim() === '' ||
            password.trim() === ''
        ) {
            this.showPopup('Error', 'Please Enter All The Fields');
            return;
        }

        this.authenticationService
            .signUpUser(credentials)
            .subscribe((response: HttpResponse<any>) => {
                if (response.body.alreadyExisting) {
                    this.showPopup('Error', 'User Already Exists');
                    return;
                }
                this.router.navigate(['/login']);
            });
    }

    showPopup(popupHeading: string, popupText: string): void {
        this.popupHeading = popupHeading;
        this.popupText = popupText;

        this.displayPopup = true;
    }

    closePopup(): void {
        this.displayPopup = false;
    }
}
