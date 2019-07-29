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
      document.querySelector('a.course-cta').click();
  }
  //Still need to check few more cases.


});