import { Component } from '@angular/core';
import { LoginCredentials } from 'src/app/interfaces/credentials';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    displayPopup: boolean = false;
    popupHeading?: string;
    popupText?: string; 

    constructor(private authenticationService: AuthenticationService) {}

    login(credentials: LoginCredentials): void {
        const { email, password } = credentials;

        if(email.trim() === '' || password.trim() === '') {
            this.showPopup('Error', 'Please Enter All The Values');
            return;
        }

        this.authenticationService.loginUser(credentials).subscribe((response) => {
            
        })
    }

    closePopup(): void {

    }

    showPopup(heading: string, text: string) {

    }
}
