import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from '../user/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { SignUp } from './dto/sign-up.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { UserService } from 'src/user/services/user.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  async register(@Body() signUp: SignUp): Promise<{ message: string, userId: number }> {
    const user = await this.authService.register(signUp);
    if (!user) {
      throw new HttpException('User registration failed', HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'User registered successfully, please create a company',
      userId: user.id,
    };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  async login(@AuthUser() user: User): Promise<{ user: User, token: string }> {
    const token = this.authService.signToken(user);
    return { user, token };
  }

  @Get('/user/:userId')
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  async getUserById(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: ['company'], // Make sure the company is eagerly loaded
    });
    return user;
  }
}
