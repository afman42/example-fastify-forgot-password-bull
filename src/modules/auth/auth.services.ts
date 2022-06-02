import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "./user.entity";

export class AuthService {
    private repository: Repository<User>

    constructor(){
        this.repository = AppDataSource.getRepository(User)
    }

    async checkEmail(email: string){
        return await this.repository.findOne({
            where: { email }
        })
    }

    async checkHashCode(code: string){
        return await this.repository.findOne({
            where: { hashCode: code}
        })
    }

    async updateAndAddHashCode(data: any){
        return await this.repository.save(data);
    }
}