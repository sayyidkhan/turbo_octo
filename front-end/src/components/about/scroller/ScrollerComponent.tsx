import {Component} from "react";
import React from "react";
import './ScrollerComponent.css';

export class ScrollerComponent extends Component<{myList : any}> {
    convertListToStr = (myList : [string]) => {
        const mappedList = [...myList];
        if(mappedList.length === 0) {
            return '';
        }
        else {
            const reducer = (accumulator : string, currentValue : string) => accumulator + ", " + currentValue;
            return mappedList.reduce(reducer);
        }
    }

    render() {
        return (
            <div className="parentDiv">
                <div className="">
                    {this.props.myList.map((item :any , i : number) => {
                        return (
                            <div className="item" key={i}>
                                <p style={{'fontSize' : 12}}><b>Record No: {i+1}</b> userID : {item['userId']}</p>
                                <p style={{'fontSize' : 12}}>email: {item['email']} age: {item['age']}</p>
                                <p style={{'fontSize' : 12}}>favouriteFoods: {this.convertListToStr(item['favoriteFoods'])}</p>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        );
    }
}

//https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/class_components/