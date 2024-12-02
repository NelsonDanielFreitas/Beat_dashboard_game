import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AuthInterceptor } from './interceptor/AuthInterceptor.interceptor';
import { TokenInterceptor } from './interceptor/TokenInterceptor.interceptor';
import { GlobalDecorComponent } from './global-decor/global-decor.component';
import { GlobalHeaderComponent } from './global-header/global-header.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule, // A importação necessária para usar 'formGroup'
    MatOptionModule,
    MatSelectModule,
    GlobalDecorComponent,
    GlobalHeaderComponent,
  ],
  declarations: [
    AppComponent

    // RegisterComponent,
    // outros componentes
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  exports: [
    GlobalDecorComponent,
    GlobalHeaderComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
