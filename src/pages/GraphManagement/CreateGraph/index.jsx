import React, {Component} from "react";
import {Breadcrumb, Button, message, Steps, Card, Form, Input, Select, Row, Col} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {SketchPicker} from 'react-color';
import * as api from '../../../api/api';
import styles from './index.module.css';
import {nanoid} from 'nanoid';
import {getResult} from "../../../utils/helper";
import GraphConfig from "../../../components/GraphConfig";
const {Option} = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}



export default class CreateGraph extends Component {

    state = {
        dbname: "",
        token: "",
        pList: [],
        nodeTypeP: [],
        graphList: [],
        data: []
    }

    getGraphList = () => {
        const eql = "图:配置:描述(配置:?x) \\unlimit";
        api.getEqlId(eql).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                this.istart = 0;
                this.getResultInterval = setInterval(
                    getResult(
                        eql_id,
                        () => {
                            return this.istart
                        },
                        () => {
                            this.istart += 1
                        },
                        () => {
                            this.istart -= 1
                        },
                        () => {
                            clearInterval(this.getResultInterval)
                        },
                        (row) => {
                            let {graphList} = this.state;
                            let newGraph = {};
                            row.map(variable => {
                                if (variable.var === "?x") {
                                    newGraph = variable.label;
                                }
                            })
                            graphList.push(newGraph)
                            setTimeout(() => {
                                this.setState({graphList})
                            }, 0);
                        }
                    ), 1000);
            }
        })
    }

    componentDidMount() {
        this.getGraphList();
    }

    getPList = () => {
        const {dbname, token} = this.state;
        const eql = "?x:?y:?z \\unlimit, ANS ?y";
        this.setState({pList: []}, () => {
            api.getEqlId(eql, dbname, token).then(res => {
                if (res.eql_id) {
                    const {eql_id} = res;
                    this.istartPList = 0;
                    this.getPListResultInterval = setInterval(
                        getResult(
                            eql_id,
                            () => {return this.istartPList},
                            () => {this.istartPList += 1},
                            () => {this.istartPList -= 1},
                            () => {clearInterval(this.getPListResultInterval)},
                            (row) => {
                                row.map(v => {
                                    const varName = v.var;
                                    const varLabel = v.label;
                                    let {pList} = this.state;
                                    if (varName === "?y") {
                                        pList.push(varLabel);
                                        setTimeout(() => {this.setState({pList})}, 0);
                                    }
                                })
                            }
                        ), 1000
                    )

                }
            })
        })
    }

    handleSelectNodeTypeP = (value) => {
        let newNodeTypeP = [];
        value.map(v => {
            newNodeTypeP.push(v.label)
        })
        this.setState({nodeTypeP: newNodeTypeP})
    }

    connectDB = (values) => {
        const {graphList} = this.state;
        const {dbname, username, password} = values;
        api.login(username, password).then(res => {
            if (res["accepted"] === "true") {
                const {databases, token} = res;
                if (databases.indexOf(dbname) !== -1) {
                    message.success("数据库连接成功！")
                    this.setState({dbname, token}, () => {
                        this.getPList();
                        if (graphList.length > 0) {     // 修改配置
                            let config = JSON.parse(decodeURI(graphList[0]));
                            let newData = config.newData.map(d => {
                                d.pList = [];
                                d.qList = [];
                                return d;
                            })
                            this.setState({
                                nodeTypeP: config.nodeTypeP,
                                data: newData
                            })
                        }
                    })
                } else {
                    message.error("数据库名错误！")
                }
            } else {
                message.error("用户名或密码错误！")
            }
        })
    }

    render() {
        const {dbname, token, pList, nodeTypeP, data} = this.state;
        console.log("NODETYPEP", [...nodeTypeP]);
        return (
            <>
                <Breadcrumb style={{margin: '16px 0',}}>
                    <Breadcrumb.Item>图数据库管理</Breadcrumb.Item>
                    <Breadcrumb.Item>创建图数据库</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                    <p>Step 1 连接源数据库</p>
                    <Form name="horizontal_login" layout="inline" autoComplete="off" onFinish={this.connectDB}>
                        <Form.Item
                            name="dbname"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入数据库名称！',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="数据库名称" />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名！',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item shouldUpdate>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    连接
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                    {
                        token === "" ? <></> : <p style={{marginTop: "10px", color: "red"}}>恭喜，数据库 <i><b>{dbname}</b></i> 连接成功！您现在可以开始进行后续导入操作了！</p>
                    }
                </Card>

                {
                    token === "" ? <></> : <>
                        <Card>
                            <p>Step 2 配置性质描述</p>
                            <Row>
                                <Col span={4}/>
                                <Col span={16}>
                                    <p>选择若干表达"节点性质"语义的p字段</p>
                                    <Select
                                        labelInValue
                                        mode="multiple"
                                        allowClear
                                        style={{width: '100%'}}
                                        placeholder="请选择..."
                                        key={[...nodeTypeP]}
                                        defaultValue={[...nodeTypeP]}
                                        onChange={this.handleSelectNodeTypeP}
                                    >
                                        {pList.map(p => {
                                            return <Option key={nanoid()}>{p}</Option>
                                        })}
                                    </Select>
                                </Col>
                                <Col span={4}/>
                            </Row>
                        </Card>
                    </>
                }

                {
                    nodeTypeP.length === 0 ? <></> : <>
                        <Card>
                            <p>Step 3 配置图数据库</p>
                            <GraphConfig dbname={dbname} token={token} nodeTypeP={nodeTypeP} data={data}/>
                        </Card>
                    </>
                }

            </>
        );
    }
}
