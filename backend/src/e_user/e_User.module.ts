import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {E_User, E_UserSchema} from "./schemas/e_user.schema";
import { E_UserController } from "./e_User.controller";
import { E_UserRepository } from "./e_User.repository";
import { E_UserService } from "./e_User.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: E_User.name, schema: E_UserSchema }])],
    controllers: [E_UserController],
    providers: [E_UserService , E_UserRepository],
    exports: [E_UserService , E_UserRepository],
})
export class E_UserModule {}