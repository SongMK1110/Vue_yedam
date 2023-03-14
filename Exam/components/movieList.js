export default {
  template: `<div>
                <table id="list">
                    <!-- HEADER -->
                    <tr>
                        <th>순위</th>
                        <th>영화 제목</th>
                        <th>누적 관객수</th>
                        <th>개봉 날짜</th>
                        <th></th>
                    </tr>
                    <!-- DATA LIST -->
                    <tr v-for="item in object" v-bind:key="item.rnum">
                        <td>{{ item.rank }}</td>
                        <router-link tag="td" v-bind:to="{name : 'movieDetail', params : {'item' : item}}">{{item.movieNm}}</router-link>
                        <td>{{ item.audiAcc }}</td>
                        <td>{{ item.openDt}}</td>
                        <td><button v-on:click="movieDelete(item.rnum)">삭제</button></td>
                    </tr>
                </table>
            </div>`,
  data: function () {
    return {
      object: [],
    };
  },
  //컴포넌트가 생성 될 때, 부모 컴포넌트의 데이터를 얻어 온다
  // boardList Reading
  created: function () {
    this.object = this.$parent.getParentData();
  },
  methods: {
    movieDelete: function (rnum) {
      for (let i = 0; i < this.object.length; i++) {
        if (this.object[i].rnum == rnum) {
          this.object.splice(i, 1);
        }
      }

      this.$parent.setParentData(this.object);
    },
  },
};
