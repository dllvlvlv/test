<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
			<el-tab-pane label="制种地点" name="first"></el-tab-pane>
			<el-tab-pane label="生产品种" name="second"></el-tab-pane>
			<el-tab-pane label="灾害信息" name="third">
				<el-select v-model="disasterselect" filterable placeholder="请选择灾害类型" class="disaster-select">
					<el-option key="weather" label="气象灾害" value="weather">气象灾害</el-option>
					<el-option key="pest" label="病虫灾害" value="pest">病虫灾害</el-option>
				</el-select>
			</el-tab-pane>
			<el-tab-pane label="实时视频" name="fourth"></el-tab-pane>
			<el-tab-pane label="制种企业" name="fifth"></el-tab-pane>
			<el-tab-pane label="资源信息" name="sixth"></el-tab-pane>
			<el-tab-pane label="田间数据" name="seventh"></el-tab-pane>
			<el-tab-pane label="作物长势" name="eighth"></el-tab-pane>
			<el-row :gutter="20" class="search">
				<el-col :span="2" :offset="19">
					<div class="grid-content bg-purple">
						<el-select v-model="baseselect" filterable placeholder="请选择制种地点" class="base-select">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content bg-purple">
						<el-button class="button" type="primary" round>查询</el-button>
  						<el-button class="button" type="info" round>重置</el-button>
					</div>
				</el-col>
			</el-row>
		<div id="basemap"></div>
		</el-tabs>
	</div>
</template>

<script>
import L from 'leaflet';
import {tiledMapLayer} from '@supermap/iclient-leaflet';
import 'leaflet/dist/leaflet.css';
import $ from 'jquery';

export default {
    data() {
		return{
			activeName: 'first',
			options:[{
				value:'yihexiang',
				label:'义和乡'
			},
			{
				value:'gongyizhen',
				label:'公义镇'
			}],
			baseselect: '',
			disasterselect:'',
			url:'',
			map:''
		}
	},
	created() {
		
	},
	mounted() {
		this.url = "http://support.supermap.com.cn:8090/iserver/services/map-china400/rest/maps/China_4326";
		this.map = L.map('basemap', {
			crs: L.CRS.EPSG4326,
			center: [29.989936,103.8581],
			maxZoom: 18,
			zoom: 6,
			noWrap:true
			//wrapX:false
		});
		this.addLayer();
		//this.hideTabs();
	},
	methods: {
		addLayer() {
			tiledMapLayer(this.url).addTo(this.map);
		},
		handleClick(tab, event) {
			console.log(tab, event);
		},
		hideTabs() {
			let tag = 8;
			//this.$refs.tabs.$children[0].$el.style.display = 'none';
			for (i = 1;i < tag;i++) {
				this.$refs.tabs.$children[0].$refs.tabs[i].style.display = 'none';
			}
		}	
	}
}
</script>

<style>
	#basemap {
		width: 100%;
		/* width: calc(100vh); */
		height: calc(100vh);
		z-index: 1;
		
	}
	.button {
		/* float: right; */
		/* right: 0px; */
		/* position: relative;
		z-index: 9; */
	}
	/* .base-select { */
		/* right: 0px; */
		/* width:145px;   */
		/* z-index: 9; */
		/* right: 0px; */
		/* position: absolute;
	} */
	/* .disaster-select { */
		/* width:150px;   */
		/* z-index: 9;
		float:right; */
		/* position: absolute; */
		/* right: 0px; */
	/* } */
	.leaflet-touch .leaflet-bar {
		display: none;
	}
	.el-row {
		margin-bottom: 20px;
		/* &:last-child {
		margin-bottom: 0;
		} */
	}
	.el-col {
		border-radius: 4px;
	}
	/* .bg-purple-dark {
		background: #99a9bf;
	} */
	/* .bg-purple {
		background: #d3dce6;
	} */
	/* .bg-purple-light {
		background: #e5e9f2;
	} */
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
		/* position: absolute; */
	}
	
</style>




