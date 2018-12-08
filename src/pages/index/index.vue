<template>
  <div>
    <view class="user-box">
      <image class="mine-bg" src="/static/images/mine-bg.png" />
      <view class="user-content"  v-if="userInfo.avatarUrl">
        <image class="avatar" :src="userInfo.avatarUrl"/>
        <view class="info">
          <text class="name">{{ userInfo.nickName }}</text>
        </view>
      </view>
      <view class="user-content" v-else>
        <button class="default" plain open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
          <image src="/static/images/user-default.png" />
        </button>
        <button class="info" plain open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
          <view class="tip">点击注册/登陆</view>
          <view class="more">登陆了解更多内容</view>
        </button>
      </view>
    </view>
    <i-panel>
      <i-input :value=name title="姓名" autofocus placeholder="请输入姓名" />
      <i-input :value=idCardNum title="身份证" autofocus placeholder="请输入18位身份证号" />
      <i-button @click="handleClick">确认</i-button>
    </i-panel>
  </div>
</template>

<script>
  var app = getApp()

  export default {
    data () {
      return {
        userInfo: {},
        name: '',
        idCardNum: '',
      }
    },
    methods: {
      onGotUserInfo (e) {
        this.userInfo = e.mp.detail.userInfo || {}
        app.globalData.userInfo = e.mp.detail.userInfo || {}
        console.log(app.globalData.userInfo)
        var that = this
        this.store()

        wx.login({
          success: res => {
            // var url = "http://127.0.0.1:5000/login/"+res.code
            // var url = "http://192.168.1.90:5000/login/"+res.code
            var url = "https://wp.threetun.cn/login/getCode2Session?code=" + res.code +
              "&encryptedData=" + e.mp.detail.encryptedData +
              "&iv=" + e.mp.detail.iv
            wx.request({
              url: url,
              data: null,
              method: 'GET',
              success: function (res) {
                if (res.data.result.code == 200) {
                  app.globalData.userInfo.userId = res.data.result.data.userId
                  that.store()
                }
              }
            })
          }
        })
      },

      store() {
        wx.setStorageSync('userInfo',app.globalData.userInfo)
      },
      handleClick () {
        wx.navigateTo({
          url: `/pages/role/main`,
        })
      },
      handleClick (e) {
        wx.navigateTo({
          url: `/pages/role/main`,
        })
      },
    },
    onLoad (option) {
      this.userInfo = app.globalData.userInfo || {}
    },
  }
</script>

<style lang="scss" scoped>
  .authentication-info{
    position: relative;
    background: #ffffff;
    box-shadow: 0 1px .16rem 0 rgba(197,197,197,0.4);
    border-radius: .1rem;
    padding: 0 .24rem;
    .mint-cell {
      height: .86rem;
      min-height: .86rem!important;
    }
    .mint-field-core {
      text-align: left;
    }
    .sex {
      font-size: .24rem;
      height: .86rem;
      line-height: .86rem;
      border-bottom: 1px solid #e5e5e5;
      .setItem {
        height: .38rem;
        line-height: .38rem;
        &.active {
          padding: 0 .34rem;
        }
      }
    }
    .role {
      font-size: .24rem;
      height: 1.37rem;
      line-height: 1.37rem;
    }
    .setItem {
      display: inline-block;
      color: #36C2EA;
      font-size: .22rem;
      padding: 0 .32rem;
      height: .46rem;
      line-height: .46rem;
      border-radius: .23rem;
      border: .02rem solid #36C1EA;
      &:last-child {
        margin-left: .38rem;
      }
      &.active {
        color: #fff;
        border: none;
        padding: 0 .32rem;
        background: linear-gradient(90deg,rgba(80,120,210,1) 0%,rgba(46,213,240,1) 100%);
        box-shadow: 0 .03rem .13rem 0 rgba(44,132,194,0.4);
      }
    }
    .phone .mint-field-core {

      width: 1rem;
      flex: 3;
    }
    .phone .mint-field-other {
      flex: 1;
    }
    .verifycode .mint-field-core {
      border-right: 1px solid rgba(0,0,0,.2);
    }
    .get-verifycode {
      width: 2rem;
      line-height: .86rem;
      text-align: center;
    }
  }
  .confirm-btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 2.7rem;
    width: 3rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .52rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background: linear-gradient(90deg,rgba(80,120,210,1) 0%,rgba(46,213,240,1) 100%);
    box-shadow: 0 .08rem .29rem 0 rgba(44,132,194,0.4);
    border-radius: .6rem;
  }
  .message {
    color: red;
    padding: 10px;
    text-align: center;
  }
  .user-box {
    position: relative;
    width: 100%;
    height: 300rpx;
    border-radius: 10rpx;
    overflow: hidden;
    box-shadow: 0 5rpx 27rpx 0 rgba(78,153,206,0.4);
    .mine-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
      z-index: -1;
    }
    .user-content {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .avatar {
      width: 120rpx;
      height: 120rpx;
      margin: 24rpx 0;
      background: #FFFFFF;
      border-radius: 50%;
      overflow: hidden;
    }
    .default {
      width: 120rpx;
      height: 120rpx;
      margin: 24rpx 0;
      padding: 0;
      background: #FFFFFF;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      image {
        width: 62rpx;
        height: 67rpx;
      }
    }
    .info {
      border: none;
      padding: 0;
      color: #F8F8F8;
      .tip {
        font-size: 32rpx;
        line-height: 1;
        font-weight: bold;
      }
      .more {
        margin-top: 24rpx;
        font-size: 22rpx;
      }
    }
  }



</style>
