import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, message,Statistic,Button} from 'antd';
import { Link } from 'react-router-dom';
import { BlockOutlined, FileTextOutlined, LinkOutlined } from '@ant-design/icons';
import logo from '../../assets/logo2.png';
import bannerImage from '../../assets/banner1.png';
import video from '../../assets/视频.mp4';
import * as api from "../../api/api";
import register_direction from "../../assets/register_direction.png"
import login_direction from "../../assets/login_direction.png"
import file_upload from "../../assets/file_upload.png"
import file_audit from "../../assets/file_audit.png"
import abstract from "../../assets/abstract.png"
import file_encryption from "../../assets/file_encryption.png"

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
                    <h1 style={{ color: 'white', fontSize: '48px' }}>上海市委网信办政务内参批注系统</h1>
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
                            <h3>政务安全审阅批注平台</h3>
                            <p>平台提供基于区块链的数据加密、安全的文件存储和共享，以及高效的审阅批注工具。此外，平台还集成了基于国产大语言模型的摘要生成功能，帮助用户快速理解文档要点，以及背书机制，确保文件内容的准确性和可靠性。</p>
                        </div>
                    </Card>

                    <Card hoverable style={{ marginTop: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
                        <div style={{ padding: '15px' }}>
                            <h3>使用指南</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{width: '47%'}}>
                                    <h4>1、注册</h4>
                                    <p className='tip1'>在注册环节，我们不直接收集用户身份信息和密码。相反，我们利用国密算法，基于用户邮箱和用户名，在其本地设备上生成一对非对称密钥。用户私钥由用户自己保管，不经过任何服务器。同时，在区块链上为每位用户创建独特的身份账户，记录关键信息，如权限组、用户名、公钥等。这样做确保了用户信息的不可篡改性和更高级别的安全保障。</p>  
                                    <img src={register_direction} style={{ width: '60%', marginTop:"18px"}}></img>
                                </div>                                                        
                            
                                <div style={{width: '47%'}}>
                                    <h4>2、登录</h4>
                                    <p className='tip2'>在登录过程中，通过区块链账户进行数字身份验证，消除了传递私钥或密码的安全风险。相比传统的身份验证，区块链提供了一个去中心化、更透明和更安全的验证方式，从而增强了整个系统的安全性和隐私保护。</p>
                                    <img src={login_direction} style={{ width: '60%', marginTop:"18px"}}></img>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{width: '47%'}}>
                                    <h4>3、文件上传</h4>
                                    <p className='tip3'>在文件上传方面，我们提供了嵌入式的文本编辑器，允许用户对文稿进行样式编辑，使得展示效果更好。上传的文件将在区块链上备份其哈希值等特征信息，即使不泄露文件明文，也能确保文件的不可篡改性。这种区块链技术的应用加强了文件的安全性和隐私保护，确保了数据在整个传输和存储过程中的安全。</p>
                                    <img src={file_upload} style={{ width: '90%', marginTop:"18px"}}></img>
                                </div>
                            

                            
                                <div style={{width: '47%'}}>
                                    <h4>4、文件审阅</h4>
                                    <p className='tip1'>在文件列表中，用户可以审阅文章并进行评论和批注。文章评论显示在页面右侧，批注通过嵌入式编辑器完成。用户可以选中文本、插入高亮链接并上传，完成批注。点击链接即可跳转到含有该批注的页面，支持多用户对同一段文字进行批注。所有评论和批注都会在区块链上同步，确保安全性。</p>  
                                    <img src={file_audit} style={{ width: '90%', marginTop:"18px"}}></img>
                                </div>                                                        
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{width: '47%'}}>
                                    <h4>5、摘要背书</h4>
                                    <p className='tip5'>对于摘要专家背书机制，系统会自动生成文章摘要，简洁概括内容。您可以据此评价文章，选择“同意”、“一般”或“反对”。只有平均得分超过准入系数的文章才会列入文件审阅列表。准入系数可以灵活调整，以提高优质文章的展示率。</p>
                                    <img src={abstract} style={{ width: '90%', marginTop:"18px"}}></img>
                                </div>
                            
                                <div style={{width: '47%'}}>
                                    <h4>6、文件加密</h4>
                                    <p className='tip6'>系统使用国密算法加密文件，并利用区块链验证文件访问权限和分发密钥。与传统方法如集中式权限管理和加密相比，该法减少了安全漏洞和单点故障的风险。传统方法可能会威胁整个系统的数据安全和访问控制，而区块链则提供了去中心化的验证机制，通过分布式账本确保只有授权用户才能访问特定文件，显著提高了数据安全性和访问控制的可靠性。</p>
                                    <img src={file_encryption} style={{ width: '90%', marginTop:"18px"}}></img>
                                </div>
                            </div>

                            </div>
                    </Card>

                </div>
            </Content>
        </Layout>
    );
};

export default LandingPage;
