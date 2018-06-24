import React, { Component} from 'react';

const WAIT_INTERVAL = 1000;

export default class TextSearchComponent extends Component{

    componentWillMount() {
        this.timer = null;
    }

    handleChange = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    }

    triggerChange = () => {
        this.props.onTextSearch(this.text.value);
    }


    render(){
        return (
            <div>
                <input type='text' ref={(input) => this.text = input}
                placeholder = 'Type Something'
                onChange={this.handleChange}
                 />
            </div>
        );
    }
}