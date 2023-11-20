import React, {Component} from 'react';
import axios from 'axios';
import {Input, List, Row, Col, Button, Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import {JSEncrypt} from "jsencrypt";
import * as api from "../../api/api";

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
            <>
                <div style={{marginLeft: "10px"}}>
                    <Row>
                        <Col sm={11} style={{marginTop: "250px"}}>
                            <h1 style={{textAlign: "center"}}>
                                登录
                            </h1>
                            <Row>
                                <Col sm={4}></Col>
                                <Col sm={16}>
                                    <div>
                                        <Upload {...props} style={{display: "block"}} >
                                            <Button icon={<UploadOutlined />} style={{width: "436.94px"}}>点击上传数字身份文件</Button>
                                        </Upload>
                                    </div>
                                    <a onClick={this.toRegister} style={{marginTop: "7px", display: "block"}}>尚未生成数字身份？点击前往注册页面！</a>
                                </Col>
                                <Col sm={4}></Col>
                            </Row>
                        </Col>
                        <Col sm={2}>

                        </Col>

                        <Col sm={11}>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
