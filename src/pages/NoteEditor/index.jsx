import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import {Button, Col, Input, Modal, Rate, Row, message} from "antd";
import * as api from "../../api/api";
import {MehOutlined, SmileOutlined} from "@ant-design/icons";
import {DomEditor} from "@wangeditor/editor";
import {nanoid} from "nanoid";
import { SELF_ADDRESS } from "../../config/constant";
import {getArticleTitleAndContent} from "../../api/api";
import {tips} from "../../utils/helper";

const {TextArea} = Input

export default function NoteEditor(props) {
    const {id} = useParams();
    // editor 实例
    //const [editor, setEditor] = useState(null)                   // JS 语法
    const [title, setTitle] = useState("文章标题")
    // 编辑器内容
    //const [html, setHtml] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 批注内容
    const [note, setNote] = useState("");
    const [highLight, setHighLight] = useState("");

    // 批注列表
    const [noteList, setNoteList] = useState([]);

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        api.getHighLightAndTitle(id).then(res => {
            setHighLight(res.data.highLight)
            setTitle(res.data.fileTitle)
            //标题、内容
        })

        api.getNoteList(id).then(res => {
            setNoteList(res.data)
        })
        
    }, [])


    // 及时销毁 editor ，重要！
    // useEffect(() => {
    //     return () => {
    //         if (editor == null) return
    //         editor.destroy()
    //         setEditor(null)
    //     }
    // }, [editor])

    return (
        <>
            <Row>
                <Col sm={14}>
                    <div style={{marginTop: "30px", paddingRight: "20px", borderRight: "dashed 1px gray"}}>
                        <h2>{title}</h2>
                        <br/>
                        <h3>待批注文本</h3>
                        <br/>
                        <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                            <p style={{ height: '500px', overflowY: 'hidden' }}>{highLight}</p>
                        </div>
                    </div>
                </Col>
                <col sm={2}></col>
                <Col sm={8}>
                    <div style={{marginTop: "30px", marginLeft: "30px"}}>
                        <h2>当前批注列表</h2>
                        <Button onClick={() => {setIsModalOpen(true)}} type="dashed" style={{marginTop: "10px", textAlign: "center", width: "100%"}}>创建批注</Button>
                        <Modal title="请输入您对本文段的批注" open={isModalOpen} onOk={() => {
                            api.uploadNote(id, note).then(res => {
                                tips(res)
                                api.getNoteList(id).then(res => {
                                    setNoteList(res.data)
                                })
                                setIsModalOpen(false)
                            })
                        }} onCancel={() => {setIsModalOpen(false)}}>
                            {/* <div style={{display: "flex", alignItems: "center"}}>
                                <span>评分</span> <Rate style={{marginLeft: "5px"}} onChange={(e) => {
                                setRate(e)
                            }}/>
                            </div> */}
                            <div style={{marginTop: "7px"}}>
                                {/* <span>批注内容</span> */}
                                <TextArea rows={5} onChange={(e) => {
                                    setNote(e.target.value)
                                }} />
                            </div>
                        </Modal>
                        <div style={{marginTop: "20px"}}>
                            {
                                noteList.map((c,index) => {
                                    return <>
                                        <br/>
                                        {`${c.uploader}（${c.uploadTime}）：${c.content}`}
                                        <br/><br/>
                                    </>
                                })
                            }
                            
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}