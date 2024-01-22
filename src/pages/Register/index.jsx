import React, {Component} from 'react';
import axios from 'axios';
import {Input, List, Row, Col, Button, message,Card} from 'antd';
import {JSEncrypt} from "jsencrypt";
import * as api from "../../api/api";
import logo from '../../assets/logo2.png'

export default class Register extends Component {

    state = {
        email: "",
        name: "",
        generatedPublicKey: "",
        generatedPrivateKey: "",
    }

    toLogin = () => {
        this.props.history.push('/login')
    }

    register = () => {
        const {email, name} = this.state

        const sm2 = require('sm-crypto').sm2
        let keypair = sm2.generateKeyPairHex()
        let publicKey = keypair.publicKey // 公钥
        let privateKey = keypair.privateKey // 私钥
        const TextPublicKey = "-----BEGIN SM2 PUBLIC KEY-----\n"+publicKey+"\n-----END SM2 PUBLIC KEY-----"
        const TextPrivateKey = "-----BEGIN SM2 PRIVATE KEY-----\n"+privateKey+"\n-----END SM2 PRIVATE KEY-----"



        if (!email.trim() || !name.trim()) {
            message.error("邮箱 或 用户名 不能为空");
            return;
        }

        api.register(email, name, publicKey).then(res => {
            console.log("注册结果", res)
            if (res.status === 200) {
                // 注册成功
                message.success("注册成功！");
                this.setState({generatedPublicKey: TextPublicKey, generatedPrivateKey: TextPrivateKey});
            } else if (res.status === 401) {
                // 用户已存在
                message.error("用户已存在");
            } else {
                // 其他错误
                message.error("注册失败，请重试");
            }
            
        }).catch(error => {
            console.error("注册请求出错", error);
            message.error("注册请求出错，请检查网络");
        });

    }

    exportLoginInfo = () => {
        const {generatedPublicKey, generatedPrivateKey} = this.state
        const key = generatedPublicKey + "\n" + generatedPrivateKey
        const blob = new Blob([key], {
            type: "text/plain;charset=utf-8"
        })
        const objectURL = URL.createObjectURL(blob)
        const aTag = document.createElement('a')
        aTag.href = objectURL
        aTag.download = "政务内参系统数字身份.txt"
        aTag.click()
        URL.revokeObjectURL(objectURL)
    }

    render() {
        const {generatedPublicKey, generatedPrivateKey, name, email} = this.state
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundSize: 'cover' }}>
                <Card style={{ width: '400px', padding: '20px', textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
                    <h1>数字身份注册</h1>
                    <Input placeholder="邮箱" value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                    <Input placeholder="用户名" value={name} style={{ marginTop: '10px' }} onChange={(e) => this.setState({ name: e.target.value })} />
                    <Button onClick={this.register} type="primary" style={{ marginTop: '10px', width: '100%' }} >
                        创建您的第一个数字身份
                    </Button>
                    <a onClick={this.toLogin} style={{ display: 'block', marginTop: '12px' }}>已有数字身份？点击前往登录页面！</a>
                    {generatedPublicKey && (
                        <div style={{ marginTop: '20px', textAlign: 'left' }}>
                            <h3>邮箱: {email}</h3>
                            <h3>姓名: {name}</h3>
                            <h3>公钥: {generatedPublicKey}</h3>
                            <h3>私钥: {generatedPrivateKey}</h3>
                            <Button onClick={this.exportLoginInfo} type="dashed" style={{ width: '100%' }} >导出您的数字身份信息</Button>
                        </div>
                    )}
                </Card>
            </div>
        );
    }
}
