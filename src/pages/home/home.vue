<template>
  <div class="home">
    <el-row>
      <el-col :span="24" style="padding-right: 4px;margin-bottom: 20px;">
        <el-col :span="12" style="padding-right: 4px;">
          <el-card>
            <div slot="header">测试数据mock</div>
            <div class="body">
              <h-chart id="high" ref="chartone" :option="option1" @getHighChart="getHighChartone"></h-chart>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" style="padding-left: 4px;">
          <el-card>
            <div slot="header">评分组件</div>
            <div class="body">
              <h-chart id="high2" :option="option2" @getHighChart="getHighChartone"></h-chart>
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="24" style="padding-right: 4px;margin-bottom: 20px;">
        <el-col :span="10" style="padding-right: 4px;">
          <el-card>
            <div slot="header">测试数据mock</div>
            <div class="body">
              <h-chart id="high3" :option="option3" @getHighChart="getHighChartone"></h-chart>
            </div>
          </el-card>
        </el-col>
        <el-col :span="14" style="padding-left: 4px;">
          <el-card>
            <div slot="header">评分组件</div>
            <div class="body">
              <h-chart id="high4" :option="option4" @getHighChart="getHighChartone"></h-chart>
              <p>size --- 控制每颗星星的大小，类型为string,备选值分别为24/36/48；</p>
              <p>score --- 传递评分的分数，类型为number</p>
              <score :score="4.6" :size="24" style="margin: 8px 0;"></score>
              <score :score="4" :size="36" style="margin: 8px 0;"></score>
              <score :score="3.4" :size="48"></score>
            </div>
          </el-card>
        </el-col>
      </el-col> 
    </el-row>
  </div>
</template>

