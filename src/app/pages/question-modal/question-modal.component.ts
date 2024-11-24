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
  update: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<QuestionModalComponent>,
    private dataService: HomeService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.question1 = new Question();
    //this.categories = this.dataService.categories;

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

    if (data) {
      console.log(data);
      this.update = true;
      this.fillForm(data.question);
    }
  }

  private fillForm(question: any) {
    this.questionForm.patchValue({
      Id: question.id || null,
      TextoPergunta: question.textoPergunta || '',
      TempoLimite: question.tempoLimite || '',
      Categoria: question.categoria || '',
      NivelDificuldade: question.nivelDificuldade || 0,
      DataCriacao: question.dataCriacao || new Date(),
      DataUpdate: question.dataUpdate || new Date(),
      TipoPergunta: question.tipoPergunta || '',
    });

    //"Verdadeiro/Falso"
    if (question.verdadeiroFalsos?.length > 0) {
      this.questionForm.patchValue({
        VerdadeiroFalso: {
          Correta: question.verdadeiroFalsos[0].correta || false, // Seleciona o primeiro item do array
        },
      });
    }

    // "Escolha Múltipla"
    if (question.escolhaMultiplas) {
      console.log('Sera?');
      const opcoesFormArray = this.questionForm.get(
        'EscolhaMultipla.Opcoes'
      ) as FormArray;
      question.escolhaMultiplas.forEach((opcao: any) => {
        opcoesFormArray.push(
          this.fb.group({
            TextoOpcao: [opcao.textoOpcao || '', Validators.required],
            Correta: [opcao.correta || false],
          })
        );
      });
    }

    // "Ordem de Palavras"
    if (question.ordemPalavras) {
      const palavrasFormArray = this.questionForm.get(
        'OrdemPalavras.Palavras'
      ) as FormArray;
      question.ordemPalavras.forEach((palavra: any) => {
        palavrasFormArray.push(
          this.fb.group({
            Palavra: [palavra.palavra || '', Validators.required],
            Posicao: [palavra.posicao || 0, Validators.required],
          })
        );
      });
    }

    //this.questionForm.('TipoPergunta').disabled;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.dataService.getAllCategories().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.categories)) {
          this.categories = response.categories;
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

      console.log(formattedData);

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

  updateFunc() {
    console.log(this.questionForm.get('VerdadeiroFalso.Correta').value);
    const formData = this.questionForm.value;

    const formattedData = {
      Id: formData.Id,
      TextoPergunta: formData.TextoPergunta,
      Categoria: formData.Categoria,
      TempoLimite: formData.TempoLimite,
      NivelDificuldade: formData.NivelDificuldade,
      DataCriacao: formData.DataCriacao,
      DataUpdate: formData.DataUpdate,
      TipoPergunta: formData.TipoPergunta,
      Correta: formData.VerdadeiroFalso?.Correta || false,
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

    console.log(formattedData);

    this.dataService.updateQuestion(formattedData).subscribe({
      next: (response) => {
        console.log('Pergunta editada com sucesso', response);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao dar update', err);
      },
    });
  }

  // Fechar o modal
  close() {
    this.dialogRef.close();
  }
}
