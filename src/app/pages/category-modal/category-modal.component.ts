import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../home/home.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  imports: [
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class CategoryModalComponent {
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    private dataService: HomeService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required]], // Validações no formulário
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryName = this.categoryForm.value.categoryName;

      // Chama o serviço para adicionar a categoria
      this.dataService.addCategory(categoryName).subscribe({
        next: (response) => {
          console.log('Categoria adicionada:', response);
          this.dialogRef.close(true); // Fecha o modal com um sinal de sucesso
        },
        error: (err) => {
          console.error('Erro ao adicionar categoria:', err);
        },
      });
    }
  }
}
