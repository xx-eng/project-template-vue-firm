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

export default {
  data () {
    return {
      pass: '',
      newPass: '',
      confirmPass: ''
    }
  },
  methods: {
    updateUserPassword () {
      console.log('updatePassword')
      if (this.newPass === this.confirmPass) {
        updateUserPassword(20213000001, md5(this.pass), md5(this.newPass)).then(res => {
          console.log('res', res.data)
          if (res.code === 2004) {
            alert('更改成功！')
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
