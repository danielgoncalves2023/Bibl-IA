import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

interface Auth0Payload {
  sub: string;
  name: string;
  email: string;
  [key: string]: any;
}

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findOrCreateFromAuth0(payload: Auth0Payload): Promise<User> {
    const { sub, name, email } = payload;

    let user = await this.repo.findOne({ where: { auth0Id: sub } });
    if (!user) {
      user = this.repo.create({ auth0Id: sub, name, email });
      user = await this.repo.save(user);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
}
