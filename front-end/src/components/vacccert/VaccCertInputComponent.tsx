import {Component} from "react";
import axios from 'axios';
import '../login/Login.css'

interface IProps {
    getUserData(userData : any) : any;
}

interface IState {
}

export class VaccCertInputComponent extends Component<IProps, IState> {

    state = {
        'p_nric': '',
        'getData' : '',
    }

    setUserData = (userData : any) => {
        this.setState({'getData' : userData});
        this.props.getUserData(userData);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        const dto = {'p_nric':this.state.p_nric};
        this.setState({'getData' : ''});
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();

        axios.get("http://localhost:5000/vaccines/latest_vaccine_record/"+this.state.p_nric)
            .then(res=> {
                console.log(res);
                this.setUserData(res.data);
            })
            .catch(err => {
                this.props.getUserData({v_cert: {v_cert_id: 'error'}});
                console.log(err);
            });

        this.setState({p_nric: ''});
    }

    render() {
        const {p_nric} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>NRIC:</label>
                        <input type="text" name="p_nric" value={p_nric} onChange={this.changeHandler}/>
                    </div>

                    <div>
                        <button type="submit">Check</button>
                    </div>
                </form>
            </div>
        );
    }
}