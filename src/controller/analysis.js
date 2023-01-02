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
						data: y1
					},
					{
						name: '实际时数',
						type: 'line',
						data: y2
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

	layui.use(['echarts'], function(){
		var $ = layui.$
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
			console.log(result)
			normline = opt_normline(field.feedbackdatestart,field.feedbackdateend,result.date1,result.y1,result.y2)
			rendernormline(0);
		});
		
		//时数折线图
		var echnormline = [], normline = []
		var elemnormline = $('#LAY-index-normline').children('div')
		var rendernormline = function(index){
		  	echnormline[index] = echarts.init(elemnormline[index], layui.echartsTheme);
		  	echnormline[index].setOption(normline[index]);
		  	window.onresize = echnormline[index].resize;
		};
		if(!elemnormline[0]) return;
		//rendernormline(0);
	});

	exports('analysis', {})
});