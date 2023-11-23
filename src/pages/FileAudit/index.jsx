import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
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

export default function FileAudit(props) {
    const {id} = props.match.params;
    // editor 实例
    const [editor, setEditor] = useState(null)                   // JS 语法
    const [title, setTitle] = useState("文章标题")
    const [summary, setSummary] = useState("文章摘要")

    //批注
    const [highLight, setHighLight] = useState("")//选中高亮文本
    const [highLightId, setHighLightId] = useState("")  // 高亮文本的id
    // 编辑器内容
    const [html, setHtml] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState("文章内容")

    // 评论内容
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState("");

    // 评论列表
    const [commentList, setCommentList] = useState([]);

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        api.getArticleTitleAndContent(id).then(res => {
            setSummary(`摘要：${res.data.fileSummary}`)
            setHtml(res.data.fileString)
            setTitle(res.data.fileTitle)
        })
        api.getFileCommentList(id).then(res => {
            //console.log(res.data)
            setCommentList(res.data)
        })
        //
        // setTimeout(() => {
        //     setHtml("互联网近年来的迅猛发展及其与物理世界的深度耦合与强力反馈, 已经根本性地改变了现代社会的生产、生活与管理决策模式, 形成了现实物理世界 – 虚拟网络空间紧密耦合、虚实互动和协同演化的平行社会空间, 催生了“互联网 +”和工业4.0 等一系列国家战略. 未来社会的发展趋势则必将从物理 + 网络的 CPS 实际世界 (Cyber-physical systems, CPS) 走向精神层面的人工世界, 形成物理 + 网络 + 人工的人–机–物一体化的三元耦合系统, 称为社会物理信息系统 (Cyber-physical-social systems, CPSS). 目前, 基于 CPSS 的平行社会已现端倪, 其核心和本质特征是虚实互动与平行演化. 区块链是实现 CPSS 平行社会的基础架构之一, 其主要贡献是为分布式社会系统和分布式人工智能研究提供了一套行之有效的去中心化的数据结构、交互机制和计算模式, 并为实现平行社会奠定了坚 实的数据基础和信用基础. 就数据基础而言, 管理学家爱德华戴明曾说过: 除了上帝, 所有人必须以数据说话. 然而在中心化社会系统中, 数据通常掌握在政府和大型企业等 “少数人” 手中, 为少数人 “说话”, 其公正性、权威性甚至安全性可能都无法保证. 区块链数据则通过高度冗余的分布式节点存储, 掌握在 “所有人” 手中, 能够做到真正的 “数据民主”. 就信用基础而言, 中心化社会系统因其高度工程复杂性和社会复杂性而不可避免地会存在 “默顿系统” 的特性, 即不确定性、多样性和复杂性, 社会系统中的中心机构和规则制定者可能会因个体利益而出现失信行为; 区块链技术有助于实现软件定义的社会系统, 其基本理念就是剔除中心化机构、将不可预测的行为以智能合约的程序化代码形式提前部署和固化在区块链数据中, 事后不可伪造和篡改并自动化执行, 从而在一定程度上能够将 “默顿” 社会系统 转化为可全面观察、可主动控制、可精确预测的 “牛顿” 社会系统. ACP (人工社会 Artificial societies、计算实验Computational experiments 和平行执行 Parallel execution) 方法是迄今为止平行社会管理领域唯一成体系化的、完整的研究框架, 是复杂性科学在新时代平行社会环境下的逻辑延展和创新.</span> ACP 方法可以自然地与区块链技术相结合, 实现区块链驱动的平行社会管理. 首先, 区块链的 P2P 组网、分布式共识协作和基于贡献的经济激励等机制本身就是分 布式社会系统的自然建模, 其中每个节点都将作为分布式系统中的一个自主和自治的智能体 (Agent). 随着区块链生态体系的完善, 区块链各共识节点和日益复杂与自治的智能合约将通过参与各种形式的 Dapp, 形成特定组织形式的 DAC 和 DAO, 最终形成 DAS, 即 ACP 中的人工社会. 其次, 智能合约的可编程特性使得区块链可进行各种 “WHAT-IF” 类型的虚拟实验设计、场景推演和结果评估, 通过这种计算实验过程获得并自动或半自动地执行最优决 策. 最后, 区块链与物联网等相结合形成的智能资产使得联通现实物理世界和虚拟网络空间成为可能, 并可通过真实和人工社会系统的虚实互动和平行调谐实现社会管理和决策的协同优化. 不难预见, 未来现实物理世界的实体资产都登记为链上智能资产的时候, 就是区块链驱动的平行社会到来之时.")
        // }, 500)
    }, [])

    // 工具栏配置
    const toolbarConfig = {
        toolbarKeys: [
            'insertLink',
            'fullScreen'
        ],
    }

    // 编辑器配置

    const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
        MENU_CONF: {},
        //readOnly : true,

    }


    // 自定义校验链接
    function customCheckLinkFn(text, url) {
        setHighLight(text);
        if (url === '确认'){
            return true
        } else {
            return '标记未成功'
        }
            

        // if (!url) {
        //     return true
        // } else {
        //     return false
        // };
    }

    // 自定义转换链接 url
    function customParseLinkUrl() {                // JS 语法
        const highLightId = nanoid();
        setHighLightId(highLightId);
        return `${SELF_ADDRESS}NoteEditor/${highLightId}`
        // if (url.indexOf('http') !== 0) {
        //     return `http://${url}`
        // }
        // return url
    }

    // 插入链接
    editorConfig.MENU_CONF['insertLink'] = {
        checkLink: customCheckLinkFn, // 也支持 async 函数
        parseLinkUrl: customParseLinkUrl, // 也支持 async 函数

    }

    
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <Row>
                <Col sm={14}>
                    <div style={{marginTop: "30px", paddingRight: "20px", borderRight: "dashed 1px gray"}}>
                        <h2>{title}</h2>
                        <div style={{marginBottom: "20px",height: "100px", overflowX:"hidden"}}>{summary}</div>
                        <h3>点击插入链接按钮后，需要在链接地址处输入‘确认’来标记高亮，然后点击‘标记待批注语句’来上传</h3>

                         <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                             <Toolbar
                                 editor={editor}
                                 defaultConfig={toolbarConfig}
                                 mode="default"
                                 style={{ borderBottom: '1px solid #ccc' }}
                             />

                             <Editor
                                 defaultConfig={editorConfig}
                                 value={html}
                                 onCreated={setEditor}
                                 onChange={editor => setHtml(editor.getHtml())}
                                 mode="simple"
                                 style={{ height: '500px', overflowY: 'hidden' }}
                             />
                         </div>
                        <Button onClick={() => {
                            api.uploadHighLight(id, html, highLightId, highLight).then(res => {
                                tips(res)
                            })
                        }} type="dashed" style={{marginTop: "10px", textAlign: "center", width: "100%"}}>标记待批注语句</Button>
                    </div>
                </Col>
                <col sm={2}></col>
                <Col sm={8}>
                    <div style={{marginTop: "30px", marginLeft: "30px"}}>
                        <h2>文章评论</h2>
                        <Button onClick={() => {setIsModalOpen(true)}} type="dashed" style={{marginTop: "10px", textAlign: "center", width: "100%"}}>创建评论</Button>
                        <Modal title="请输入您对本文章的评论" open={isModalOpen} onOk={() => {
                            api.uploadComment(id, comment, rate).then(res => {
                                tips(res)
                                api.getFileCommentList(id).then(res => {
                                    setCommentList(res.data)
                                })
                                setIsModalOpen(false)
                            })
                        }} onCancel={() => {setIsModalOpen(false)}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <span>评分</span> <Rate style={{marginLeft: "5px"}} onChange={(e) => {
                                setRate(e)
                            }}/>
                            </div>
                            <div style={{marginTop: "7px"}}>
                                <span>评语</span>
                                <TextArea rows={5} onChange={(e) => {
                                    setComment(e.target.value)
                                }} />
                            </div>
                        </Modal>
                        <div style={{marginTop: "20px"}}>
                            {
                                commentList.map((c,index) => {
                                    return <>
                                        <b>
                                            {
                                                c.commentScore < 2 ? <>

                                                </> : <>{c.commentScore > 3 ? <>
                                                    <SmileOutlined style={{color: "green"}} />
                                                </> : <>
                                                    <MehOutlined style={{color: "gray"}}/>
                                                </>}</>
                                            }
                                            <span style={{marginLeft: "5px"}}>评论：</span></b>
                                        <br/>
                                        {`${c.uploader}（${c.uploadTime}）：${c.content}`}
                                        <br/><br/>
                                    </>
                                })
                            }
                            {/*<b><span style={{marginLeft: "5px"}}>专家刘儿兀评论：</span></b>*/}
                            {/*<br/>*/}
                            {/*本文精准地捕捉了互联网与现代社会交互的核心动态，并从一个独特的角度深入探讨了区块链技术对于社会物理信息系统的革命性贡献。作者对于技术和社会间的复杂关系有着敏锐的洞察力，这为我们提供了一个宏观视角来审视技术驱动的未来。*/}
                            {/*<br/><br/>*/}
                            {/*<b> <span style={{marginLeft: "5px"}}>专家王睿评论：</span></b>*/}
                            {/*<br/>*/}
                            {/*这篇文章深刻地展示了技术与社会进步之间的紧密关系，并凸显了区块链技术在现代社会结构变革中所扮演的核心角色。文中提出的“区块链驱动的平行社会”构想颇具启发性，为读者提供了一个全新的思考维度，进一步体现了作者对于技术前沿发展的敏感洞察力。*/}
                        </div>
                    </div>
                </Col>
            </Row>
        </>

        // <>
        //
        //     <div style={{marginTop: "10px"}}></div>
        //     文章标题<Input onChange={(e) => {setTitle(e.target.value)}} />
        //     <div style={{marginTop: "7px"}}></div>
        //     文章内容

        //     {/*<div style={{ marginTop: '15px' }}>*/}
        //     {/*    {html}*/}
        //     {/*</div>*/}
        //     <div>
        //         {title}
        //         <br/>
        //         {html}
        //     </div>
        //
        //     <Button onClick={() => {
        //         api.uploadFile(title, html).then(res => {
        //             console.log(res)
        //         })
        //         console.log(html);
        //     }} type="dashed" style={{marginTop: "10px", textAlign: "center", width: "100%"}}>上传文档</Button>
        // </>
    )
}