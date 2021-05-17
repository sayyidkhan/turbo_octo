import {Component} from 'react';
import './vaccCert.css';
import octo from '../../img/octo.png'

interface IProps {
    userData : any;
}

interface IState {
}

export class VaccCertComponent extends Component<IProps, IState> {

    state = {
        loadingStatus : true,
        status : 0,
        result : []
    }

    render() {
        console.log(this.props.userData);
        const v = this.props.userData.v_cert;
        const p = this.props.userData.p_nric;
        const e = this.props.userData.e_nric;

        return (
            <div className='VaccCert-wrapper'>
                <table>
                    <tr>
                        <td>{v.v_cert_id}</td>
                        <td><h3>Certification of Vaccination</h3></td>
                        <td>{v.v_date}</td>
                    </tr>
                </table>
                <img src={octo} className="center" alt="Insert Octo pic"/>
                <table>
                    <tr>
                        <div className='left'><td>{p.p_nric}, {p.firstname} {p.lastname}</td></div>
                        <div className='right'><td>{e.e_nric}, {e.firstname} {e.lastname}</td></div>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
}