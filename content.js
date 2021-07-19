// f80f987868b6430ebe6bbffa28d26740
// https://newsapi.org/v2/everything?q=tesla&from=2021-06-18&sortBy=publishedAt&apiKey=f80f987868b6430ebe6bbffa28d26740
let News = {
  description: "",
  image: "",
  info:"",
};
let NewsList = [];
let count = 0;
let gloabalurl ;
window.onclick=function(event){
  var  target = event.target;
  if(target.matches('.image_css')){
    window.open(gloabalurl,"blank_");
  }
}
function loadNextNews() {
  document.getElementById("content").innerHTML = NewsList[count].description;
  document.getElementById("image_").src = NewsList[count].image;
  count++;
}

function load_data() {
  
  document.getElementById("content_box").innerHTML = "<img src =\"Images/loader.gif\" style = \"height=30px;width=30px\">";


  let url = fetch(
   "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=f80f987868b6430ebe6bbffa28d26740"
  );
  url.then((data) => {
      return data.json();
    })
    .then((data) => {
      document.getElementById("content_box").innerHTML = "";
      for (let i = 0; i < data.articles.length; i++) {
        if (data.articles[i].author == null) {
          continue;
        }
        News.description = data.articles[i].description;
        News.image = data.articles[i].urlToImage;
        News.info = data.articles[i].url;
        gloabalurl = News.info;
        NewsList.push({ ...News });
      }
      let element = "<textarea readonly id = \"content\" class=\"des_css\"></textarea>";
      let element2 = `<img src =\"${News.image}\" style = \"height=30px;width=30px\" id=\"image_\" class=\"image_css\">`
      document.getElementById("content_box").innerHTML +=element2;
      document.getElementById("content_box").innerHTML +=element;
      let button = document.createElement("button");
      button.innerHTML = "Next News";
      button.className = "Next_button";
      button.onclick = loadNextNews;
      document.getElementById("content_box").appendChild(button);
      loadNextNews();
      console.log(data);
    });
}

window.onload = function () {
  load_data();
};
