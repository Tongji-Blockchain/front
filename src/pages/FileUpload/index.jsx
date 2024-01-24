import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import {Button, Input, message} from "antd";
import * as api from "../../api/api";
import {uploadArticle} from "../../api/api";
import {tips} from "../../utils/helper";
import { checkToken } from '../../utils/helper';

export default function FileUpload(props) {
    //检查token
    checkToken();
    const flag=localStorage.getItem("token_vaild");
    if(flag==="N"){
        message.error("登录超时！请重新登录")
        props.history.push("/Login")
    }

    // editor 实例
    const [editor, setEditor] = useState(null)                   // JS 语法
    const [title, setTitle] = useState("")
    // 编辑器内容
    const [html, setHtml] = useState("")

    // // 模拟 ajax 请求，异步设置 html
    // useEffect(() => {
    //     setTimeout(() => {
    //         setHtml('<p>hello world</p>')
    //     }, 1500)
    // }, [])

    // 工具栏配置
    const toolbarConfig = { }                        // JS 语法

    // 编辑器配置

    const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
        MENU_CONF: {}
    }


    // 自定义校验链接
    function customCheckLinkFn(text, url) {
        if (url === "") {
            return true
        } else {
            return false
        }
        // if (!url) {
        //     return
        // }
        // if (url.indexOf('http') !== 0) {
        //     return '链接必须以 http/https 开头'
        // }
        // return true
        // // 返回值有三种选择：
        // // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
        // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
        // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
    }

    // 自定义转换链接 url
    function customParseLinkUrl(url) {                // JS 语法
        return "http://www.baidu.com"
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
        <><h2 style={{ textAlign: "center", marginTop: "30px" }}>文件上传</h2>
            <div style={{marginTop: "10px"}}></div>
            文章标题<Input onChange={(e) => {setTitle(e.target.value)}} />
            <div style={{marginTop: "7px"}}></div>
            文章内容
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
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>

            <Button onClick={() => {
                api.uploadArticle(title, html).then(res => {
                    tips(res)
                    // setInterval(() => {props.history.push('/file-list')}, 1000)
                })
            }} type="dashed" style={{marginTop: "10px", textAlign: "center", width: "100%"}}>上传文档</Button>
        </>
    )
}