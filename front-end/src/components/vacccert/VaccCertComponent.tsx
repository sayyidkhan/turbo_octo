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

        if(this.state.v_cert_id !== this.props.userData.v_cert.v_cert_id){
            if(this.props.userData.v_cert.v_cert_id === 'error'){
                this.setState({v_cert_id: 'error'});
            }else{
                this.setData(this.props.userData);
            }
        }
    }

    setData(userData : any){
        this.setState({
            v_cert_id: userData.v_cert.v_cert_id,
            v_date: userData.v_cert.v_date.substring(0,10),
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

        if(v_cert_id === 'error'){
            return(
                <div className='msg-wrapper'>No vaccination cert found.</div>
            );

        }else if(v_cert_id !== ''){
            return (
                <div className='VaccCert-wrapper'>
                    <table>
                        <tr>
                            <td className="left">Vaccination Cert No.: <b>{v_cert_id}</b></td>
                            <td></td>
                            <td className="right">Date: <b>{v_date}</b></td>
                        </tr>
                        <tr> <td colSpan={3} className="cert-title"><h2>Certification of Vaccination</h2></td> </tr>
                    </table>
                    <img src={octo} className="center" alt="Insert Octo pic"/>
                    <table>
                        <tr>
                            <td className="left">
                                Name of Person: <br/>
                                <b>{p_nric}, {p_firstname} {p_lastname}</b>
                            </td>
                            <td></td>
                            <td className="right">
                                Issued by: <br/>
                                <b>{e_nric}, {e_firstname} {e_lastname}</b>
                            </td>
                        </tr>
                    </table>
                </div>
            );
            
        }else{
            return(
                <div></div>
            );
        }
        
    }
}