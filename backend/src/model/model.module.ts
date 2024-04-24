import { Module, forwardRef } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelResolver } from './model.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports: [PrismaModule, forwardRef(() => BrandModule)],
  providers: [ModelResolver, ModelService],
  exports: [ModelService]
})
export class ModelModule { }
