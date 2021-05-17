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
        v_cert_id: '',
        v_date: '',
        p_nric: '',
        p_firstname: '',
        p_lastname: '',
        e_nric: '',
        e_firstname: '',
        e_lastname: ''
    }

    componentDidUpdate() {
        if(this.state.v_cert_id === ''){
            this.setData(this.props.userData);
        }
    }

    setData(userData : any){
        this.setState({
            v_cert_id: userData.v_cert.v_cert_id,
            v_date: userData.v_cert.v_date,
            p_nric: userData.p_nric.p_nric,
            p_firstname: userData.p_nric.firstname,
            p_lastname: userData.p_nric.lastname,
            e_nric: userData.e_nric.e_nric,
            e_firstname: userData.e_nric.firstname,
            e_lastname: userData.e_nric.lastname
        });
    }

    render() {

        const {v_cert_id, v_date, p_nric, p_firstname, p_lastname, e_nric, e_firstname, e_lastname } = this.state;

        return (
            <div className='VaccCert-wrapper'>
                <table>
                    <tr>
                        <td>{v_cert_id}</td>
                        <td><h3>Certification of Vaccination</h3></td>
                        <td>{v_date}</td>
                    </tr>
                </table>
                <img src={octo} className="center" alt="Insert Octo pic"/>
                <table>
                    <tr>
                        <div className='left'><td>{p_nric}, {p_firstname} {p_lastname}</td></div>
                        <div className='right'><td>{e_nric}, {e_firstname} {e_lastname}</td></div>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
}