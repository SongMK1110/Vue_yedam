export default {
  template: `
  <header>
    <p>영화 검색 사이트</p>
    <p>영화 검색 (오늘 날짜 : {{day}} )</p>
    <input type="date" v-model="date">
    <button @click="loadData">검색</button>
  </header>
  `,
  props: ["parentData"],
  data() {
    return {
      date: "",
      day: this.today(),
    };
  },
  methods: {
    loadData: function () {
      if (this.date == "") {
        alert("날짜 입력 해주세요");
        return;
      }
      let date1 = this.date.replace(/\-/g, "");
      if (date1 >= this.today1()) {
        alert("이전 날짜 입력해주세요");
        return;
      }
      let date = this.date.split("-");
      fetch(
        "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=" +
          date[0] +
          date[1] +
          date[2]
      )
        .then((res) => res.json())
        .then((data) => {
          let moviedata = data.boxOfficeResult.dailyBoxOfficeList;
          // console.log(moviedata);
          // this.movieArray = moviedata;
          // console.log(this.movieArray);
          this.parentData.dataArray = moviedata;
          this.$emit("update:parentData", this.parentData);
          this.$router.push({ name: "movieList" });
        })
        .catch((err) => console.log(err));
    },
    today: function () {
      let today = new Date();

      let year = today.getFullYear();
      let month = ("" + (today.getMonth() + 1)).slice(-2);
      let day = ("0" + today.getDate()).slice(-2);

      return year + " 년 " + month + " 월 " + day + " 일 ";
    },
    today1: function () {
      let today = new Date();

      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let day = ("0" + today.getDate()).slice(-2);

      return year + month + day;
    },
  },
};
