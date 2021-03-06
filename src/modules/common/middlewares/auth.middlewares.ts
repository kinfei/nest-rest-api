import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../../../config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = req.headers.authorization.split(' ')[1];

      try {
        const payload = jwt.verify(token, APP_CONFIG.jwtSecret);
        const user = await this.usersService.findById(payload.sub._id);

        if (!user)
          throw new HttpException(
            'Unauthorized access',
            HttpStatus.BAD_REQUEST,
          );

        req.body = payload;
        next();
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Unauthorized access', HttpStatus.BAD_REQUEST);
    }
  }
}
