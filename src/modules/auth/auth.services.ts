import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "./user.entity";

export class AuthService {
    private repository: Repository<User>

    constructor(){
        this.repository = AppDataSource.getRepository(User)
    }

    checkEmail(email: string){
        return this.repository.findOne({
            where: { email }
        })
    }
}