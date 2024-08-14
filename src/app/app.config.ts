import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // Incluye esta línea solo si usas animaciones

// Proveedores y configuraciones para la aplicación
export const appConfig = [
  //provideRouter(routes),
  provideHttpClient(),
  provideAnimations() // Incluye esta línea solo si usas animaciones de Angular
];
