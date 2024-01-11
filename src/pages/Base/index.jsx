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
    PhoneOutlined
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
import Landing from "../Landing"
import Test from "../Test";
import Test2 from "../Test2";
import Chat from "../Chat";
import center from "../center";

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
            this.props.history.push("/Landing")
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
                        <Menu.Item key={1} icon={<FileTextOutlined />}><NavLink to="/file-list">文件列表</NavLink></Menu.Item>
                        <Menu.Item key={2} icon={<FileAddOutlined />}><NavLink to="/file-upload">文件上传</NavLink></Menu.Item>
                        <Menu.Item key={3} icon={<SecurityScanOutlined />}><NavLink to="/abstract-review">摘要背书</NavLink></Menu.Item>
                        {/* <Menu.Item key={4} icon={<SendOutlined />}><NavLink to="/Login">登录</NavLink></Menu.Item> */}
                        <Menu.Item key={4} icon={<InfoCircleOutlined />}><NavLink to="/center">个人中心</NavLink></Menu.Item>
                        <Menu.Item key={5} icon={<HomeOutlined />}><NavLink to="/Landing">主页</NavLink></Menu.Item>

                        {/*<Menu.Item key={5} icon={<SendOutlined />}><NavLink to="/test">测试页面</NavLink></Menu.Item>*/}
                        {/*<Menu.Item key={6} icon={<SendOutlined />}><NavLink to="/test2">测试页面2</NavLink></Menu.Item>*/}
                        {/*<Menu.Item key={3} icon={<BarChartOutlined />}><NavLink to="/eql/manage/data">数据管理</NavLink></Menu.Item>*/}
                        {/*<Menu.Item key={4} icon={<DatabaseOutlined />}><NavLink to="currentStepmanage/database">数据库管理</NavLink></Menu.Item>*/}
                        {/*<Menu.Item key={5} icon={<BookOutlined />}><NavLink to="/eql/log">系统日志</NavLink></Menu.Item>*/}
                        {/*<Menu.Item key={6} icon={<InfoCircleOutlined />}><NavLink to="/eql/help">帮助</NavLink></Menu.Item>*/}
                        {/*<Menu.Item key={7} icon={<PhoneOutlined />}><NavLink to="/eql/contact">联系我们</NavLink></Menu.Item>*/}
                        {/*<Menu.Item key={8} icon={<PhoneOutlined />}><NavLink to="/test">测试</NavLink></Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/*<Header className="site-layout-background" style={{padding: 0, height: "10px"}}/>*/}
                    <Content style={{margin: '0 16px'}}>
                        {/*<ContentMain/>*/}
                        <Switch>
                            <Route exact path="/file-list" component={FileList} />
                            <Route exact path="/abstract-review" component={AbstractReview} />
                            <Route exact path="/file-audit/:id" component={FileAudit} />
                            <Route exact path="/file-upload" component={FileUpload} />
                            <Route exact path="/chat" component={Chat} />
                            <Route exact path="/test" component={Test} />
                            <Route exact path="/test2" component={Test2} />
                            <Route exact path="/Login" component={Login} />
                            <Route exact path="/center" component={center} />
                            <Route exact path="/Landing" component={Landing} />
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
                        文献共享批注系统 ©2023 PAI实验室版权所属
                    </Footer>
                </Layout>
            </Layout>
        );
    }

}