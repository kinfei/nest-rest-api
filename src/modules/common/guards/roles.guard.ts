import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    // req,
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
    // const { handler } = context;
    // const roles = this.reflector.get<string[]>('roles', handler);
    // if (!roles) {
    //   return true;
    // }

    // const user = req.user;
    // const hasRole = () =>
    //   !!user.roles.find((role) => !!roles.find((item) => item === role));
    // return user && user.roles && hasRole();
  }
}
