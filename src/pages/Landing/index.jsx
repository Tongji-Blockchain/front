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
import video from '../../assets/视频.mp4';
import { BlockOutlined, FileTextOutlined, LinkOutlined } from '@ant-design/icons';


const { Header, Content , Footer} = Layout;

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
            <div style={{ background: `url(${bannerImage}) no-repeat center center`, backgroundSize: 'cover', minHeight: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px 40px', borderRadius: '10px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '48px' }}>上海市委网信办政务内参批注系统</h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', width: '100%' }}>
    <div style={{ width: '250px', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px', margin: '0 20px' }}>
        <BlockOutlined style={{ fontSize: '50px', color: 'white' }} />
        <p style={{ color: 'white' }}>基于区块链的保密审阅与批注</p>
    </div>
    <div style={{ width: '250px', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px', margin: '0 20px' }}>
        <FileTextOutlined style={{ fontSize: '50px', color: 'white' }} />
        <p style={{ color: 'white' }}>国产大语言模型生成摘要</p>
    </div>
    <div style={{ width: '250px', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px', margin: '0 20px' }}>
        <LinkOutlined style={{ fontSize: '50px', color: 'white' }} />
        <p style={{ color: 'white' }}>智能合约赋能的共识与背书</p>
    </div>
    </div>
</div>
                <div className="site-layout-content" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
                        <Card title="文件总数" hoverable style={{ width: 240, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>...</Card>
                        <Card title="评论总数" hoverable style={{ width: 240, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>...</Card>
                        <Card title="批注总数" hoverable style={{ width: 240, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>...</Card>
                        <Card title="文库质量指数" hoverable style={{ width: 240, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>...</Card>
                        <Card title="当前区块高度" hoverable style={{ width: 240, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>...</Card>
                    </div>
                    <Card hoverable style={{ marginTop: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                        <video width="70%" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div style={{ padding: '15px' }}>
                            <h3>政务安全审阅批注平台</h3>
                            <p>平台提供基于区块链的数据加密、安全的文件存储和共享，以及高效的审阅批注工具。此外，平台还集成了基于国产大语言模型的摘要生成功能，帮助用户快速理解文档要点，以及背书机制，确保文件内容的准确性和可靠性。</p>
                        </div>
                    </Card>
                </div>
            </Content>
            <Footer style={{textAlign: 'center',}}>
                上海市委网信办政务内参批注系统
            </Footer>
        </Layout>
    );
};

export default LandingPage;


