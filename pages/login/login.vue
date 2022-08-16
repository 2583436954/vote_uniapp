  <template>
	  <!-- 登录 -->
	  <view class="container">
	  	<image class="logoImg" :src="src" ></image>
	  	<view class="logoSize">投票系统</view>
	  	<!-- v-show="!user_id" -->
	  	<button v-show="!user_info_flag" shape="circle" class="loginButton" 
	  	 @click="getUserInfo">微信一键登录/注册</button>
	  	<button v-show="user_info_flag" open-type='getUserProfile' shape="circle" class="loginButton"
	  	@click="getUserProfile">用户信息授权</button>
	
	  	<view class="text">
	  		<view class="textSize">
	  			小程序用于客户投票使用
	  		</view>
	  	
	  	</view>
	  </view>
	<!-- <view class="zai-box all">
		
		
		<text class="textStyle">{{activityName}}</text>
		<button v-show="!user_info_flag"  open-type='getUserInfo'  class="loginButton"
		@getuserinfo="getUserInfo">微信一键登录</button>
		<button v-show="user_info_flag" open-type='getUserProfile' shape="circle" class="loginButton"
		getUserProfile="getUserProfile">用户信息授权</button>
		
		<!-- <view>仅限布料易内部用户使用</view> -->
        
		<!-- 登录加载弹窗 
		<view class="cu-load load-modal" v-if="loading">
			 <view class="cuIcon-emojifill text-orange"></view>
			<image src="https://static.jeecg.com/upload/test/login4_1595818039175.png" mode="aspectFit" class="round"></image>
			<view class="gray-text">登录中...</view>
		</view>
    </view> -->

</template>

<script>
	import { ACCESS_TOKEN,USER_NAME,USER_INFO } from "@/common/util/constants";
	import { mapActions } from "vuex";
    import configService from '@/common/service/config.service.js';
	import * as http from '../../api/api.js';
	
    export default {
        data() {
            return {
				user_info_flag: false,
				code:'',
				loading:false,
				activityName:"2022年度最帅小学生投票系统"
            };
        },
		onShow() {
			//此处发布时要删除掉
			/* let openId = uni.getStorageSync("openId");
			if(openId.length > 0){
				//进入首页
				uni.redirectTo({
					url: '/pages/home/home'
				})
			} */
			let that = this;
			console.log("onshow")
			uni.login({
				provider: 'weixin',
				success:function(e){
					that.code = e.code;
					console.log("获取code信息"+e.code)
				}
			})
		},
		onLoad:function(){
			
		},
		computed: {
		      
		},
        methods: {
			
			onLogin: function (){
			        
			},
			requestFailed(err) {
			  this.$message.warning("登录失败")
			},
			getUserInfo(e) {
				let that = this;
				
				console.log("获取信息之前")
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						that.loading = true;
						that.code = loginRes.code;
						console.log("获取code信息"+loginRes.code)
					},
					fail(e) {
						console.log('调微信登录失败', e)
					}
				});
				/* uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						that.loading = true;
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes) => {
								that.loading = false;
								uni.setStorageSync("userInfo", infoRes.userInfo)
								
								console.log("信息",infoRes.userInfo)
								
							},
							fail(e) {
								that.loading = false;
								console.log('获取信息失败', e)
							}
						});
					},
					fail(e) {
						console.log('调微信登录失败', e)
					}
				}); */
				http.fabricWxLogin({
					'code':that.code
					
				},res=>{
					uni.setStorageSync("openId",res.result)
					console.log("返回信息"+res.result)
					console.log("返回code"+res.code)
					that.user_info_flag = !that.user_info_flag;
					//进入首页
					that.loading = false;
					
				})
			},getUserProfile(){
				var that = this;
				uni.getUserProfile ({
					lang: 'zh_CN',
					desc: '用户登录',
					success: (infoRes) => {
						that.loading = false;
						uni.setStorageSync("userInfo", infoRes.userInfo)
						
						console.log("信息",infoRes.userInfo)
						uni.redirectTo({
							url: '/pages/home/home'
						}) 
						
					},
					fail(e) {
						that.loading = false;
						console.log('获取信息失败', e)
					}
				});
			}
        },
		
    }
</script>

<style lang="scss">
   page{
   	background-color: #fff;
   }
   
   .container {
   	top: 0;
   	padding-top: 94px;
   	position: relative;
   	width: 100%;
   	text-align: center;
   	.logoSize{
   		font-size: 50rpx;
   		font-weight: bold;
   		&:last-child{
   			font-size: 30rpx;
   			margin-top: 20rpx;
   		}
   	}
   	.logoImg {
   		width: 200rpx;
   		height: 200rpx;
   		border-radius: 16rpx;
   	}
   	.loginButton {
   		margin-top: 19%;
   		width: 80%;
   		background-color: #333;
   		color: #fff;
   	}
   }
   .text{
   	width: 80%;
   	height: 30rpx;
   	text-align: center;
   	margin: 100rpx auto;
   	color: #bcbcbc;
   	.textSize{
   		font-size: 28rpx;
   	}
   }
    /* .zai-box {
        padding: 0 20upx;
        padding-top: 100upx;
        position: relative;
    }
	
	.text{
		width: 80%;
		height: 30rpx;
		text-align: center;
		margin: 100rpx auto;
		color: #bcbcbc;
		
	}
	.all{
		width: 750rpx;
		background-color: #EBD4EF;
		height: 1500rpx;
	}
	.loginButton{
		margin-top: 300rpx;
		background-color: #007AFF;
		color:#DDDDDD;
	}
	.textStyle{
		margin-top: 300rpx;
		display: flex;
		 align-items: center; 
		justify-content: center;
		color: #A5673F;
		font-size: 50rpx;
	}
	.loginButton {
		margin-top: 19%;
		width: 80%;
		background-color: #333;
		color: #fff;
	} */

</style>
