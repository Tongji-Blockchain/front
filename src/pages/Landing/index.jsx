import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';

export default class LandingPage extends Component {

    render() {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <Row type="flex" align="middle" justify="center">
                    <Col span={24}>
                        <img src={logo} alt="Logo" style={{ maxWidth: '15%', height: 'auto' }} />
                        <h1 style={{ margin: '20px 0' }}>文献共享批注系统</h1>
                        <p>基于区块链的保密审阅与批注</p>
                        <p>国产大语言模型生成摘要</p>
                        <p>智能合约赋能的共识与背书</p>
                    </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{ marginTop: '40px' }}>
                    <Col span={12}>
                    <p>这是一个用于安全审阅和批注的平台。我们提供基于区块链的数据加密、安全的文件存储和共享，以及高效的审阅批注工具。此外，平台还集成了基于国产大语言模型的摘要生成功能，帮助用户快速理解文档要点，以及背书机制，确保文件内容的准确性和可靠性。</p>
                    </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{ marginTop: '20px' }}>
                    <Col span={6}>
                        <Link to="/login">
                            <Button type="primary" size="large">登录</Button>
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Link to="/file-list">
                            <Button type="primary" size="large">返回主页</Button>
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Link to="/register">
                            <Button size="large">注册</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}
