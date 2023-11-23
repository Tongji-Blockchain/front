import {request1} from "../utils/request1";
import {request} from "../utils/request";

export function getEqlId(eql, dbName = "", token = "") {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const {socket} = loginInfo;
    if (token === "") {
        token = loginInfo.token;
    }
    if (dbName === "") {
        dbName = loginInfo.dbName;
    }
    return request1("POST", socket + "/eql/" + dbName + "/zh/" + token, {q: eql}).then(res => res);
}

export function agreeInsert(eql_id, token = "") {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const {socket} = loginInfo;
    if (token === "") {
        token = loginInfo.token;
    }
    return request1("PUT", socket + "/eql/" + eql_id + "/agree/yes/" + token, {}).then(res => res);
}

export function getResult(eql_id, istart) {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const {socket} = loginInfo;
    return request1("GET", socket + "/eql/" + eql_id + "/result/" + istart.toString(10), {}).then(res => res);
}

// export function newArticle(title, content) {
//     const token = "123"
//     return request("GET", "user/test/2", {}).then(res => res)
// }



export function register(email, name, accessKey) {
    return request("POST", "user/signUp", {
        email,
        name,
        accessKey
    }).then(res => res)
}

export function getRandomNumber(accessKey) {
    return request("POST", "user/getRandomNumber", {accessKey}).then(res => res)
}

export function login(accessKey, randomNumber) {
    return request("POST", "user/login", {accessKey, randomNumber}).then(res => res)
}

//似乎有点问题
export function uploadFile(titleName, filestring) {
    return request("POST", "file/uploadFileString", {
        titleName,
        filestring,
        parentId: "123",
        accessKey: "TOKEN",
        fileauthority: {
            "UserRandomNumber": [
                "99878454613248",
                "98653181321332",
                "594dasd9f1zxc6",
                "891fd46ds8f3zx"
            ]
        }
    }).then(res => res)
}



export function getFileContentAndComment() {
    return request("GET", "file/downEncryptFileString", {accessKey: "TOKEN", fileEncryptKey: "wclU5tXM841N4EFDdcymbA=="}).then(res => res)
}

//上传背书评分
export function uploadEndorsement(fileId,fileScore) {
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "file/Endorsement", {fileId,fileScore,token}).then(res => res)
}


// 1101测试版本

// 获得文件列表👌
export function getArcitleList() {
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("GET", "file/AllFileContent", {token}).then(res => res)
}

// 上传文件👌
export function uploadArticle(titleName, fileString) {
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "file/directUpload", {titleName, fileString, token}).then(res => res)
}

// 上传评论（Comment）👌
export function uploadComment(fileId, commentString, commentScore) {
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "comment/uploadComment", {fileId, commentString, commentScore, token}).then(res => res)
}

// 获得文章标题和内容👌
export function getArticleTitleAndContent(fileId) {
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "file/directDownload", {fileId, token}).then(res => res)
}

// 获得评论列表👌
export function getFileCommentList(fileId) {
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "comment/DownloadComment", {fileId, token}).then(res => res)
}

//检查token是否合法
export function checkLegalToken(token){
    return request("POST","file/token-valid",{token}).then(res => res)
}

//获取摘要背书列表
export function getAbstract(){
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("GET","file/EndorseFile",{token}).then(res => res)
}

//获取摘要
export function getFileAbstract(fileId){
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST","file/SummaryDownload",{fileId,token}).then(res => res)
}

// 上传高亮文本
export function uploadHighLight(articleId, newContent, highLightId, highLight) {
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "note/new-highLight", {articleId, newContent, highLightId, highLight, token}).then(res => res)
}

//获取高亮文本和文章标题
export function getHighLightAndTitle(highLightId){
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "note/getHighLightAndTitle",{highLightId,token}).then(res => res)
}

//获取批注列表
export function getNoteList(highLightId){
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "note/getNoteList",{highLightId,token}).then(res => res)
}

//上传批注
export function uploadNote(highLightId, note){
    let token = localStorage.getItem("token");
    if (!token) token = "";
    return request("POST", "note/uploadNote",{highLightId,note,token}).then(res => res)
}

