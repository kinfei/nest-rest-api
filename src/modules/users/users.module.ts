import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from '../common/middlewares/auth.middlewares';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '/users', method: RequestMethod.GET },
      // { path: '/users', method: RequestMethod.POST },
      { path: '/users/:id', method: RequestMethod.GET },
      { path: '/users/:id', method: RequestMethod.PUT },
      { path: '/users/:id', method: RequestMethod.DELETE },
    );
  }
}
