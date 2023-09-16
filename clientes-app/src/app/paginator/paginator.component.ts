import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador: any;

  paginas: number[];

  desde: number;
  hasta: number;


  constructor(){}

  ngOnInit(){


  }


  ngOnChanges(changes: SimpleChanges): void {
  

    this.desde = Math.min(Math.max(1, this.paginador.number - 2), this.paginador.totalPages - 7);
    this.hasta = Math.min(this.paginador.totalPages, this.paginador.number + (7 - (this.paginador.number - this.desde)));

    if(this.paginador.totalPages > 5){

      this.paginas = new Array(this.hasta - this.desde + 1)
      .fill(0)
      .map(  (_valor, indice) => indice + this.desde );

    }else{
     this.paginas = new Array(this.paginador.totalPages)
                    .fill(0)
                    .map(  (_valor, indice) => indice+1 );
    }
  }

}
