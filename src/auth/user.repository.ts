import { User } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async creatUser(creatUserDto: CreatUserDto): Promise<User> {
        const { username, password, status} = creatUserDto;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashPassword, status});

        await this.save(user);
        return user;
    }
}