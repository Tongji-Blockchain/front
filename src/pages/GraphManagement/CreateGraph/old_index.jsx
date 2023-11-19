import React, {Component} from "react";
import {Breadcrumb, Button, message, Steps, Card, Form, Input, Select, Row, Col} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {SketchPicker} from 'react-color';
import * as api from '../../../api/api';
import styles from './index.module.css';
import {nanoid} from 'nanoid';

const {Step} = Steps;
const {Option} = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const steps = [
    {
        title: '基本信息',
        content: 'First-content',
    },
    {
        title: '配置性质描述',
        content: 'Second-content',
    },
    {
        title: '配置节点性质',
        content: 'Last-content',
    },
    {
        title: '配置节点属性',
        content: 'Last-content',
    },
    {
        title: '配置边',
        content: 'Last-content',
    },
    {
        title: '配置边属性',
        content: 'Last-content',
    },
];

export default class CreateGraph extends Component {

    state = {
        collapsed: false,
        loading: false,
        currentStep: 0,
        pList: [],
        qList: [],
        name: "",
        des: "",
        nodeTypeP: [],
        allNodeTypeO: [],
        selectedNodeTypeO: [],
        edgeP: [],
        propertyP: [],
        propertyQ: [],
    }

    componentDidMount() {
        this.getPList();
        this.getQList();
    }

