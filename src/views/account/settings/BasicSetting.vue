<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <!--<a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>
    </a-list-item>-->
    <a-list-item>
      <div class="user-info-title">旧密码:</div>
      <div style="position: absolute; top: 0px; left:80px;">
        <a-input-password v-model="pass" allowClear style="width: 200px;"></a-input-password>
      </div>
    </a-list-item>
    <a-list-item>
      <div class="user-info-title">新密码:</div>
      <div style="position: absolute; top: 52px; left:80px;">
        <a-input-password v-model="newPass" allowClear style="width: 200px;"></a-input-password>
      </div>
    </a-list-item>
    <a-list-item>
      <div class="user-info-title">确认密码:</div>
      <div style="position: absolute; top: 104px; left:80px;">
        <a-input-password v-model="confirmPass" allowClear style="width: 200px;"></a-input-password>
      </div>
    </a-list-item>
    <a-list-item>
      <a-button type="danger" @click="updateUserPassword">确认更改</a-button>
    </a-list-item>
  </a-list>
</template>

<script>
import { updateUserPassword } from '@/api/user'
import md5 from 'md5'
import user from '@/store/modules/user.js'
import { notification } from 'ant-design-vue'

export default {
  data () {
    return {
      pass: '',
      newPass: '',
      confirmPass: ''
    }
  },
  mounted () {
    console.log('firmId', user.state.firmId)
  },
  methods: {
    updateUserPassword () {
      console.log('firmId', user.state.firmId)
      if (this.newPass === this.confirmPass) {
        updateUserPassword(user.state.firmId, md5(this.pass), md5(this.newPass)).then(res => {
          console.log('res', res.data)
          if (res.code === 2004) {
            notification.success({
              message: 'SUCCESS',
              description: '密码更新成功'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        alert('两次密码不一致')
      }
    }
  }
}
/* computed: {
  data () {
    return  [
        // { title: this.$t('account.settings.security.password'), description: this.$t('account.settings.security.password-description'), value: '强', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.$message.info('This is a normal message') } } },
        // { title: this.$t('account.settings.security.phone'), description: this.$t('account.settings.security.phone-description'), value: '138****8293', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.$message.success('This is a message of success') } } },
        // { title: this.$t('account.settings.security.question'), description: this.$t('account.settings.security.question-description'), value: '', actions: { title: this.$t('account.settings.security.set'), callback: () => { this.$message.error('This is a message of error') } } }
        // { title: this.$t('account.settings.security.email'), description: this.$t('account.settings.security.email-description'), value: 'ant***sign.com', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.$message.warning('This is message of warning') } } },
        // { title: this.$t('account.settings.security.mfa'), description: this.$t('account.settings.security.mfa-description'), value: '', actions: { title: this.$t('account.settings.security.bind'), callback: () => { this.$message.info('This is a normal message') } } }
      ]
  }
  }
} */
</script>

<style lang="less" scoped>
.user-info{
  width: 100%;
  position: absolute;
  left: 30px;
}
.user-info-item{
  height: 80px; line-height: 80px;
  position: absolute;
}

.user-info-title{
  width: 70px;
  font-weight: bold;
  //background-color: lightyellow;
}
</style>

<!--<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item
            :label="$t('account.settings.basic.nickname')"
          >
            <a-input :placeholder="$t('account.settings.basic.nickname-message')" />
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.profile')"
          >
            <a-textarea rows="4" :placeholder="$t('account.settings.basic.profile-message')"/>
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.email')"
            :required="false"
          >
            <a-input placeholder="example@ant.design"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary">{{ $t('account.settings.basic.update') }}</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      // cropper
      firmInfo: [],
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  methods: {
    setavatar (url) {
      this.option.img = url
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>-->
