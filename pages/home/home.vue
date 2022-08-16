<template>
	<view class="all">
		<view class="title2" >
			当前票数:{{voteCustomer.poll}}
		</view>
		<view class="title">
			活动主题：{{voteActivityThemeVo.activityName}}
		</view>
		<view class="box" v-for="(item,index) in voteActivityThemeVo.voteActivityContentList" @click.stop="toShowMySelf" :data-pid=item.id>
			<image class="image" v-bind:src="item.voteImageList.length > 0 ?item.voteImageList[0].imgUrl : imageBaseUrl +  defaultUrl" ></image>
			<text class="briefIntroduction">简介：{{item.briefIntroduction.length > 8 ? item.briefIntroduction.substring(0,8)+"...":item.briefIntroduction}}</text>
			<text class="briefIntroduction">编号 : {{item.number}}</text>
			<text class="briefIntroduction">目前票数 : {{item.sumPoll}}</text>
			<button class="buttonStyle" @click.stop="vote" :data-id=item.id> 投票 </button>
		</view>
	</view>
	
</template>

<script>
	import * as http from '../../api/api.js';
	import {getMessageByOpenId,goVote} from '../../common/method.js' 
	export default {
		
		data() {
			return {
				openId:'',
				imageBaseUrl : http.imageBaseUrl,
				defaultUrl:'image/wmc1638774545017752045S01mpBqzl3GY25542c511f663a2f5042db777efa09b3.png',
				voteCustomer:{},
				voteActivityThemeVo:{}
				
			}
		},
		methods: {
			vote(e){
				var that = this;
				if(this.voteCustomer.poll <= 0){
					uni.showToast({
						icon: 'none',
						title: '票数不足',
						duration: 1500,
						position: 'bottom'
					})
				}
				console.log(e.currentTarget.dataset.id);
				var cid = e.currentTarget.dataset.id;
				goVote({
					openId:that.openId,
					activityContentId:cid
				},res=>{
					if(res.success){
						uni.showToast({
							title: '投票成功',
							icon: "success",
							mask: true,
							duration: 1000
						})
						this.loading(that.openId);
					}
					
				})
				
			},
			loading(openId){
				var that = this;
				getMessageByOpenId({
					'openId':openId
				},res=>{
					that.voteCustomer = res.result.voteCustomer;
					that.voteActivityThemeVo = res.result.voteActivityThemeVo;
				})
			},
			toShowMySelf(e){
				console.log("eid",e.currentTarget.dataset.pid)
				let pid = e.currentTarget.dataset.pid;
				uni.navigateTo({
					url:'../showMySelf/showMySelf?id='+pid
				})
			}
		},
		onShow(){
			
			var that = this
			//先去查看是否登录
			const openId = uni.getStorageSync("openId");
			this.openId = openId;
			console.log("openId",openId)
			if(openId == undefined || openId === ''){
				uni.redirectTo({
					url:'../login/login'
				})
			}
			console.log("调用getMessageByOpenId接口")
			this.loading(openId);
		},
		onLoad() {
			console.log("onload")
		}
		
	}
</script>

<style>
	.all{
		width: 750rpx;
		background-color: #EDE1D9;
		
	},
	.title{
		color: #ED1C24;
		width: 100%;
		height: 100rpx;
		font-size: 30;
		display: flex;
		align-items: center;
		justify-content: center;
	},
	.title2{
		margin-top: 50rpx;
		color: #ED1C24;
		width: 100%;
		height: 50rpx;
		font-size: 30;
		display: flex;
		align-items: center;
		justify-content: center;
	},
	.box{
		width: 375rpx;
		background-color: #CCE6FF;
		height:600rpx;
		border-style: solid;
		border-color: #AAAAAA;
		/* float: left;
		 */
		display: inline-block;
		
	}
	.image{
		margin-left: 50rpx;
		display: flex;
		 align-items: center; 
		justify-content: center;
		width: 275rpx;
		height:275rpx;
		border-radius: 200rpx;
	}
	.briefIntroduction{
		display: inline-block;
		width: 375rpx;
		height: 50rpx;
	}
	.buttonStyle{
		width: 200rpx;
		border-radius: 200rpx;
	}
	
</style>
