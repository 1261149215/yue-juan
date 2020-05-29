<template>
    <div class="body">
      <div class="head">
        <button class="add" @click="addArea">新增地区</button>
      </div>
      <div class="areaBox">
        <div class="left" ref='left'>
            <div class="province"
            :class="{'dragStyle':isMove,'notAllow':notAllow&&isMove,province1: provinceIndex === index}"
            ondragstart="return false;"
            @mousedown="(event)=>{onMouseDown(event,index, item, 'province')}"
            @mousemove="(event)=>{onMouseMove(event,index, 'province')}"
            @mouseup="(event)=>{onMouseUp(event,index, 'province')}" v-for="(item, index) in provinceArr" :key="index" @click="province(item.provinceId, index)">{{item.provinceName}}
                <span class="operate">
                    <i class="el-icon-edit-outline" @click="editProvice(item.provinceName, item.provinceId)"></i>
                    <i class="el-icon-delete" @click="deleteProvince(item.provinceName, item.provinceId)"></i>
                </span>
                <span class="bar"></span>
            </div>
            <div class="itemDragProvince" v-if="isMove && dragTarget === 'province'" 
           ondrop="(event)=>{ondrop(event,index)}" draggable="false">{{draging}}</div>
        </div>
        <div class="middle" ref="middle">
          <div class="city" :class="{'dragStyle':isMove,'notAllow':notAllow&&isMove,city1: cityIndex === index}"
            ondragstart="return false;"
            @mousedown="(event)=>{onMouseDown(event,index, item, 'city')}"
            @mousemove="(event)=>{onMouseMove(event,index, 'city')}"
            @mouseup="(event)=>{onMouseUp(event,index, 'city')}"
            v-for="(item, index) in cityArr" :key="index" @click="city(item.cityId, index)">{{item.cityName}}
            <span class="operate">
                <i class="el-icon-edit-outline" @click="editCity(item.cityName, item.cityId)"></i>
                <i class="el-icon-delete" @click="deleteCity(item.cityName, item.cityId)"></i>
            </span>
            <span class="bar"></span>
          </div>
          <div class="itemDragCity"  v-if="isMove && dragTarget === 'city'"
           ondrop="(event)=>{ondrop(event,index)}" draggable="false">{{draging}}</div>
        </div>
        <div class="right" ref="right">
          <div class="district" :class="{'dragStyle':isMove,'notAllow':notAllow&&isMove, district1: districtIndex === index}"
            ondragstart="return false;"
            @mousedown="(event)=>{onMouseDown(event,index, item, 'district')}"
            @mousemove="(event)=>{onMouseMove(event,index, 'district')}"
            @mouseup="(event)=>{onMouseUp(event,index, 'district')}"
            v-for="(item, index) in districtArr" :key="index" @click="district(item.districtId, index)">{{item.districtName}}
            <span class="operate">
              <i class="el-icon-edit-outline" @click="editDistrict(item.districtName, item.districtId)"></i>
              <i class="el-icon-delete" @click="deleteDistrict(item.districtName, item.districtId)"></i>
            </span>
            <span class="bar"></span>
          </div>
          <div class="itemDragDistrict"   v-if="isMove && dragTarget === 'district'"
           ondrop="(event)=>{ondrop(event,index)}" draggable="false">{{draging}}</div>
        </div>
      </div>
      <area-dialog
      v-model="showArea"
      :flag="flag"
      :provinceOrder="Number(provinceOrder)"
      :districtOrder="Number(districtOrder)"
      :cityOrder="Number(cityOrder)"
      :cityid="Number(cityid)"
      :districtid="Number(districtId)"
      @closeDialog="closeDialog"
      :provinceId="Number(provinceId)"
      @update-province ="updateProvince"
      @update-distict="updateDistict"
      @update-city="updateCity"
      :cityName="cityName"
      :provinceName="provinceName"
      :districtName="districtName"
      :showRadio="Number(radio)">
      </area-dialog>
    </div>
</template>
<script>

