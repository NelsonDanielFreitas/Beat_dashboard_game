import { Component } from '@angular/core';
import { GlobalDecorComponent } from '../../global-decor/global-decor.component';

@Component({
  selector: 'app-access-denied',
  template: `
      <div class="access-denied">
        <h1>Acesso não autorizado!</h1>
        <p>Não tem permissões para aceder a esta página.</p>
        <a href="/login">Voltar ao login</a>
      </div>
    `,
  styles: [`
    .access-denied {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .access-denied h1 {
        color: #1A4157;
        text-align: center;
    }
    .access-denied p {
      color: red;
    }
    .access-denied a {
      font-size: 24px;
      margin-top: 16px;
      color: #1A4157;
    }
    .access-denied a:hover {
      color: #72AA45;
    }
  `]
})
export class AccessDeniedComponent {}
