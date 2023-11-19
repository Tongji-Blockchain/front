import React, {Component} from "react";
import {Breadcrumb, Button, message, Steps, Card, Form, Input, Select, Row, Col} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {SketchPicker} from 'react-color';
import * as api from '../../../api/api';
import {getResult} from "../../../utils/helper";
import {nanoid} from 'nanoid';
import ReactEcharts from 'echarts-for-react';

const {Step} = Steps;
const {Option} = Select;

const option = {
    "draggable": true, "notMerge": true, "tooltip": {}, "series": [{
        "name": "Les Miserables",
        "type": "graph",
        "layout": "force",
        "draggable": true,
        "edgeSymbol": ["none", "arrow"],
        "data": [{"name": "李青歌", "symbolSize": 32}, {"name": "河南省洛阳市", "symbolSize": 23}, {
            "name": "付鲁博",
            "symbolSize": 26
        }, {"name": "河南省许昌市", "symbolSize": 23}, {"name": "贺冰", "symbolSize": 32}, {
            "name": "河南省南阳市",
            "symbolSize": 23
        }, {"name": "张瀚夫", "symbolSize": 32}, {"name": "黑龙江省牡丹江市", "symbolSize": 23}, {
            "name": "EQL项目",
            "symbolSize": 23
        }, {"name": "刘儿兀", "symbolSize": 23}],
        "links": [{"source": "李青歌", "target": "河南省洛阳市", "name": "出生地", "attr": ""}, {
            "source": "付鲁博",
            "target": "河南省许昌市",
            "name": "出生地",
            "attr": ""
        }, {"source": "贺冰", "target": "河南省南阳市", "name": "出生地", "attr": ""}, {
            "source": "张瀚夫",
            "target": "李青歌",
            "name": "伴侣",
            "attr": ""
        }, {"source": "李青歌", "target": "张瀚夫", "name": "伴侣", "attr": ""}, {
            "source": "贺冰",
            "target": "付鲁博",
            "name": "伴侣",
            "attr": ""
        }, {"source": "张瀚夫", "target": "贺冰", "name": "好友", "attr": ""}, {
            "source": "李青歌",
            "target": "贺冰",
            "name": "好友",
            "attr": ""
        }, {"source": "张瀚夫", "target": "黑龙江省牡丹江市", "name": "出生地", "attr": "{'时间': '1999年11月2日'}"}, {
            "source": "EQL项目",
            "target": "刘儿兀",
            "name": "指导教师",
            "attr": ""
        }],
        "roam": true,
        "layoutAnimation": true,
        "label": {"show": true, "position": "right"},
        "edgeLabel": {"normal": {"show": true, "position": "middle"}},
        "scaleLimit": {"min": 0.8, "max": 2},
        "lineStyle": {"color": "#black", "curveness": 0},
        "force": {"repulsion": 1000, "edgeLength": 200}
    }]
}

export default class GraphVisualization extends Component {

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
                                    setTimeout(() => {
                                        this.setState({graphDes: varLabel[0]})
                                    }, 0);
                                } else if (varName === "?x2") {
                                    nodeTypeP.push(varLabel)
                                    setTimeout(() => {
                                        this.setState({nodeTypeP})
                                    }, 0);
                                } else if (varName === "?x3") {
                                    nodeTypeO.push(varLabel)
                                    setTimeout(() => {
                                        this.setState({nodeTypeO})
                                    }, 0);
                                } else if (varName === "?x4") {
                                    edgeP.push(varLabel);
                                    setTimeout(() => {
                                        this.setState({edgeP})
                                    }, 0);
                                } else if (varName === "?x5") {
                                    propertyP.push(varLabel);
                                    setTimeout(() => {
                                        this.setState({propertyP})
                                    }, 0);
                                } else if (varName === "?x6") {
                                    propertyQ.push(varLabel);
                                    setTimeout(() => {
                                        this.setState({propertyQ})
                                    }, 0);
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
                    <Breadcrumb.Item>图数据库可视化</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                    <ReactEcharts
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{height: '80vh', width: '100%'}}
                        // theme={"theme_name"}
                        // onChartReady={this.onChartReadyCallback}
                        // onEvents={EventsDict}
                        // opts={}
                    />
                </Card>
            </>
        );
    }

}