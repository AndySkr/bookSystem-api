module.exports = {
	lastLearn: async (ctx, next) => {
		let resData = {
			image: "https://ict-course.ichangtou.com/goods/image/1@3x.png",
			chapterTitle: " 第四天 基金收益哪家强",
			lessonTitle: '基金训练营'
		}
		ctx.body = { code: 200, message: 'ok', data: resData }
	},
	queryCourseList: async (ctx, next) => {
		let resData = {
			list:
				[
					{
						title: "小白训练营",
						image: " https://ict-course.ichangtou.com/goods/image/100@3x.png",
						description: "小白也能看得懂的理财课",

					},
					{
						title: "基金训练营",
						image: " https://ict-course.ichangtou.com/goods/image/1@3x.png",
						description: " 四步 '简投法',带你科学养金 '基' ",
						times: '2018.10.08-2018.10.21'
					},
					{
						title: "股票进阶训练营",
						image: " https://ict-course.ichangtou.com/goods/image/11@3x.png",
						description: "投资股票,必备的个股分析知识",
						times: '2018.10.08-2018.10.21'
					},
					{
						title: "股票高级训练营",
						image: " https://ict-course.ichangtou.com/goods/image/8@3x.png",
						description: "想要超额收益的,了解一下",
						times: '2018.10.08-2018.10.21'
					},
					{
						title: "保险实战课",
						image: " https://ict-course.ichangtou.com/goods/image/25@3x.png",
						description: "意外,疾病和死亡,再也不怕",
						times: '2018.10.08-2018.10.21'
					},
					{
						title: "可转债投资课",
						image: " https://ict-course.ichangtou.com/goods/image/38@3x.png",
						description: "低风险和高收益真的可以兼得",
						times: '2018.10.08-2018.10.21'
					},
					{
						title: "股票初级训练营",
						image: " https://ict-course.ichangtou.com/goods/image/5@3x.png",
						description: "14天带你完成股票投资",
						times: '2018.10.08-2018.10.21'
					},
				]
		}
		ctx.body = { code: 200, message: 'ok', data: resData }
	}

}