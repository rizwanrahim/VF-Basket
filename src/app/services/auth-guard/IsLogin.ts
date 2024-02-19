import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";

export const IsLogin: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const userRole: boolean = inject(AuthGuardService).canActivate();
    return userRole || router.navigate(['/']);
};