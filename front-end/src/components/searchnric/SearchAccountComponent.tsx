import {Component} from "react";
import {searchENRIC_API} from "./api/searchnric_api";
import './SearchNRICComponent.css';

interface SearchNricProps {
    callback_function : Function;
}

export default class SearchAccountComponent extends Component<SearchNricProps> {

    state = {
        e_nric: '',
        result : [],
    }

    update_list(result : any) {
        this.props.callback_function(result);
    }


    onSearchResultID = async (updatedInfo : any) => {
        await this.setState({result : updatedInfo});
        await this.update_list(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const e_nric = this.state.e_nric;
        
        searchENRIC_API(e_nric).then(res => {
                console.log(res);
                this.onSearchResultID(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const {e_nric} = this.state;
        return (
            <div className="account-typical-content-div">
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Search NRIC: </label>
                        <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler}/>
                        <button type="submit" className="inlineBtn">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}