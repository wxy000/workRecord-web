layui.define(['table', 'form', 'element', 'laydate', 'upload'], function(exports){
	var $ = layui.$
		,admin = layui.admin
		,view = layui.view
		,setter = layui.setter
		,table = layui.table
		,form = layui.form
		,laydate = layui.laydate
		,element = layui.element
		,upload = layui.upload;
	
	//区块轮播切换
	layui.use(['admin', 'carousel'], function(){
		var $ = layui.$
		,admin = layui.admin
		,carousel = layui.carousel
		,element = layui.element
		,device = layui.device();
	
		//轮播切换
		$('.layadmin-carousel').each(function(){
		  	var othis = $(this);
		  	carousel.render({
				elem: this
				,width: '100%'
				,arrow: 'none'
				,interval: othis.data('interval')
				,autoplay: othis.data('autoplay') === true
				,trigger: (device.ios || device.android) ? 'click' : 'hover'
				,anim: othis.data('anim')
		  	});
		});
	
	});

	function opt_normline(date1,date2,xzhou,y1,y2){
		console.log(date1,date2)
		var textstr = "全时段时数变化"
		if ((date1===undefined || date1==="") && (date2!==undefined && date2!=="")){
			textstr = "截至"+date2+"的时数变化"
		}
		if ((date2===undefined || date2==="") && (date1!==undefined && date1!=="")){
			textstr = "从"+date1+"以后的时数变化"
		}
		if (date1!==undefined && date1!=="" && date2!==undefined && date2!==""){
			textstr = date1+"~"+date2+"的时数变化"
		}
		return [
			{
				title: {
					text: textstr,
					//subtext: '纯属虚构'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['预计时数','实际时数']
				},
				calculable: true,
				grid: {
					left: '3%',
					right: '4%',
					//bottom: '3%',
					//containLabel: true
				},
				dataZoom : {
					show : true,
					realtime : true,
					start : 0,
					end : 100
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: xzhou
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: [
					{
						name: '预计时数',
						type: 'line',
						data: y1,
						markLine: {
        					data: [{ type: 'average', name: 'Avg' }]
      					}
					},
					{
						name: '实际时数',
						type: 'line',
						data: y2,
						markLine: {
        					data: [{ type: 'average', name: 'Avg' }]
      					}
					}
				]
			}
		]
	}

	function opt_customerpie(es2s,ac2s){
		return [
			{
				title: {
					text: '客户预计时长分布',
					//subtext: 'Fake Data',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left'
				},
				series: [
					{
					  	name: '预计时数',
					  	type: 'pie',
					  	radius: '75%',
					  	data: es2s,
					  	emphasis: {
							itemStyle: {
						  		shadowBlur: 10,
						  		shadowOffsetX: 0,
						  		shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
					  	}
					}
				]
			},
			{
				title: {
					text: '客户实际时长分布',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left'
				},
				series: [
					{
					  	name: '预计时数',
					  	type: 'pie',
					  	radius: '75%',
					  	data: ac2s,
					  	emphasis: {
							itemStyle: {
						  		shadowBlur: 10,
						  		shadowOffsetX: 0,
						  		shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
					  	}
					}
				]
			}
		]
	}

	function opt_issuepie(es3sall,es3s,ac3s){
		return [
			{
				title: {
					text: '问题分类时长分布'
				},
				tooltip: {
					trigger: 'item'
				},
				series: {
					type: 'sunburst',
					data: es3sall,
					radius: [0, '100%'],
					label: {
					  	rotate: 'radial'
					},
					levels: [
						{},
						{
							//r0: '35%',
							r: '50%',
							label: {
							  	align: 'right'
							}
						},
						{
						  	r0: '50%',
						  	r: '75%',
						  	label: {
								position: 'outside',
								padding: 3,
								silent: false
						  	},
						  	itemStyle: {
								borderWidth: 3
						  	}
						}
					  ]
				}
			},
			{
				title: {
					text: '问题分类预计时长分布',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left'
				},
				series: [
					{
					  	name: '预计时数',
					  	type: 'pie',
					  	radius: '75%',
					  	data: es3s,
					  	emphasis: {
							itemStyle: {
						  		shadowBlur: 10,
						  		shadowOffsetX: 0,
						  		shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
					  	}
					}
				]
			},
			{
				title: {
					text: '问题分类实际时长分布',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left'
				},
				series: [
					{
					  	name: '预计时数',
					  	type: 'pie',
					  	radius: '75%',
					  	data: ac3s,
					  	emphasis: {
							itemStyle: {
						  		shadowBlur: 10,
						  		shadowOffsetX: 0,
						  		shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
					  	}
					}
				]
			}
		]
	}

	function loadData(url, field){
		let result = ""
		admin.req({
			url: setter.serverUri+url
			,type: 'get'
			,method: 'get'
			,dataType: 'json'
			,async: false
			,data: field
			,done: function(data){
				result = data.data
			}
		});
		return result
	}

	layui.use(['echarts','carousel'], function(){
		var $ = layui.$
		,carousel = layui.carousel
		,echarts = layui.echarts;

		//开始日期
		var insStart = laydate.render({
			elem: '#feedbackdatestart'
			// ,min: 0
			,done: function(value, date){
				//更新结束日期的最小日期
				insEnd.config.min = lay.extend({}, date, {
					month: date.month - 1
				});

				//自动弹出结束日期的选择器
				insEnd.config.elem[0].focus();
			}
		});
		//结束日期
		var insEnd = laydate.render({
			elem: '#feedbackdateend'
			,min: 0
			,done: function(value, date){
				//更新开始日期的最大日期
				insStart.config.max = lay.extend({}, date, {
					month: date.month - 1
				});
			}
		});

		//监听提交
		form.on('submit(search-submit)', function(data) {
			var field = data.field; //获取提交的字段
			// layer.alert(JSON.stringify(field), {
			// 	title: '最终的提交信息'
			// })
			result = "";
			result = loadData('/analysis/my/getAnalysis1',field)
			//console.log(result)
			normline = opt_normline(field.feedbackdatestart,field.feedbackdateend,result.date1,result.y1,result.y2)
			rendernormline(0);

			result = "";
			result = loadData('/analysis/my/getAnalysis2',field)
			//console.log(result)
			customerpie = opt_customerpie(result.es2s,result.ac2s)
			rendercustomerpie(0)
			rendercustomerpie(1)

			result = "";
			result = loadData('/analysis/my/getAnalysis3',field)
			// console.log(result)
			issuepie = opt_issuepie(result.es3sall,result.es3s,result.ac3s)
			renderissuepie(0)
			renderissuepie(1)
			renderissuepie(2)
		});
		
		//时数折线图
		var echnormline = [], normline = opt_normline([],[],[],undefined,undefined)
		var elemnormline = $('#LAY-index-normline').children('div')
		var rendernormline = function(index){
		  	echnormline[index] = echarts.init(elemnormline[index], layui.echartsTheme);
		  	echnormline[index].setOption(normline[index]);
		  	window.onresize = echnormline[index].resize;
		};
		if(!elemnormline[0]) return;
		//rendernormline(0);

		//按客户统计饼图
		var echcustomerpie = [], customerpie = opt_customerpie([],[])
		var elemcustomerpie = $('#LAY-index-customerpie').children('div')
		var rendercustomerpie = function(index){
		  	echcustomerpie[index] = echarts.init(elemcustomerpie[index], layui.echartsTheme);
		  	echcustomerpie[index].setOption(customerpie[index]);
		  	// window.onresize = echcustomerpie[index].resize;
			admin.resize(function(){
				echcustomerpie[index].resize();
			});
		};
		if(!elemcustomerpie[0]) return;

		//按问题分类饼图
		var echissuepie = [], issuepie = opt_issuepie([],[],[])
		var elemissuepie = $('#LAY-index-issuepie').children('div')
		var renderissuepie = function(index){
		  	echissuepie[index] = echarts.init(elemissuepie[index], layui.echartsTheme);
		  	echissuepie[index].setOption(issuepie[index]);
		  	// window.onresize = echcustomerpie[index].resize;
			admin.resize(function(){
				echissuepie[index].resize();
			});
		};
		if(!elemissuepie[0]) return;

		//监听数据概览轮播
		var carouselIndexcustomer = 0;
		var carouselIndexissue = 0;
		carousel.on('change(LAY-index-customerpie)', function(obj){
			rendercustomerpie(carouselIndexcustomer = obj.index);
		});
		carousel.on('change(LAY-index-issuepie)', function(obj){
			renderissuepie(carouselIndexissue = obj.index);
		});
		//监听侧边伸缩
		layui.admin.on('side', function(){
			setTimeout(function(){
				rendercustomerpie(carouselIndexcustomer);
				renderissuepie(carouselIndexissue);
			}, 300);
		});
		//监听路由
		layui.admin.on('hash(tab)', function(){
			layui.router().path.join('') || rendercustomerpie(carouselIndexcustomer);
			layui.router().path.join('') || renderissuepie(carouselIndexissue);
		});
	});

	exports('analysis', {})
});