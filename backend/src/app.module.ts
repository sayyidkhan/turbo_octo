import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LocationModule} from './location/location.module';
import {E_UserModule} from "./e_user/e_User.module";
import {AlertListModule} from "./alert_list/alertlist.module";
import {VaccineModule} from "./vaccine/vaccine.module";
import {P_UserModule} from "./p_user/p_user.module";
import {CtracingModule} from "./ctracing/ctracing.module";
import {HealthcareAlertModule} from "./healthcare_alert/healthcareAlert.module";


const DATABASE_NAME = "demo";

@Module({
  imports: [
      MongooseModule.forRoot(`mongodb://localhost/${DATABASE_NAME}`, { useFindAndModify: false }),
      LocationModule,
      E_UserModule,
      AlertListModule,
      VaccineModule,
      P_UserModule,
      CtracingModule,
      HealthcareAlertModule,
      //add new modules below here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
