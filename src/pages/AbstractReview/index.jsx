import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Input, List, Table, Modal, message} from 'antd';
import * as api from "../../api/api";
import{checkToken} from "../../utils/helper"
import {SmileOutlined, MehOutlined, FrownOutlined} from '@ant-design/icons';



export default class FileList extends Component {

    state = {
        isModalOpen: false,
        abstractList:[],
        abstract:""
    }
    handleOpen = () => {
        this.setState({isModalOpen: false})
    }
    handleClose = () => {
        this.setState({isModalOpen: false})
    }
    click = (fileId,score) => {
        api.uploadEndorsement(fileId,score).then(res => {
            console.log(res)        // console.log() 打印网络请求结果
        })
    }

    componentDidMount() {
        checkToken();
        let flag=localStorage.getItem("token_vaild");
        if(flag=="N"){
            message.error("登录超时！请重新登录")
            this.props.history.push("/login")
        }else{
            api.getAbstract().then(res=>{
                this.setState({abstractList: res.data})
            })
        }
    }
    

    render() {
        const {isModalOpen} = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: '标题',
                dataIndex: 'fileName',
                key: 'fileName',
            },
            {
                title: '上传者',
                dataIndex: 'uploader',
                key: 'uploader',
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                render: (_, record) => {
                    return <a onClick={() => {
                        this.setState({isModalOpen: true})
                        // this.props.history.push('/file-audit')
                        api.getFileAbstract(record.fileId).then(res =>{
                            this.setState({abstract : res.data})
                        })
                    }}>查看摘要</a>
                }
            },
            {
                title: '背书（三种态度点击后表态）',
                dataIndex: 'review',
                key: 'review',
                render: (_, record, index) => {
                    if (record.endorseScore === -1) {
                        return <><SmileOutlined onClick={this.click(record.fileId,1)} style={{color: "green"}}/>
                        <MehOutlined onClick={this.click(record.fileId,2)} style={{color: "gray"}}/>
                        <FrownOutlined onClick={this.click(record.fileId,3)} style={{color: "red"}}/></>
                    } else if (record.endorseScore === 2) {
                        return <><SmileOutlined style={{color: "green"}}/>
                        </>
                    } else if(record.endorseScore === 1) {
                        return <MehOutlined style={{color: "gray"}}/>
                    }else if(record.endorseScore === 0){
                        return <FrownOutlined style={{color: "red"}}/>
                    }
                    return <div></div>
                }
            },
            {
                title: '总分',
                dataIndex: 'score',
                key: 'score'
            }
        ];
        return (
            <>
                <Table dataSource={this.state.abstractList} columns={columns} style={{marginTop: "30px"}}/>
                <Modal title="Basic Modal" open={isModalOpen} onOk={this.handleOpen} onCancel={this.handleClose}>
                    <p>{this.state.abstract}</p>
                </Modal>
            </>
        );
    }
}