<script>
import HChart from "@/components/highCharts/chart";
import score from "@/components/Score";
export default {
   data () {
      return {
        value: 0,
        option1:{
          chart:{
            type: "column"
          },
          title: {
            text: "联考与本校总分分段对比统计图",
            style: {
              color: '#fff',
            }
          },
          xAxis: {
            // gridLineWidth: 1,
            categories: [
              '700-650','650-600','600-550','550-500','500-450','450-400','400-350','350-300','300-250','250-200','200-150','150-100'
            ]
          },
          yAxis: {
            min: 0,
            title: {
              align: 'high',
              offset: 10,
              text: '百分比',
              rotation: 0,
              y: -20,
              style:{
                "font-weight": "bold",
                "color": "#303133",
              }
            },
            labels: {
              formatter: function () {
                return this.value*100+ '%';
              }
            }
          },
          exporting: {
            enabled: false,   // 关闭导出按钮
            url: 'https://export.highcharts.com.cn'
          },
          navigation: {
            buttonOptions: {  // 关闭导出按钮，效果同上
              enabled: false
            }
          },
          tooltip: {
            formatter: function () {
              if(this.series.color === "#F9B812"){
                return '<div style="height:30px;line-height:30px;padding:0 20px;background:'+this.series.color+';color:#fff;">本校（' + this.x + '）</div><div style="padding-top:8px;padding-left:20px;color:#242526;">人数：<span style="font-weight:bold;">' + this.point.people + '</span></div><div style="padding-top:2px;padding-left:20px;color:#242526;">人数累计：<span style="font-weight:bold;">'+ this.point.all + '</span></div>'+
                  '<div style="padding-top:2px;padding-left:20px;padding-bottom:8px;color:#242526;">百分比：<span style="font-weight:bold;">'+ this.y*100 + '%' +'</span></div>';
              }else{
                return '<div style="height:30px;line-height:30px;padding:0 20px;background:'+this.series.color+';color:#fff;">联考（' + this.x + '）</div><div style="padding-top:8px;padding-left:20px;color:#242526;">人数：<span style="font-weight:bold;">' + this.point.people + '</span></div><div style="padding-top:2px;padding-left:20px;color:#242526;">人数累计：<span style="font-weight:bold;">'+ this.point.all + '</span></div>'+
                  '<div style="padding-top:2px;padding-left:20px;padding-bottom:8px;color:#242526;">百分比：<span style="font-weight:bold;">'+ this.y*100 + '%' +'</span></div>';
              }
            },
            shadow: false,
            useHTML: true,
            padding: 0,
            style: {
              padding: 0,
              margin: 0,
            }
          },

          plotOptions: {
            column: {
              borderWidth: 0
            }
          },
          credits:{
            enabled: false,
            text: "江西金太阳教育",
            href: "http://www.jtyjy.com/"
          },
          series: [
            {
              name: '本校',
              color: "#F9B812",
              data: [
                { 
                  people: 100,
                  all: 200,
                  y: 0.9,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.5,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.4,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.2,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.2,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.25,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.32,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.755,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.251,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.521,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.214,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.7,
                },]
            },
            {
              name: '联考',
              color: "#0DC2B3",
              data: [
                { 
                  people: 100,
                  all: 200,
                  y: 0.9,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.5,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.4,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.2,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.2,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.25,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.32,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.755,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.251,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.521,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.214,
                },{ 
                  people: 100,
                  all: 200,
                  y: 0.7,
                },]
            }
          ],
        },
        option2:{
          title: {
            text:"试卷难度坡度图",
            style: {
              color: '#fff',
            }
          },
          credits:{
            enabled: false,
            text: "江西金太阳教育",
            href: "http://www.jtyjy.com/"
          },
          xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',"13","14","15","16","17","18","19","20","21","22","23","24","作文"],
            tickmarkPlacement: 'on',
            title: {
              align: 'high',
              offset: 35,
              text: '题号',
              rotation: 0,
              x: -2,
              style:{
                "font-weight": "bold",
                "color": "#303133",
              }
            },
          },
          yAxis: {
            min: 0,
            max: 1,
            title: {
              align: 'high',
              offset: 10,
              text: '试卷难度',
              rotation: 0,
              y: -20,
              style:{
                "font-weight": "bold",
                "color": "#303133",
              }
            },
          },
          tooltip: {
            shared: true,
            useHTML: true,
            crosshairs: [{
              width: 1,
              dashStyle: 'Dash',
              color: '#A10000',
            }],
            useHTML: true,
            padding: 0,
            style: {
              padding: 0,
              margin: 0,
            },
            borderColor: '#8C939B',
            formatter: function () {
              return '<div style="width:100px;margin-bottom:8px;height:30px;line-height:30px;padding:0 20px;background: #8C939B;color:#fff;text-align:center;">'+(this.x == "作文"?this.x:"第"+this.x+"题")+'</div>'+
              '<div style="padding-bottom:8px;padding-left:20px;color:#242526;"><span style="display:inline-block;background: '+this.points[0].color+';width:10px;height:10px;border-radius:5px;margin-right:10px;"></span>'+this.points[0].series.name+'：<b>'+this.points[0].y+'</b></div>'+
              '<div style="padding-bottom:8px;padding-left:20px;color:#242526;"><span style="display:inline-block;background: '+this.points[1].color+';width:10px;height:10px;border-radius:5px;margin-right:10px;"></span>'+this.points[1].series.name+'：<b>'+this.points[1].y+'</b></div>'
            },
            // headerFormat: '<div style="margin-bottom:8px;height:30px;line-height:30px;padding:0 20px;background: #8C939B;color:#fff;text-align:center;border-right:1px solid #8C939B;">第{point.key}题</div>',
            // pointFormat: '<div style="padding-bottom:8px;padding-left:20px;padding-right:20px;color:#242526;"><span style="display:inline-block;background: {series.color};width:10px;height:10px;border-radius:5px;margin-right:10px;"></span>{series.name}：<b>{point.y}</b></div>',
          },
          exporting: {
            enabled: false,   // 关闭导出按钮
            url: 'https://export.highcharts.com.cn'
          },
          navigation: {
            buttonOptions: {  // 关闭导出按钮，效果同上
              enabled: false
            }
          },
          series: [{
            name: '实测难度',
            color: "#0DC2B3",
            data: [0.5, 0.5, 0.4, 0.2, 0.2, 0.1, 0.8, 0.5, 0.4, 0.1, 0.6, 0.4,0.5, 0.6, 0.5, 0.3, 0.1, 0.1, 0.8, 0.7, 0.3, 0.1, 0.6, 0.4,0.8]
          }, {
            name: '预测难度',
            color: "#F9B812",
            data: [0.8, 0.1, 0.1, 0.2, 0.5, 0.7, 0.5, 0.5, 0.4, 0.2, 0.4, 0.4,0.2, 0.3, 0.7, 1, 0.4, 0.5, 0.2, 0.5, 0.8, 0.5, 0.3, 0.2,0.5]
          }],
        },
        // highcharts 数据展示
        option3:{
          title: {
            text: '难度<br>分布图',
            align: 'center',
            verticalAlign: 'middle',
            y: 17,
            style:{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333333",
            },
          },
          colors:['#FF759B','#FFCD61','#2CE1C1','#4AB5FE','#F98C70'],
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                useHTML: true,
                // format: '<b>{point.name}</b><br>{point.percentage}',
                formatter: function(){
                  return '<div style="text-align:center;color:'+this.point.color+'"><b>'+this.point.name+'</b><br>共'+this.point.num+'题</<div>'
                },
                // style: {
                // 	color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                // }
              },
              startAngle: 0, // 圆环的开始角度
              endAngle: 360,    // 圆环的结束角度
              center: ['50%', '50%']
            }
          },
          series: [{
            type: 'pie',
            name: '难度分布图',
            innerSize: '60%',
            data: [
              {
                name: '易[0.8,1.0]',
                num: 6,
                y: 12.8,
                ti:"2,12,24,15,12,8"
              },
              {
                name: '较易[0.6,0.8)',
                num: 2,
                y: 8.5,
                ti:"1,3"
              },
              {
                name: '中等[0.5,0.6)',
                num: 3,
                y: 6.9,
                ti:"18,16,14"
              },
              {
                name: '较难[0.2,0.5)',
                num: 5,
                y: 26.8,
                ti:"7,6,4,19,20"
              },
              {
                name: '难[0,0.2)',
                num: 6,
                y: 45.0,
                ti:"2,12,24,15,12,8"
              }
              // {
              //   name: '其他',
              //   y: 0.7,
              //   dataLabels: {
              //     // 数据比较少，没有空间显示数据标签，所以将其关闭
              //     enabled: false
              //   }
              // }
            ]
          }],
          credits:{
            enabled: false,
            text: "江西金太阳教育",
            href: "http://www.jtyjy.com/"
          },
          tooltip: {
            shared: false,
            useHTML: true,
            padding: 0,
            style: {
              padding: 0,
              margin: 1,
            },
            formatter: function () {
              return '<div style="margin-left:1.5px;margin-bottom:8px;height:30px;line-height:30px;padding:0 20px;background: '+this.point.color+';color:#fff;text-align:center;">'+this.point.name+'</div>'+
              '<div style="padding-bottom:8px;padding-left:20px;padding-right:20px;color:#242526;text-align:center;"><b>'+this.point.ti+'</b></div>'
            },
          },
          exporting: {
            enabled: false,   // 关闭导出按钮
            url: 'https://export.highcharts.com.cn'
          },
          navigation: {
            buttonOptions: {  // 关闭导出按钮，效果同上
              enabled: false
            }
          },
          
        },
        // highcharts 数据展示
        option4:{
          chart: {
              type: 'variablepie'
          },
          title: {
              text: '不同国家人口密度及面积对比'
          },
          subtitle: {
              text: '扇区长度（圆周方法）表示面积，宽度（纵向）表示人口密度'  
          },
          tooltip: {
              headerFormat: '',
              pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
              '面积 (平方千米): <b>{point.y}</b><br/>' +
              '人口密度 (每平方千米人数): <b>{point.z}</b><br/>'
          },
          series: [{
              minPointSize: 10,
              innerSize: '20%',
              zMin: 0,
              name: 'countries',
              data: [{
                  name: '西班牙',
                  y: 505370,
                  z: 92.9
              }, {
                  name: '法国',
                  y: 551500,
                  z: 118.7
              }, {
                  name: '波兰',
                  y: 312685,
                  z: 124.6
              }, {
                  name: '捷克共和国',
                  y: 78867,
                  z: 137.5
              }, {
                  name: '意大利',
                  y: 301340,
                  z: 201.8
              }, {
                  name: '瑞士',
                  y: 41277,
                  z: 214.5
              }, {
                  name: '德国',
                  y: 357022,
                  z: 235.6
              }]
          }],
        }
      }
    },
    methods: {
      change(){
        this.value = Math.random(0,1)*10+Math.random(0,1)*100
        console.log(this.value)
      },
      getHighChartone(chart){

      },
    },
    watch: {
      
    },
    components: {
      HChart,
      score
    }
}
</script>



