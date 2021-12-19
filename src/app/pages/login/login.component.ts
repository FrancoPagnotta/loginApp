import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarUsuarioCheck: boolean = false;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')) this.usuario.email = (localStorage.getItem('email') || '');
    this.recordarUsuarioCheck = this._authService.recordarUsuario;
  }

  loginSubmit(loginForm: NgForm) {
    this._authService.rememberOrNotUser(loginForm);

    
    if (loginForm.invalid) return;
    
    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor',
      timer: 3000
    });
    
    Swal.showLoading();
    
    this._authService.logIn(this.usuario).subscribe(
      res => {
        console.log(res);
        Swal.close();

        this._router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
      }
    )
    
  }
}
