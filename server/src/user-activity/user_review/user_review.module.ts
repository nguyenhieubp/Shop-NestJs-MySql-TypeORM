import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserReviewService } from './user_review.service';
import { UserReviewController } from './user_review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReviewEntity } from './entity/user_review.entity';
import { AuthMiddleware } from 'src/config/middlewares/middlewares.service';

@Module({
  controllers: [UserReviewController],
  providers: [UserReviewService],
  imports: [TypeOrmModule.forFeature([UserReviewEntity])],
})
export class UserReviewModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v1/user-review');
  }
}
