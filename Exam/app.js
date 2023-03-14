import myHeader from "./components/header.js";
import router from "./router/router.js";

// this.$data 부모가 가지고 있는 모든 data
let template = `
<div>
  <my-header v-bind:parentData.sync="this.$data"></my-header>
  <router-view></router-view>
</div>`;

new Vue({
  el: "#app",
  template: template,
  data: {
    dataArray: {}, // 파일에서 읽은 데이터
  },
  components: {
    "my-header": myHeader, // 공통으로 사용할 기능을 headerComponent로 이동
  },
  methods: {
    //data를 주고 받을 수 있도록 데이터 관련 함수
    getParentData: function () {
      return this.dataArray;
    },
    setParentData: function (dataList) {
      this.dataArray = dataList;
    },
  },
  router,
});
