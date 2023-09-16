import { Component, OnInit, Input } from '@angular/core';
import { ClientesComponent } from '../clientes.component';
import { Cliente} from '../cliente';
import { ClienteService} from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';



@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;

  titulo: string  = "Detalle del cliente";

  public fotoSeleccionada: File;

  public progreso:number = 0;


  constructor(private  clienteService: ClienteService, private activatedRoute: ActivatedRoute, public modalService: ModalService  ){}

  ngOnInit(){
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso  = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0)   {
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
        this.fotoSeleccionada = null;
    }

  }

  subirFoto(){

    if(!this.fotoSeleccionada) {

      swal.fire('Error: debe seleccionar una foto', 'error')
    }else{
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(event => {

      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded / event.total) * 100 )
      }else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.cliente = response.cliente as Cliente;

        this.modalService.notificarUpload.emit(this.cliente);
        //this.cliente = cliente;
        swal.fire('La foto se ha subido correctamente', response.mensaje, 'success');
      }
    });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
