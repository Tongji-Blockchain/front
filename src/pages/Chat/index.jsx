import React, {Component} from 'react';
import {Input, List, Table} from 'antd';
import chat from '../../assets/chat.png'

export default class Chat extends Component {

    state = {
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <img src={chat} style={{width: "100%", marginTop: "30px"}}/>
            </>
        );
    }
}
