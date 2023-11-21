import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Input, List, Table, Modal, message} from 'antd';
import * as api from "../../api/api";
import{checkToken} from "../../utils/helper"
import {SmileOutlined, MehOutlined, FrownOutlined} from '@ant-design/icons';



export default class FileList extends Component {

    state = {
        isModalOpen: false,
        isModalOpen2: false,
        abstractList:[],
        abstract:"",
        tmp_fileId:"",
        tmp_attitude:"",
        tmp_score:-1
    }
    handleOpen = () => {
        this.setState({isModalOpen: false})
    }
    handleClose = () => {
        this.setState({isModalOpen: false})
    }

    handleNo = () => {
        this.setState({tmp_fileId: ""})
        this.setState({tmp_score: -1})
        this.setState({tmp_attitude:""})
        this.setState({isModalOpen2: false})
    }
    handleYes = () => {
        console.log(this.state.tmp_score)
        api.uploadEndorsement(this.state.tmp_fileId,this.state.tmp_score).then(res => {
            console.log(res)        // console.log() 打印网络请求结果
            if(res.status===200){
                api.getAbstract().then(res=>{
                    this.setState({abstractList: res.data})
                })
            }
        })
        this.setState({isModalOpen2: false})
        this.forceUpdate()
    }

    click = (fileId,score,attitude) => {
        this.setState({tmp_fileId: fileId})
        this.setState({tmp_score: score})
        this.setState({tmp_attitude: attitude})
        this.setState({isModalOpen2: true})
    }

    componentDidMount() {
        checkToken();
        const flag=localStorage.getItem("token_vaild");
        if(flag==="N"){
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
                render: (_, record, index) => {
                    return <a onClick={() => {
                        // this.props.history.push('/file-audit')
                        api.getFileAbstract(record.fileId).then(res =>{
                            this.setState({abstract : res.data.fileSummary})
                            this.setState({isModalOpen: true})
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
                        return <>
                        <button key="agree" onClick={()=>{this.click(record.fileId,2,"同意")}} style={{color: "green"}}>同意</button>
                        <button key="just_so_so" onClick={()=>{this.click(record.fileId,1,"一般")}} style={{color: "gray"}}>一般</button>
                        <button key="disagree" onClick={()=>{this.click(record.fileId,0,"反对")}} style={{color: "red"}}>反对</button></>
                    } else if (record.endorseScore === 2) {
                        return <p style={{color: "green"}}>同意</p>
                    } else if(record.endorseScore === 1) {
                        return <p style={{color: "gray"}}>一般</p>
                    }else if(record.endorseScore === 0){
                        return <p style={{color: "red"}}>反对</p>
                    }
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
                <Modal title="Insure Modal" open={this.state.isModalOpen2} onOk={this.handleYes} onCancel={this.handleNo} okText="Yes" cancelText="No">
                    <p>你确定要选择{this.state.tmp_attitude}态度吗？</p>
                </Modal>
            </>
        );
    }
}

