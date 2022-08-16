import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
export const apiBaseUrl = 'https://www.wmc0512.top/'
//export const apiBaseUrl = 'http://192.168.74.1:8080/';
export const imageBaseUrl = "http://101.43.12.227:8090/";
const noToken = ['applet/login/customerWxLogin','/applet/activity/getMessageByOpenId']
const apiService = {
	 
	 /**
	  * 登录
	  */
	login(params) {
		return http.post('/sys/mLogin',params)	
	},
	/**
	  * 手机号码登录
	  */
	phoneNoLogin(params) {
		return http.post('/sys/phoneLogin',params);
	},
	/**
	  * 退出
	  */
	logout(params) {
		return http.post('/sys/logout',params);
	},
	/**
	 * 获取文件访问路径
	 * @param avatar
	 * @param subStr
	 * @returns {*}
	 */
	getFileAccessHttpUrl(avatar,subStr){
	    if(!subStr) subStr = 'http'
	    if(avatar && avatar.startsWith(subStr)){
	        return avatar;
	    }else{
	        return configService.staticDomainURL + "/" + avatar;
	    }
	}
};

export const request = (method, methodType, data, callback, hideLoading) => {
	console.log(method)
	// 请求头信息
	var headers = {
		'content-type': 'application/x-www-form-urlencoded'
	};
	
	
	
	// 如果调用接口不明确不显示 loading
	if (!hideLoading) {
		uni.showLoading({
			title: '加载中'
		});
	}
	uni.request({
		url: apiBaseUrl + method,
		data: data,
		header: headers,
		method: methodType,
		success: (response) => {
			if (!hideLoading) {
				uni.hideLoading();
			}
			console.log(response.data)
			const result = response.data
			if (result.code == 500) {
				setTimeout(() => {
					uni.showToast({
						icon: 'none',
						title: result.message,
						duration: 1500,
						position: 'bottom'
					})
				}, 500);
			} else {
				console.log(result)
				callback(result)
			}
		},
		complete: () => {
			uni.hideLoading();
		}
	})
}

// 微信登录
export const fabricWxLogin = (data, callback, hideLoading) => request('applet/login/customerWxLogin', 'POST', data, callback, hideLoading);

// 添加陌拜客户信息
export const coldCustomerInfo = (data, callback, hideLoading) => request('sales/applets/fabricColdCustomerInfo/appletsAdd', 'POST', data, callback, hideLoading);

// 数据字典
export const getDictItems = (data, callback, hideLoading) => {
	let url = 'sys/dict/getDictItems/' + data.dictCode
	return request(url, 'GET', null, callback, hideLoading);

}

// 校验登录状态
export const checkLogin = (data, callback, hideLoading) => request('sys/checkLogin', 'GET', data, callback, hideLoading)

// 添加完陌拜客户信息 手机号登录
export const loginByPhone = (data, callback, hideLoading) => request('sys/customWxLoginByPhone', 'POST', data, callback, hideLoading)

export const requestJSON = (method, methodType, data, callback, hideLoading) => {
	console.log(method)
	// 请求头信息
	var headers = {
		'content-type': 'application/json'
	};
	
	
	
	// 如果调用接口不明确不显示 loading
	if (!hideLoading) {
		uni.showLoading({
			title: '加载中'
		});
	}
	uni.request({
		url: apiBaseUrl + method,
		data: JSON.stringify(data),
		header: headers,
		method: methodType,
		success: (response) => {
			if (!hideLoading) {
				uni.hideLoading();
			}
			console.log(response.data)
			const result = response.data
			if (result.code == 500) {
				setTimeout(() => {
					uni.showToast({
						icon: 'none',
						title: result.message,
						duration: 1500,
						position: 'bottom'
					})
				}, 500);
			} else {
				console.log(result)
				callback(result)
			}
		},
		complete: () => {
			uni.hideLoading();
		}
	})
}

export default apiService;
