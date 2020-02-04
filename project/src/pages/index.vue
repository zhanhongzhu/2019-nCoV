<template>
	<div class="main-content">
		<div class="top-header">
			<h3>新型冠状病毒肺炎</h3>
			<h1 class="color-fff">疫情实时大数据报告</h1>
		</div>
		<nut-tab @tab-switch="tabSwitch">
			<nut-tab-panel tabTitle="全国疫情"></nut-tab-panel>
			<nut-tab-panel tabTitle="湖北疫情"></nut-tab-panel>
			<!-- <nut-tab-panel tabTitle="罗田疫情"></nut-tab-panel> -->
			<div class="panams" style="display: block;">
				<nut-row>
					<nut-col :span="6" v-if="isIndex == 1">
						<div class="flex-content pub look" style="color: #005dff;">{{ rowData.yesterdayIncreased.confirmedCount }}</div>
						<div class="flex-content intro">新增确诊</div>
						<div class="flex-content look">
							<span class="yes">-</span>
							<!-- {{ rowData.suspect - history1.suspectedNum || rowData.yesterdayIncreased.suspectedCount }} -->
						</div>
					</nut-col>
					<nut-col :span="6">
						<div class="flex-content pub checks">{{ rowData.diagnosed || rowData.confirmedCount }}</div>
						<div class="flex-content intro">确认病例</div>
						<div class="flex-content checks">
							<span class="yes">昨日+</span>
							{{ rowData.diagnosed - history1.confirmedNum || rowData.yesterdayIncreased.confirmedCount }}
						</div>
					</nut-col>

					<nut-col :span="6" v-if="isIndex != 1">
						<div class="flex-content pub look">{{ rowData.suspect || rowData.suspectedCount }}</div>
						<div class="flex-content intro">疑似病例11</div>
						<div class="flex-content look">
							<span class="yes">昨日+</span>
							{{ rowData.suspect - history1.suspectedNum || rowData.yesterdayIncreased.suspectedCount }}
						</div>
					</nut-col>
					<nut-col :span="6">
						<div class="flex-content pub health">{{ rowData.cured || rowData.curedCount }}</div>
						<div class="flex-content intro">治愈病例</div>
						<div class="flex-content health">
							<span class="yes">昨日+</span>
							{{ rowData.cured - history1.curesNum || rowData.yesterdayIncreased.curedCount }}
						</div>
					</nut-col>
					<nut-col :span="6">
						<div class="flex-content pub death">{{ rowData.death || rowData.deadCount }}</div>
						<div class="flex-content intro">死亡病例</div>
						<div class="flex-content death">
							<span class="yes">昨日+</span>
							{{ rowData.death - history1.deathsNum || rowData.yesterdayIncreased.deadCount }}
						</div>
					</nut-col>
				</nut-row>
				<nut-row>
					<nut-col :span="24">
						<div class="flex-content times">截至{{ date }} | 来源各地卫健委</div>
					</nut-col>
				</nut-row>
			</div>
			<nut-row style="display: block;">
				<nut-col :span="24"><div class="flex-content virus flex">病毒传染源：野生动物，可能为中华菊头蝠</div></nut-col>
				<nut-col :span="24"><div class="flex-content virus flex">病毒：新型冠状病毒 2019-nCoV</div></nut-col>
				<nut-col :span="24"><div class="flex-content virus flex">传播途径：经呼吸道飞沫传播，亦可通过接触传播，存在粪-口传播可能性。</div></nut-col>
				<nut-col :span="24"><div class="flex-content virus flex">易感人群：人群普遍易感。老年人及有基础疾病者感染后病情较重，儿童及婴幼儿也有发病。</div></nut-col>
				<nut-col :span="24"><div class="flex-content virus flex">潜伏期：一般为 3～7 天，最长不超过 14 天，潜伏期内存在传染性。</div></nut-col>
			</nut-row>
		</nut-tab>

		<Maps :mapData="mapData"></Maps>
		<List :list="list" :isIndex="isIndex"></List>
	</div>
</template>

<script>
import Maps from '@/components/Map.vue';
import List from '@/components/List.vue';

export default {
	components: { Maps, List },
	name: 'HelloWorld',
	data() {
		return {
			rowData: [],
			history: {},
			list: [],
			mapData: [],
			isIndex: 0,
			date: null
		};
	},
	mounted: function() {
		var that = this;
		that.getListData(4);
	},
	methods: {
		tabSwitch: function(index, event) {
			var that = this;
			that.isIndex = index;
			switch (index) {
				case 1:
					that.getListData(1);
					break;
				case 2:
					that.getListData(2);
					break;
				case 3:
					that.getListData(3);
					break;
				default:
					that.getListData(4);
					break;
			}
		},
		getListData(e) {
			console.log(e);
			var that = this;
			this.$axios
				.get('https://www.tianqiapi.com/api?version=epidemic&appid=35518742&appsecret=o3qt5ymk')
				.then(function(response) {
					console.log(response.data.data);
					if (e == 4) {
						that.rowData = response.data.data;
						that.history = response.data.data.history[0];
						that.history1 = response.data.data.history[1];
						that.list = response.data.data.area;
						that.mapData = response.data.data;
						that.date = response.data.data.date;
					}
					if (e == 1) {
						that.rowData = response.data.data.area[0];
						that.history = response.data.data.history[0];
						that.history1 = response.data.data.history[1];
						that.list = response.data.data.area[0].cities;
						that.mapData = response.data.data;
						that.date = response.data.data.date;
					}

					if (e == 2) {
						that.rowData = response.data.data.area[0].cities;
						that.history = response.data.data.history[0];
						that.history1 = response.data.data.history[1];
						that.list = response.data.data.area[0].cities;
						that.mapData = response.data.data;
						that.date = response.data.data.date;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
