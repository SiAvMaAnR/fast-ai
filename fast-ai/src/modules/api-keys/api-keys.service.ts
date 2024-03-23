import { Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { User } from '../users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKeyNotFoundError } from './api-keys.errors';
import { ApiKey } from './entities/api-key.entity';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  async create(user: User, createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeyRepository.save({
      ...createApiKeyDto,
      owner: { id: user.id },
    });
  }

  async findAll(user: User) {
    return this.apiKeyRepository.findBy({
      owner: { id: user.id },
    });
  }

  async findOne(user: User, id: number) {
    return this.apiKeyRepository.findOneBy({
      id,
      owner: { id: user.id },
    });
  }

  async update(user: User, id: number, updateApiKeyDto: UpdateApiKeyDto) {
    const apiKey = await this.apiKeyRepository.findOneBy({
      id,
      owner: { id: user.id },
    });

    if (!apiKey) {
      throw new ApiKeyNotFoundError();
    }

    return this.apiKeyRepository.update(id, updateApiKeyDto);
  }

  async remove(user: User, id: number) {
    const apiKey = await this.apiKeyRepository.findOneBy({
      id,
      owner: { id: user.id },
    });

    if (!apiKey) {
      throw new ApiKeyNotFoundError();
    }

    return this.apiKeyRepository.delete(id);
  }
}
