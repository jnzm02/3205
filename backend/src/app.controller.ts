import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('find-users')
  async getHello(@Query() userDto: UserDto): Promise<UserDto[]> {
    console.log('Waiting for 5 seconds...');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.appService.findUsers(userDto);
  }
}
