import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { ApiUserService } from '../services/api-user.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private apiUserService:ApiUserService ){}

    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.apiUserService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}