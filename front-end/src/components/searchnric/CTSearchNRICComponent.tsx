import {Component} from "react";
import {searchnric_API} from "./api/searchnric_api";
import './SearchNRICComponent.css';

interface SearchNricProps {
    callback_function : Function;
}

export default class SearchNRIC extends Component<SearchNricProps> {

    update_list : Function;

    constructor(props: SearchNricProps) {
        super(props);
        this.update_list = this.props.callback_function;
    }

    state = {
        p_nric: '',
        result : [],
        result_statement : '',
    }

    onSearchResultID = (updatedInfo : any) => {
        this.setState({result : updatedInfo});
        this.update_list(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        const p_nric = this.state.p_nric;

        if(!this.checkValidation()){
            return;
        }

        searchnric_API(p_nric).then(res => {
                console.log(res);
                this.onSearchResultID(res.data);
                this.updateStatement();
            })
            .catch(err => {
                console.log(err);
                this.updateStatement();
            });
    }

    checkValidation(){
        if(this.state.p_nric === ''){
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
                  Successfully obtained {this.state.result.length} records.
              </p>
          );
          this.setState({'result_statement' : result});
        }
      };

    render() {
        const {p_nric, result_statement} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Search NRIC: </label>
                        <input type="text" name="p_nric" value={p_nric} onChange={this.changeHandler}/>
                        <button style={{'marginLeft':'20px'}} type="submit">Search</button>
                    </div>
                </form>
                <div>{result_statement}</div>
            </div>
        );
    }
}