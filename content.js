//Paid
//btn btn-lg btn-primary mt0 course-cta course-cta--add-to-cart disabled
//btn btn-lg btn-quaternary btn-block ellipsis course-cta course-cta--buy




//themoviedb.org API key with url
//https://api.themoviedb.org/3/movie/550?api_key=b9374fb215013c460e3b9ea044294aa1
//https://api.themoviedb.org/3/movie/343611?api_key={api_key}
/* {
  "poster_path": "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg",
  "adult": false,
  "overview": "Jack Reacher must uncover the truth behind a major government conspiracy in order to clear his name. On the run as a fugitive from the law, Reacher uncovers a potential secret from his past that could change his life forever.",
  "release_date": "2016-10-19",
  "genre_ids": [
    53,
    28,
    80,
    18,
    9648
  ],
  "id": 343611,
  "original_title": "Jack Reacher: Never Go Back",
  "original_language": "en",
  "title": "Jack Reacher: Never Go Back",
  "backdrop_path": "/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg",
  "popularity": 26.818468,
  "vote_count": 201,
  "video": false,
  "vote_average": 4.19
} */
function ready(callback){
    /* in case the document is already rendered*/

    if (document.readyState!='loading') callback();
    /* modern browsers*/
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
   /* IE <= 8*/
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

ready(function(){
  console.log("ready");
  //Go to course

  //Start Course
  if(window.location.pathname.includes('cart/success')){
    console.log("Success");
    window.close();
  }
  //Checkout
  else if(window.location.pathname.includes('cart/checkout')){
       var bt2 = document.querySelectorAll('button[type="submit"]')[1];
     setInterval(function(){
       bt2 = document.querySelectorAll('button[type="submit"]')[1];
       console.log(bt2);
       if(bt2.textContent == 'Enroll now') bt2.click();
      }, 3000);
   }
   //Enroll
  else if(!window.location.pathname.includes('/cart/checkout')){
      //Close window if course is paid
      if(document.querySelector('.course-cta--buy')){
        if(document.querySelector('.course-cta--buy').textContent.includes("Buy now")) window.close();
      }
      //Click on enroll now button
      if (document.querySelector('.course-cta')) {
          var btn = document.querySelector('.course-cta');
          if(btn.textContent.includes("Enroll now")) btn.click();
      }
      else if(document.querySelector('a.fasc-button')){

          var btn = document.querySelector('a.fasc-button');
          var btn_href = btn.href;
          if(btn_href.includes("udemy")){
            console.log("match");
            location.href = btn_href; //THis will open the udemy page in current page instead of new tab
          }else{
            console.log("not match");
          }
      }
  }
  //Still need to check few more cases.


});