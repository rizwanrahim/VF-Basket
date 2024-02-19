import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";

export const AppLogin: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const userRole: boolean = inject(AuthGuardService).appActivation();
    return userRole || router.navigate(['/']);
};

export const AdminLogin: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const userRole: boolean = inject(AuthGuardService).adminActivation();
    return userRole || router.navigate(['/']);
};