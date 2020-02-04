<template>
	<div class="list-wrapper">
		<nut-row>
			<nut-col :span="24" style="margin: 10px 0;">
				<div class="flex-content tips flex flex-vc flex-hc">
					<nut-icon type="action" size="13px" style="color:#999"></nut-icon>
					<div style="padding-left: 8px;">数据来自官方通报 全国与各省通报数据可能存在差异</div>
				</div>
			</nut-col>
		</nut-row>
		<nut-row class="tables-title">
			<nut-col :span="6">
				<div class="flex-content stitle"><div>省市</div></div>
			</nut-col>
			<!-- 			<nut-col :span="4"><div class="flex-content stitle">新增确诊</div></nut-col> -->
			<nut-col :span="6"><div class="flex-content stitle">累计确诊</div></nut-col>
			<nut-col :span="6"><div class="flex-content stitle">治愈</div></nut-col>
			<nut-col :span="6"><div class="flex-content stitle">死亡</div></nut-col>
		</nut-row>
		<nut-row v-for="(item, index) in list" class="item-table cursor">
			<div @click="isClickSpread(index)">
				<nut-col :span="6">
					<div class="flex-content city cursor">
						<div class="one-line-ellipsis">{{ item.preProvinceName || item.cityName }}</div>
					</div>
				</nut-col>
				<!-- 			<nut-col :span="4">
				<div class="flex-content">{{ item.yesterdayIncreased.confirmedCount }}</div>
			</nut-col> -->
				<nut-col :span="6">
					<div class="flex-content">{{ item.confirmedCount }}</div>
				</nut-col>
				<nut-col :span="6">
					<div class="flex-content">{{ item.curedCount }}</div>
				</nut-col>
				<nut-col :span="6" class="flex flex-vc flex-hc">
					<div class="flex-content" style="width: calc(100% - 48px);">{{ item.deadCount }}</div>
					<div :class="[isSpread == index && isShow ? 'areaSelect1' : 'areaSelect']" v-if="isIndex != 1"></div>
				</nut-col>
			</div>
			<nut-col :span="24" v-if="isSpread == index && isShow">
				<nut-row v-for="(items, index) in item.cities" class="item-table1">
					<nut-col :span="6">
						<div class="flex-content city cursor">
							<div class="one-line-ellipsis">{{ items.preProvinceName || items.cityName }}</div>
						</div>
					</nut-col>
					<!-- 					<nut-col :span="4">
						<div class="flex-content">{{ items.confirmedCount }}</div>
					</nut-col> -->
					<nut-col :span="6">
						<div class="flex-content">{{ items.confirmedCount }}</div>
					</nut-col>
					<nut-col :span="6">
						<div class="flex-content">{{ items.curedCount }}</div>
					</nut-col>
					<nut-col :span="6" class="flex flex-vc flex-hc">
						<div class="flex-content" style="width: calc(100% - 48px);">{{ items.deadCount }}</div>
						<div class="areaSelect" style="visibility: hidden;"></div>
					</nut-col>
				</nut-row>
			</nut-col>
		</nut-row>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: ['list', 'isIndex'],
	data() {
		return {
			isSpread: -1,
			isShow: false
		};
	},
	mounted: function() {
		console.log(this.isIndex);
	},
	methods: {
		isClickSpread(e) {
			console.log(e);
			this.isSpread = e;
			this.isShow = !this.isShow;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
