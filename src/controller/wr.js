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

	table.render({
		elem: '#LAY-app-wr'
		,url: setter.serverUri+'/workRecord/wr/getRecordByHandlerid'
		,headers: {"Authorization": layui.data(setter.tableName)[setter.request.tokenName]}
		,toolbar: '#LAY-app-wr-toolbar'
		,defaultToolbar: ['filter']
		,totalRow: true
		,cols: [[
			{field: 'id', width: 50, fixed: 'left', hide: true}
			,{field: 'customerid', width: 100, title: '客户id', hide: true}
			,{field: 'customername', width: 100, title: '客户', totalRowText: '合计'}
			,{field: 'number', width: 100, title: '作业编号', edit: 'text'}
			,{field: 'title', width: 100, title: '问题标题', event: 'wr_updTitle'}
			,{field: 'content', width: 150, title: '问题描述'}
			,{field: 'feedbackid', width: 80, title: '反馈人id', hide: true}
			,{field: 'feedbackname', width: 80, title: '反馈人'}
			,{field: 'feedbackdate', width: 100, title: '反馈时间'}
			,{field: 'productid', width: 90, title: '产品id', hide: true}
			,{field: 'productname', width: 90, title: '产品'}
			,{field: 'urgent', width: 80, title: '紧急', templet: '#wr-table-urgentTpl', unresize: true}
			,{field: 'issuemainid', width: 120, title: '问题分类id', hide: true}
			,{field: 'issuemainname', width: 120, title: '问题分类'}
			,{field: 'issuedetailid', width: 150, title: '问题类型id', hide: true}
			,{field: 'issuedetailname', width: 150, title: '问题类型'}
			,{field: 'handlerid', width: 80, title: '处理人id', hide: true}
			,{field: 'handlername', width: 80, title: '处理人'}
			,{field: 'handleestimatetime', width: 80, title: '预计时长', totalRow: true, edit: 'text'}
			,{field: 'handleactualtime', width: 80, title: '实际时长', totalRow: true, edit: 'text'}
			,{field: 'handlereply', width: 120, title: '处理回复'}
			,{field: 'casestatus', width: 105, title: '案件状态', templet: '#wr-table-casestatusTpl', unresize: true}
			,{field: 'onsite', width: 80, title: '现场', templet: '#wr-table-onsiteTpl', unresize: true}
			,{field: 'closetime', width: 100, title: '结案时间'}
			,{field: 'bugpeopleid', width: 80, title: '客制bug责任人id', hide: true}
			,{field: 'bugpeoplename', width: 80, title: '客制bug责任人', hide: true}
			,{field: 'mark', width: 150, title: '备注'}
			,{title: '操作', width: 90, align: 'center', fixed: 'right', toolbar: '#table-system-order'}
		]]
		,done: function (res, curr, count){
			console.log(res,curr,count)
		}
		,page: true
		,limit: 20
		,limits: [20, 40, 60, 80, 100]
		,text: {none:'暂无数据'}
		,height: 'full-200'
	});

	//头工具栏事件
	table.on('toolbar(LAY-app-wr)', function(obj){
		switch(obj.event){
			case 'wr_download_file':
				// console.log("这里是下载模板")
				var url = setter.serverUri+'/workRecord/wr/downloadRecordTemplate';
				var xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);//get请求，请求地址，是否异步
				xhr.responseType = "blob";    // 返回类型blob
				xhr.onload = function () {// 请求完成处理函数
					if (this.status === 200) {
						var blob = this.response;// 获取返回值
						var a = document.createElement('a');
						a.download = '导入excel模板.xlsx';
						a.href = window.URL.createObjectURL(blob);
						a.click();
					} else {
						layer.msg("获取文件失败，请稍后再试", {
							offset: '15px'
							,icon: 2
							,time: 2000
						});
					}
				};
				// 发送ajax请求
				xhr.send();
				break;
			case 'wr_import_data':
				console.log("这里是导入数据")
				break;
		}
	});

	upload.render({
		elem: '#wr_import_data' //绑定元素
		,url: setter.serverUri+'/workRecord/wr/importData' //上传接口
		,headers: {"Authorization": layui.data(setter.tableName)[setter.request.tokenName]}
		,accept: 'file' //允许上传的文件类型
		,exts: 'xls|xlsx'
		,before: function(obj){
			layer.load(); //上传loading
		}
		,done: function(res, index, upload){
			  //上传完毕回调
			layer.closeAll('loading');
			if(res.code == 0){
				layer.msg(res.msg, {
					offset: '15px'
					,icon: 1
					,time: 2000
				},function(){
					table.reload('LAY-app-wr',{},true)
				});
			}else{
				layer.open({
					title: "错误信息",
					content: '<p style="color:red">'+res.msg+"</p>"
				});
			}
		}
		,error: function(index, upload){
			  //请求异常回调
			layer.closeAll('loading');
			layer.msg("网络异常，请稍后再试", {
				offset: '15px'
				,icon: 2
				,time: 1000
			});
		}
	});

	//监听工具条
	table.on('tool(LAY-app-wr)', function(obj){
		var data = obj.data;
		// 问题标题
    	if(obj.event === 'wr_updTitle'){
      		layer.prompt({
        		formType: 2
        		,title: '修改 ID 为 ['+ data.id +'] 的问题标题'
        		,value: data.title
      		}, function(value, index){
        		layer.close(index);
        		//这里一般是发送修改的Ajax请求
				console.log("这里发送‘问题标题’的修改")
        		//同步更新表格和缓存对应的值
        		obj.update({
          			title: value
        		});
      		});
   		}
		if (obj.event === 'wr_del') {
			layer.confirm('将删除此条记录，确定要这么做吗？', function (index) {
				
				layer.close(index);
			});
		}
	});

	// //监听'是否紧急'操作
	// form.on('switch(wr-table-urgentI)', function(obj){
	// 	var json = JSON.parse(decodeURIComponent($(this).data('json')));
	// 	layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
	//
	// 	json = table.clearCacheKey(json);
	// 	console.log(json); //当前行数据
	// });

	exports('wr', {})
});