import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my_library';

  buttonClick: boolean = false;
  cancelButton: boolean = true;
  showUserForm: boolean = false;
  showBookForm: boolean = false;
  showLoanForm: boolean = false;

  showUserForms() {
    this.showUserForm = !this.showUserForm;
    this.showBookForm = false;
    this.showLoanForm = false;
    this.buttonClick = true;
    this.cancelButton = false;
  }

  showBookForms() {
    this.showBookForm = !this.showBookForm;
    this.showUserForm = false;
    this.showLoanForm = false;
    this.buttonClick = true;
    this.cancelButton = false;
  }

  showLoanForms() {
    this.showLoanForm = !this.showLoanForm;
    this.showUserForm = false;
    this.showBookForm = false;
    this.buttonClick = true;
    this.cancelButton = false;
  }

  hideForms(){
    this.cancelButton = !this.cancelButton;
    this.buttonClick = false;
    this.showLoanForm = false;
    this.showUserForm = false;
    this.showBookForm = false;
  }
}
