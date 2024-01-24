import React, {Component} from 'react';
import {Input, List, Table, message,Card,Col,Row,Statistic,Typography } from 'antd';
import * as api from "../../api/api";
import{checkToken} from "../../utils/helper"
const { Title } = Typography;

export default class Center extends Component {

    state = {
        userInfo: []
    }


    componentDidMount() {
        checkToken();
        const flag=localStorage.getItem("token_vaild");
        if(flag==="N"){
            message.error("登录超时！请重新登录")
            this.props.history.push("/Login")
        }else{
            api.getUserInfo().then(res => {
                this.setState({userInfo: res.data})
            })
        }
    }
    

    
    render() {
        const {userInfo} = this.state
        
        return (
            
            <div style={{ padding: '30px', background: '#ececec', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>个人中心</h2>
                <Row gutter={32} style={{ maxWidth: 900, width: '100%', marginBottom: '20px' }}> {/* Increased gutter */}
                    <Col span={12}>
                        <Card>
                            <Statistic title="文章数量" value={userInfo.filecontentNum} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic title="评论数量" value={userInfo.commentNum} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={32} style={{ maxWidth: 900, width: '100%' }}> {/* Increased gutter */}
                    <Col span={12}>
                        <Card>
                            <Statistic title="批注数量" value={userInfo.noteNum} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic title="文章平均分" value={userInfo.fileScore} precision={2} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}