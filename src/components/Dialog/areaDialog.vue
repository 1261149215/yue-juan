<template>
    <el-dialog
    id="areaDialog"
    :title="title"
    :visible.sync="dialogVisible"
    width="610px"
    @open="dialogOpen">
        <div class="body">
            <el-form :model="form" ref="form" :rules="formValidate">
                <el-form-item label="地区类型:" :label-width="formLabelWidth" prop="type" v-if="flag === 0">
                  <el-radio-group v-model="radio"  @change="review">
                    <el-radio-button :label="0">省</el-radio-button>
                    <el-radio-button :label="1">市</el-radio-button>
                    <el-radio-button :label="2">区</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="地区名称:" :label-width="formLabelWidth" prop="areaName">
                    <el-input size="small" v-model="form.areaName" auto-complete="off" placeholder="请输入地区名称"></el-input>
                </el-form-item>
                <el-form-item label="上级地区:" :label-width="formLabelWidth" prop="upArea" v-if="radio !== 0">
                    <el-cascader
                    size="small"
                    :options="options"
                    clearable
                    placeholder="请选择上级地区"
                    v-model="form.uparea"
                    @change="changeProvince">
                    </el-cascader>
                </el-form-item>
            </el-form>
        </div>
        <div class="button">
          <button class="btn1" @click="areaClose(false)">取消</button>
          <button class="btn2" @click="ok(false)">保存</button>
        </div>
    </el-dialog>
