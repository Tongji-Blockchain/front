import React, {Component} from 'react';
import { Button, Space } from 'antd';

export default class Test2 extends Component {

    state = {
        "a": 1
    }

    componentDidMount() {

    }

    plus = () => {
        this.setState({"a": this.state.a + 1})
    }

    render() {
        // const a = thisstate.a;
        const {a} = this.state;
        return (
            <>
                <div>
                    { a }
                </div>
            <div>
                <Space wrap>
                    <Button onClick={this.plus} type="primary">+1</Button>
                </Space>
            </div>
            </>
        );
    }
}