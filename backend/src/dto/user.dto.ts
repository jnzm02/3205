import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  number?: string;
}
