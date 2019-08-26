import { LoginService } from './login.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  submitButton = "Cadastrar";
  cadastro = false;

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private loginService: LoginService
    ) { }

    ngOnInit() {

      this.loginForm = this.formBuilder.group({
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: '',
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

    submit() {
      console.log('asdaddadsdas');
      var loginInfo = {
        "email": this.loginForm.controls.email.value,
        "password": this.loginForm.controls.senha.value,
        "password_confirmation": this.loginForm.controls.confirmaSenha.value
      }
      this.loginService.logarUsuario(loginInfo).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error)
        }
      );
    }

    cadastrar() {
      this.cadastro = true;
    }

}
