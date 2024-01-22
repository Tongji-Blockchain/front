// import React, { Component } from 'react';
// import { Button, Row, Col } from 'antd';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logo2.png';

// export default class LandingPage extends Component {

//     render() {
//         return (
//             <div style={{ padding: '50px', textAlign: 'center' }}>
//                 <Row type="flex" align="middle" justify="center">
//                     <Col span={24}>
//                         <img src={logo} alt="Logo" style={{ maxWidth: '15%', height: 'auto' }} />
//                         <h1 style={{ margin: '20px 0' }}>文献共享批注系统</h1>
//                         <p>基于区块链的保密审阅与批注</p>
//                         <p>国产大语言模型生成摘要</p>
//                         <p>智能合约赋能的共识与背书</p>
//                     </Col>
//                 </Row>
//                 <Row type="flex" align="middle" justify="center" style={{ marginTop: '40px' }}>
//                     <Col span={12}>
//                     <p>这是一个用于安全审阅和批注的平台。我们提供基于区块链的数据加密、安全的文件存储和共享，以及高效的审阅批注工具。此外，平台还集成了基于国产大语言模型的摘要生成功能，帮助用户快速理解文档要点，以及背书机制，确保文件内容的准确性和可靠性。</p>
//                     </Col>
//                 </Row>
//                 <Row type="flex" align="middle" justify="center" style={{ marginTop: '20px' }}>
//                     <Col span={6}>
//                         <Link to="/login">
//                             <Button type="primary" size="large">登录</Button>
//                         </Link>
//                     </Col>
//                     <Col span={6}>
//                         <Link to="/file-list">
//                             <Button type="primary" size="large">返回主页</Button>
//                         </Link>
//                     </Col>
//                     <Col span={6}>
//                         <Link to="/register">
//                             <Button size="large">注册</Button>
//                         </Link>
//                     </Col>
//                 </Row>
//             </div>
//         );
//     }
// }
import React from 'react';
import { Layout, Menu, Card } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import bannerImage from '../../assets/banner1.png'; 

const { Header, Content } = Layout;

const LandingPage = () => {
    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '65px', height: '65px' }} />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/login">登录</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/register">注册</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/center">个人中心</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ textAlign: 'center' }}>
                <div style={{ background: `url(${bannerImage})`, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ color: 'white' }}>上海市委网信办政务内参批注系统</h1>
                </div>
                <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {/* 介绍视频 */}
                    {/* 特征介绍和系统实时参数显示 */}
                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
                        <Card title="当前系统文件数">...</Card>
                        <Card title="当前评论数">...</Card>
                        <Card title="批注数">...</Card>
                        <Card title="文字平均分">...</Card>
                        <Card title="区块高度">...</Card>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default LandingPage;

