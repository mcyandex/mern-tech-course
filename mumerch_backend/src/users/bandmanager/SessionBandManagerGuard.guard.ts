import { Injectable, CanActivate, ExecutionContext } from
    '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class SessionBandManagerGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.session.user !== undefined && request.session.user.userType == 'bandmanager';
    }
}
