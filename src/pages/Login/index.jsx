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
                    const publicKey = data.split("-----END PUBLIC KEY-----")[0] + "-----END PUBLIC KEY-----"
                    // const privateKey = "-----BEGIN RSA PRIVATE KEY-----" + data.split("-----BEGIN RSA PRIVATE KEY-----")[1]
                    const privateKey = data.split("-----BEGIN RSA PRIVATE KEY-----\n")[1].split("\n-----END RSA PRIVATE KEY-----")[0]
                    const revertedPublicKey = publicKey.split("-----BEGIN PUBLIC KEY-----\n")[1].split("\n-----END PUBLIC KEY-----")[0]
                    api.getRandomNumber(revertedPublicKey).then(res => {
                        console.log("RES", res);
                        if (res.status === 200) {
                            const msg = res.data
                            const encrypt = new JSEncrypt()
                            encrypt.setPrivateKey(privateKey)
                            const decryptedRes = encrypt.decrypt(msg)
                            api.login(revertedPublicKey, decryptedRes).then(res2 => {
                                if (res2.status === 200) {
                                    const token = res2.data
                                    localStorage.setItem("token", token)
                                    localStorage.setItem("token_vaild","Y")
                                    message.success("登录成功！")
                                    that.props.history.push('/')
                                }
                            })
                            //that.props.history.push('/')
                        }
                    })
                }
                return false
            }
        };

        return (
            <div style={{ margin: "200px" }}>
                <Row type="flex" align="middle" justify="center">
                    {/* 左侧部分：欢迎信息和系统介绍 */}
                    <Col sm={12} style={{ textAlign: "center", padding: "50px" }}>
                        <img src={logo} alt="Logo" style={{ maxWidth: '30%', height: 'auto' }} />
                        <h1>欢迎使用 上海市委网信办政务内参批注系统</h1>
                        <br/>
                        <p>基于区块链的保密审阅与批注</p>
                        <p>国产大语言模型生成摘要</p>
                        <p>智能合约赋能的专家共识与背书</p>
                        <br/>
                        <p>这是一个用于政务文件安全审阅和批注的平台。我们提供基于区块链的数据加密、安全的文件存储和共享，以及高效的审阅批注工具。此外，平台还集成了基于国产大语言模型的摘要生成功能，帮助用户快速理解文档要点，以及专家背书机制，确保文件内容的准确性和可靠性。这些功能共同确保了政府机构在处理文件时的透明性、安全性，并提升了行政效率。</p>
                    </Col>

                    {/* 右侧部分：登录表单 */}
                    <Col sm={12} style={{ padding: "50px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <h1 style={{ textAlign: "center" }}>
                            登录
                        </h1>
                            <div>
                                <Upload {...props} style={{display: "block"}} >
                                    <Button icon={<UploadOutlined />} style={{width: "250px"}}>点击上传数字身份文件</Button>
                                </Upload>
                            </div>
                        <br/>
                        <a onClick={this.toRegister}>尚未生成数字身份？点击前往注册页面！</a>
                    </Col>
                </Row>
            </div>
        )
    }
}
