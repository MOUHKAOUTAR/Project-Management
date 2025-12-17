import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  console.log(' Interceptor appelé pour:', req.url);
  console.log('Token présent:', !!token);
  
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    console.log(' Requête d\'auth, pas de token ajouté');
    return next(req);
  }
  
  if (token) {
    console.log('Ajout du token à la requête');
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log(' Authorization header ajouté');
    return next(cloned);
  }
  
  console.log(' Pas de token disponible');
  return next(req);
};