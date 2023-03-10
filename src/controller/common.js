/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */

layui.define(function(exports){
	let $ = layui.$
		,layer = layui.layer
		,laytpl = layui.laytpl
		,setter = layui.setter
		,view = layui.view
		,admin = layui.admin

	//公共业务的逻辑处理可以写在此处，切换任何页面都会执行
	//……

	Date.prototype.Format = function (fmt) { // author: meizz
		var o = {
			"M+": this.getMonth() + 1, // 月份
			"d+": this.getDate(), // 日
			"h+": this.getHours(), // 小时
			"m+": this.getMinutes(), // 分
			"s+": this.getSeconds(), // 秒
			"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
			"S": this.getMilliseconds() // 毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	//退出
	admin.events.logout = function(){
		//执行退出接口
		admin.req({
			url: './json/user/logout.json'
			,type: 'get'
			,data: {}
			,done: function(res){ //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行

				//清空本地记录的 token，并跳转到登入页
				admin.exit();
			}
		});
	};


	//对外暴露的接口
	exports('common', {});
});