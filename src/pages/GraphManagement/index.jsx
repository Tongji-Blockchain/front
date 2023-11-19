import React, {Component} from "react";
import {Layout, Breadcrumb, Button, Skeleton, Card, Col, Row, Empty, Spin} from 'antd';
import {EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined, EyeOutlined} from '@ant-design/icons';
import * as api from '../../api/api';
import {getResult} from "../../utils/helper";

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import logo from '../../assets/logo1.png'
import photoshopButton from "react-color/lib/components/photoshop/PhotoshopButton";

const {Header, Content, Footer, Sider} = Layout;
const {Meta} = Card;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

export default class GraphManagement extends Component {

    state = {
        collapsed: false,
        loading: false,
        graphList: []
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

    render() {
        const {graphList} = this.state;
        console.log("@@@", graphList);
        let config = {};
        if (graphList.length >= 1) {
            config = JSON.parse(decodeURI(graphList[0]));
        }

        return (
            <>
                <Breadcrumb style={{margin: '16px 0',}}>
                    <Breadcrumb.Item>图数据库管理</Breadcrumb.Item>
                    <Breadcrumb.Item>我的图数据库</Breadcrumb.Item>
                </Breadcrumb>
                {
                    graphList && graphList.length === 0 ? <>
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 60,
                            }}
                            description={
                                <span>
                                    没有检索到图描述信息
                                </span>
                            }
                        >
                            <Button type="primary" icon={<PlusOutlined/>} size="medium" onClick={() => {
                                this.props.history.push('/graph/create');
                            }}>建图</Button>
                        </Empty>
                    </> : <>
                        <div>
                            <p><b>表达"节点性质"语义的p字段</b></p>
                            <p>{
                                config.nodeTypeP.map((p, index) => {
                                    if (index < config.nodeTypeP.length - 1) {
                                        return p + "、"
                                    } else {
                                        return p
                                    }
                                })}</p>

                            <p><b>规则配置</b></p>
                            {
                                config.newData.map((p, index) => {
                                    return (
                                        <>
                                            <p><b>规则{index + 1}</b></p>
                                            <p>节点类型：{p.chosenNodeType}</p>
                                            <p>节点属性：{p.propertyP}</p>
                                            <p>边：{p.edgeP}</p>
                                            <p>边属性：{p.propertyQ}</p>
                                            {p.filter.map((pf, index) => {
                                                return (
                                                    <>
                                                        <p><b>筛选{index + 1}</b></p>
                                                        <p>筛选节点属性：{pf.filterKey}</p>
                                                        <p>筛选节点属性值：{pf.filterValue}</p>
                                                    </>
                                                )
                                            })}
                                        </>
                                    )
                                })
                            }

                            <Button onClick={() => {
                                this.props.history.push('/graph/create');
                            }}>修改</Button>
                            <Button type="primary">建图</Button>
                        </div>
                    </>
                }
            </>
        );
    }
}
