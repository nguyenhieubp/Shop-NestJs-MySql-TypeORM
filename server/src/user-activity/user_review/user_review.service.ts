import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReviewEntity } from './entity/user_review.entity';
import { UserReviewDto } from './dto/user_review.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserReviewService {
  constructor(
    @InjectRepository(UserReviewEntity)
    private readonly userReviewRepository: Repository<UserReviewEntity>,
  ) {}

  public async createUseReview(
    userReview: UserReviewDto,
  ): Promise<UserReviewDto | string> {
    try {
      const newUserReview = await this.userReviewRepository.save(userReview);
      return this.userReviewRepository
        .createQueryBuilder('user_review')
        .leftJoinAndSelect('user_review.user', 'user')
        .where('user_review.id =:id', { id: newUserReview.id })
        .getOne();
    } catch (error) {
      return 'Not authorization';
    }
  }

  public async getReviewOfOrderLine(
    id: string,
    page: number,
    limit: number,
  ): Promise<UserReviewDto[]> {
    if (page <= 0 || limit <= 0) {
      page = 1;
      limit = 1;
    }
    return this.userReviewRepository
      .createQueryBuilder('user_review')
      .leftJoinAndSelect('user_review.user', 'user')
      .leftJoinAndSelect('user_review.orderLine', 'orderLine')
      .leftJoinAndSelect('orderLine.productConfig', 'productConfig')
      .leftJoinAndSelect('productConfig.product', 'product')
      .where('product.id =:id', { id: id })
      .select(['user_review', 'user'])
      .take(Number(limit))
      .skip(Number(page) - 1)
      .getMany();
  }

  public async getItemUserReview(id: string): Promise<UserReviewDto> {
    return this.userReviewRepository
      .createQueryBuilder('user_review')
      .leftJoinAndSelect('user_review.user', 'user')
      .leftJoinAndSelect('user_review.orderLine', 'orderLine')
      .where('user_review.id =:id', { id: id })
      .getOne();
  }

  public async deleteUserReview(id: string): Promise<string> {
    await this.userReviewRepository.delete(id);
    return 'DELETE SUCCESS';
  }
}
