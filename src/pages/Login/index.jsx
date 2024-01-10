import React, {Component} from 'react';
import axios from 'axios';
import {Input, List, Row, Col, Button, Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import {JSEncrypt} from "jsencrypt";
import * as api from "../../api/api";
import logo from '../../assets/logo2.png'

export default class Login extends Component {

    state = {

    }

    toRegister = () => {
        this.props.history.push('/register')
    }


    render() {
        const {generatedPublicKey, generatedPrivateKey, name, email} = this.state

        const that = this;

        const props = {
            beforeUpload(file) {
                console.log(file)
                let reader = new FileReader()
                console.log('file------------------------', file)
                //readAsText 方法可以将 Blob 或者 File 对象转根据特殊的编码格式转化为内容 (字符串形式)
                reader.readAsText(file, 'UTF-8')
                reader.onload = function (event) {
                    //event.target.result即是用户上传的txt文件的内容
                    let data = event.target.result
                    const publicKey = data.split("-----BEGIN SM2 PUBLIC KEY-----\n")[1].split("\n-----END SM2 PUBLIC KEY-----")[0]
                    const privateKey = data.split("-----BEGIN SM2 PRIVATE KEY-----\n")[1].split("\n-----END SM2 PRIVATE KEY-----")[0]
                    api.getRandomNumber(publicKey).then(res => {
                        console.log("RES", res);
                        if (res.status === 200) {
                            const msg = res.data
                            const sm2 = require('sm-crypto').sm2
                            const cipherMode = 1
                            let decryptedRes = sm2.doDecrypt(msg, privateKey, cipherMode)
                            api.login(publicKey, decryptedRes).then(res2 => {
                                if (res2.status === 200) {
                                    const token = res2.data
                                    localStorage.setItem("token", token)
                                    localStorage.setItem("token_vaild","Y")
                                    message.success("登录成功！")
                                    that.props.history.push('/')
                                }
                            })

                            // const msg = res.data
                            // const encrypt = new JSEncrypt()
                            // encrypt.setPrivateKey(privateKey)
                            // const decryptedRes = encrypt.decrypt(msg)
                            // api.login(publicKey, decryptedRes).then(res2 => {
                            //     if (res2.status === 200) {
                            //         const token = res2.data
                            //         localStorage.setItem("token", token)
                            //         localStorage.setItem("token_vaild","Y")
                            //         message.success("登录成功！")
                            //         that.props.history.push('/')
                            //     }
                            // })
                            //that.props.history.push('/')
                        }
                    })
                }
                return false
            }
        };

        return (
            <div style={{ padding: '20px' }}> {/* 调整外部边距 */}
                <Row justify="center" align="middle">
                    {/* 左侧部分：欢迎信息和系统介绍 */}
                    <Col xs={24} md={12} style={{ textAlign: "center", marginBottom: '20px' }}> {/* 添加响应式布局 */}
                        <img src={logo} alt="Logo" style={{ maxWidth: '50%', height: 'auto' }} />
                        <h1>欢迎使用 文献共享批注系统</h1>
                        <p>基于区块链的保密审阅与批注</p>
                        <p>国产大语言模型生成摘要</p>
                        <p>智能合约赋能的共识与背书</p>
                    </Col>

                    {/* 右侧部分：登录表单 */}
                    <Col xs={24} md={12} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h1 style={{ textAlign: "center" }}>
                            登录
                        </h1>
                        <div>
                            <Upload {...props} style={{ width: '100%', maxWidth: '250px' }}> {/* 调整上传按钮的样式 */}
                                <Button icon={<UploadOutlined />}>点击上传数字身份文件</Button>
                            </Upload>
                        </div>
                        <br />
                        <a onClick={this.toRegister}>尚未生成数字身份？点击前往注册页面！</a>
                    </Col>
                </Row>
            </div>
        );
    }
}
