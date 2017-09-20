import axios from 'axios'
import qs from 'qs'
import * as Common from '../assets/js/common'
import {
	Toast
} from 'mint-ui';

// axios 配置
axios.defaults.timeout = 60000; //一分钟
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';

//POST传参序列化
axios.interceptors.request.use((config) => {
	if(config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}, (error) => {
	Toast({
		message: '错误的传参'
	});
	return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
	if(res.data.hasError) {
		return Promise.reject(res);
	}
	return res;
}, (error) => {
	Toast({
		message: '错误的传参'
	});
	return Promise.reject(error);
});

export function post(baseURL, url, params) {
	return new Promise((resolve, reject) => {
		axios({
				method: "post",
				baseURL,
				url,
				data: params,
				headers: {
					'Content-Type': 'application/json',
					"Authorization": "bearer " + Common.getUserToken()
				}
			}).then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			});
	})
}

export function get(baseURL, url, params) {
	return new Promise((resolve, reject) => {
		axios({
				method: "get",
				baseURL,
				url,
				params,
				headers: {
					"Authorization": "bearer " + Common.getUserToken()
				}
			}).then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			});
	})
}

export default {
	/**
	 *获取首页轮播图
	 */
	GetLayoutamend(params) {
		return get(Url.api5BaseUrl, '/app/layoutamend', {
			parameters: {
				"version": "4.2.0",
				"source": "H"
			}
		});
	},

	/**
	 * 个人中心--获取个人资料
	 */
	getIndividual() {
		return get(Url.api5BaseUrl, "/member/individual/get");
	},

	/**
	 * 个人中心--获取广告信息
	 */
	getThreeAdvertisement(params) {
		return get(Url.apiCmsUrl, "/api/advertisement/position/list", params);
	},

	/**
	 * 充值--获取充值列表
	 */
	getRechargeList(params) {
		return get(Url.apiCmsUrl, "/api/recharge/list", params);
	},

	/**
	 * 充值-创建充值订单
	 */
	createOrderId(params) {
		return get(Url.api5BaseUrl, "/client/v1/order/create", params);
	},

	/**
	 * 充值--获取账户余额
	 */
	getmemberaccount() {
		return get(Url.apiCmsUrl, "/api/member/account/get");
	},

	/**
	 * 充值--获取账户明细
	 */
	getScoreList(params) {
		return get(Url.api5BaseUrl, "/member/score/change/list", params);
	},

	/**
	 * 充值--获取账户明细
	 */
	whetherPayByOrderNo(params) {
		return get(Url.api5BaseUrl, "/order/pay/WhetherPayByOrderNo", params);
	},
}