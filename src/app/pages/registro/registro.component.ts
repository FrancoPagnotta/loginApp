import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarUsuarioCheck: boolean = false;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  registroSubmit(signupForm: NgForm): void {
    this._authService.rememberOrNotUser(signupForm);

    if (signupForm.invalid) return;

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor',
      timer: 3000
    });

    Swal.showLoading();
    
    this._authService.signUpNewUser(this.usuario)
    .subscribe(
      res => {
        console.log(res);
        Swal.close();

        this._router.navigateByUrl('/login');

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
