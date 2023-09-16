import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {
  listaCurso: string[] = ['Typescript', 'Javascript', 'Java', 'C#'];
  habilitar: boolean = true;
}
