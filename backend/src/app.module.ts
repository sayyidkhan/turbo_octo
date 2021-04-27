import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {LocationModule} from './location/location.module';
import {E_UserModule} from "./e_user/e_User.module";
import {AlertListModule} from "./alert_list/alertlist.module";

const DATABASE_NAME = "demo";

@Module({
  imports: [
      MongooseModule.forRoot(`mongodb://localhost/${DATABASE_NAME}`, { useFindAndModify: false }),
      UsersModule,
      LocationModule,
      E_UserModule,
      AlertListModule,
      //add new modules below here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
