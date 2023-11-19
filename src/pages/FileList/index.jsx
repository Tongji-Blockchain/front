import React, {Component} from 'react';
import {Input, List, Table, message} from 'antd';
import * as api from "../../api/api";
import{checkToken} from "../../utils/helper"

export default class FileList extends Component {

    state = {
        fileList: []
    }


    componentDidMount() {
        checkToken();
        let flag=localStorage.getItem("token_vaild");
        if(flag=="N"){
            message.error("登录超时！请重新登录")
            this.props.history.push("/login")
        }else{
            api.getArcitleList().then(res => {
                this.setState({fileList: res.data})
            })
        }
    }

    
    render() {
        const {fileList} = this.state
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (a, b, index) => {
                    return index + 1
                }
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
                    // console.log(record);
                    return <a onClick={() => {
                        this.props.history.push(`/file-audit/${record.fileId}`)
                        // this.props.history.push({pathname: '/file-audit', state: {fileId: record.fileId}})
                    }}>审阅</a>
                }
            }
        ];
        return (
            <>
                <Table dataSource={fileList} columns={columns} style={{marginTop: "30px"}} />
            </>
        );
    }
}