import * as api from "../api/api";
import { Button, message } from 'antd';

export function getResult(eql_id, getIndex, incIndex, resetIndex, stop, callback) {
    return () => {
        if (getIndex() >= 0) {
            api.getResult(eql_id, getIndex()).then(res => {
                if (res.length > 0) {
                    res.map(r => {
                        if (r.s === "running") {
                            incIndex();
                        } else if (r.s === "output") {
                            incIndex()
                            callback(JSON.parse(r.r))
                        } else {
                            resetIndex()
                            stop()
                        }
                        return r
                    })
                } else {
                    resetIndex()
                    stop()
                }
            })
        }
    }
}


export function addSlash(s) {
    let r = s;
    r = r.replace(/\?/g, '\\?')
    r = r.replace(/:/g, '\\:')
    r = r.replace(/\(/g, '\\(')
    r = r.replace(/\)/g, '\\)')
    r = r.replace(/=/g, '\\=')
    r = r.replace(/!=/g, '\\!=')
    r = r.replace(/>/g, '\\>')
    r = r.replace(/>=/g, '\\>=')
    r = r.replace(/</g, '\\<')
    r = r.replace(/<=/g, '\\<=')
    r = r.replace(/,/g, '\\,')
    r = r.replace(/\./g, '\\.')

    r = r.replace(/？/g, '\\？')
    r = r.replace(/：/g, '\\：')
    r = r.replace(/（/g, '\\（')
    r = r.replace(/）/g, '\\）')
    r = r.replace(/＝/g, '\\＝')
    r = r.replace(/！＝/g, '\\！＝')
    r = r.replace(/＞/g, '\\＞')
    r = r.replace(/＞＝/g, '\\＞＝')
    r = r.replace(/＜/g, '\\＜')
    r = r.replace(/＜＝/g, '\\＜＝')
    r = r.replace(/，/g, '\\，')
    return r

}

export function tips(res) {
    if (res.status == 200) {
        message.success(res.message)
    } else {
        message.error(res.message)
    }
}

export function checkToken(){
    let token = localStorage.getItem("token");
    //console.log(token);
    api.checkLegalToken(token).then(res => {
        if(res.status==200){
            localStorage.setItem("token_vaild","Y");
        }else{
            localStorage.setItem("token_vaild","N");
        }
    })
    
}