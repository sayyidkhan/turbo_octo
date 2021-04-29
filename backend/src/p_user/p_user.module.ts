import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { p_user, P_UserSchema } from "./schemas/p_user.schema";
import { P_UserController } from "./p_user.controller";
import { P_UserRepository } from "./p_user.repository";
import { P_UserService } from "./p_user.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: p_user.name, schema: P_UserSchema }])],
    controllers: [P_UserController],
    providers: [P_UserService, P_UserRepository]
})
export class P_UserModule {}