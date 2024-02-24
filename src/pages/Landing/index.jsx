import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, message,Statistic,Button} from 'antd';
import { Link } from 'react-router-dom';
import { BlockOutlined, FileTextOutlined, LinkOutlined } from '@ant-design/icons';
import logo from '../../assets/logo2.png';
import bannerImage from '../../assets/banner1.png';
import video from '../../assets/视频.mp4';
import * as api from "../../api/api";

const {  Content} = Layout;

const LandingPage = () => {
    // 定义状态来存储系统信息
    const [sysInfo, setSysInfo] = useState({
        filecontentNum: 0, 
        commentNum: 0, 
        noteNum: 0, 
        fileScore: 0,
        blockNum: 0, 
        mining: "", 
        hashRate: 0
    });

    // 使用 useEffect 钩子在组件加载时调用 API
    useEffect(() => {
        api.viewSysInfo().then(res => {
            if (res && res.data) {
                setSysInfo(res.data);  // 更新状态
            } else {
                message.error("无法获取系统信息，请稍后重试");
            }
        });
    }, []); // 空依赖数组表示仅在组件挂载时运行

    return (
        <Layout className="layout">
            
            <Content style={{ textAlign: 'center' }}>
                <div style={{ background: `url(${bannerImage}) no-repeat center center`, backgroundSize: 'cover', minHeight: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px 40px', borderRadius: '10px', textAlign: 'center' }}>
                    <h1 style={{ color: 'white', fontSize: '48px' }}>文献共享批注系统</h1>{/* 上海市委网信办政务内参批注系统 */}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', width: '100%' }}>
                <div style={{ width: '200px', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px', margin: '0 20px' }}>
                    <BlockOutlined style={{ fontSize: '50px', color: 'white' }} />
                    <p style={{ color: 'white' }}>基于区块链的<br/>可信上传记录与访问控制</p>
                </div>
                <div style={{ width: '200px', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px', margin: '0 20px' }}>
                    <FileTextOutlined style={{ fontSize: '50px', color: 'white' }} />
                    <p style={{ color: 'white' }}>国产大语言模型<br/>智能生成摘要</p>
                </div>
                <div style={{ width: '200px', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '10px', margin: '0 20px' }}>
                    <LinkOutlined style={{ fontSize: '50px', color: 'white' }} />
                    <p style={{ color: 'white' }}>基于国密算法SM的<br/>身份认证与数据储存</p>
                </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button type="primary" size="large" style={{ marginRight: '50px' }} href='/login'>登录</Button>
                    <Button size="large" href='/register'>注册</Button>
                </div>
                </div>
                <div className="site-layout-content" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
                    <Card hoverable style={{ width: 200, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                        <Statistic title="文件总数" value={sysInfo.filecontentNum} />
                    </Card>
                    <Card hoverable style={{ width: 200, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                        <Statistic title="评论总数" value={sysInfo.commentNum} />
                    </Card>
                    <Card hoverable style={{ width: 200, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                        <Statistic title="批注总数" value={sysInfo.noteNum} />
                    </Card>
                    <Card hoverable style={{ width: 200, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                        <Statistic title="文库质量指数" value={sysInfo.fileScore} precision={2} />
                    </Card>
                    <Card hoverable style={{ width: 200, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)', alignSelf: 'start' }}>
                        <Statistic title="当前区块高度" value={sysInfo.blockNum} />
                    </Card>
                    <Card hoverable style={{ width: 200, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)', alignSelf: 'start' }}>
                        <Statistic title="区块链运行状况" value={sysInfo.mining ? '运行中' : '停止'} />
                    </Card>
                    <Card hoverable style={{ width: 200, boxShadow: '0px 0px 10px rgba(0,0,0,0.2)', alignSelf: 'start' }}>
                        <Statistic title="哈希率" value={sysInfo.hashRate + ' H/s'} />
                    </Card>

                    </div>
                    <Card hoverable style={{ marginTop: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                        {/* <video width="70%" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video> */}
                        <div style={{ padding: '15px' }}>
                            <h3>文献共享批注平台</h3>
                            {/* 政务安全审阅批注平台 */}
                            <p>平台提供基于区块链的数据加密、安全的文件存储和共享，以及高效的审阅批注工具。此外，平台还集成了基于国产大语言模型的摘要生成功能，帮助用户快速理解文档要点，以及背书机制，确保文件内容的准确性和可靠性。</p>
                        </div>
                    </Card>
                </div>
            </Content>
        </Layout>
    );
};

export default LandingPage;
