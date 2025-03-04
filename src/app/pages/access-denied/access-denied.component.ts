import { Component } from '@angular/core';
import { GlobalDecorComponent } from '../../global-decor/global-decor.component';

@Component({
  selector: 'app-access-denied',
  template: `
    <div class="access-denied">
      <h1>Unauthorised access!</h1>
      <p>You don't have permissions to access this page.</p>
      <a href="/login">Back to login</a>
    </div>
  `,
  styles: [
    `
      .access-denied {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .access-denied h1 {
        color: #1a4157;
        text-align: center;
      }
      .access-denied p {
        color: red;
      }
      .access-denied a {
        font-size: 24px;
        margin-top: 16px;
        color: #1a4157;
      }
      .access-denied a:hover {
        color: #72aa45;
      }
    `,
  ],
})
export class AccessDeniedComponent {}
