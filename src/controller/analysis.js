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

	function opt_normline(date1,date2,xzhou,y1,y2,bcus,bths,bes6s){
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
			},
			{
				tooltip: {
				  	trigger: 'axis',
				  	axisPointer: {
						type: 'cross'
				  	},
					formatter: function(params){
						var s = ""
						for (i = 0; i < params.length; i++) { 
							if (params[i].value !== 0) {
								s = s+'<br>'+params[i].marker+params[i].seriesName+'：'+params[i].value
							}
						}
						return '<div>'+params[0].name+s+'</div>'
					}
				},
				legend: {
				  	data: bcus
				},
				calculable: true,
				grid: {
					left: '3%',
					right: '3%',
					bottom: '8%',
					// containLabel: true
				},
				xAxis: [
				  	{
						type: 'category',
						data: bths
				  	}
				],
				yAxis: [
				  	{
						type: 'value'
				  	}
				],
				series: bes6s
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

	function opt_normline_table(ths,esac){
		table.render({
			elem: '#LAY-index-normline_table'
			,cols: [ths]
			,data: esac
			,size: 'sm'
			,height: '300px'
			,totalRow: true
			//,page: true
			,limit: 99999
			,done: function(res, curr, count){
				let bodyStyle = document.body.style;
				bodyStyle.overflowY = 'hidden';
			}
		});
	}

	function opt_customerpie_table(tbs){
		for (let i = 0; i < tbs.length; i++){
			tbs[i].esv = (tbs[i].esv * 100).toFixed(2) + '%';
			tbs[i].acv = (tbs[i].acv * 100).toFixed(2) + '%';
		}
		table.render({
			elem: '#LAY-index-customerpie_table'
			,cols: [[ //标题栏
			  	{field: 'name', title: '客户名称', totalRowText: "合计："}
			  	,{field: 'es', title: '预计时长', totalRow: true}
			  	,{field: 'esv', title: '预计比例'}
			  	,{field: 'ac', title: '实际时长', totalRow: true}
			  	,{field: 'acv', title: '实际比例'}
			]]
			,data: tbs
			,size: 'sm'
			,height: '500px'
			,totalRow: true
			//,page: true
			,limit: 99999
			//,skin: 'line' //表格风格
			//,even: true
			,done: function(res, curr, count){
				let bodyStyle = document.body.style;
				bodyStyle.overflowY = 'hidden';
			}
		});
		// table.reload("LAY-index-customerpie_table")
	}

	function opt_issuepie_table(tbs){
		for (let i = 0; i < tbs.length; i++){
			tbs[i].esv = (tbs[i].esv * 100).toFixed(2) + '%';
			tbs[i].acv = (tbs[i].acv * 100).toFixed(2) + '%';
		}
		table.render({
			elem: '#LAY-index-issuepie_table'
			,cols: [[ //标题栏
			  	{field: 'name', title: '问题类型', totalRowText: "合计："}
			  	,{field: 'es', title: '预计时长', totalRow: true}
			  	,{field: 'esv', title: '预计比例'}
			  	,{field: 'ac', title: '实际时长', totalRow: true}
			  	,{field: 'acv', title: '实际比例'}
			]]
			,data: tbs
			,size: 'sm'
			,height: '500px'
			,totalRow: true
			,limit: 99999
			,done: function(res, curr, count){
				let bodyStyle = document.body.style;
				bodyStyle.overflowY = 'hidden';
			}
		});
	}

	function opt_detail_table(tbs){
		table.render({
			elem: '#LAY-index-detail_table'
			,cols: [[
				{field: 'cname', title: '客户'}
				,{field: 'number', title: '作业编号'}
				,{field: 'title', title: '问题标题'}
				,{field: 'content', title: '问题描述'}
				,{field: 'feedbackname', title: '反馈人'}
				,{field: 'feedbackdate', title: '反馈时间'}
				,{field: 'productname', title: '产品'}
				,{field: 'urgent', title: '紧急', width: 50, templet: '#analysis-table-urgentTpl', unresize: true}
				,{field: 'issuemainname', title: '问题分类'}
				,{field: 'issuedetailname', title: '问题类型'}
				,{field: 'handlername', title: '处理人'}
				,{field: 'handleestimatetime', title: '预计时长'}
				,{field: 'handleactualtime', title: '实际时长'}
				,{field: 'handlereply', title: '处理回复'}
				,{field: 'casestatus', title: '状态', width: 50, templet: '#analysis-table-casestatusTpl', unresize: true}
				,{field: 'onsite', title: '现场', width: 50, templet: '#analysis-table-onsiteTpl', unresize: true}
				,{field: 'closetime', title: '结案时间'}
				,{field: 'mark', title: '备注'}
			]]
			,data: tbs
			,size: 'sm'
			,page: true
		});
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

	layui.use(['echarts','carousel','table'], function(){
		var $ = layui.$
		,table = layui.table
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
			result1 = "";
			result1 = loadData('/analysis/my/getAnalysis6',field)
			//console.log(result)
			normline = opt_normline(field.feedbackdatestart,field.feedbackdateend,result.date1,result.y1,result.y2,result1.cus,result1.ths,result1.es6s)
			rendernormline(0);
			rendernormline(1);

			result = "";
			result = loadData('/analysis/my/getAnalysis5',field)
			// console.log(result)
			opt_normline_table(result.ths,result.esac)

			result = "";
			result = loadData('/analysis/my/getAnalysis2',field)
			//console.log(result)
			customerpie = opt_customerpie(result.es2s,result.ac2s)
			rendercustomerpie(0)
			rendercustomerpie(1)
			opt_customerpie_table(result.tbs)

			result = "";
			result = loadData('/analysis/my/getAnalysis3',field)
			// console.log(result)
			issuepie = opt_issuepie(result.es3sall,result.es3s,result.ac3s)
			renderissuepie(0)
			renderissuepie(1)
			renderissuepie(2)
			opt_issuepie_table(result.tbs)

			result = "";
			result = loadData('/analysis/my/getAnalysis4',field)
			opt_detail_table(result)
		});
		
		//时数折线图
		var echnormline = [], normline = opt_normline([],[],[],undefined,undefined)
		var elemnormline = $('#LAY-index-normline').children('div.thisIsEcharts')
		var rendernormline = function(index){
		  	echnormline[index] = echarts.init(elemnormline[index], layui.echartsTheme);
		  	echnormline[index].setOption(normline[index]);
		  	// window.onresize = echnormline[index].resize;
			admin.resize(function(){
				echnormline[index].resize();
			});
		};
		if(!elemnormline[0]) return;
		//rendernormline(0);

		//按客户统计饼图
		var echcustomerpie = [], customerpie = opt_customerpie([],[])
		var elemcustomerpie = $('#LAY-index-customerpie').children('div.thisIsEcharts')
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
		var elemissuepie = $('#LAY-index-issuepie').children('div.thisIsEcharts')
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
		var carouselIndexnorm = 0;
		var carouselIndexcustomer = 0;
		var carouselIndexissue = 0;
		carousel.on('change(LAY-index-normline)', function(obj){
			rendernormline(carouselIndexnorm = obj.index);
		});
		carousel.on('change(LAY-index-customerpie)', function(obj){
			rendercustomerpie(carouselIndexcustomer = obj.index);
		});
		carousel.on('change(LAY-index-issuepie)', function(obj){
			renderissuepie(carouselIndexissue = obj.index);
		});
		//监听侧边伸缩
		layui.admin.on('side', function(){
			setTimeout(function(){
				rendernormline(carouselIndexnorm);
				rendercustomerpie(carouselIndexcustomer);
				renderissuepie(carouselIndexissue);
			}, 300);
		});
		//监听路由
		layui.admin.on('hash(tab)', function(){
			layui.router().path.join('') || rendernormline(carouselIndexnorm);
			layui.router().path.join('') || rendercustomerpie(carouselIndexcustomer);
			layui.router().path.join('') || renderissuepie(carouselIndexissue);
		});
	});

	exports('analysis', {})
});