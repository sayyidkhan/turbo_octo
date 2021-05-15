import {p_user} from "../../p_user/schemas/p_user.schema";
import {E_User} from "../../e_user/schemas/e_user.schema";
import {v_cert} from "../schemas/vaccine.schema";

export class LatestVaccineDto {

    constructor(v_cert: v_cert, p_nric: p_user, e_nric: E_User) {
        this.v_cert = v_cert;
        this.p_nric = p_nric;
        this.e_nric = e_nric;
    }

    v_cert : v_cert;
    p_nric: p_user;
    e_nric: E_User;
}