</template>
<script>
import area from '@/api/area'
export default {
    computed: {
      dialogVisible: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    props: {
      value: {
        type: Boolean,
        default () {
          return false
        }
      },
      provinceOrder: {
        type: Number
      },
      cityName: {
        type: String
      },
      flag: {
        type: Number
      },
      cityid: {
        type: Number
      },
      provinceId: {
        type: Number
      },
      districtOrder: {
        type: Number
      },
      provinceId: {
        type: Number
      },
      cityOrder: {
        type: Number
      },
      showRadio: {
        type: Number,
        default () {
          return 0
        }
      },
      provinceName: {
        type: String
      },
      cityName: {
        type: String
      },
      districtName: {
        type: String
      },
      districtid: {
        type: Number
      }
    },
    data () {
      return {
        title: '',
        form: {
          areaName: '',
          upArea: ''
        },
        formLabelWidth: '150px',
        options: [],
        uparea: [],
        radio: 0,
        provinceid: 0,
        cityId: 0,
        formValidate: {
          areaName: [
            { required: true, message: '请输入', trigger: 'blur' },
            { max: 30, message: '长度在30个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      dialogOpen () {
        this.form.areaName = ''
        this.form.uparea = ''
        this.provinceid = this.provinceId
        this.cityId = this.cityid
        console.log(this.cityId)
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
        this.getProvinceDialog()
        if (this.flag === 0) {
          this.title = '新增地区'
          this.radio = 0
        } else if (this.flag === 1) {
          this.title = '编辑地区'
          if (this.showRadio === 0) {
            this.radio = 0
            this.form.areaName = this.provinceName
          } else if (this.showRadio === 1) {
            this.radio = 1
            this.form.areaName = this.cityName
            this.form.uparea = [this.provinceid]
          } else if (this.showRadio === 2) {
            this.radio = 2
            this.form.areaName = this.districtName
            this.form.uparea = [this.provinceid, this.cityId]
          }
        }
      },
      areaClose (val) {
        this.$emit('closeDialog', val)
      },
      async addProvince () {
        let data = {
          provinceName: this.form.areaName,
          provinceOrder: this.provinceOrder
        }
        let res = await area.addProvince(data)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.$emit('update-province')
        } else {
          this.$message(res.data)
        }
      },
      ok (val) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.flag === 0) { // 新增
              if (this.radio === 0) {
                this.radio = 0
                this.addProvince()
              } else if (this.radio === 1) {
                this.addCity()
              } else if (this.radio === 2) {
                this.addDistrict()
              }
            } else if (this.flag === 1) { // 编辑
              if (this.radio === 0) {
                this.editProvince()
              } else if (this.radio === 1) {
                this.editCity()
              } else if (this.radio === 2) {
                this.editDistrict()
              }
            }
            this.$emit('closeDialog', val)
          }
        })
        this.form.areaName = ''
        this.form.upArea = ''
      },
      async getProvinceDialog () {
        let res = await area.getProvinceDialog()
        this.options = res.data
        for (let i = 0; i < this.options.length; i++) {
          if (this.radio === 2) {
            for (let j = 0; j < this.options[i].children.length; j++) {
              delete this.options[i].children[j].children
            }
          } else if (this.radio === 1) {
            delete this.options[i].children
          }
        }
      },
      changeProvince () {
        if (this.form.uparea[0]) {
          this.provinceid = this.form.uparea[0]
        }
        if (this.form.uparea[1]) {
          this.cityId = this.form.uparea[1]
        }
      },
      async addCity () {
        try{
          let data = {
            provinceId: this.provinceid,
            cityName: this.form.areaName,
            cityOrder: this.cityOrder
          }
        let res = await area.addCity(data)
        if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$emit('update-city')
          } else {
            this.$message(res.data)
          }
        } catch (e) {
          this.$message.error(e.msg)
        }
      },
      async addDistrict () {
        try{
          let data = {
            districtOrder: this.districtOrder,
            cityId: this.cityId,
            provinceId: this.provinceid,
            districtName: this.form.areaName
          }
        let res = await area.addDistrict(data)
        if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$emit('update-distict')
          } else {
            this.$message(res.data)
          }
        } catch (e) {
          this.$message.error(e.msg)
        }
      },
      review () {
        this.getProvinceDialog()
      },
      async editProvince () {
        try {
          let data = {
            provinceName: this.form.areaName,
            provinceId: this.provinceid
          }
          let res = await area.editProvince(data)
          if (res.code === 0) {
             this.$message({
                type: 'success',
                message: '编辑成功!'
              })
              this.$emit('update-province', this.provinceId)
          }
        } catch (e) {
          this.$message.error(e.msg)
        }
      },
      async editCity () {
        try {
          let data = {
            cityId: this.cityId,
            provinceId: this.provinceid,
            cityName: this.form.areaName
          }
          let res = await area.editCity(data)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑成功!'
            })
            this.$emit('update-city', this.cityId)
          } else {
            this.$message(res.data)
          }
        } catch (e) {
          this.$message.error(e.msg)
        }
      },
      async editDistrict () {
         try {
          let data = {
            districtId: this.districtid,
            provinceId: this.provinceid,
            districtName: this.form.areaName,
            cityId: this.cityId
          }
          console.log(data)
          let res = await area.editDistrict(data)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑成功!'
            })
            this.$emit('update-distict', this.districtId)
          } else {
            this.$message(res.data)
          }
        } catch (e) {
          this.$message.error(e.msg)
        }
      }
    }
}
</script>
<style lang="scss" scoped>
#areaDialog{
    .body{
      .el-radio-button{
        margin-right: 5px;
      }
    }
    .button{
        display: flex;
        justify-content: center;
        align-items: center;
        .btn1{
          height: 30px;
          width: 110px;
          border-radius: 4px;
          border: 1px solid #4B9AFF;
          background-color: #ffffff;
          color: #4B9AFF;
          margin-right: 30px;
          cursor: pointer;
        }
        .btn2{
          height: 30px;
          width: 110px;
          border-radius: 4px;
          border: 1px solid #4B9AFF;
          background-color: #4B9AFF;
          color: #ffffff;
          margin-left: 10px;
          cursor: pointer;
        }
    }
}
</style>
<style>
#areaDialog .el-input--small .el-input__inner{
  width: 350px;
}
</style>
<style>
#areaDialog .el-radio-button {
  margin-right: 5px;
}
#areaDialog .el-radio-button__inner {
  padding: 5px 10px;
  color: #4B9AFF;
  border-color: #4B9AFF;
  border-left: 1px solid;
  border-radius: 2px;
  width: 80px;
}
#areaDialog .el-radio-button__inner:hover{
  background-color: #4B9AFF;
  color: #fff;
}
#areaDialog .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #4B9AFF;
  border-color: #4B9AFF;
  color: #fff;
  box-shadow: none
}
</style>
