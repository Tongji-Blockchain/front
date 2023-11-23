import React, {Component} from 'react';
import axios from 'axios';
import {Input, List, Row, Col, Button, message} from 'antd';
import {JSEncrypt} from "jsencrypt";
import * as api from "../../api/api";

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
        const encrypt = new JSEncrypt()
        const publicKey = encrypt.getPublicKey()    // 生成公钥
        const privateKey = encrypt.getPrivateKey()  // 生成私钥
        const revertedPublicKey = publicKey.split("-----BEGIN PUBLIC KEY-----\n")[1].split("\n-----END PUBLIC KEY-----")[0]
        api.register(email, name, revertedPublicKey).then(res => {
            console.log("注册结果", res)
            if (res.status === 200) {
                // 注册成功
                message.success("注册成功！");
                this.setState({generatedPublicKey: publicKey, generatedPrivateKey: privateKey});
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
        aTag.download = "DigitalIdentityInfo.txt"
        aTag.click()
        URL.revokeObjectURL(objectURL)
    }

    render() {
        const {generatedPublicKey, generatedPrivateKey, name, email} = this.state
        return (
            <>
                <div style={{marginLeft: "10px"}}>
                    <Row>
                        <Col sm={11} style={{marginTop: "250px"}}>
                            <h1 style={{textAlign: "center"}}>
                                数字身份注册
                            </h1>
                            <Row>
                                <Col sm={4}></Col>
                                <Col sm={16}>
                                    <Input placeholder="邮箱" onChange={(e) => {
                                        this.setState({email: e.target.value})
                                    }} />
                                    <Input placeholder="用户名" onChange={(e) => {
                                        this.setState({name: e.target.value})
                                    }} style={{marginTop: "10px"}} />
                                    <div style={{width: "100%"}}>
                                        <Button onClick={this.register} type="dashed" style={{marginTop: "10px", textAlign: "center", width: "100%"}} >创建您的第一个数字账户</Button>
                                    </div>
                                    <a onClick={this.toLogin} style={{marginTop: "7px", display: "block"}}>已有数字身份？点击前往登录页面！</a>
                                </Col>
                                <Col sm={4}></Col>
                            </Row>
                        </Col>
                        <Col sm={2}>

                        </Col>

                        <Col sm={11}>
                            {
                                generatedPublicKey ? <>
                                    <div style={{marginTop: "100px", paddingRight: "30px"}}>
                                        <h3>邮箱</h3>
                                        {email}
                                        <h3>姓名</h3>
                                        {name}
                                        <h3>公钥</h3>
                                        {generatedPublicKey}
                                        <h3>私钥</h3>
                                        {generatedPrivateKey}
                                        <Button onClick={this.exportLoginInfo} type="dashed" style={{marginTop: "10px", textAlign: "center", width: "100%"}} >导出您的数字身份信息</Button>
                                    </div>
                                </> : <></>
                            }
                        </Col>
                    </Row>
                </div>

            </>
        )
    }
}
