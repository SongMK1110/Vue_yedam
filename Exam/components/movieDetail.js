export default {
  template: `<div>
                <p>제목 : {{item.movieNm}}</p>
                <ul>
                  <li>배우 : <span v-for="actor in moviedata.actors">{{actor.peopleNm}}</span></li>
                  <li>감독 :  <span v-for="director in moviedata.directors">한글 - {{director.peopleNm}} / 영문 - {{director.peopleNmEn}}</span></li>
                  <li>장르 : <span v-for="genre in moviedata.genres">{{genre.genreNm}}</span></li>
                  <li>상영 시간 : {{moviedata.showTm}} 분</li>
                </ul>
                <router-link tag="button" style="float:right;" v-bind:to="{name : 'movieList'}">목록</router-link>
            </div>`,
  props: ["item"],
  data: function () {
    return {
      moviedata: {},
    };
  },
  created: function () {
    fetch(
      "https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=" +
        this.item.movieCd
    )
      .then((res) => res.json())
      .then((data) => {
        this.moviedata = data.movieInfoResult.movieInfo;
      })
      .catch((err) => console.log(err));
  },
};
