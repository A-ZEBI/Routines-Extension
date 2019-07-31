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

      if (document.querySelector('a.course-cta')) {
          document.querySelector('a.course-cta').click();
      }
      else if(document.querySelector('a.fasc-button')){

          var btn = document.querySelector('a.fasc-button');
          var btn_href = btn.href;
          if(btn_href.includes("udemy")){
            console.log("match");
            document.querySelector('a.fasc-button').click();
          }else{
            console.log("not match");
          } 
      }
  }
  //Still need to check few more cases.


});