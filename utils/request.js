
const baseUrl = 'https://tea.qingnian8.com/api/bizhi'

export const request = (config) => {
	return new Promise((resolve, reject) => {
		const {url, methed = 'GET', header = {}, data = {}} = config
		uni.request({
			url: baseUrl + url,
			data,
			header:{
				'access-key': 'geekpai',
				...header,
			},
			success(res) {
				if (res.data.errCode === 0 ) {
					resolve(res.data)	
				} else if (res.data.errCode === 404) {
					uni.showModal({
						title: '请求错误',
						content: res.data.errMsg,
						showCancel: false
					})
					reject(res.data)
				} else {
					uni.showModal({
						content: res.data.errMsg,
						icon: 'none'
					})
					reject(res.data)
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
