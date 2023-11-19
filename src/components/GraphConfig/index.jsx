import React, {Component} from 'react';
import {Table, Space, Select, Badge, Dropdown, Menu, Button, message} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {nanoid} from "nanoid";
import * as api from "../../api/api";
import {getResult, addSlash} from "../../utils/helper";

const {Option} = Select;


export default class GraphConfig extends Component {

    state = {
        nodeTypeList: [],   // 全部节点类型
        pList: [],  //
        data: []
    }

    getNodeTypeO = () => {
        const {dbname, token, nodeTypeP} = this.props;
        let eql = "";
        let ans = "ANS "
        nodeTypeP.map((n, index) => {
            eql += "?x" + (index + 1).toString() + ":" + n + ":?y" + (index + 1).toString() + " \\unlimit,";
            ans += "?y" + (index + 1).toString() + ",";
        })
        eql += ans.slice(0, -1);
        api.getEqlId(eql, dbname, token).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                this.istartNodeTypeO = 0;
                this.getNodeTypeOResultInterval = setInterval(getResult(
                    eql_id,
                    () => {
                        return this.istartNodeTypeO
                    },
                    () => {
                        this.istartNodeTypeO += 1
                    },
                    () => {
                        this.istartNodeTypeO = -1
                    },
                    () => {
                        clearInterval(this.getNodeTypeOResultInterval)
                    },
                    (row) => {
                        row.map(variable => {
                            let {nodeTypeList} = this.state;
                            nodeTypeList.push(variable.label);
                            nodeTypeList = Array.from(new Set(nodeTypeList));
                            setTimeout(() => {
                                this.setState({
                                    nodeTypeList
                                })
                            }, 0);
                        })
                    }
                ), 1000);
            }
        })
    }

    componentDidMount() {
        const {data} = this.props;
        if (data.length > 0) {
            this.getNodeTypeO();
            this.setState({data}, () => {
                data.map((d, index) => {
                    this.getPListByNodeType(d.chosenNodeType, index);
                    this.getQListByNodeType(d.chosenNodeType, index);
                })
            })
        }
    }

    getPListByNodeType = (nodeType, index) => {
        const {dbname, token, nodeTypeP} = this.props;

        let eql = "";
        let q = "";
        let ans = "ANS "
        nodeTypeP.map((n, index) => {
            eql += "?x" + (index + 1).toString() + ":" + n + ":" + nodeType + " \\unlimit,";
            q += "?x" + (index + 1).toString() + ":?y" + (index + 1).toString() + ":?z" + (index + 1).toString() + " \\unlimit,"
            ans += "?y" + (index + 1).toString() + ",";
        })
        eql += q
        eql += ans.slice(0, -1);
        api.getEqlId(eql, dbname, token).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                let istart = nanoid();
                let interval = istart + "_interval";
                this[istart] = 0;
                this[interval] = setInterval(getResult(
                    eql_id,
                    () => {
                        return this[istart]
                    },
                    () => {
                        this[istart] += 1
                    },
                    () => {
                        this[istart] = -1
                    },
                    () => {
                        clearInterval(this[interval])
                    },
                    (row) => {
                        row.map(variable => {
                            let {data} = this.state;
                            data[index].pList.push(variable.label);
                            data[index].pList = Array.from(new Set(data[index].pList))
                            setTimeout(() => {
                                this.setState({
                                    data
                                })
                            }, 0);
                        })
                    }
                ), 1000);
            }
        })
    }

    getQListByNodeType = (nodeType, index) => {
        const {dbname, token, nodeTypeP} = this.props;
        let eql = "";
        let q = "";
        let ans = "ANS "
        nodeTypeP.map((n, index) => {
            eql += "?x" + (index + 1).toString() + ":" + n + ":" + nodeType + " \\unlimit,";
            q += "?x" + (index + 1).toString() + ":?:?(?y" + (index + 1).toString() + ")" + " \\unlimit,"
            ans += "?y" + (index + 1).toString() + ",";
        })
        eql += q
        eql += ans.slice(0, -1);
        console.log("============>", eql);


        // const eql = `?x1:性质:${nodeType} \\unlimit, ?x1:?x2:?x3(?y) \\unlimit, ANS ?y`;
        api.getEqlId(eql, dbname, token).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                let istart = nanoid();
                let interval = istart + "_interval";
                this[istart] = 0;
                this[interval] = setInterval(getResult(
                    eql_id,
                    () => {
                        return this[istart]
                    },
                    () => {
                        this[istart] += 1
                    },
                    () => {
                        this[istart] = -1
                    },
                    () => {
                        clearInterval(this[interval])
                    },
                    (row) => {
                        row.map(variable => {
                            let {data} = this.state;
                            if (variable.label.length > 0) {
                                let qvList = variable.label[0];
                                qvList = JSON.parse(qvList.replace(/'/g, '"'));
                                const qs = Object.keys(qvList);
                                qs.map(q => {
                                    data[index].qList.push(q);
                                })
                                data[index].qList = Array.from(new Set(data[index].qList));
                                setTimeout(() => {
                                    this.setState({
                                        data
                                    })
                                }, 0);
                            }
                        })
                    }
                ), 1000);
            }
        })
    }


    handleSelectPropertyP = (value, index) => {
        let newPropertyP = [];
        value.map(v => {
            newPropertyP.push(v.label)
        })
        let {data} = this.state;
        data[index].propertyP = newPropertyP;
        this.setState({data})
    }

    handleSelectEdgeP = (value, index) => {
        let newEdgeP = [];
        value.map(v => {
            newEdgeP.push(v.label)
        })
        let {data} = this.state;
        data[index].edgeP = newEdgeP;
        this.setState({data})
    }

    handleSelectPropertyQ = (value, index) => {
        let newPropertyQ = [];
        value.map(v => {
            newPropertyQ.push(v.label)
        })
        let {data} = this.state;
        data[index].propertyQ = newPropertyQ;
        this.setState({data})
    }

    handleSelectFilterKey = (nodeType, value, outerTableKey, index) => {
        const {dbname, token, nodeTypeP} = this.props;

        let eql = "";
        let q = "";
        let ans = "ANS ";
        nodeTypeP.map((n, index) => {
            eql += "?x" + (index + 1).toString() + ":" + n + ":" + nodeType + " \\unlimit,";
            q += "?x" + (index + 1).toString() + ":" + value + ":?y" + (index + 1).toString() + " \\unlimit,";
            ans += "?y" + (index + 1).toString() + ",";
        })
        eql += q;
        eql += ans.slice(0, -1)
        api.getEqlId(eql, dbname, token).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                let istart = nanoid();
                let interval = istart + "_interval";
                this[istart] = 0;
                this[interval] = setInterval(getResult(
                    eql_id,
                    () => {
                        return this[istart]
                    },
                    () => {
                        this[istart] += 1
                    },
                    () => {
                        this[istart] = -1
                    },
                    () => {
                        clearInterval(this[interval])
                    },
                    (row) => {
                        row.map(variable => {
                            let {data} = this.state;
                            data.filter(d => {
                                if (d.key === outerTableKey) {
                                    d.filter[index].filterValueList.push(variable.label);
                                    d.filter[index].filterValueList = Array.from(new Set(d.filter[index].filterValueList));
                                }
                            })
                            setTimeout(() => {
                                this.setState({
                                    data
                                })
                            }, 0);
                        })
                    }
                ), 1000);
            }
        })
    }

    saveConfig = () => {
        let {nodeTypeP, dbname, token} = this.props;
        let {data} = this.state;

        let newData = data.map(d => {
            const {pList, qList, ...newD} = d;
            return newD
        })
        const config2save = {
            nodeTypeP,
            newData
        }

        console.log("=====>", config2save);

        let enc = encodeURI(JSON.stringify(config2save));
        // let dec = JSON.parse(decodeURI(enc));
        // console.log("=====>", addSlash(enc));
        // console.log("=====>", dec);
        // console.log("=====>", dec.nodeTypeP);

        const eql = `\\suggest add 图:配置:描述(配置:${addSlash(enc)})`;

        api.getEqlId(eql).then(res => {
            if (res.eql_id) {
                const {eql_id} = res;
                api.agreeInsert(eql_id).then(res => {
                    if (res["accepted"] === "true") {
                        message.success("图数据库创建成功！")
                        this.props.history.push('/graph');
                    }
                })
            }
        })
    }

    render() {
        const {nodeTypeList, pList, data} = this.state;

        console.log("+++++++>", nodeTypeList, pList, data);

        let expandedRowRender = (e) => {
            const outerTableKey = e.key;
            const columns = [
                {
                    title: '筛选节点属性',
                    dataIndex: 'node_k_filter',
                    key: 'node_k_filter',
                    render: (text, record, index) => {
                        return (
                            <>
                                <Select
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(_, value) => {
                                        this.handleSelectFilterKey(e.chosenNodeType, value.children, outerTableKey, index);
                                        data.filter(d => {
                                            if (d.key === outerTableKey) {
                                                d.filter[index].filterKey = value.children;
                                            }
                                        })
                                        this.setState({data});
                                    }}
                                >
                                    {e.pList.map(p => {
                                        return <Option key={nanoid()}>{p}</Option>
                                    })}
                                </Select>
                            </>
                        )
                    }

                },
                {
                    title: '筛选节点属性值',
                    dataIndex: 'node_v_filter',
                    key: 'node_v_filter',
                    render: (text, record, index) => {
                        return (
                            <>
                                <Select
                                    labelInValue
                                    mode="multiple"
                                    allowClear
                                    style={{width: '100%'}}
                                    placeholder="请选择..."
                                    defaultValue={
                                        data.filter(d => {
                                            if (d.key === outerTableKey) {
                                                return d;
                                            }
                                        })[0].filter[index].filterValueList}
                                    onChange={(_, value) => {
                                        data.filter(d => {
                                            if (d.key === outerTableKey) {
                                                d.filter[index].filterValue = value.label;
                                            }
                                        })
                                        this.setState({data});
                                    }}
                                >
                                    {
                                        data.filter(d => {
                                            if (d.key === outerTableKey) {
                                                return d;
                                            }
                                        })[0].filter[index].filterValueList.map(v => {
                                            return <Option key={nanoid()}>{v}</Option>
                                        })
                                    }
                                </Select>
                            </>
                        )
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: () => (
                        <a>删除</a>
                    ),
                },
            ];
            const subData = e.filter;
            console.log(subData);
            return <Table columns={columns} dataSource={subData} pagination={false}/>;
        }
        let columns = [
            {
                title: '选择节点类型',
                key: 'pList',
                dataIndex: 'pList',
                render: (text, record, index) => {
                    return (
                        <>
                            <Select
                                allowClear
                                showSearch
                                style={{width: 200}}
                                placeholder="请选择..."
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                defaultValue={data[index].chosenNodeType}
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                onChange={(_, value) => {
                                    data[index].chosenNodeType = value.children;
                                    this.setState({data})
                                    this.getPListByNodeType(value.children, index);
                                    this.getQListByNodeType(value.children, index);
                                }}
                            >
                                {nodeTypeList.map(nodeType => {
                                    return <Option key={nanoid()}>{nodeType}</Option>
                                })}
                            </Select>
                        </>
                    )
                }
            },
            {
                title: '选择节点属性',
                key: 'propertyP',
                dataIndex: 'propertyP',
                render: (text, record, index) => {
                    const {pList} = record;
                    return (
                        <>
                            <Select
                                labelInValue
                                mode="multiple"
                                allowClear
                                style={{width: '100%'}}
                                placeholder="请选择..."
                                key={data[index].propertyP}
                                defaultValue={data[index].propertyP}
                                onChange={(value) => {
                                    this.handleSelectPropertyP(value, index);
                                }}
                            >
                                {pList.map(p => {
                                    return <Option key={nanoid()}>{p}</Option>
                                })}
                            </Select>
                        </>
                    )
                }
            },
            {
                title: '配置边',
                dataIndex: 'edgeP',
                key: 'edgeP',
                render: (text, record, index) => {
                    const {pList} = record;
                    return (
                        <>
                            <Select
                                labelInValue
                                mode="multiple"
                                allowClear
                                style={{width: '100%'}}
                                placeholder="请选择..."
                                key={data[index].edgeP}
                                defaultValue={data[index].edgeP}
                                onChange={(value) => {
                                    this.handleSelectEdgeP(value, index);
                                }}
                            >
                                {pList.map(p => {
                                    return <Option key={nanoid()}>{p}</Option>
                                })}
                            </Select>
                        </>
                    )
                }
            },
            {
                title: '配置边属性',
                dataIndex: 'propertyQ',
                key: 'propertyQ',
                render: (text, record, index) => {
                    const {qList} = record;
                    return (
                        <>
                            <Select
                                labelInValue
                                mode="multiple"
                                allowClear
                                style={{width: '100%'}}
                                placeholder="请选择..."
                                key={data[index].propertyQ}
                                defaultValue={data[index].propertyQ}
                                onChange={(value) => {
                                    this.handleSelectPropertyQ(value, index);
                                }}
                            >
                                {qList.map(q => {
                                    return <Option key={nanoid()}>{q}</Option>
                                })}
                            </Select>
                        </>
                    )
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => {
                            data.filter(d => {
                                if (d.key === record.key) {
                                    if (d.filter.length > 0) {
                                        if (d.filter[d.filter.length - 1].filterKey === "") {
                                            return
                                        }
                                    }
                                    let newDFilter = [...d.filter];
                                    newDFilter.push(
                                        {
                                            filterKey: "",
                                            filterValueList: [],
                                            filterValue: ""
                                        }
                                    )
                                    d.filter = newDFilter;
                                }
                            })
                            this.setState({data: [...data]});
                        }}>添加筛选</a>
                        <a>删除</a>
                    </Space>
                ),
            },
        ];
        return (
            <div>
                <Button type="primary" onClick={() => {
                    if (nodeTypeList.length === 0) {
                        this.getNodeTypeO();
                    }

                    if (data.length > 0) {
                        if (data[data.length - 1].chosenNodeType === "") {
                            return;
                        }
                    }
                    data.push(
                        {
                            key: nanoid(),
                            chosenNodeType: "",
                            pList: [],
                            propertyP: [],
                            edgeP: [],
                            qList: [],
                            propertyQ: [],
                            filter: [],
                        }
                    );
                    this.setState({data: [...data]})
                }}>
                    新增规则
                </Button>
                <Table
                    expandable={{expandedRowRender}}
                    dataSource={data}
                    columns={columns}
                />

                <br/>
                <Button onClick={this.saveConfig}>保存</Button>
                <Button type="primary">创建</Button>
            </div>
        );
    }
}
