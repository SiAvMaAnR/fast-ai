import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { ReqUser } from '../auth/auth.decorators';
import { User } from '../users/entities/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  create(@ReqUser() user: User, @Body() createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeysService.create(user, createApiKeyDto);
  }

  @Get()
  findAll(@ReqUser() user: User) {
    return this.apiKeysService.findAll(user);
  }

  @Get(':id')
  findOne(@ReqUser() user: User, @Param('id') id: string) {
    return this.apiKeysService.findOne(user, +id);
  }

  @Patch(':id')
  update(
    @ReqUser() user: User,
    @Param('id') id: string,
    @Body() updateApiKeyDto: UpdateApiKeyDto,
  ) {
    return this.apiKeysService.update(user, +id, updateApiKeyDto);
  }

  @Delete(':id')
  remove(@ReqUser() user: User, @Param('id') id: string) {
    return this.apiKeysService.remove(user, +id);
  }
}
