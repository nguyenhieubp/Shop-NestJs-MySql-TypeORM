import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/comon/baseDto';

export class PromotionDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsNotEmpty()
  discount_rate: number;

  @Expose()
  @IsNotEmpty()
  start_date: Date;

  @Expose()
  @IsNotEmpty()
  end_date: Date;
}
