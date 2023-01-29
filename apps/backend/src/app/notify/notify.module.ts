import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { NotifyService } from './notify.service';

@Module({
  imports: [UserModule],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
