import { User } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatUserDto } from "./dto/create-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async creatUser(creatUserDto: CreatUserDto): Promise<User> {
        const { username, password, status} = creatUserDto;
        const user = this.create({ username, password, status});

        await this.save(user);
        return user;
    }
}