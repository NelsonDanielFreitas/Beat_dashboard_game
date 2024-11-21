import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from './home.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { QuestionModalComponent } from '../question-modal/question-modal.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Question } from '../../models/Question';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['question', 'category', 'actions'];
  questions: Question[] = [];

  constructor(private dialog: MatDialog, private dataService: HomeService) {
    this.questions = this.dataService.questions;
  }

  ngOnInit(): void {
    this.loadAllQuestion();
  }

  loadAllQuestion() {
    this.dataService.getAllQuestion().subscribe({
      next: (response) => {
        this.questions = response.questions.result;
        console.log(response.questions.result);
      },
      error: (err) => {
        console.error('Erro ao carregar perguntas', err);
      },
    });
  }

  openCategoryModal() {
    this.dialog.open(CategoryModalComponent);
  }

  openQuestionModal() {
    this.dialog.open(QuestionModalComponent, {
      panelClass: 'custom-modal', // Aplica a classe de estilo personalizada
    });
  }

  editQuestion(index: number, question: any) {
    const dialogRef = this.dialog.open(QuestionModalComponent, {
      data: { question, index },
    });
  }

  deleteQuestion(index: number) {
    console.log(index);
    //this.dataService.deleteQuestion(index);
    this.dataService.deleteQuestion(index).subscribe({
      next: (response) => {
        this.loadAllQuestion();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
