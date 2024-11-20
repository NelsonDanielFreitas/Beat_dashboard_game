import { DatePipe } from '@angular/common';

export class Question {
  id: number;
  textoPergunta: string;
  tempoLimite: string;
  categoria: string;
  nivelDificuldade: number;
  dataCriacao: Date;
  dataUpdate: Date;
  tipoPergunta: string;

  constructor() {
    this.id = -1;
    this.textoPergunta = '';
    this.tempoLimite = '';
    this.categoria = '';
    this.nivelDificuldade = 0;
    this.dataCriacao = new Date();
    this.dataUpdate = new Date();
    this.tipoPergunta = '';
  }
}
