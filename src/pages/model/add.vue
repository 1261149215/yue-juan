<template>
  <div class="setting">
    <div class="modles">
      <div class="title" style="margin-bottom: 20px;">模块名称：</div>
      <el-input v-model="templateName"></el-input>
      <div class="title" style="margin-top: 20px;">选择模块：</div>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="test">操作日志</el-checkbox>
        <el-checkbox label="bus_teacher">老师信息管理</el-checkbox>
        <el-checkbox label="bus_student">学生信息管理</el-checkbox>
      </el-checkbox-group>
    </div>
    <textarea id="editor" name="editor">
    </textarea>
    <el-button type="primary" round @click="get" size="medium" style="margin-top: 20px;margin-left: 30px;" >提 交</el-button>
    <el-button round @click="back" size="medium" style="margin-top: 20px;margin-left: 30px;" >返回</el-button>
  </div>
</template>
<script>
// 在线代码编辑组件
import * as CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/theme/monokai.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/go/go'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/http/http'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/hint/html-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/hint/css-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/mode/meta'
import "codemirror/addon/fold/foldgutter.css" 
import "codemirror/addon/fold/foldcode"
import "codemirror/addon/fold/brace-fold"
import 'codemirror/addon/selection/active-line'

import model from "./model"
  import request from "@/utils/request.js"
  import { deepCopy } from "@/utils/common.js"
  export default {
    data() {
      return {
        CodeMirrorEditor: null,
        checkList:[],
        templateName: "",
        aaa: "",
      }
    },
    mounted(){
      this.something="javascript"
      // document.getElementById("theme").nodeValue="javascript"
      this.setmirror()
      // this.CodeMirrorEditor.getValue()
      console.log(model)
      let id = this.$route.params.id;
      if(id){
        this._checkData(id).then(res=>{
          if(res.code === 0){
              this.templateName = res.data.templateName
              this.checkList = res.data.tables.split(",")
              let html = this.html_decode(res.data.template)
              this.CodeMirrorEditor.setValue(html)
            }else{
              this.$message({
                type: 'error',
                message: "当前数据已被删除！"
              });
              this.$router.go(-1)
            }
        })
      }
      console.log(id)
    },
    methods:{
      async _checkData (id) {
        let url = "/comTemplate/getDataById?id="+id
        const result = await request({
          url: url,
          method: 'post',
        })
        console.log(result)
        return result
      },
      async _setTemplate (data) {
        const result = await request({
          url: `/comTemplate/saveOrUpdate`,
          method: 'post',
          data: data,
        })
        console.log(result)
        return result
      },
      html_encode(str) { 
          var s = ""; 
          if (str.length == 0) return ""; 
          s = str.replace(/&/g, "&amp;"); 
          s = s.replace(/</g, "&lt;"); 
          s = s.replace(/>/g, "&gt;"); 
          s = s.replace(/ /g, "&nbsp;"); 
          s = s.replace(/\'/g, "&#39;"); 
          s = s.replace(/\"/g, "&quot;"); 
              s = s.replace(/\n/g, "<br/>"); 
          return s; 
      },
      html_decode(str) { 
          var s = ""; 
          if (str.length == 0) return ""; 
          s = str.replace(/&amp;/g, "&"); 
          s = s.replace(/&lt;/g, "<"); 
          s = s.replace(/&gt;/g, ">"); 
          s = s.replace(/&nbsp;/g, " "); 
          s = s.replace(/&#39;/g, "\'"); 
          s = s.replace(/&quot;/g, "\""); 
          s = s.replace(/<br\/>/g, "\n"); 
          return s; 
      },
      get(){
        let a = this.CodeMirrorEditor.getValue()
        let html = this.html_encode(a)
        console.log(html)
        this.aaa = html
        let id = this.$route.params.id;
        let data = {}
        let tables = this.checkList.join(",")
        if(id){
          data = {
            id: id,
            templateName: this.templateName,
            template: html,
            tables: tables.slice(0)
          }
        }else{
          data = {
            templateName: this.templateName,
            template: html,
            tables: tables.slice(0)
          }
        }
        debugger
        this._setTemplate(data).then(res =>{
          if(res.code === 0){
            if(id){
              this.$message.success("修改成功！")
            }else{
              this.$message.success("创建成功！")
            }
            this.$router.go(-1)
          }
        })
      },
      back(){
        this.$router.go(-1)
      },
      setmirror(){
        let myTextarea = document.getElementById('editor');
        this.CodeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
            theme:'monokai', 
            styleActiveLine: true,
            mode:'javascript',
            extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
            // lineNumbers: true,
            tabSize:10,
            // readOnly:"nocursor",
            smartIndent:true,
            scrollbarStyle:"overlay"
            // keymap:"defaule"
        });
        // this.CodeMirrorEditor.setOption('lineWrapping', true);
        this.CodeMirrorEditor.on("keypress",() =>{
            //编译器内容更改事件
            console.log(this.CodeMirrorEditor)
            this.CodeMirrorEditor.showHint();
        });
        this.CodeMirrorEditor.setValue("")
        
        this.CodeMirrorEditor.setOption("lineNumbers","true")
        // this.CodeMirrorEditor.addOverlay("coconut");
        // this.CodeMirrorEditor.markText({line:0,ch:0},{line:0,ch:0})
        this.CodeMirrorEditor.setBookmark({line:0,ch:0},{line:0,ch:1},{readOnly:true}); 
        this.CodeMirrorEditor.setCursor(0)
        this.CodeMirrorEditor.setSize("100%",600)
      }
    }
  };
</script>
<style lang="scss" scoped>
.setting{
  width: 100%;
  min-height: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
}
  .modles{
    width: 100%;
    margin: 20px 0;
    .title{
      width: 100%;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
</style>
