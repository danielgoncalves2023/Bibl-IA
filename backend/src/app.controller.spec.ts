import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get('public')
  getPublic() {
    return { message: 'Rota pública' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private')
  getPrivate() {
    return { message: 'Rota protegida com Auth0' };
  }
}
