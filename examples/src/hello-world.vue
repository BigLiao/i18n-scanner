<template>
  <div>
    <div>{{$t('你好世界')}}</div>
    <div>{{$t('Hello world')}}</div>
  </div>
</template>

<script>
export default {
  name: 'hello world',
  data() {
    return {
      message: this.$t('自动扫描代码')
    };
  },
  methods: {
    init() {
      return this.$t('并提取 i18n 文件');
    }
  }
}
</script>
