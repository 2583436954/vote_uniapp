<template>
	<view class="all">
		<view :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'" @click="goBack">
			<view :style="'top:' + demo.top + 'px'">
			
			                <view class="iconfont icon-xiaoxi"></view>
			
			            </view>
						{{'<'}} 返回
		</view>
		<view class="home">
			<swiper circular indicator-dots style="height: 500rpx;">
				<swiper-item v-for="item in result.voteImageList" class="swiperStyle" >
					<image :src="item.imgUrl" class="imageStyle" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
			<text class="flex flex-direction" style="font-size: 45rpx;">简介：{{result.briefIntroduction}}</text>
			<text class="flex flex-direction" style="font-size: 45rpx;">编号：{{result.number}}</text>
			<text class="flex flex-direction" style="font-size: 45rpx;">当前票数：{{result.sumPoll}}</text>
			<button class="buttonStyle" @click.stop="vote" :data-id=result.id> 投票 </button>
			<text class="flex flex-direction" style="font-size: 45rpx;">剩余票数：{{myData.poll}}</text>
			
			
		</view>
		
	</view>
	
</template>

<script>
	import * as http from '../../api/api.js'
	import {goVote , getActivityContentById , getVoteCustomerByOpenId} from '../../common/method.js'
	export default {
		data() {
			return {
				imageBaseUrl : http.imageBaseUrl,
				cid : '',
				result:{},
				myData:{},
				 demo: {
				
				                    top: 0,
				
				                    height: 0
				
				                }
			}
		},
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
		},
		methods: {
			goBack(){
				uni.redirectTo({
					url:'../home/home'
				})
			}
			,
			vote(e){
				var that = this;
				if(this.myData.poll <= 0){
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
			lgetVoteCustomerByOpenId(openId){
				var that = this;
				getVoteCustomerByOpenId({
					openId : openId
				},res => {
					console.log("res",res)
					that.myData = res.result;
				});
			},
			lgetActivityContentById(){
				var that = this;
				//获取当前活动
				getActivityContentById({
					id : that.cid
				},res => {
					console.log("res2",res)
					that.result = res.result;
				});
			},loading(openId){
				
				
				this.lgetVoteCustomerByOpenId(openId);
				this.lgetActivityContentById();
				
				
				
			},
		},
		onShow() {
			console.log("myself onload"+this.cid)
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
		onLoad(options) {
			console.log("myself onload"+options.id)
			this.cid = options.id;
		},
		onBackPress(event) {
			return true;
		}
	}
</script>

<style lang="scss">
	.all{
			width: 750rpx;
			background-color: #EEEEEE;
		}
	.home{
		margin-top: 75rpx;
		
	}
	.swiperStyle{
		display: flex;
		 align-items: center; 
		justify-content: center;
	}
	.imageStyle{
		height: 490rpx;
	}
	.buttonStyle{
		margin-top: 75rpx;
		width: 200rpx;
		border-radius: 500rpx;
	}
	.briefIntroduction{
		display: inline-block;
		width: 375rpx;
		height: 50rpx;
	}
	.demo{
	
	        position: relative;
	
	        display: flex;
	
	        align-items: center;
	
	        justify-content: center;
	
	        background: #fff;
	
	        font-size: 26rpx;
	
	        .left{
	
	            float: left;
	
	            position: absolute;
	
	            width: max-content;
	
	            height: max-content;
	
	            top: 0;
	
	            bottom: 0;
	
	            left: 20rpx;
	
	            margin: auto;
	
	            .iconfont{
	
	                color: #3C3C3C;
	
	            }
	
	        }
	
	    }
</style>
