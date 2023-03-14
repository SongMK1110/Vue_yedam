<template>
  <div>
    <button type="button" @click="getData">데이터 출력</button>
    <table>
      <thead>
        <tr>
          <th>지역</th>
          <th>미세먼지 농도/대기질</th>
          <th>초미세먼지 농도/대기질</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.idx" v-for="item in seoulArray">
          <td>{{ item.MSRSTE_NM }}</td>
          <td>{{ item.PM10 }}/{{ item.state }}</td>
          <td>{{ item.PM25 }}/{{ item.state1 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seoulArray: {},
    };
  },
  methods: {
    getData() {
      fetch(
        "https://cors-anywhere.herokuapp.com/http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/RealtimeCityAir/1/99"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.seoulArray = data.RealtimeCityAir.row;
          for (let i = 0; i < this.seoulArray.length; i++) {
            if (this.seoulArray[i].PM10 > 100) {
              this.seoulArray[i].state = "나쁨";
            } else {
              this.seoulArray[i].state = "좋음";
            }

            if (this.seoulArray[i].PM25 > 35) {
              this.seoulArray[i].state1 = "나쁨";
            } else {
              this.seoulArray[i].state1 = "좋음";
            }
          }
          console.log(this.seoulArray);
        });
    },
  },
};
</script>
