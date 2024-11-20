// src/app/question-modal/question-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../home/home.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Question } from '../../models/Question';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Category } from '../../models/Category';

@Component({
  standalone: true,
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  imports: [
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
  ],
  styleUrl: './question-modal.component.css',
})
export class QuestionModalComponent implements OnInit {
  question = { text: '', category: '' };
  categories: Category[] = [];
  questionForm: FormGroup;
  question1: Question;
  questionTypes = ['Verdadeiro/Falso', 'Escolha Múltipla', 'Ordem de Palavras'];

  constructor(
    public dialogRef: MatDialogRef<QuestionModalComponent>,
    private dataService: HomeService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.question1 = new Question();
    //this.categories = this.dataService.categories;
    if (data) {
      this.question = { ...data.question };
    }

    this.questionForm = this.fb.group({
      Id: [this.question1.id ? this.question1.id : -1],
      TextoPergunta: [
        this.question1.textoPergunta ? this.question1.textoPergunta : '',
        Validators.required,
      ],
      TempoLimite: [
        this.question1.tempoLimite ? this.question1.tempoLimite : '',
        Validators.required,
      ],
      Categoria: [
        this.question1.categoria ? this.question1.categoria : '',
        Validators.required,
      ],
      NivelDificuldade: [
        this.question1.nivelDificuldade ? this.question1.nivelDificuldade : 0,
        Validators.required,
      ],
      DataCriacao: [
        this.question1.dataCriacao ? this.question1.dataCriacao : new Date(),
      ],
      DataUpdate: [
        this.question1.dataUpdate ? this.question1.dataUpdate : new Date(),
      ],
      TipoPergunta: [
        this.question1.tipoPergunta ? this.question1.tipoPergunta : '',
        Validators.required,
      ],
      VerdadeiroFalso: this.fb.group({
        Correta: [''],
      }),
      EscolhaMultipla: this.fb.group({
        Opcoes: this.fb.array([]),
      }),
      OrdemPalavras: this.fb.group({
        Palavras: this.fb.array([]),
      }),
    });
  }

  ngOnInit(): void {
    this.loadCategories(); // Carrega as categorias ao iniciar o componente
  }

  loadCategories() {
    this.dataService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response.categories); // Confirma se `response.categories` é realmente um array
        if (response && Array.isArray(response.categories)) {
          this.categories = response.categories; // Atribuindo o array diretamente
        } else {
          console.error(
            'Categorias não encontradas ou não são um array',
            response
          );
        }
      },
      error: (err) => {
        console.error('Erro ao carregar categorias', err);
      },
    });
  }

  get opcoes() {
    return this.questionForm.get('EscolhaMultipla.Opcoes') as FormArray;
  }

  // Getter para as palavras de "Ordem de Palavras"
  get palavras() {
    return this.questionForm.get('OrdemPalavras.Palavras') as FormArray;
  }

  // Adiciona uma nova opção para "Escolha Múltipla"
  addOpcao() {
    this.opcoes.push(
      this.fb.group({
        TextoOpcao: ['', Validators.required], // Campo para texto
        Correta: [false], // Campo para valor booleano
      })
    );
  }

  // Remove uma opção para "Escolha Múltipla"
  removeOpcao(index: number) {
    this.opcoes.removeAt(index);
  }

  // Adiciona uma nova palavra para "Ordem de Palavras"
  addPalavra() {
    this.palavras.push(
      this.fb.group({
        Palavra: ['', Validators.required],
        Posicao: [0, Validators.required],
      })
    );
  }

  // Remove uma palavra para "Ordem de Palavras"
  removePalavra(index: number) {
    this.palavras.removeAt(index);
  }

  // Salvar a pergunta
  save() {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;

      // Mapeando para a estrutura esperada pela API
      const formattedData = {
        Id: formData.Id,
        TextoPergunta: formData.TextoPergunta,
        Categoria: formData.Categoria,
        TempoLimite: formData.TempoLimite,
        NivelDificuldade: formData.NivelDificuldade,
        DataCriacao: formData.DataCriacao,
        DataUpdate: formData.DataUpdate,
        TipoPergunta: formData.TipoPergunta,
        Correta: formData.VerdadeiroFalso?.Correta || null,
        Opcoes:
          formData.EscolhaMultipla?.Opcoes?.map((opcao: any) => ({
            TextoOpcao: opcao.TextoOpcao,
            Correta: opcao.Correta,
          })) || [],
        Palavras:
          formData.OrdemPalavras?.Palavras?.map(
            (palavra: any) => palavra.Palavra
          ) || [],
      };

      this.dataService.saveQuestion(formattedData).subscribe({
        next: (response) => {
          console.log('Pergunta salva com sucesso', response);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erro ao salvar pergunta', err);
        },
      });
    }
  }

  // Fechar o modal
  close() {
    this.dialogRef.close();
  }

  // save() {
  //   if (this.data) {
  //     this.dataService.updateQuestion(this.data.index, this.question);
  //   } else {
  //     this.dataService.addQuestion(this.question);
  //   }
  //   this.dialogRef.close();
  // }
}
