import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const mockUser = { id: userId } as User;
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);

      const user = await service.findOneById(userId);
      expect(user).toEqual(mockUser);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const userEmail = 'test@example.com';
      const mockUser = { email: userEmail } as User;
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);

      const user = await service.findOneByEmail(userEmail);

      expect(user).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 1;

      const mockUpdateUserDto = {
        login: 'login',
        refreshToken: 'refreshToken',
      } as UpdateUserDto;

      jest.spyOn(userRepository, 'update').mockImplementation();

      await service.update(userId, mockUpdateUserDto);

      expect(userRepository.update).toHaveBeenCalledWith(
        userId,
        mockUpdateUserDto,
      );
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const passwordHash = 'passwordHash';
      const mockCreateUserDto = {
        email: 'email@example.com',
        login: 'login',
      } as CreateUserDto;
      jest.spyOn(userRepository, 'save').mockImplementation();
      jest.spyOn(argon, 'hash').mockResolvedValue(passwordHash);

      await service.create(mockCreateUserDto);

      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockCreateUserDto,
        passwordHash,
      });
    });
  });
});
