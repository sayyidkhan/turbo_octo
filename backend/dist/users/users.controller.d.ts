import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(userId: string): Promise<User>;
    getUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
}
