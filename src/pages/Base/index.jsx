import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, message} from 'antd';
import{checkToken} from "../../utils/helper"
import {
    FileTextOutlined,
    FileAddOutlined,
    SecurityScanOutlined,
    SendOutlined,
    HomeOutlined,
    BarChartOutlined,
    DatabaseOutlined,
    InfoCircleOutlined,
    PhoneOutlined,
    KeyOutlined
} from '@ant-design/icons';
import logo from '../../assets/logo2.png'
import {NavLink} from "react-router-dom";
import {withRouter, Switch, Redirect, Route} from 'react-router-dom'
import GraphManagement from "../GraphManagement";
import CreateGraph from "../GraphManagement/CreateGraph";
import GraphInfo from "../GraphManagement/GraphInfo";
import GraphVisualization from "../GraphManagement/GraphVisualization";
import Query from "../Query";
import GraphConfig from "../../components/GraphConfig";
import FileList from "../FileList"
import AbstractReview from "../AbstractReview"
import FileAudit from "../FileAudit/index"
import NoteEditor from "../NoteEditor/index"
import FileUpload from "../FileUpload";
import Login from "../Login";
import Register from "../Register";
import Landing from "../Landing"
import Test from "../Test";
import Test2 from "../Test2";
import Chat from "../Chat";
import Center from "../center";

const {Header, Content, Footer, Sider} = Layout;


export default class Base extends Component {

    state = {
        collapsed: false,
        loading: false
    }

    

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
        });
    };

    

    componentDidMount() {
        checkToken()
        const flag=localStorage.getItem("token_vaild");
        if(flag==="N"){
            //console.log(flag)
            message.error("登录超时！请重新登录")
            this.props.history.push("/Login")
        }else{
            console.log("======BASE")
        }
    }

    render() {
        const {collapsed, loading} = this.state;
        return (
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider theme="light" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">
                        <img src={logo} alt="" style={{width: "70%", marginLeft: "15px", marginTop: "15px", paddingBottom: "10px"}}/>
                    </div>
                    <Menu theme="light" mode="inline">
                        <Menu.Item key={1} icon={<SendOutlined />}><NavLink to="/Login">登录</NavLink></Menu.Item>
                        <Menu.Item key={2} icon={<KeyOutlined />}><NavLink to="/Register">注册</NavLink></Menu.Item>
                        <Menu.Item key={3} icon={<FileTextOutlined />}><NavLink to="/file-list">文件列表</NavLink></Menu.Item>
                        <Menu.Item key={4} icon={<FileAddOutlined />}><NavLink to="/file-upload">文件上传</NavLink></Menu.Item>
                        <Menu.Item key={5} icon={<SecurityScanOutlined />}><NavLink to="/abstract-review">摘要背书</NavLink></Menu.Item>
                        <Menu.Item key={6} icon={<InfoCircleOutlined />}><NavLink to="/center">个人中心</NavLink></Menu.Item>
                        <Menu.Item key={7} icon={<HomeOutlined />}><NavLink to="/">系统详情</NavLink></Menu.Item> 
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/*<Header className="site-layout-background" style={{padding: 0, height: "10px"}}/>*/}
                    <Content style={{margin: '0 16px'}}>
                        <Route exact path="/Login" component={Login} />
                        {/*<ContentMain/>*/}
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/Login" component={Login} />
                            <Route exact path="/Register" component={Register} />
                            <Route exact path="/file-list" component={FileList} />
                            <Route exact path="/abstract-review" component={AbstractReview} />
                            <Route exact path="/file-audit/:id" component={FileAudit} />
                            <Route exact path="/file-upload" component={FileUpload} />
                            <Route exact path="/chat" component={Chat} />
                            <Route exact path="/test" component={Test} />
                            <Route exact path="/test2" component={Test2} />
                            <Route exact path="/center" component={Center} />
                            <Route exact path="/NoteEditor/:id" component={NoteEditor} />
                            {/*<Route exact path="/query" component={Query}/>*/}
                            {/*<Route exact path="/graph" component={GraphManagement}/>*/}
                            {/*<Route exact path="/graph/create" component={CreateGraph} />*/}
                            {/*<Route exact path="/graph/info" component={GraphInfo} />*/}
                            {/*<Route exact path="/graph/visualization" component={GraphVisualization} />*/}
                            {/*<Route exact path="/test" component={GraphConfig} />*/}
                        </Switch>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        文献共享批注系统 ©2023 PAI实验室版权所属{/* 上海市委网信办政务内参批注系统 */}
                    </Footer>
                </Layout>
            </Layout>
        );
    }

}