import area from '@/api/area'
import areaDialog from '@/components/Dialog/areaDialog'
export default {
  components: {
    areaDialog
  },
    created () {
      this.getProvince()
    },
    data () {
      return {
        notAllow: false,
        dragingType: '',
        draging: '',
        dragTarget: '',
        provinceId: 0,
        newOrder: 0,
        oldOrder: 0,
        move: false,
        firstIndex: 0,
        lastIndex: 0,
        X: 0,
        y: 0,
        isMove: false,
        dragIndex: 0,
        provinceArr: [],
        cityArr: [],
        cityId: '',
        districtArr: [],
        provinceIndex: 0,
        cityIndex: 0,
        showArea: false,
        flag: 0,
        provinceOrder: 0,
        districtOrder: 0,
        cityName: '',
        districtId: '',
        districtIndex: 0,
        cityid: 0,
        districtid: '',
        cityOrder: '',
        provinceName: '',
        districtName: '',
        radio: ''
      }
    },
    methods: {
      onMouseDown(e, index, item, type) {
        this.dragTarget = type
        let ev = e || window.event
        this.firstIndex = null
        this.firstIndex = index
        if (type === 'province') {
          this.oldOrder = this.provinceArr[this.firstIndex].provinceOrder
          this.draging = item.provinceName
        } else if (type === 'city') {
          this.cityId = item.cityId
          this.oldOrder = this.cityArr[this.firstIndex].cityOrder
          this.draging = item.cityName
        } else if (type === 'district') {
          this.districtId = item.districtId
          this.oldOrder = this.districtArr[this.firstIndex].districtOrder
          this.draging = item.districtName
        }
        this.dragingType = type
        this.dragIndex = index
        this.move = true
        let offsetX = ev.target.offsetLeft
        let offsetY = ev.target.offsetTop
        this.x = ev.clientX - offsetX
        this.y = ev.clientY - offsetY
        let oDiv = document.querySelector('.itemDrag')
        if (oDiv) {
          oDiv.style.left = `${this.x}px`
          oDiv.style.top = `${this.y}px`
        }
      },
      onMouseMove (e, index, type) {
        if (this.dragingType !== type) {
          this.notAllow = true
        } else {
          this.notAllow = false
        }
        let evmove = e || window.event
        if (this.move) {
            let left = 0, top = 0
            let oDiv
            if (this.dragingType === 'province') {
              oDiv = document.querySelector('.itemDragProvince')
            } else if (this.dragingType === 'city') {
              oDiv = document.querySelector('.itemDragCity')
            } else {
              oDiv = document.querySelector('.itemDragDistrict')
            }
            left = evmove.clientX - this.x
            top = evmove.clientY - this.y
            if (left > 5 || top > 5) {
              this.isMove = true
              if (oDiv) {
                oDiv.style.opacity = 0.5
              }
            }
            if (oDiv) {
              oDiv.style.left = `${left}px`
              oDiv.style.top = `${top}px`
            }
        }
      },
      onMouseUp (e, index, type) {
        this.move = false
        this.isMove = false
        this.lastIndex = null
        this.dragTarget = ''
        this.lastIndex = index
        // let item = this.list[this.firstIndex]
        if (this.lastIndex !== undefined) {
          if (this.dragingType === 'province') {
            this.newOrder = this.provinceArr[this.lastIndex].provinceOrder
            if (this.newOrder !== this.oldOrder && !this.notAllow) {
              this.provinceId = this.provinceArr[this.firstIndex].provinceId
              this.dragProvince(this.provinceId, this.newOrder, this.oldOrder)
            }
          } else if (this.dragingType === 'city') {
            this.newOrder = this.cityArr[this.lastIndex].cityOrder
            if (this.newOrder !== this.oldOrder && !this.notAllow) {
              this.dragCity(this.provinceId, this.cityId, this.newOrder, this.oldOrder)
            }
          }
          else if (this.dragingType === 'district' && !this.notAllow) {
            this.newOrder = this.districtArr[this.lastIndex].districtOrder
            if (this.newOrder !== this.oldOrder && !this.notAllow) {
              this.dragDistict(this.provinceId, this.cityId, this.districtId, this.newOrder, this.oldOrder)
            }
          }
        }
        this.$forceUpdate()
      },
      async dragProvince (provinceId, newOrder, oldOrder) {
        try {
          let obj = {
            provinceId: provinceId,
            newOrder: newOrder,
            oldOrder: oldOrder
          }
          let res = await area.dragProvinceOrder(obj)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getProvince()
          }
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      async dragCity (provinceId, cityId, newOrder, oldOrder) {
        try {
          let obj = {
            provinceId: provinceId,
            cityId: cityId,
            newOrder: newOrder,
            oldOrder: oldOrder
          }
          let res = await area.dragCityOrder(obj)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getCity()
          }
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      async dragDistict (provinceId, cityId, districtId, newOrder, oldOrder) {
        try {
          let obj = {
            provinceId: provinceId,
            cityId: cityId,
            districtId: districtId,
            newOrder: newOrder,
            oldOrder: oldOrder
          }
          let res = await area.dragDistrictOrder(obj)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getDistrict()
          }
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      province (val, index) {
        this.provinceId = val
        this.provinceIndex = index
        this.getCity()
      },
      city (val, index) { // 得到市Id
        this.cityId = val
        this.cityIndex = index
        this.getDistrict()
      },
      district (val, index) { // 得到区Id
        this.districtId = val
        this.districtIndex = index
      },
      async getProvince () { // 得到省数据
        let res = await area.getProvince()
        this.provinceArr = res.data
        this.provinceId = this.provinceArr[0].provinceId
        this.provinceOrder = this.provinceArr.length + 1
        this.getCity()
      },
      async getCity () { // 得到市数据
        let res = await area.getCity(Number(this.provinceId))
        this.cityArr = res.data
        if (this.cityArr[0]) {
          this.cityId = this.cityArr[0].cityId
        } else {
          this.cityId = -1
        }
        this.cityid = this.cityId
        this.cityOrder = this.cityArr.length + 1
        this.getDistrict()
      },
      async getDistrict () { // 得到区数据
        let res = await area.getDistrict(Number(this.cityId))
        this.districtArr = res.data
        this.districtOrder = this.districtArr.length + 1
      },
      addArea () { // 新增、编辑弹窗
        this.showArea = true
        this.flag = 0
      },
      closeDialog () {
        this.showArea = false
      },
      async updateProvince (data) {
        let res = await area.getProvince()
        this.provinceArr = res.data
        if (data) {
          let res = await area.getCity(data)
          this.cityArr = res.data
          if (this.cityArr[0]) {
            this.cityId = this.cityArr[0].cityId
          } else {
            this.cityId = -1
          }
        } else {
          this.cityArr = []
          this.provinceIndex = this.provinceArr.length - 1
          this.$refs.left.scrollTop = this.$refs.left.scrollHeight
        }
      },
      editCity (val, val1) {
        this.cityName = val
        this.showArea = true
        this.cityid = val1
        this.flag = 1
        this.radio = 1
      },
      editProvice (val, val1) {
        this.provinceName = val
        this.provinceId = val1
        this.flag = 1
        this.radio = 0
        this.showArea = true
      },
      addDistrict (val) {
        this.flag = 2
        this.cityid = val
      },
      async updateDistict (data) {
        this.getDistrict()
        if (data) {
          
        } else {
          this.districtIndex = this.districtArr.length - 1
          this.$refs.right.scrollTop = this.$refs.right.scrollHeight
        }
      },
      async updateCity (data) {
        let res = await area.getCity(Number(this.provinceId))
        this.cityArr = res.data
        if (data) {
          let res = await area.getDistrict(data)
        } else {
          this.districtArr = []
          this.cityIndex = this.cityArr.length - 1
          this.$refs.middle.scrollTop = this.$refs.middle.scrollHeight
        }
      },
      editDistrict (val, val1) {
        this.showArea = true
        this.districtName = val
        this.flag = 1
        this.radio = 2
        this.districtId = val1
      },
      async deleteProvince (val, val1) {
        let res = await area.deleteProvince(Number(val1))
        if (res.code === 0) {
          this.getProvince()
          this.provinceIndex = 0
          this.$refs.left.scrollTop = 0
        } else {
          return ;
        }
      },
      async deleteCity (val, val1) {
        let res = await area.deleteCity(Number(val1))
        if (res.code === 0) {
          this.getCity()
          this.cityIndex = 0
          this.$refs.middle.scrollTop = 0
        } else {
          return ;
        }
      },
      async deleteDistrict (val, val1) {
        let res = await area.deleteDistrict(Number(val1))
        if (res.code === 0) {
          this.getDistrict()
          this.districtIndex = 0
          this.$refs.right.scrollTop = 0
        } else {
          return ;
        }
      }
    },
    watch: {
      provinceId () {
        this.districtArr = []
        this.cityIndex = 0
        this.districtIndex = 0
      }
    },
    mounted () {
      if (document.documentElement.addEventListener) {
        document.documentElement.addEventListener('mouseup', this.onMouseUp, true);
      } else {
        document.documentElement.attachEvent('onmouseup', this.onMouseUp, true);
      }
    },
    beforeDestroy () {
      if (document.documentElement.removeEventListener) {
        document.documentElement.removeEventListener('mouseup', this.onMouseUp, true);
      } else {
        document.documentElement.detachEvent('onmouseup', this.onMouseUp, true);
      }
    }
}
</script>
<style lang="scss" scoped>
.body{
    -webkit-touch-callout: none;  
    -webkit-user-select: none;  
    -khtml-user-select: none;  
    -moz-user-select: none;  
    -ms-user-select: none;  
    user-select: none;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  .head{
      height: 65px;
      width: 100%;
      .add{
          height: 40px;
          width: 145px;
          border-radius: 4px;
          border: none;
          margin-left: 15px;
          margin-top: 10px;
          background-color: #4B9AFF;
          color: #ffffff;
      }
  }
  .areaBox{
    position: absolute;
    top: 65px;
    bottom: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    .left{
        width: 33%;
        height: 100%;
        border-right: 1px solid #eeeeee;
        padding: 10px 0;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        .itemDragProvince{
            cursor: pointer;
            pointer-events: none;
            height: 40px;
            width:100%;
            line-height:40px;
            background-color: #c1d9f8;
            border:1px solid #d9d9d9;
            border-radius:4px;
            color:#333;
            user-select: none;
            text-align: center;
            position: absolute;
            left: 0;
            top:0;
            opacity: 0;
        }
        .province{
            text-align: center;
            height: 40px;
            position: relative;
            line-height: 40px;
            cursor: pointer;
            .operate{
              display: none;
              position: absolute;
              font-size: 24px;
              right: 50px;
              i{
                margin-right: 10px;
                color: #333;
              }
            }
            .bar{
                -display: none;
                position: relative;
                height: 40px;
                width: 2px;
                background-color: #ffffff;
                display: inline-block;
                float: right;
            }
        }
        .province1{
            text-align: center;
            height: 40px;
            position: relative;
            line-height: 40px;
            cursor: pointer;
            background: rgb(193, 217, 248);
            .operate{
              display: inline-block;
              position: absolute;
              font-size: 24px;
              right: 50px;
              i{
                margin-right: 10px;
                color: #333;
              }
            }
            .bar{
              position: relative;
              height: 40px;
              width: 2px;
              background-color: #4B9AFF;
              display: inline-block;
              float: right;
            }
        }
        .notAllow{
          cursor:not-allowed;
        }
        .province:hover{
            background-color: rgb(193, 217, 248);
            color: #4B9AFF;
             .bar{
                position: relative;
                height: 40px;
                width: 2px;
                background-color: #4B9AFF;
                display: inline-block;
                float: right;
            }
        }
        .dragStyle:hover{
          background-color:#fff !important;
          border-bottom:1px solid#4B9AFF;
        }
    }
    .middle{
        width: 33%;
        height: 100%;
        border-right: 1px solid #eeeeee;
        padding: 10px 0;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        .itemDragCity{
            cursor: pointer;
            pointer-events: none;
            height: 40px;
            width:100%;
            line-height:40px;
            background-color: #c1d9f8;
            border:1px solid #d9d9d9;
            border-radius:4px;
            color:#333;
            user-select: none;
            text-align: center;
            position: absolute;
            left: 0;
            top:0;
            opacity: 0;
        }
        i {
          font-size: 18px;
        }
        .city{
          text-align: center;
          height: 40px;
          position: relative;
          line-height: 40px;
          cursor: pointer;
          .operate{
            display: none;
          }
          .bar{
              -display: none;
              position: relative;
              height: 40px;
              width: 2px;
              background-color: #ffffff;
              display: inline-block;
              float: right;
          }
        }
        .city1{
          text-align: center;
          height: 40px;
          position: relative;
          line-height: 40px;
          cursor: pointer;
          background: rgb(193, 217, 248);
          .operate{
              display: inline-block;
              position: absolute;
              font-size: 24px;
              right: 50px;
              i{
                margin-right: 10px;
                color: #333;
                font-size: 24px;
              }
            }
          .bar{
              position: relative;
              height: 40px;
              width: 2px;
              background-color: #4B9AFF;
              display: inline-block;
              float: right;
          }
        }
        .city:hover{
            background-color: rgb(193, 217, 248);
            color: #4B9AFF;
            position: relative;
            .operate{
              display: inline-block;
              position: absolute;
              font-size: 24px;
              right: 50px;
              i{
                margin-right: 10px;
                color: #333;
                font-size: 24px;
              }
            }
            .bar{
                position: relative;
                height: 40px;
                width: 2px;
                background-color: #4B9AFF;
                display: inline-block;
                float: right;
            }
        }
        .notAllow{
          cursor:not-allowed;
        }
        .dragStyle:hover{
          background-color:#fff !important;
          border-bottom:1px solid#4B9AFF;
        }
    }
    .right{
        width: 32%;
        height: 100%;
        border-right: 1px solid #eeeeee;
        padding: 10px 0;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        .itemDragDistrict{
            cursor: pointer;
            pointer-events: none;
            height: 40px;
            width:100%;
            line-height:40px;
            background-color: #c1d9f8;
            border:1px solid #d9d9d9;
            border-radius:4px;
            color:#333;
            user-select: none;
            text-align: center;
            position: absolute;
            left: 0;
            top:0;
            opacity: 0;
        }
        .district{
          text-align: center;
          height: 40px;
          position: relative;
          line-height: 40px;
          cursor: pointer;
          .operate{
              display: none;
              position: absolute;
              font-size: 24px;
              right: 50px;
              i{
                margin-right: 10px;
                color: #333;
              }
            }
          .bar{
              display: none;
          }
        }
        .district:hover{
            background-color: rgb(193, 217, 248);
            color: #4B9AFF;
            position: relative;
            .operate{
              display: inline-block;
              position: absolute;
              font-size: 24px;
              right: 50px;
              i{
                margin-right: 10px;
                color: #333;
              }
            }
            .bar{
                position: relative;
                height: 40px;
                width: 2px;
                background-color: #4B9AFF;
                display: inline-block;
                float: right;
            }
        }
        .district1{
            text-align: center;
            height: 40px;
            position: relative;
            line-height: 40px;
            cursor: pointer;
            background: rgb(193, 217, 248);
            .operate{
              display: inline-block;
              position: absolute;
              font-size: 24px;
              right: 50px;
              i{
                margin-right: 10px;
                color: #333;
              }
            }
            .bar{
              position: relative;
              height: 40px;
              width: 2px;
              background-color: #4B9AFF;
              display: inline-block;
              float: right;
            }
        .notAllow{
          cursor:not-allowed;
        }
        .district:hover{
            background-color: rgb(193, 217, 248);
            color: #4B9AFF;
             .bar{
                position: relative;
                height: 40px;
                width: 2px;
                background-color: #4B9AFF;
                display: inline-block;
                float: right;
            }
        }
    }
    .dragStyle:hover{
      background-color:#fff !important;
      border-bottom:1px solid#4B9AFF !important;
    }
   }
  }
}
</style>