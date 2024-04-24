import { Module, forwardRef } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResolver } from './brand.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ModelModule } from 'src/model/model.module';

@Module({
  imports: [PrismaModule, forwardRef(() => ModelModule)],
  providers: [BrandResolver, BrandService],
  exports: [BrandService]
})
export class BrandModule { }
