import React, {Component} from "react";
import {Breadcrumb, Button, message, Steps, Card, Form, Input, Select, Row, Col} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import * as api from '../../../api/api';
import {getResult} from "../../../utils/helper";
import {nanoid} from 'nanoid';

const {Step} = Steps;
const {Option} = Select;


export default class GraphInfo extends Component {

    state = {
        graphName: "",
        graphDes: "",
        nodeTypeP: [],
        nodeTypeO: [],
        edgeP: [],
        propertyP: [],
        propertyQ: [],
    }

    getGraphInfo = () => {
        const {graphName} = this.state;
        const eql = `${graphName}:性质:_graph(描述:?x1),${graphName}:nodetype_p:?x2,${graphName}:nodetype_o:?x3,${graphName}:edge_p:?x4,${graphName}:property_p:?x5,${graphName}:property_q:?x6`;
        api.getEqlId(eql).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                this.istartGraphInfo = 0;
                this.getGraphInfoResultInterval = setInterval(
                    getResult(
                        eql_id,
                        () => {
                            return this.istartGraphInfo
                        },
                        () => {
                            this.istartGraphInfo += 1
                        },
                        () => {
                            this.istartGraphInfo -= 1
                        },
                        () => {
                            clearInterval(this.getGraphInfoResultInterval);
                        },
                        (row) => {
                            row.map(variable => {
                                const varName = variable.var;
                                const varLabel = variable.label;
                                let {nodeTypeP, nodeTypeO, edgeP, propertyP, propertyQ} = this.state;
                                if (varName === "?x1") {
                                    setTimeout(() => {this.setState({graphDes: varLabel[0]})}, 0);
                                } else if (varName === "?x2") {
                                    nodeTypeP.push(varLabel)
                                    setTimeout(() => {this.setState({nodeTypeP})}, 0);
                                } else if (varName === "?x3") {
                                    nodeTypeO.push(varLabel)
                                    setTimeout(() => {this.setState({nodeTypeO})}, 0);
                                } else if (varName === "?x4") {
                                    edgeP.push(varLabel);
                                    setTimeout(() => {this.setState({edgeP})}, 0);
                                } else if (varName === "?x5") {
                                    propertyP.push(varLabel);
                                    setTimeout(() => {this.setState({propertyP})}, 0);
                                } else if (varName === "?x6") {
                                    propertyQ.push(varLabel);
                                    setTimeout(() => {this.setState({propertyQ})}, 0);
                                }
                            })
                        })
                    , 1000)
            }
        })
    }

    componentDidMount() {
        const {graphName} = this.props.location.state;
        this.setState({graphName}, () => {
            this.getGraphInfo();
        })
    }

    render() {
        const {graphName, graphDes, nodeTypeP, nodeTypeO, edgeP, propertyP, propertyQ} = this.state;
        return (
            <>
                <Breadcrumb style={{margin: '16px 0',}}>
                    <Breadcrumb.Item>图数据库管理</Breadcrumb.Item>
                    <Breadcrumb.Item>图数据库信息</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                    <p>
                        <b>图数据库名称</b>：{graphName}
                    </p>
                    <p>
                        <b>图数据库描述</b>：{graphDes}
                    </p>
                    <p>
                        <b>nodeTypeP</b>：{nodeTypeP.map(p => {return p + "、"})}
                    </p>
                    <p>
                        <b>nodeTypeO</b>：{nodeTypeO.map(p => {return p + "、"})}
                    </p>
                    <p>
                        <b>edgeP</b>：{edgeP.map(p => {return p + "、"})}
                    </p>
                    <p>
                        <b>propertyP</b>：{propertyP.map(p => {return p + "、"})}
                    </p>
                    <p>
                        <b>propertyQ</b>：{propertyQ.map(p => {return p + "、"})}
                    </p>
                </Card>
            </>
        );
    }

}