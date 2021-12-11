import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor() { }

  ngOnInit(): void {
  }

  registroSubmit(form: NgForm): void {
    
    if (form.invalid) return;

    console.log('formulario enviado', this.usuario);
    console.log(form);
  }

}
