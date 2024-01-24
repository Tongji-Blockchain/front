import React, {Component} from 'react';
import axios from 'axios';
import {Input, List, Row, Col, Button, Upload, message, Card} from 'antd';
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

    toLanding = () => {
        this.props.history.push('/')
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
                    if(data){
                        let publicKey = data.split("-----BEGIN SM2 PUBLIC KEY-----\n")[1].split("\n-----END SM2 PUBLIC KEY-----")[0]
                        let privateKey = data.split("-----BEGIN SM2 PRIVATE KEY-----\n")[1].split("\n-----END SM2 PRIVATE KEY-----")[0]
                    
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
                                        that.props.history.push('/file-list')
                                    }
                                })
                            }
                        })
                    }
                }
                return false
            }
        };

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundSize: 'cover' }}>
                <Card style={{ width: 400, padding: '20px', textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
                    <h1>欢迎登录</h1>
                    <Upload {...props}>
                        <Button type="primary" icon={<UploadOutlined />} block>点击上传数字身份文件</Button>
                    </Upload>
                    <a onClick={this.toRegister} style={{ display: 'block', marginTop: '12px' }}>尚未生成数字身份？点击前往注册页面！</a>
                    <a onClick={this.toLanding} style={{ display: 'block', marginTop: '12px' }}>返回主页</a>
                </Card>
            </div>
          );
          
    }
}
