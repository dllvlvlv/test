<template>
	<div>
		<chart class="chart" id="chart1" ref="chart1" :options="option1" :auto-resize="true"></chart>
		<chart class="chart" id="chart2" ref="chart2" :options="option2" :auto-resize="true"></chart>
		<chart class="chart" id="chart3" ref="chart3" :options="option3" :auto-resize="true"></chart>
		<chart class="chart" id="chart4" ref="chart4" :options="option4" :auto-resize="true"></chart>
		<div id="basemap">
			<div class="text"></div>
		</div>
	</div>
</template>

<script>
import L from 'leaflet';
import {tiledMapLayer} from '@supermap/iclient-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from '../assets/images/grass.png';
import base from '../../static/base.json';
import dayi from '../../static/dayi.json';
import jiangyou from '../../static/jiangyou.json';
import luojiang from '../../static/luojiang.json';
import luxian from '../../static/luxian.json';
import pengshan from '../../static/pengshan.json';
import shehong from '../../static/shehong.json';
import youxian from '../../static/youxian.json';
import zitong from '../../static/zitong.json';
import echarts from 'echarts/lib/echarts';

export default {
    data() {
		return{
			url:'',
			map:'',
			icon:'',
			baseIcon:'',
			basePoint:'',
			option1:{},
			option2:{},
			option3:{},
			option4:{},
			category : [],
			dottedBase:'',
			lineData:[],
			barData:[],
			polygon:'',
			dataBJ:[],
			dataGZ:[],
			dataSH:[],
			schema:[],
			itemStyle:{}
		}
	},
	created() {
		
	},
	mounted() {
		//this.url = "http://118.122.120.57:18090/iserver/services/map-16/rest/maps/市界"
		this.url = "http://support.supermap.com.cn:8090/iserver/services/map-china400/rest/maps/ChinaDark";
		this.map = L.map('basemap', {
			crs: L.CRS.EPSG3857,
			center: [29.989936,103.8581],
			maxZoom: 18,
			zoom: 7.5,
			noWrap:true
			//wrapX:false
		});
		this.icon = L.icon({
			iconUrl: icon,
			//shadowUrl: '../assets/images/base.png',
			iconSize: [30, 30],
			//shadowSize: [50, 64],
			iconAnchor: [15, 30],
			//shadowAnchor: [4, 62],
			popupAnchor: [-3, -76]
		});
		this.dataBJ = [
			[1,55,9,56,0.46,18,6,"良"],
			[2,25,11,21,0.65,34,9,"优"],
			[3,56,7,63,0.3,14,5,"良"],
			[4,33,7,29,0.33,16,6,"优"],
			[5,42,24,44,0.76,40,16,"优"],
			[6,82,58,90,1.77,68,33,"良"],
			[7,74,49,77,1.46,48,27,"良"],
			[8,78,55,80,1.29,59,29,"良"],
			[9,267,216,280,4.8,108,64,"重度污染"],
			[10,185,127,216,2.52,61,27,"中度污染"],
			[11,39,19,38,0.57,31,15,"优"],
			[12,41,11,40,0.43,21,7,"优"],
			[13,64,38,74,1.04,46,22,"良"],
			[14,108,79,120,1.7,75,41,"轻度污染"],
			[15,108,63,116,1.48,44,26,"轻度污染"],
			[16,33,6,29,0.34,13,5,"优"],
			[17,94,66,110,1.54,62,31,"良"],
			[18,186,142,192,3.88,93,79,"中度污染"],
			[19,57,31,54,0.96,32,14,"良"],
			[20,22,8,17,0.48,23,10,"优"],
			[21,39,15,36,0.61,29,13,"优"],
			[22,94,69,114,2.08,73,39,"良"],
			[23,99,73,110,2.43,76,48,"良"],
			[24,31,12,30,0.5,32,16,"优"],
			[25,42,27,43,1,53,22,"优"],
			[26,154,117,157,3.05,92,58,"中度污染"],
			[27,234,185,230,4.09,123,69,"重度污染"],
			[28,160,120,186,2.77,91,50,"中度污染"],
			[29,134,96,165,2.76,83,41,"轻度污染"],
			[30,52,24,60,1.03,50,21,"良"],
			[31,46,5,49,0.28,10,6,"优"]
		];
		this.dataGZ = [
			[1,26,37,27,1.163,27,13,"优"],
			[2,85,62,71,1.195,60,8,"良"],
			[3,78,38,74,1.363,37,7,"良"],
			[4,21,21,36,0.634,40,9,"优"],
			[5,41,42,46,0.915,81,13,"优"],
			[6,56,52,69,1.067,92,16,"良"],
			[7,64,30,28,0.924,51,2,"良"],
			[8,55,48,74,1.236,75,26,"良"],
			[9,76,85,113,1.237,114,27,"良"],
			[10,91,81,104,1.041,56,40,"良"],
			[11,84,39,60,0.964,25,11,"良"],
			[12,64,51,101,0.862,58,23,"良"],
			[13,70,69,120,1.198,65,36,"良"],
			[14,77,105,178,2.549,64,16,"良"],
			[15,109,68,87,0.996,74,29,"轻度污染"],
			[16,73,68,97,0.905,51,34,"良"],
			[17,54,27,47,0.592,53,12,"良"],
			[18,51,61,97,0.811,65,19,"良"],
			[19,91,71,121,1.374,43,18,"良"],
			[20,73,102,182,2.787,44,19,"良"],
			[21,73,50,76,0.717,31,20,"良"],
			[22,84,94,140,2.238,68,18,"良"],
			[23,93,77,104,1.165,53,7,"良"],
			[24,99,130,227,3.97,55,15,"良"],
			[25,146,84,139,1.094,40,17,"轻度污染"],
			[26,113,108,137,1.481,48,15,"轻度污染"],
			[27,81,48,62,1.619,26,3,"良"],
			[28,56,48,68,1.336,37,9,"良"],
			[29,82,92,174,3.29,0,13,"良"],
			[30,106,116,188,3.628,101,16,"轻度污染"],
			[31,118,50,0,1.383,76,11,"轻度污染"]
		];
		this.dataSH = [
			[1,91,45,125,0.82,34,23,"良"],
			[2,65,27,78,0.86,45,29,"良"],
			[3,83,60,84,1.09,73,27,"良"],
			[4,109,81,121,1.28,68,51,"轻度污染"],
			[5,106,77,114,1.07,55,51,"轻度污染"],
			[6,109,81,121,1.28,68,51,"轻度污染"],
			[7,106,77,114,1.07,55,51,"轻度污染"],
			[8,89,65,78,0.86,51,26,"良"],
			[9,53,33,47,0.64,50,17,"良"],
			[10,80,55,80,1.01,75,24,"良"],
			[11,117,81,124,1.03,45,24,"轻度污染"],
			[12,99,71,142,1.1,62,42,"良"],
			[13,95,69,130,1.28,74,50,"良"],
			[14,116,87,131,1.47,84,40,"轻度污染"],
			[15,108,80,121,1.3,85,37,"轻度污染"],
			[16,134,83,167,1.16,57,43,"轻度污染"],
			[17,79,43,107,1.05,59,37,"良"],
			[18,71,46,89,0.86,64,25,"良"],
			[19,97,71,113,1.17,88,31,"良"],
			[20,84,57,91,0.85,55,31,"良"],
			[21,87,63,101,0.9,56,41,"良"],
			[22,104,77,119,1.09,73,48,"轻度污染"],
			[23,87,62,100,1,72,28,"良"],
			[24,168,128,172,1.49,97,56,"中度污染"],
			[25,65,45,51,0.74,39,17,"良"],
			[26,39,24,38,0.61,47,17,"优"],
			[27,39,24,39,0.59,50,19,"优"],
			[28,93,68,96,1.05,79,29,"良"],
			[29,188,143,197,1.66,99,51,"中度污染"],
			[30,174,131,174,1.55,108,50,"中度污染"],
			[31,187,143,201,1.39,89,53,"中度污染"]
		];
		this.schema = [
			{name: 'date', index: 0, text: '日'},
			{name: 'AQIindex', index: 1, text: 'AQI指数'},
			{name: 'PM25', index: 2, text: 'PM2.5'},
			{name: 'PM10', index: 3, text: 'PM10'},
			{name: 'CO', index: 4, text: '一氧化碳（CO）'},
			{name: 'NO2', index: 5, text: '二氧化氮（NO2）'},
			{name: 'SO2', index: 6, text: '二氧化硫（SO2）'}
		];
		this.itemStyle =  {
			normal: {
				opacity: 0.8,
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		};
		this.option1 = {
			backgroundColor: {
				type: 'radial',
				x: 0.5,
				y: 0.5,
				r: 1.5,
				// type: 'linear',
				// x: 0,
				// y: 0,
				// x2: 0,
				// y2: 1,
				colorStops: [{
					offset: 0, color: 'rgba(0, 0, 0, 0.1)' // 0% 处的颜色
				}, {
					offset: 1, color: 'rgba(30, 144, 255, 0.7)' // 100% 处的颜色
				}],
				globalCoord: false // 缺省为 false
			},
			tooltip : {
				formatter: "{a} <br/>{c} {b}"
			},
			toolbox: {
				show : true,
				feature : {
					// mark : {show: true},
					// restore : {show: true},
					// saveAsImage : {show: true}
				}
			},
			series : [
				{
					name:'速度',
					type:'gauge',
					min:0,
					max:220,
					splitNumber:11,
					radius: '70%',
					axisLine: {            // 坐标轴线
						lineStyle: {       // 属性lineStyle控制线条样式
							color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
							width: 3,
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisLabel: {            // 坐标轴小标记
						textStyle: {       // 属性lineStyle控制线条样式
							fontWeight: 'bolder',
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisTick: {            // 坐标轴小标记
						length :15,        // 属性length控制线长
						lineStyle: {       // 属性lineStyle控制线条样式
							color: 'auto',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					splitLine: {           // 分隔线
						length :25,         // 属性length控制线长
						lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
							width:3,
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					pointer: {           // 分隔线
						shadowColor : '#fff', //默认透明
						shadowBlur: 5
					},
					title : {
						textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontSize: 20,
							fontStyle: 'italic',
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					detail : {
						backgroundColor: 'rgba(30,144,255,0.8)',
						borderWidth: 1,
						borderColor: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 5,
						offsetCenter: [0, '50%'],       // x, y，单位px
						textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							color: '#fff'
						}
					},
					data:[{value: 40, name: 'km/h'}]
				},
				{
					name:'转速',
					type:'gauge',
					center : ['15%', '55%'],    // 默认全局居中
					radius : '40%',
					min:0,
					max:7,
					endAngle:45,
					splitNumber:7,
					axisLine: {            // 坐标轴线
						lineStyle: {       // 属性lineStyle控制线条样式
							color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
							width: 2,
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisLabel: {            // 坐标轴小标记
						textStyle: {       // 属性lineStyle控制线条样式
							fontWeight: 'bolder',
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisTick: {            // 坐标轴小标记
						length :12,        // 属性length控制线长
						lineStyle: {       // 属性lineStyle控制线条样式
							color: 'auto',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					splitLine: {           // 分隔线
						length :20,         // 属性length控制线长
						lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
							width:3,
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					pointer: {
						width:5,
						shadowColor : '#fff', //默认透明
						shadowBlur: 5
					},
					title : {
						offsetCenter: [0, '-30%'],       // x, y，单位px
						textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontStyle: 'italic',
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					detail : {
						//backgroundColor: 'rgba(30,144,255,0.8)',
					// borderWidth: 1,
						borderColor: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 5,
						width: 80,
						height:30,
						offsetCenter: [25, '20%'],       // x, y，单位px
						textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							color: '#fff'
						}
					},
					data:[{value: 1.5, name: 'x1000 r/min'}]
				},
				{
					name:'油表',
					type:'gauge',
					center : ['85%', '50%'],    // 默认全局居中
					radius : '40%',
					min:0,
					max:2,
					startAngle:135,
					endAngle:45,
					splitNumber:2,
					axisLine: {            // 坐标轴线
						lineStyle: {       // 属性lineStyle控制线条样式
							color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
							width: 2,
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisTick: {            // 坐标轴小标记
						length :12,        // 属性length控制线长
						lineStyle: {       // 属性lineStyle控制线条样式
							color: 'auto',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisLabel: {
						textStyle: {       // 属性lineStyle控制线条样式
							fontWeight: 'bolder',
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						},
						formatter:function(v){
							switch (v + '') {
								case '0' : return 'E';
								case '1' : return 'Gas';
								case '2' : return 'F';
							}
						}
					},
					splitLine: {           // 分隔线
						length :15,         // 属性length控制线长
						lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
							width:3,
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					pointer: {
						width:2,
						shadowColor : '#fff', //默认透明
						shadowBlur: 5
					},
					title : {
						show: false
					},
					detail : {
						show: false
					},
					data:[{value: 0.5, name: 'gas'}]
				},
				{
					name:'水表',
					type:'gauge',
					center : ['85%', '50%'],    // 默认全局居中
					radius : '40%',
					min:0,
					max:2,
					startAngle:315,
					endAngle:225,
					splitNumber:2,
					axisLine: {            // 坐标轴线
						lineStyle: {       // 属性lineStyle控制线条样式
							color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
							width: 2,
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisTick: {            // 坐标轴小标记
						show: false
					},
					axisLabel: {
						textStyle: {       // 属性lineStyle控制线条样式
							fontWeight: 'bolder',
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						},
						formatter:function(v){
							switch (v + '') {
								case '0' : return 'H';
								case '1' : return 'Water';
								case '2' : return 'C';
							}
						}
					},
					splitLine: {           // 分隔线
						length :15,         // 属性length控制线长
						lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
							width:3,
							color: '#fff',
							shadowColor : '#fff', //默认透明
							shadowBlur: 10
						}
					},
					pointer: {
						width:2,
						shadowColor : '#fff', //默认透明
						shadowBlur: 5
					},
					title : {
						show: false
					},
					detail : {
						show: false
					},
					data:[{value: 0.5, name: 'gas'}]
				}
			]
		};
		this.dottedBase = +new Date();
		for (var i = 0; i < 20; i++) {
			var date = new Date(this.dottedBase += 3600 * 24 * 1000);
			this.category.push([
				date.getFullYear(),
				date.getMonth() + 1,
				date.getDate()
			].join('-'));
			var b = Math.random() * 200;
			var d = Math.random() * 200;
			this.barData.push(b)
			this.lineData.push(d + b);
		}
		this.option2 = {
			backgroundColor: {
				type: 'radial',
				x: 0.5,
				y: 0.5,
				r: 1.5,
				// type: 'linear',
				// x: 0,
				// y: 0,
				// x2: 0,
				// y2: 1,
				colorStops: [{
					offset: 0, color: 'rgba(0, 0, 0, 0.1)' // 0% 处的颜色
				}, {
					offset: 1, color: 'rgba(30, 144, 255, 0.7)' // 100% 处的颜色
				}],
				globalCoord: false // 缺省为 false
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['line', 'bar'],
				textStyle: {
					color: '#ccc'
				}
			},
			xAxis: {
				data: this.category,
				axisLine: {
					lineStyle: {
						color: '#ccc'
					}
				}
			},
			yAxis: {
				splitLine: {show: false},
				axisLine: {
					lineStyle: {
						color: '#ccc'
					}
				}
			},
			series: [{
				name: 'line',
				type: 'line',
				smooth: true,
				showAllSymbol: true,
				symbol: 'emptyCircle',
				symbolSize: 15,
				data: this.lineData
			}, {
				name: 'bar',
				type: 'bar',
				barWidth: 10,
				itemStyle: {
					normal: {
						barBorderRadius: 5,
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: '#1e90ff'},
								{offset: 1, color: '#43eec6'}
							]
						)
					}
				},
				data: this.barData
			}, {
				name: 'line',
				type: 'bar',
				barGap: '-100%',
				barWidth: 10,
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: 'rgba(20,200,212,0.5)'},
								{offset: 0.2, color: 'rgba(20,200,212,0.2)'},
								{offset: 1, color: 'rgba(20,200,212,0)'}
							]
						)
					}
				},
				z: -12,
				data: this.lineData
			}, {
				name: 'dotted',
				type: 'pictorialBar',
				symbol: 'rect',
				itemStyle: {
					normal: {
						color: '#0f375f'
					}
				},
				symbolRepeat: true,
				symbolSize: [12, 4],
				symbolMargin: 1,
				z: -10,
				data: this.lineData
			}]
		};
		this.option3 = {
			backgroundColor: {
				type: 'radial',
				x: 0.5,
				y: 0.5,
				r: 1.5,
				// type: 'linear',
				// x: 0,
				// y: 0,
				// x2: 0,
				// y2: 1,
				colorStops: [{
					offset: 0, color: 'rgba(0, 0, 0, 0.1)' // 0% 处的颜色
				}, {
					offset: 1, color: 'rgba(30, 144, 255, 0.7)' // 100% 处的颜色
				}],
				globalCoord: false // 缺省为 false
			},
			angleAxis: {
				type: 'category',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				z: 10,
				axisLabel: {
					show: true,
					textStyle: {
						color: '#fff'
					}
				}
			},
			radiusAxis: {
				axisLabel: {
					show: true,
					textStyle: {
						color: '#fff'
					}
				}
			},
			polar: {
			},
			series: [{
				type: 'bar',
				data: [4, 3, 5, 2, 6, 3],
				coordinateSystem: 'polar',
				name: 'A',
				stack: 'a',
				itemStyle: {
					normal: {
						//barBorderRadius: 5,
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: '#1e90ff'},
								{offset: 1, color: '#43eec6'}
							]
						)
					}
				},
				textStyle: {
					color: '#fff'
				}
			}],
			legend: {
				show: true,
				data: ['A'],
				textStyle: {
					color: '#fff'
				}
			}
		};
		this.option4 = {
			backgroundColor: {
				type: 'radial',
				x: 0.5,
				y: 0.5,
				r: 1.5,
				// type: 'linear',
				// x: 0,
				// y: 0,
				// x2: 0,
				// y2: 1,
				colorStops: [{
					offset: 0, color: 'rgba(0, 0, 0, 0.1)' // 0% 处的颜色
				}, {
					offset: 1, color: 'rgba(30, 144, 255, 0.7)' // 100% 处的颜色
				}],
				globalCoord: false // 缺省为 false
			},
			color: [
				'#dd4444', '#fec42c', '#80F1BE'
			],
			legend: {
				y: 'top',
				data: ['重度', '中度', '轻度'],
				textStyle: {
					color: '#fff',
					fontSize: 16
				}
			},
			grid: {
				x: '10%',
				x2: 80,
				y: '18%',
				y2: '10%'
			},
			// tooltip: {
			// 	padding: 10,
			// 	backgroundColor: '#222',
			// 	borderColor: '#777',
			// 	borderWidth: 1,
			// 	formatter: function (obj) {
			// 		var value = obj.value;
			// 		return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
			// 			+ obj.seriesName + ' ' + value[0] + '日：'
			// 			+ value[7]
			// 			+ '</div>'
			// 			+ schema[1].text + '：' + value[1] + '<br>'
			// 			+ schema[2].text + '：' + value[2] + '<br>'
			// 			+ schema[3].text + '：' + value[3] + '<br>'
			// 			+ schema[4].text + '：' + value[4] + '<br>'
			// 			+ schema[5].text + '：' + value[5] + '<br>'
			// 			+ schema[6].text + '：' + value[6] + '<br>';
			// 	}
			// },
			xAxis: {
				type: 'value',
				name: '日期',
				nameGap: 16,
				nameTextStyle: {
					color: '#fff',
					fontSize: 14
				},
				max: 31,
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: '#eee'
					}
				}
			},
			yAxis: {
				type: 'value',
				name: 'AQI指数',
				nameLocation: 'end',
				nameGap: 20,
				nameTextStyle: {
					color: '#fff',
					fontSize: 16
				},
				axisLine: {
					lineStyle: {
						color: '#eee'
					}
				},
				splitLine: {
					show: false
				}
			},
			// visualMap: [
			// 	{
			// 		left: 'right',
			// 		top: '10%',
			// 		dimension: 2,
			// 		min: 0,
			// 		max: 250,
			// 		itemWidth: 30,
			// 		itemHeight: 120,
			// 		calculable: true,
			// 		precision: 0.1,
			// 		text: ['圆形大小：PM2.5'],
			// 		textGap: 30,
			// 		textStyle: {
			// 			color: '#fff'
			// 		},
			// 		inRange: {
			// 			symbolSize: [10, 70]
			// 		},
			// 		outOfRange: {
			// 			symbolSize: [10, 70],
			// 			color: ['rgba(255,255,255,.2)']
			// 		},
			// 		controller: {
			// 			inRange: {
			// 				color: ['#c23531']
			// 			},
			// 			outOfRange: {
			// 				color: ['#444']
			// 			}
			// 		}
			// 	},
			// 	{
			// 		left: 'right',
			// 		bottom: '5%',
			// 		dimension: 6,
			// 		min: 0,
			// 		max: 50,
			// 		itemHeight: 120,
			// 		calculable: true,
			// 		precision: 0.1,
			// 		text: ['明暗：二氧化硫'],
			// 		textGap: 30,
			// 		textStyle: {
			// 			color: '#fff'
			// 		},
			// 		inRange: {
			// 			colorLightness: [1, 0.5]
			// 		},
			// 		outOfRange: {
			// 			color: ['rgba(255,255,255,.2)']
			// 		},
			// 		controller: {
			// 			inRange: {
			// 				color: ['#c23531']
			// 			},
			// 			outOfRange: {
			// 				color: ['#444']
			// 			}
			// 		}
			// 	}
			// ],
			series: [
				{
				
					name: '北京',
					type: 'scatter',
					itemStyle: this.itemStyle,
					data: this.dataBJ
				},
				{
					name: '上海',
					type: 'scatter',
					itemStyle: this.itemStyle,
					data: this.dataSH
				},
				{
					name: '广州',
					type: 'scatter',
					itemStyle: this.itemStyle,
					data: this.dataGZ
				}
			]
		};
		this.basePoint = base;
		this.jiangyouPolygon = jiangyou;
		this.luojiangiPolygon = luojiang;
		this.luxianPolygon = luxian;
		this.pengshanPolygon = pengshan; 
		this.shehongPolygon = shehong;
		this.youxianPolygon = youxian;
		this.zitongPolygon = zitong;
		this.dayiPolygon = dayi;
		this.addLayer();
		this.addMarker();
		this.addBasePolygon(this.jiangyouPolygon);
		this.addBasePolygon(this.luojiangiPolygon);
		this.addBasePolygon(this.luxianPolygon);
		this.addBasePolygon(this.pengshanPolygon);
		this.addBasePolygon(this.shehongPolygon);
		this.addBasePolygon(this.youxianPolygon);
		this.addBasePolygon(this.zitongPolygon);
		this.addBasePolygon(this.dayiPolygon);
	},
	methods: {
		addLayer() {
			tiledMapLayer(this.url).addTo(this.map);
		},
		addMarker() {
			for (let i in this.basePoint.Base) {
				let lat = this.basePoint.Base[i].lat;
				let lng = this.basePoint.Base[i].lng;
				//let marker = L.marker([lat,lng], {icon: this.icon}).addTo(this.map);
				// L.circle([lat, lng], 500, {
				// 	color: '#1296db',
				// 	fillColor: '#1296db',
				// 	fillOpacity: 0.5
				// }).addTo(this.map).bindPopup(this.basePoint.Base[i].bname);
				// marker.on("click",function(e) {
				// 	//console.log(e.latlng.lng);
				// 	this.markerClickEvent(e.latlng.lng);
				// 	//return e.latlng.lng;
				// },this)
				let text = L.divIcon({
					//'<span style="color:#fff;">lll</span>'
					html: this.basePoint.Base[i].bname,
					className: 'text',
					iconSize: [40,20]
					// labelAnchor:[-6,0],
					// popupAnchor:[0,-36],
				}); 
				L.marker([lat,lng], { icon: text }).addTo(this.map);
			}
			//console.log("click",click);
		},
		markerClickEvent(lng) {
			console.log("lng",lng);	
		},
		addBasePolygon(county) {
			let arrPoint = county.geometry.coordinates[0][0];
			let arrNewPoint = [];
			for (let i in arrPoint) {
				arrNewPoint.push([arrPoint[i][1],arrPoint[i][0]]);
			}
			this.polygon = L.polygon(arrNewPoint, 
				{
					color: '#1e90ff',
					fillColor:'#1e90ff',
					weight:1
				}).addTo(this.map);
		}
	}
}
</script>

<style>
	#basemap {
		width: 100%;
		height: calc(100vh);
		z-index: 1;
	}
	.chart {
		z-index: 100;
		position: absolute;
		/* border: 1px solid #1e90ff; */
		/* width: 400px;
		height: 200px; */
		/* float: bottom;
		width:100%; */
	}
	#chart1 {
		/* position: absolute; */
		z-index: 100;
		bottom: 0;
		width: 400px;
		height: 290px;
		border: 1px solid #1e90ff;
	}
	#chart2 {
		/* position: absolute; */
		width: 400px;
		height: 290px;
		border: 1px solid #1e90ff;
	}
	#chart3 {
		/* position: absolute; */
		width: 400px;
		height: 290px;
		right:0;
		border: 1px solid #1e90ff;
	}
	#chart4 {
		width: 400px;
		height: 290px;
		right: 0;
		bottom: 0;
		border: 1px solid #1e90ff;
	}
	.text {
		background: -webkit-radial-gradient(rgba(209, 209, 209, 0.1), rgba(67, 238, 198, 0.7)); /* Safari 5.1 - 6.0 */
		color:aliceblue;
	}
	
</style>
