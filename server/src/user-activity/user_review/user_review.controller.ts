import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { UserReviewService } from './user_review.service';
import { UserReviewDto } from './dto/user_review.dto';

@Controller('api/v1/user-review')
export class UserReviewController {
  constructor(private readonly userReviewService: UserReviewService) {}

  @Post()
  createUseReview(
    @Req() req: any,
    @Body() userReview: UserReviewDto,
  ): Promise<UserReviewDto | string> {
    const userReviewReal = UserReviewDto.plainToClass({
      ...userReview,
      userId: req.user.id,
    });
    return this.userReviewService.createUseReview(userReviewReal);
  }

  @Get('item/:id')
  getItemUserReview(@Param('id') id: string): Promise<UserReviewDto> {
    return this.userReviewService.getItemUserReview(id);
  }

  @Get('/product/:id')
  getReviewOfOrderLine(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Param('id') id: string,
  ): Promise<UserReviewDto[]> {
    return this.userReviewService.getReviewOfOrderLine(id, page, limit);
  }

  @Delete(':id')
  deleteUserReview(@Param('id') id: string): Promise<string> {
    return this.userReviewService.deleteUserReview(id);
  }
}
