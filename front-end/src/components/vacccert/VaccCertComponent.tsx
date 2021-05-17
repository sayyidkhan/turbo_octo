import React, {Component} from 'react';
import './vaccCert.css';
import octo from '../../img/octo.png'

export class VaccCertComponent extends Component {

    state = {
        loadingStatus : true,
        status : 0,
        result : []
    }

    // componentDidMount() {
    //     getUsers_API().then(res => {
    //         const result = res;
    //         console.log(result);
    //         this.setState({'result' : res.data , 'status' : res.status });
    //     }).catch(err => {
    //         console.log(err);
    //         this.setState({'result' : [] , 'status' : err.status })
    //     });
    // }

    // createList() {
    //     //if status is success and list is not empty
    //     if(this.state.status === 200 && this.state.result.length !== 0){
    //         const myList = this.state.result;
    //         return <ScrollerComponent myList={myList} />;
    //     }
    //     else {
    //         return <p>No record.</p>
    //     }
    // }

    render() {
        return (
            <div className='VaccCert-wrapper'>
                <table>
                    <tr>
                        <td>v_cert_id</td>
                        <td><h3>Certification of Vaccination</h3></td>
                        <td>v_date</td>
                    </tr>
                </table>
                <img src={octo} className="center" alt="Insert Octo pic"/>
                <table>
                    <tr>
                        <div className='left'><td>p_nric, p_firstName, p_lastName</td></div>
                        <div className='right'><td>e_nric, e_firstName, e_lastName</td></div>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
}