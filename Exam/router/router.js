import main from "../components/main.js";
import movieList from "../components/movieList.js";
import movieDetail from "../components/movieDetail.js";

export default new VueRouter({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: main,
    },
    //movieList
    {
      path: "/movieList",
      name: "movieList",
      component: movieList,
    },
    //movieDetail
    {
      path: "/movieDetail/:item",
      name: "movieDetail",
      component: movieDetail,
      props: true, // 부모의 모든 데이터 가져온다
    },
  ],
});
