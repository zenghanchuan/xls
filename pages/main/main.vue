<!--统计页 -->
<template>
    <view class="main">
		<view class="header">
			<view class="leftFirst">
				<picker @change="bindPickerRegion" :value="index1" :range="objectArray1">
					<view class="uni-input">{{areaName}}</view>
				</picker>
			</view>
			<view class="left">
				<picker @change="bindPickerChange" :value="index" :range="objectArray">
					<view class="uni-input">{{shopName}}</view>
				</picker>
			</view>
			<view class="right">
				<picker @change="bindDateChange" :value="index2" :range="objectArray2">
				    <view class="uni-input">{{dateExhibition ? dateExhibition:date}}</view>
				</picker> 
			</view>
		</view>
		<view class="statisticsTime">
			<view class="qiun-chartsT" >
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="chartsT" @touchstart="touchLineA"></canvas>
			</view>
		</view>
		<view class="statisticsContent">
			<view class="customer">类型分布</view>
			<view class="gender">性别分布</view>
		</view>
		<view class="chartStatistical">
			<view class="guest">
				<view class="qiun-charts" >
					<canvas canvas-id="canvasRing" id="canvasRing" style="width:550rpx;height:500rpx;" class="charts" @touchstart="touchRing"></canvas>
				</view>
			</view>
			<view class="sex">
				<view class="qiun-chartsS" >
					<canvas canvas-id="canvasPie" id="canvasPie" class="chartsS" @touchstart="touchPie"></canvas>
				</view>
			</view>
		</view>
		<view class="ageStatistics">
			<text class="ageLeve">年龄分布</text>
			<view class="qiun-chartsAge" >
				<canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="chartsAge" @touchstart="touchColumn"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaRing=null;
	var canvaLineA=null;
	var canvaPie=null;
	var canvaColumn=null;
	export default {  
	  data() {
		  const currentDate = service.getDate({format: true})
	    return {
		  objectArray: ['中国'],
		  objectArray1: ['中国'],				//所有区域数据组
		  objectArray2: ['今天','本周','本月','本季度','本年',],				//所有时间段数据组
		  index: 0,									//选择门店的索引
		  index1: 0,								//选择区域的索引
		  index2: 0,								//选择时间的索引
		  date: currentDate,						//日期选择器的日期
		  dateExhibition:'',						//选择的时间段
		  slotTime:'',								//折线统计图传递时间参数
		  timePoint:'',
		  period:'hour',								//选择的时间段类型
		  periods:'hour',
		  cWidth:'',
		  cHeight:'',
		  pixelRatio:1,
		  serverData:'',
		  shopArray:[],								//门店接口获取的原数据
		  selctShopid:'',							//选中的门店shop_id
		  shopName:'门店',
		  selectRegionid:'',						//选中的区域region_id
		  areaName:'区域',								//选择的区域
		  areaArray:[],								//区域接口获取的原数据
		  typeName:'人次',							//环形统计图中字段
	    };  
	  },
		computed: {startDate() {return service.getDate('start');},endDate() {return service.getDate('end');}},	
		onLoad() {
	  			_self = this;
				this.slotTime = service.dayAll();
				console.log(this.slotTime)
	  			this.cWidth=uni.upx2px(750);
	  			this.cHeight=uni.upx2px(500);
	  			this.getServerData();
				this.getServerDataT();
				this.getServerDataS();
				this.getServerDataA();
				this.shopData();
				this.regionData();
				getApp().globalData.baseUrl = uni.getStorageSync('baseUrl');
	  		},
		methods: {
		 /*点击区域按钮触发的事件*/
		 bindPickerRegion:function(e){
			  this.index1 = e.target.value;
			  this.selectRegionid = this.areaArray[this.index1].id;
			  this.areaName = this.objectArray1[this.index1];
			  this.getServerData();
			  this.getServerDataT();
			  this.getServerDataS();
			  this.getServerDataA();
			  // this.shopData();
		  },
		/*点击门店按钮触发的事件*/
		bindPickerChange: function(e) {
		    this.index = e.target.value;
			this.selctShopid = this.shopArray[this.index].id;
			this.shopName = this.objectArray[this.index];
			this.getServerData();
			this.getServerDataT();
			this.getServerDataS();
			this.getServerDataA();
		},
		/*点击日期按钮触发选择事件*/
		bindDateChange: function(e) {
			var that = this;
		    this.index2 = e.target.value;
			this.dateExhibition = this.objectArray2[this.index2];
			if(this.dateExhibition == '今天'){
				that.slotTime = service.dayAll();
				that.timePoint = that.date + '~';
				that.period = 'hour';
				that.periods = 'hour';
			}else if(this.dateExhibition == '本周'){
				that.slotTime = service.weekLast();
				that.timePoint = service.weekLast();
				that.period = 'day';
				that.periods = 'day';
			}else if(this.dateExhibition == '本月'){
				that.slotTime = service.monthThis();
				that.timePoint = service.monthThis();
				that.period = 'day';
				that.periods = 'month';
			}else if(this.dateExhibition == '本季度'){
				that.slotTime = service.quarterThis();
				that.timePoint = service.quarterThis();
				that.period = 'day';
				that.periods = 'quarter';
			}else if(this.dateExhibition == '本年'){
				that.slotTime = service.yearThis();
				that.timePoint = service.yearThis();
				that.period = 'month';
				that.periods = 'year';
			}
			this.getServerData();
			this.getServerDataT();
			this.getServerDataS();
			this.getServerDataA();
		},
		/*所有门店信息获取*/
		shopData:function(){
			var that = this;
			this.xlsAjax({
				url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/shop/all-name',
				data:{},
				method:"GET",
				success:function(res){
					if(res.statusCode == 200){
						if(res.data[0]){
							that.objectArray = [];
							for(let i=0;i<res.data.length;i++){
								that.shopArray = res.data;
								that.objectArray.push(res.data[i].name)
							}
						}else{return}
					}
				},
				fail:(err) =>{
					console.log(err)
				}
			});
		},
		/*所有区域信息获取*/
		regionData:function(){
			var that = this;
			this.xlsAjax({
				url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/area/all-name',
				data:{},
				method:"GET",
				success:function(res){
					if(res.statusCode == 200){
						if(res.data[0]){
							that.objectArray1 = [];
							for(let i=0;i<res.data.length;i++){
								that.areaArray = res.data;
								that.objectArray1.push(res.data[i].name)
							}
						}else{return}
					}
				},
				fail:(err) =>{
					console.log(err)
				}
			});
		},
		/*回头客新客统计图*/
			getServerData(){
				var that = this;
				let Ring={series:[]};
				Ring.series=[{"name": "回头客","data": 0},{"name": "新客","data": 0},];
							this.xlsAjax({
								url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/facelog/cnt',
								data:{area_id:that.selectRegionid,shop_id:that.selctShopid,'range-create_time':that.slotTime,'group-':'type'},
								method:"GET",
								success:function(res){
									if(res.statusCode == 200){
										for(let i=0;i<res.data.length;i++){
											if(res.data[i].type == 0){
												Ring.series[1].data = res.data[i].count
											}else if(res.data[i].type == 1){
												Ring.series[0].data = res.data[i].count
											}
										}
									}else{
										uni.showToast({
											icon:'none',
											title:'当前暂无客流数据'
										})
										return
									}
								}
							})
				_self.showRing("canvasRing",Ring);
			},
			showRing(canvasId,chartData){
				canvaRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'ring',
					fontSize:15,
					legend:true,
					subtitle: {
							name: _self.typeName,
							color: '#666666',
							fontSize: 12,
							offsetY:0,
						},					
					extra: {
						pie: {
						  offsetAngle: -40,
						  ringWidth: 20*_self.pixelRatio,
						  labelWidth:15,
						}
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio-180,
					height: _self.cHeight*_self.pixelRatio-20,
					disablePieStroke: true,
					dataLabel: true,
				});
			},		   
			touchRing(e){canvaRing.showToolTip(e, {format: function (item) {this.typeName = item.name;return item.name + ':' + item.data }});},
			/*男女比例统计图*/
			getServerDataS(){
				var that = this;
				let Pie={series:[]};
				Pie.series=[{"name": "男","data": 0}, {"name": "女","data": 0}],
				this.xlsAjax({
					url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/facelog/cnt',
					data:{area_id:that.selectRegionid,shop_id:that.selctShopid,'range-create_time':that.slotTime,'group-':'gender'},
					method:"GET",
					success:function(res){
						if(res.statusCode == 200){
							for(let i=0;i<res.data.length;i++){
								if(res.data[i].gender == 0){
									Pie.series[1].data = res.data[i].count
								}else if(res.data[i].gender == 1){
									Pie.series[0].data = res.data[i].count
								}
							}
						}else{
							uni.showToast({
								icon:'none',
								title:'当前暂无客流数据'
							})
							return
						}
					}
				})
				_self.showPie("canvasPie",Pie);											
			},
			showPie(canvasId,chartData){
					canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:15,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio-180,
					height: _self.cHeight*_self.pixelRatio-20,
					dataLabel: true,
					extra: {pie: {lableWidth:15}},
				});
			},
			touchPie(e){canvaPie.showToolTip(e, {format: function (item) {return item.name + ':' + item.data }});},
			/*今日客流统计折线图*/
			getServerDataT(){
				var that = this;
				var LineA={categories:[],series:[]};
				LineA.categories=['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];
				LineA.series=[{name: '01:00~24:00',data: [0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0],color: '#000000'}];
				this.xlsAjax({
					url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/facelog/time-count',
					data:{area_id:that.selectRegionid,shop_id:that.selctShopid,'range-create_time':that.timePoint,period:that.period},
					method:"GET",
					success:function(res){
						if(res.statusCode == 200){
							if(res.data.length == 0){
								uni.showToast({
									icon:'none',
									title:'当前时间暂无客流记录',
								})
								return
							}
							if(that.periods == 'hour'){
								//i 代表横轴时间索引  j代表获取的数据的索引
								for(let i=0;i<LineA.categories.length;i++){
									for(let j=0;j<res.data.length;j++){
										if(LineA.categories[i].slice(0,2) == res.data[j].time){
											LineA.series[0].data[i] = res.data[j].count;
										}
									}
								}
								LineA.series[0].name = '01:00~24:00';
								_self.showLineA("canvasLineA",LineA);
								return
							}else if(that.periods == 'day'){
								LineA.categories = [];
								LineA.series = [];
								LineA.categories=[service.GetDateStr(-6),service.GetDateStr(-5),service.GetDateStr(-4),service.GetDateStr(-3),service.GetDateStr(-2),service.GetDateStr(-1),service.GetDateStr(-0)];
								LineA.series=[{name: '',data: [0,0,0,0,0,0,0],color: '#000000'}];
								//i 代表横轴时间索引  j代表获取的数据的索引
								for(let i=0;i<LineA.categories.length;i++){
									for(let j=0;j<res.data.length;j++){
										if(LineA.categories[i] == res.data[j].time){
											LineA.series[0].data[i] = res.data[j].count;
										}
									}
								}
								LineA.series[0].name = '本周' + ':' + service.GetDateStr(-6) + '~' + service.GetDateStr(-0);
								console.log(LineA.series[0])
								_self.showLineA("canvasLineA",LineA);
								return
							}else if(that.periods == 'month'){
								LineA.categories = [];
								LineA.series = [];
								LineA.categories=[service.GetDateStr(-30),service.GetDateStr(-29),service.GetDateStr(-28),service.GetDateStr(-27),service.GetDateStr(-26),service.GetDateStr(-25),service.GetDateStr(-24),service.GetDateStr(-23),service.GetDateStr(-22),service.GetDateStr(-21),service.GetDateStr(-20),service.GetDateStr(-19),service.GetDateStr(-18),service.GetDateStr(-17),service.GetDateStr(-16),service.GetDateStr(-15),service.GetDateStr(-14),service.GetDateStr(-13),service.GetDateStr(-12),service.GetDateStr(-11),service.GetDateStr(-10),service.GetDateStr(-9),service.GetDateStr(-8),service.GetDateStr(-7),service.GetDateStr(-6),service.GetDateStr(-5),service.GetDateStr(-4),service.GetDateStr(-3),service.GetDateStr(-2),service.GetDateStr(-1),service.GetDateStr(-0)];
								LineA.series=[{name: '',data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],color: '#000000'}];
								//i 代表横轴时间索引  j代表获取的数据的索引
								for(let i=0;i<LineA.categories.length;i++){
									for(let j=0;j<res.data.length;j++){
										if(LineA.categories[i] == res.data[j].time){
											LineA.series[0].data[i] = res.data[j].count;
										}
									}
								}
								LineA.series[0].name = '本月' + ':' + service.GetDateStr(-30) + '~' + service.GetDateStr(-0);
								_self.showLineA("canvasLineA",LineA);
								return
							}else if(that.periods == 'quarter'){
								LineA.categories = [];
								LineA.series = [];
								LineA.categories=[service.GetDateStr(-60),service.GetDateStr(-58),service.GetDateStr(-56),service.GetDateStr(-54),service.GetDateStr(-52),service.GetDateStr(-50),service.GetDateStr(-48),service.GetDateStr(-46),service.GetDateStr(-44),service.GetDateStr(-42),service.GetDateStr(-40),service.GetDateStr(-38),service.GetDateStr(-36),service.GetDateStr(-34),service.GetDateStr(-32),service.GetDateStr(-30),service.GetDateStr(-28),service.GetDateStr(-26),service.GetDateStr(-24),service.GetDateStr(-22),service.GetDateStr(-20),service.GetDateStr(-18),service.GetDateStr(-16),service.GetDateStr(-14),service.GetDateStr(-12),service.GetDateStr(-10),service.GetDateStr(-8),service.GetDateStr(-6),service.GetDateStr(-4),service.GetDateStr(-2),service.GetDateStr(-0)];
								LineA.series=[{name: '',data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],color: '#000000'}];
								//i 代表横轴时间索引  j代表获取的数据的索引
								for(let i=0;i<LineA.categories.length;i++){
									for(let j=0;j<res.data.length;j++){
										if(LineA.categories[i] == res.data[j].time){
											LineA.series[0].data[i] = res.data[j].count;
										}
									}
								}
								LineA.series[0].name = '本季度' + ':' + service.GetDateStr(-60) + '~' + service.GetDateStr(-0);
								_self.showLineA("canvasLineA",LineA);
								return
							}else if(that.periods == 'year'){
								LineA.categories = [];
								LineA.series = [];
								LineA.categories=[service.GetMonthStr(11),service.GetMonthStr(10),service.GetMonthStr(9),service.GetMonthStr(8),service.GetMonthStr(7),service.GetMonthStr(6),service.GetMonthStr(5),service.GetMonthStr(4),service.GetMonthStr(3),service.GetMonthStr(2),service.GetMonthStr(1),service.GetMonthStr(0),];
								LineA.series=[{name: '',data: [0,0,0,0,0,0,0,0,0,0,0,0],color: '#000000'}];
								//i 代表横轴时间索引  j代表获取的数据的索引
								for(let i=0;i<LineA.categories.length;i++){
									for(let j=0;j<res.data.length;j++){
										if(LineA.categories[i] == res.data[j].time){
											LineA.series[0].data[i] = res.data[j].count;
										}
									}
								}
							}
							LineA.series[0].name = '本年' + ':' + service.GetDateStr(-365) + '~' + service.GetDateStr(-0);
							// LineA.series[0].name = '本年' + ':' + service.GetMonthStr(12) + '~' + service.GetMonthStr(0);
							_self.showLineA("canvasLineA",LineA);
							return
						}else{
							uni.showToast({
								icon:'none',
								title:'当前暂无客流数据'
							})
							return
						}
					}
				})
				_self.showLineA("canvasLineA",LineA);			
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					left:-20,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						rotateLabel:'true',
						fontSize:2,
						fontColor:'#FFFFFF',
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:4,
						// min:0,
						// max:100,
						format:(val)=>{return val.toFixed(0)+'人'}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
			},
			touchLineA(e) {canvaLineA.showToolTip(e, {format: function (item, category) {return category + ' ' + '人次' + ':' + item.data }});},
			/*年龄柱状图*/
			getServerDataA(){
				var that = this;
				let ColumnStack={categories:[],series:[]};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				ColumnStack.categories=[service.GetDateStr(-6),service.GetDateStr(-5),service.GetDateStr(-4),service.GetDateStr(-3),service.GetDateStr(-2),service.GetDateStr(-1),service.GetDateStr(-0)];
				ColumnStack.series=[{"name": "0-18岁","data": [0,0,0,0,0,0,0]}, {"name": "19-29岁","data": [0,0,0,0,0,0,0]}, {"name": "30-39岁","data": [0,0,0,0,0,0,0]}, {"name": "40-49岁","data": [0,0,0,0,0,0,0]},{"name": "50岁以上","data": [0,0,0,0,0,0,0]}];
				if(that.periods == 'hour'){that.period = 'day'}
				if(that.periods == 'year'){that.period = 'month';}
					this.xlsAjax({
						url:this.$store.state.url+'/'+uni.getStorageSync('baseUrl')+ '/api/facelog/time-count',
						data:{area_id:that.selectRegionid,shop_id:that.selctShopid,'range-create_time':that.slotTime,period:that.period,class:'age'},
						method:"GET",
						success:function(res){
							if(res.statusCode == 200){
								console.log(res)
								if(res.data.length == 0){
									uni.showToast({
										icon:'none',
										title:'当前时间暂无客流记录',
									})
									return
								}
								if(that.periods == 'hour'){
									ColumnStack.categories = [];
									ColumnStack.series = [];
									ColumnStack.categories=['08:00','10:00','12:00','14:00','16:00','18:00','20:00'];
									console.log(ColumnStack.categories)
									ColumnStack.series=[{"name": "0-18岁","data": [0,0,0,0,0,0,0]}, {"name": "19-29岁","data": [0, 0, 0, 0, 0, 0,0,]}, {"name": "30-39岁","data": [0, 0, 0, 0, 0, 0,0]}, {"name": "40-49岁","data": [0, 0, 0, 0, 0, 0,0]},{"name": "50岁以上","data": [0, 0, 0, 0, 0, 0,0]}];
									// i 代表横轴时间索引  j代表获取的数据的索引
									for(let i=0;i<ColumnStack.categories.length;i++){
										for(let j=0;j<res.data.length;j++){
											if(res.data[j].age < 18){
												ColumnStack.series[0].data[3] = res.data[j].count-0+ColumnStack.series[0].data[i];
											}
											if(18<res.data[j].age<29){
												ColumnStack.series[1].data[4] = res.data[j].count-0+ColumnStack.series[1].data[i];
											}
											if(29<res.data[j].age<39){
												ColumnStack.series[2].data[5] = res.data[j].count-0+ColumnStack.series[2].data[i];
											}
											if(39<res.data[j].age<49){
												ColumnStack.series[3].data[6] = res.data[j].count-0+ColumnStack.series[3].data[i];
											}
											if(49<res.data[j].age){
												ColumnStack.series[4].data[7] = res.data[j].count-0+ColumnStack.series[4].data[i];
											}
										}
									}
									_self.showColumnStack("canvasColumnStack",ColumnStack);
								}else if(that.periods == 'day'){
									ColumnStack.categories = [];
									ColumnStack.series = [];
									ColumnStack.categories=[service.GetDateStr(-6),service.GetDateStr(-5),service.GetDateStr(-4),service.GetDateStr(-3),service.GetDateStr(-2),service.GetDateStr(-1),service.GetDateStr(-0)];
									console.log(ColumnStack.categories)
									ColumnStack.series=[{"name": "0-18岁","data": [0, 0, 0, 0, 0, 0,0]}, {"name": "19-29岁","data": [0, 0, 0, 0, 0, 0,0,]}, {"name": "30-39岁","data": [0, 0, 0, 0, 0, 0,0]}, {"name": "40-49岁","data": [0, 0, 0, 0, 0, 0,0]},{"name": "50岁以上","data": [0, 0, 0, 0, 0, 0,0]}];
									//i 代表横轴时间索引  j代表获取的数据的索引
									for(let i=0;i<ColumnStack.categories.length;i++){
										for(let j=0;j<res.data.length;j++){
											if(ColumnStack.categories[i] == res.data[j].time){
												if(res.data[j].age < 18){
													ColumnStack.series[0].data[i] = res.data[j].count-0+ColumnStack.series[0].data[i];
												}
												if(18<res.data[j].age<29){
													ColumnStack.series[1].data[i] = res.data[j].count-0+ColumnStack.series[1].data[i];
												}
												if(29<res.data[j].age<39){
													ColumnStack.series[2].data[i] = res.data[j].count-0+ColumnStack.series[2].data[i];
												}
												if(39<res.data[j].age<49){
													ColumnStack.series[3].data[i] = res.data[j].count-0+ColumnStack.series[3].data[i];
												}
												if(49<res.data[j].age){
													ColumnStack.series[4].data[i] = res.data[j].count-0+ColumnStack.series[4].data[i];
												}
											}
										}
									}
									_self.showColumnStack("canvasColumnStack",ColumnStack);
								}else if(that.periods == 'month'){
									ColumnStack.categories = [];
									ColumnStack.series = [];
									ColumnStack.categories=[service.GetDateStr(-31),service.GetDateStr(-28),service.GetDateStr(-25),service.GetDateStr(-22),service.GetDateStr(-19),service.GetDateStr(-16),service.GetDateStr(-13),service.GetDateStr(-10),service.GetDateStr(-7),service.GetDateStr(-3),service.GetDateStr(-0)];
									ColumnStack.series=[{"name": "0-18岁","data": [0, 0, 0, 0, 0, 0,0,0,0,0,0]}, {"name": "19-29岁","data": [0, 0, 0, 0, 0, 0,0,0,0,0,0]}, {"name": "30-39岁","data": [0, 0, 0, 0, 0, 0,0,0,0,0,0]}, {"name": "40-49岁","data": [0, 0, 0, 0, 0, 0,0,0,0,0,0]},{"name": "50岁以上","data": [0, 0, 0, 0, 0, 0,0,0,0,0,0]}];
									//i 代表横轴时间索引  j代表获取的数据的索引
									for(let i=0;i<ColumnStack.categories.length;i++){
										for(let j=0;j<res.data.length;j++){
											if(ColumnStack.categories[i] == res.data[j].time){
												if(res.data[j].age < 18){
													ColumnStack.series[0].data[i] = res.data[j].count-0+ColumnStack.series[0].data[i];
												}
												if(18<res.data[j].age<29){
													ColumnStack.series[1].data[i] = res.data[j].count-0+ColumnStack.series[1].data[i];
												}
												if(29<res.data[j].age<39){
													ColumnStack.series[2].data[i] = res.data[j].count-0+ColumnStack.series[2].data[i];
												}
												if(39<res.data[j].age<49){
													ColumnStack.series[3].data[i] = res.data[j].count-0+ColumnStack.series[3].data[i];
												}
												if(49<res.data[j].age){
													ColumnStack.series[4].data[i] = res.data[j].count-0+ColumnStack.series[4].data[i];
												}
											}
										}
									}
									_self.showColumnStack("canvasColumnStack",ColumnStack);
								}else if(that.periods == 'quarter'){
									ColumnStack.categories = [];
									ColumnStack.series = [];
									ColumnStack.categories=[service.GetDateStr(-84),service.GetDateStr(-80),service.GetDateStr(-76),service.GetDateStr(-72),service.GetDateStr(-68),service.GetDateStr(-64),service.GetDateStr(-60),service.GetDateStr(-56),service.GetDateStr(-52),service.GetDateStr(-48),service.GetDateStr(-44),service.GetDateStr(-40),service.GetDateStr(-36),service.GetDateStr(-32),service.GetDateStr(-28),service.GetDateStr(-24),service.GetDateStr(-20),service.GetDateStr(-16),service.GetDateStr(-12),service.GetDateStr(-8),service.GetDateStr(-4),service.GetDateStr(-0)];
									ColumnStack.series=[{"name": "0-18岁","data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "19-29岁","data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "30-39岁","data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "40-49岁","data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"name": "50岁以上","data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}];
									//i 代表横轴时间索引  j代表获取的数据的索引
									for(let i=0;i<ColumnStack.categories.length;i++){
										for(let j=0;j<res.data.length;j++){
											if(ColumnStack.categories[i] == res.data[j].time){
												if(res.data[j].age < 18){
													ColumnStack.series[0].data[i] = res.data[j].count-0+ColumnStack.series[0].data[i];
												}
												if(18<res.data[j].age<29){
													ColumnStack.series[1].data[i] = res.data[j].count-0+ColumnStack.series[1].data[i];
												}
												if(29<res.data[j].age<39){
													ColumnStack.series[2].data[i] = res.data[j].count-0+ColumnStack.series[2].data[i];
												}
												if(39<res.data[j].age<49){
													ColumnStack.series[3].data[i] = res.data[j].count-0+ColumnStack.series[3].data[i];
												}
												if(49<res.data[j].age){
													ColumnStack.series[4].data[i] = res.data[j].count-0+ColumnStack.series[4].data[i];
												}
											}
										}
									}
									_self.showColumnStack("canvasColumnStack",ColumnStack);
								}else if(that.periods == 'year'){
									ColumnStack.categories = [];
									ColumnStack.series = [];
									ColumnStack.categories=[service.GetMonthStr(11),service.GetMonthStr(10),service.GetMonthStr(9),service.GetMonthStr(8),service.GetMonthStr(7),service.GetMonthStr(6),service.GetMonthStr(5),service.GetMonthStr(4),service.GetMonthStr(3),service.GetMonthStr(2),service.GetMonthStr(1),service.GetMonthStr(0),];
									ColumnStack.series=[{"name": "0-18岁","data": [0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "19-29岁","data": [0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "30-39岁","data": [0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "40-49岁","data": [0,0,0,0,0,0,0,0,0,0,0,0]},{"name": "50岁以上","data": [0,0,0,0,0,0,0,0,0,0,0,0]}];
									//i 代表横轴时间索引  j代表获取的数据的索引
									for(let i=0;i<ColumnStack.categories.length;i++){
										for(let j=0;j<res.data.length;j++){
											if(ColumnStack.categories[i] == res.data[j].time.slice(0,7)){
												if(res.data[j].age < 18){
													ColumnStack.series[0].data[i] = res.data[j].count-0+ColumnStack.series[0].data[i];
												}
												if(18<res.data[j].age<29){
													ColumnStack.series[1].data[i] = res.data[j].count-0+ColumnStack.series[1].data[i];
												}
												if(29<res.data[j].age<39){
													ColumnStack.series[2].data[i] = res.data[j].count-0+ColumnStack.series[2].data[i];
												}
												if(39<res.data[j].age<49){
													ColumnStack.series[3].data[i] = res.data[j].count-0+ColumnStack.series[3].data[i];
												}
												if(49<res.data[j].age){
													ColumnStack.series[4].data[i] = res.data[j].count-0+ColumnStack.series[4].data[i];
												}
											}
										}
									}
									_self.showColumnStack("canvasColumnStack",ColumnStack);
								}
							}else{
								uni.showToast({
									icon:'none',
									title:'当前暂无客流数据'
								})
								return
							}
						}
					})
				_self.showColumnStack("canvasColumnStack",ColumnStack);
			},
			showColumnStack(canvasId,chartData){
							canvaColumn=new uCharts({
								$this:_self,
								canvasId: canvasId,
								type: 'column',
								legend:{show:true},
								fontSize:11,
								background:'#FFFFFF',
								pixelRatio:_self.pixelRatio,
								animation: true,
								categories: chartData.categories,
								series: chartData.series,
								xAxis: {
									disableGrid:true,
									rotateLabel:'true',
									fontSize:5,
									fontColor:'#FFFFFF',
								},
								yAxis: {
									//disabled:true
								},
								dataLabel: false,						//是否显示堆叠柱状上的数据
								width: _self.cWidth*_self.pixelRatio,
								height: _self.cHeight*_self.pixelRatio,
								extra: {
									column: {
										type:'stack',					//堆叠类型纵向
										width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length,
									}
								  }
							});
							
						},
			touchColumn(e){canvaColumn.showToolTip(e, {format: function (item, category) {return category + ' ' + item.name + ':' + item.data }});},			
		},    
	};  
</script>
<style>
	@charset "UTF-8";  
	.main{width: 100%;display: flex;flex-wrap: wrap;}
	.header{width: 100%;height: 100rpx;display: flex;justify-content: flex-start;text-align: center;align-items: center;border-right: 1rpx solid #333333;}
	.leftFirst{width: 33.3%;border-right: 1rpx solid #333333;}
	.left{width: 33.3%;border-right: 1rpx solid #333333;}
	.right{width: 33.3%;}
	.statisticsTime{width: 100%;height: 500rpx;align-items: flex-start;}
	.statisticsContent{width: 100%;height: 100rpx;display: flex;justify-content: flex-start;text-align: center;align-items: center;}
	.customer{width: 50%;border-right: 1rpx solid #333333;}
	.gender{width: 50%;}
	.chartStatistical{width: 100%;height: 450rpx;display: flex;justify-content: flex-start;align-items: center;}
	.guest{height: 450rpx;width: 50%;display: flex;}
	.sex{width: 50%;height: 450rpx;display: flex;}
	.qiun-charts{width: 50%; height:450rpx;}
	.charts{width: 50%; height:350rpx;background-color: #FFFFFF;display: flex;margin-left: -40rpx;}
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-chartsT {width: 100%;height: 450rpx;background-color: #FFFFFF;}
	.chartsT {width: 100%;height: 470rpx;display: flex;background-color: #FFFFFF;}
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-chartsS{width: 100%; height:450rpx;}
	.chartsS{width: 100%; height:450px;background-color: #FFFFFF;display: flex;}
	.ageStatistics{width: 100%;height: 600rpx;align-items: flex-start;}
	.ageLeve{width: 50%;display: flex;height: 20%;color: #333333;font-size: 42rpx;align-items: center;margin-top: 5%;justify-content: center;}
	.qiun-chartsAge{width: 100%;height: 600rpx;background-color: #FFFFFF;}
	.chartsAge{width: 100%;height: 600rpx;display: flex;background-color: #FFFFFF;margin-top: 5%;}
</style>
