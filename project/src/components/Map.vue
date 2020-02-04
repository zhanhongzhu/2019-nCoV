<template>
	<div class="echarts">
		<div class="common-title">疫情地图</div>
		<div class="chart-box flex flex-vc flex-hc bg-fff"><div :style="{ height: '265px', width: '90%' }" ref="myEchart" class="maps"></div></div>
		<!-- <div class="common-title">全国疫情新增趋势图</div>
		<div id="adds" style="width: 100%;height:265px;"></div> -->
		<div class="common-title">全国疫情累计趋势图</div>
		<div id="accumulation" style="width: 100%;height:265px;"></div>
		<div class="common-title">全国疫情死亡/治愈趋势图</div>
		<div id="curedAndDied" style="width: 100%;height:265px;"></div>
	</div>
</template>
<script>
import echarts from 'echarts';
//   import '../../node_modules/echarts/map/js/world.js'
import '../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据
export default {
	name: 'echarts',
	props: ['userJson', 'mapData'],
	data() {
		return {
			chart: null
		};
	},
	mounted() {
		this.chinaConfigure();
		var accumulationList = [];
		var accumDeath = [];
		var accumCured = [];
		var accumTime = [];
		var suspectedNum = [];
		var confirmedNum = [];
		this.mapData.history.forEach((item, index) => {
			accumulationList.unshift(item.suspectedNum);
			accumDeath.unshift(item.deathsNum);
			accumCured.unshift(item.curesNum);
			item.date = item.date.substring(6, 10);
			accumTime.unshift(item.date);
			confirmedNum.unshift(item.confirmedNum);
			suspectedNum.unshift(item.suspectedNum);
		});
		console.log(accumulationList, accumDeath, accumCured);
		var xAray = accumTime;
		/* 	this.lineChart('adds', ['新增疑似', '新增确诊'], xAray, this.publicFunc('新增疑似', '新增确诊',accumCured,accumDeath)); */
		this.lineChart('curedAndDied', ['累计治愈', '累计死亡'], xAray, this.publicFunc('累计治愈', '累计死亡', accumCured, accumDeath));
		this.lineChart('accumulation', ['累计确诊', '累计疑似'], xAray, this.publicFunc('累计确诊', '累计疑似', confirmedNum, suspectedNum));
		console.log(this.mapData.history);
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		chinaConfigure() {
			console.log(this.mapData);
			var that = this;
			that.mapData.area.forEach(item => {
				item.name = item.provinceShortName;
				item.value = item.confirmedCount;
			});
			let myChart = echarts.init(that.$refs.myEchart); // 这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			myChart.setOption({
				// 进行相关配置
				/* backgroundColor: "#02AFDB", */
				backgroundColor: '#f2f2f2',
				tooltip: {}, // 鼠标移到图里面的浮动提示框
				visualMap: {
					min: 0,
					max: 1000,
					right: 'right',
					top: 'bottom',
					realtime: true,
					text: ['高', '低'],
					inRange: {
						color: ['#fdebcf','#f59e83','#ffaa85','#ff7b69','#bf2121','#7f1818']
						
					},
					show: true
				},
		/* 		dataRange: {
					show: false,
					min: 0,
					max: 1000,
					text: ['Low', 'High'],
					realtime: true,
					calculable: true,
					color: ['#7f1818', '#bf2121', '#ff7b69', '#ffaa85', '#f59e83', '#fdebcf'],
					x: 'left',
					y: 'center'
				}, */
				geo: {
					// 这个是重点配置区
					map: 'china', // 表示中国地图
					roam: false, // 禁止地图缩放
					label: {
						normal: {
							show: true, // 是否显示对应地名
							textStyle: {
								color: 'rgba(0,0,0,0.4)'
							}
						}
					},

					itemStyle: {
						normal: {
							borderColor: 'rgba(0, 0, 0, 0.2)'
						},
						emphasis: {
							areaColor: null,
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							shadowBlur: 20,
							borderWidth: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				},
				series: [
					{
						type: 'scatter',
						coordinateSystem: 'geo' // 对应上方配置
					},
					{
						name: '确诊病例', // 浮动框的标题
						type: 'map',
						geoIndex: 0,
						data: that.mapData.area
					}
				]
			});
		},
		// 新增确诊疑似病例折线图
		lineChart(id, legends, xAxis, series) {
			// 基于准备好的dom，初始化echarts实例
			var AddMyChart = echarts.init(document.getElementById(id));
			// 指定图表的配置项和数据
			var option1 = {
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: legends
				},
				grid: {
					left: '4%',
					right: '6%',
					bottom: '2%',
					top: '12%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: xAxis,
					axisLabel: {
						interval: 0, // 横轴信息全部显示
						rotate: 60 // 60度角倾斜显示
					}
				},
				yAxis: {
					type: 'value'
				},
				series: series
			};
			// 使用刚指定的配置项和数据显示图表。
			AddMyChart.setOption(option1);
		},
		publicFunc(name1, name2, args1, args2) {
			var series = [
				{
					name: name1,
					type: 'line',
					stack: '总量',
					smooth: true,
					data: args1,
					itemStyle: { normal: { label: { show: true } } }
				},
				{
					name: name2,
					type: 'line',
					stack: '总量',
					smooth: true,
					data: args2,
					itemStyle: { normal: { label: { show: true } } }
				}
			];
			return series;
		}
	}
};
</script>
