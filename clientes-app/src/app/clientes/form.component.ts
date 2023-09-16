import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';
  public errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe({
      next: (json) => {
        this.router.navigate(['/clientes']);
        swal.fire(
          'Nuevo cliente',
          `${json.mensaje}: ${this.cliente.nombre}`,
          'success'
        );
      },
      error: (err) => {
        this.errores = this.clienteService.getErrores();
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);

      },
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe({
      next: (json) => {
        this.router.navigate(['/clientes']),
          swal.fire(
            'Cliente actualizado',
            ` Cliente ${json.cliente.nombre} actualizado con exito`,
            'success'
          );
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      },
    });
  }
}
