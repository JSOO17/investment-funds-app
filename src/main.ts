import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig // Usa el spread operator para incluir todos los proveedores definidos en appConfig
  ]
})
.catch(err => console.error(err));
