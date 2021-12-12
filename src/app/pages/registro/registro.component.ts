import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  registroSubmit(form: NgForm): void {

    if (form.invalid) return;
    
    this._authService.signUpNewUser(this.usuario)
    .subscribe(
      res => {
        console.log(res);
      }, (err) => console.log(err.error.error.message)
    );

  }

}