    getPList = () => {
        const eql = "?x:?y:?z \\unlimit, ANS ?y";
        api.getEqlId(eql).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                this.istartPList = 0;
                this.getPListResultInterval = setInterval(this.getPListResult(eql_id), 1000);
            }
        })
    }

    getQList = () => {
        const eql = "?x1:?x2:?x3(?y) \\unlimit, ANS ?y";
        api.getEqlId(eql).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                this.istartQList = 0;
                this.getQListResultInterval = setInterval(this.getQListResult(eql_id), 1000);
            }
        })
    }

    getNodeTypeO = () => {
        const {nodeTypeP} = this.state;
        let eql = ""
        let ans = "ANS "
        nodeTypeP.map((p, index) => {
            eql += "?x" + (index + 1).toString() + ":" + p + ":?y" + (index + 1).toString() + " \\unlimit, ";
            ans += "?y" + (index + 1).toString() + ",";
        })
        eql += ans.slice(0, -1);
        console.log(eql);
        api.getEqlId(eql).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                console.log(eql_id);
                this.istartNodeTypeO = 0;
                this.getNodeTypeOResultInterval = setInterval(this.getAllNodeTypeOResult(eql_id), 1000);
            }
        })
    }

    getPListResult = (eql_id) => {
        return () => {
            let {pList} = this.state;
            if (this.istartPList >= 0) {
                api.getResult(eql_id, this.istartPList).then(res => {
                    res.map(r => {
                        if (r.s === "running") {
                            this.istartPList += 1;
                        } else if (r.s === "output") {
                            this.istartPList += 1
                            JSON.parse(r.r).map(variable => {
                                if (variable.var === "?y") {
                                    pList.push(variable.label);
                                }
                            })
                        } else {
                            this.istartPList = -1
                            clearInterval(this.getPListResultInterval);
                        }
                    })
                    this.setState({pList})
                })
            }
        }
    }

    getQListResult = (eql_id) => {
        return () => {
            let {qList} = this.state;
            if (this.istartQList >= 0) {
                api.getResult(eql_id, this.istartQList).then(res => {
                    res.map(r => {
                        if (r.s === "running") {
                            this.istartQList += 1;
                        } else if (r.s === "output") {
                            this.istartQList += 1
                            JSON.parse(r.r).map(variable => {
                                if (variable.var === "?y") {
                                    if (variable.label.length > 0) {
                                        let qvList = variable.label[0];
                                        qvList = JSON.parse(qvList.replace(/'/g, '"'));
                                        const qs = Object.keys(qvList);
                                        qs.map(q => {
                                            qList.push(q);
                                        })
                                    }
                                }
                            })
                        } else {
                            this.istartQList = -1
                            clearInterval(this.getQListResultInterval);
                        }
                    })
                    this.setState({qList})
                })
            }
        }
    }

    getAllNodeTypeOResult = (eql_id) => {
        return () => {
            let {allNodeTypeO} = this.state;
            if (this.istartNodeTypeO >= 0) {
                api.getResult(eql_id, this.istartNodeTypeO).then(res => {
                    res.map(r => {
                        if (r.s === "running") {
                            this.istartNodeTypeO += 1;
                        } else if (r.s === "output") {
                            this.istartNodeTypeO += 1
                            JSON.parse(r.r).map(variable => {
                                allNodeTypeO.push(variable.label);
                            })
                        } else {
                            this.istartNodeTypeO = -1
                            clearInterval(this.getNodeTypeOResultInterval);
                        }
                    })
                    this.setState({allNodeTypeO})
                })
            }
        }
    }

    handleSelectNodeTypeP = (value) => {
        console.log("123123", value);
        let newNodeTypeP = [];
        value.map(v => {
            newNodeTypeP.push(v.label)
        })
        this.setState({nodeTypeP: newNodeTypeP})
    }

    handleSelectNodeTypeO = (value) => {
        let newSelectedNodeTypeO = [];
        value.map(v => {
            newSelectedNodeTypeO.push(v.label)
        })
        this.setState({selectedNodeTypeO: newSelectedNodeTypeO})
    }

    handleSelectPropertyP = (value) => {
        let newPropertyP = [];
        value.map(v => {
            newPropertyP.push(v.label)
        })
        this.setState({propertyP: newPropertyP})
    }

    handleSelectEdgeP = (value) => {
        let newEdgeP = [];
        value.map(v => {
            newEdgeP.push(v.label)
        })
        this.setState({edgeP: newEdgeP})
    }

    handleSelectPropertyQ = (value) => {
        let newPropertyQ = [];
        value.map(v => {
            newPropertyQ.push(v.label)
        })
        this.setState({propertyQ: newPropertyQ})
    }

    nextStep = () => {
        const {currentStep, nodeTypeP, name, des} = this.state;
        if (currentStep === 0) {
            if (name === "" || des === "") {
                message.warn("请填写数据库名称与简介！")
                return
            }
        } else if (currentStep === 1) {
            if (nodeTypeP.length === 0) {
                message.warn("请至少选择一个描述节点性质的p字段")
                return
            } else {
                this.setState({allNodeTypeO: []}, () => {
                    this.getNodeTypeO();
                })
            }
        }
        this.setState({currentStep: currentStep + 1});
    }

    submit = () => {
        const {name, des, nodeTypeP, selectedNodeTypeO, edgeP, propertyP, propertyQ} = this.state;
        let eqls = [];
        eqls.push("\\suggest add " + name + ":性质:_graph(描述:" + des + ")")
        nodeTypeP.map(ntp => {
            eqls.push("\\suggest add " + name + ":nodetype_p:" + ntp)
        })
        selectedNodeTypeO.map(nto => {
            eqls.push("\\suggest add " + name + ":nodetype_o:" + nto)
        })
        edgeP.map(ep => {
            eqls.push("\\suggest add " + name + ":edge_p:" + ep)
        })
        propertyP.map(pp => {
            eqls.push("\\suggest add " + name + ":property_p:" + pp)
        })
        propertyQ.map(pq => {
            eqls.push("\\suggest add " + name + ":property_q:" + pq)
        })
        try {
            eqls.map(eql => {
                api.getEqlId(eql).then(res => {
                    if (res.eql_id) {
                        const {eql_id} = res;
                        api.agreeInsert(eql_id).then(res => {})
                    }
                })
            })
            message.success("图数据库创建成功！")
            this.props.history.push('/graph');
        } catch (e) {
            console.log(e);
        }
    }

    prevStep = () => {
        const {currentStep} = this.state;
        this.setState({currentStep: currentStep - 1});
    }

    render() {
        const {name, des, currentStep, pList, nodeTypeP, allNodeTypeO, selectedNodeTypeO, propertyP, edgeP, propertyQ} = this.state;
        let {qList} = this.state;
        qList = Array.from(new Set(qList));

        return (
            <>
                <Breadcrumb style={{margin: '16px 0',}}>
                    <Breadcrumb.Item>图数据库管理</Breadcrumb.Item>
                    <Breadcrumb.Item>创建图数据库</Breadcrumb.Item>
                </Breadcrumb>

                {/*<Button type="primary" icon={<PlusOutlined />} size="medium" onClick={() => {*/}
                {/*    api.getEqlId("\\suggest add 测试图3:性质:_graph(描述:测试图3的描述)").then(res => {*/}
                {/*        if (res.eql_id) {*/}
                {/*            const {eql_id} = res;*/}
                {/*            api.agreeInsert(eql_id).then(res => {*/}
                {/*                if (res.accepted === "true") {*/}
                {/*                    message.success("创建成功！");*/}
                {/*                }*/}
                {/*            })*/}
                {/*        }*/}
                {/*    })*/}
                {/*}}>创建</Button>*/}


                <Card>
                    <Steps current={currentStep}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                    <div className={styles.stepsContent}>
                        <br/><br/>
                        {
                            currentStep === 0 ? <>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 10,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    // onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="图数据库名称"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input defaultValue={name} onChange={(e) => {this.setState({name: e.target.value})}}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="图数据库简介"
                                        name="des"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={5} defaultValue={des} onChange={(e) => {this.setState({des: e.target.value})}}/>
                                    </Form.Item>
                                </Form>
                            </> : <></>
                        }
                        {
                            currentStep === 1 ? <>
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
                                            defaultValue={nodeTypeP}
                                            onChange={this.handleSelectNodeTypeP}
                                        >
                                            {pList.map(p => {
                                                return <Option key={nanoid()}>{p}</Option>
                                            })}
                                        </Select>
                                    </Col>
                                    <Col span={4}/>
                                </Row>
                            </> : <></>
                        }
                        {
                            currentStep === 2 ? <>
                                <Row>
                                    <Col span={4}/>
                                    <Col span={16}>
                                        <p>根据您在上一步中选择的若干p字段，我们筛选出了数据库中所有节点性质。请配置您的图数据库中需要哪些性质的节点。</p>
                                        <Select
                                            labelInValue
                                            mode="multiple"
                                            allowClear
                                            style={{width: '100%'}}
                                            placeholder="Please select"
                                            defaultValue={selectedNodeTypeO}
                                            onChange={this.handleSelectNodeTypeO}
                                        >
                                            {allNodeTypeO.map(nto => {
                                                return <Option key={nanoid()}>{nto}</Option>
                                            })}
                                        </Select>
                                    </Col>
                                    <Col span={4}/>
                                </Row>
                            </> : <></>
                        }
                        {
                            currentStep === 3 ? <>
                                <Row>
                                    <Col span={4}/>
                                    <Col span={16}>
                                        <p>配置哪些p字段作为节点属性</p>
                                        <Select
                                            labelInValue
                                            mode="multiple"
                                            allowClear
                                            style={{width: '100%'}}
                                            placeholder="Please select"
                                            defaultValue={propertyP}
                                            onChange={this.handleSelectPropertyP}
                                        >
                                            {pList.map(p => {
                                                return <Option key={nanoid()}>{p}</Option>
                                            })}
                                        </Select>
                                    </Col>
                                    <Col span={4}/>
                                </Row>
                            </> : <></>
                        }
                        {
                            currentStep === 4 ? <>
                                <Row>
                                    <Col span={4}/>
                                    <Col span={16}>
                                        <p>配置哪些p字段作为边</p>
                                        <Select
                                            labelInValue
                                            mode="multiple"
                                            allowClear
                                            style={{width: '100%'}}
                                            placeholder="Please select"
                                            defaultValue={edgeP}
                                            onChange={this.handleSelectEdgeP}
                                        >
                                            {pList.map(p => {
                                                return <Option key={nanoid()}>{p}</Option>
                                            })}
                                        </Select>
                                    </Col>
                                    <Col span={4}/>
                                </Row>
                            </> : <></>
                        }
                        {
                            currentStep === 5 ? <>
                                <Row>
                                    <Col span={4}/>
                                    <Col span={16}>
                                        <p>配置哪些q字段作为边属性</p>
                                        <Select
                                            labelInValue
                                            mode="multiple"
                                            allowClear
                                            style={{width: '100%'}}
                                            placeholder="Please select"
                                            defaultValue={propertyQ}
                                            onChange={this.handleSelectPropertyQ}
                                        >
                                            {qList.map(q => {
                                                return <Option key={nanoid()}>{q}</Option>
                                            })}
                                        </Select>
                                    </Col>
                                    <Col span={4}/>
                                </Row>
                            </> : <></>
                        }
                        <br/><br/>
                    </div>
                    <div className={styles.stepsAction}>
                        {currentStep < steps.length - 1 && (
                            <Button type="primary" onClick={() => this.nextStep()}>
                                下一步
                            </Button>
                        )}
                        {currentStep === steps.length - 1 && (
                            <Button type="primary" onClick={() => this.submit()}>
                                提交
                            </Button>
                        )}
                        {currentStep > 0 && (
                            <Button style={{margin: '0 8px'}} onClick={() => this.prevStep()}>
                                上一步
                            </Button>
                        )}
                    </div>
                </Card>
            </>
        );
    }

}
