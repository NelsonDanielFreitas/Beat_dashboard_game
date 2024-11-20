import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from './home.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { QuestionModalComponent } from '../question-modal/question-modal.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

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
export class HomeComponent {
  displayedColumns: string[] = ['question', 'category', 'actions'];
  questions: string[];

  constructor(private dialog: MatDialog, private dataService: HomeService) {
    this.questions = this.dataService.questions;
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
    this.dataService.deleteQuestion(index);
  }
}
