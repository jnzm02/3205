import { Injectable } from '@nestjs/common';
import { users } from './data';
import { UserDto } from './dto';

@Injectable()
export class AppService {
  findUsers(userDto: UserDto): UserDto[] {
    console.log(users);
    console.log('USER', userDto);
    return users.filter((user) => {
      if (userDto.number.length > 0) {
        return user.email === userDto.email && user.number === userDto.number;
      } else {
        return user.email === userDto.email;
      }
    });
  }
}
