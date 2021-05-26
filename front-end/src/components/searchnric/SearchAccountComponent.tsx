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
        result_statement : '',
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

    checkValidation(){
        if(this.state.e_nric === ''){
            const result = (
                <p style={{'color' : 'red'}}>
                    Please fill in the NRIC.
                </p>
            );
            this.setState({'result_statement' : result});
            return false;
        }
        return true;
    }

    updateStatement = () => {
        if(this.state.result.length === 0) {
          const result = (
              <p style={{'color' : 'red'}}>
                  No result found.
              </p>
          );
          this.setState({'result_statement' : result});
        }
        else {
          this.update_list(this.state.result);
          const result = (
              <p style={{'color' : 'green'}}>
                  Successfully obtained record.
              </p>
          );
          this.setState({'result_statement' : result});
        }
      };

    submitHandler = (e: any) => {
        e.preventDefault();
        const e_nric = this.state.e_nric;

        if(!this.checkValidation()){
            return;
        }
        
        searchENRIC_API(e_nric).then(res => {
                console.log(res);
                this.onSearchResultID(res.data);
                this.updateStatement();
            })
            .catch(err => {
                console.log(err);
                this.updateStatement();
            });
    }

    render() {
        const {e_nric, result_statement} = this.state;

        return (
            <div className="account-typical-content-div">
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Search NRIC: </label>
                        <input type="text" name="e_nric" value={e_nric} onChange={this.changeHandler}/>
                        <button type="submit" className="inlineBtn">Search</button>
                    </div>
                </form>
                <div>{result_statement}</div>
            </div>
        );
    }
}