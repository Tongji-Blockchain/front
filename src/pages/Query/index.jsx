import React, {Component} from 'react';
import {Input, List} from 'antd';
import * as api from "../../api/api";
import {getResult} from "../../utils/helper";

const {Search} = Input;

export default class Query extends Component {

    state = {
        queryResult: []
    }

    //?x1:性质:人类 \unlimit, ?x1:?x2:?x3(?x4:?x5) \unlimit, ANS ?x2, ?x4
    query = (eql) => {
        this.setState({queryResult: []}, () => {
            api.getEqlId(eql).then(res => {
                if (res.eql_id) {
                    const {eql_id} = res;
                    this.istartQuery = 0;
                    this.queryInterval = setInterval(getResult(
                        eql_id,
                        () => {
                            return this.istartQuery
                        },
                        () => {
                            this.istartQuery += 1
                        },
                        () => {
                            this.istartQuery = -1
                        },
                        () => {
                            clearInterval(this.queryInterval)
                        },
                        (row) => {
                            let newRow = "";
                            row.map(variable => {
                                const varName = variable.var;
                                const varLabel = variable.label;
                                newRow += varName + "=" + varLabel + " , "
                            })
                            let {queryResult} = this.state;
                            queryResult.push(newRow)
                            setTimeout(() => {
                                this.setState({
                                    queryResult
                                })
                            }, 0);
                        }
                    ), 1000);
                }
            })
        })
    }

    componentDidMount() {

        console.log("=========> LOGIN")
    }


    render() {
        const {queryResult} = this.state;
        console.log("=====>", queryResult)
        return (
            <>
                <br/><br/><br/>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={this.query}
                />

                <List
                    size="small"
                    header={<div>查询结果</div>}
                    footer={<div></div>}
                    bordered
                    dataSource={queryResult}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </>
        );
    }
}
