import { LoginService } from './login.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  loginForm1;
  submitButton = "Cadastrar";
  cadastro = false;

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { 
	if(localStorage.getItem('token')) {
		this.router.navigate(['home']);
	}
    }

    ngOnInit() {

      this.loginForm = this.formBuilder.group({
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: '',
      });

      this.loginForm1 = this.formBuilder.group({
        email: '',
        senha: '',
      });

    }

    ngAfterViewInit(){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f6f5fb';
    }

    validLength(str : string) {
      return str.length > 5;
    }

    validUpperCaseLetter(str: string) {
      return !(str === str.toLowerCase());
    }

    validNumericCharacter(str: string) {
      for(let i=0; i<str.length; i++) {
        if("1234567890".includes(str[i])) {
          return true;
        }
      }
      return false;
    }

    validConfirmPassword(str: string) {
      return this.loginForm.controls.confirmaSenha.value === str;
    }

    validSubmit() {
      return this.validLength(this.loginForm.controls.senha.value)
      && this.validNumericCharacter(this.loginForm.controls.senha.value)
      && this.validUpperCaseLetter(this.loginForm.controls.senha.value)
      && this.validConfirmPassword(this.loginForm.controls.senha.value);
    }

    cadastroSubmit() {
      console.log('asdaddadsdas');
      var loginInfo = {
        "email": this.loginForm.controls.email.value,
        "password": this.loginForm.controls.senha.value,
        "password_confirmation": this.loginForm.controls.confirmaSenha.value
      }
      this.loginService.cadastrarUsuario(loginInfo).subscribe(
        (response) => {
          console.log(response);
          this.cadastro = false;
        },
        (error) => {
          console.log(error)
        }
      );
    }

    loginSubmit() {
      console.log("Login");

      var login = {
        "email": this.loginForm1.controls.email.value,
        "password": this.loginForm1.controls.senha.value
      };

      this.loginService.logarUsuario(login).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('token', response['token']);
          this.router.navigate(['home', response]);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    cadastrar() {
      this.cadastro = true;
    }

}
