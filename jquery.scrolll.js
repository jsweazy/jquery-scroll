(function($){
  $.extend({
    scrolll: function(item,duration) {      
      if(duration) {
        scrollToItem(item,duration);
      } else {
        scrollToItem(item,1000);
      }
    }
  });
  $.fn.extend({ 
    scrolll: function(options) {
      //Set defaults all are optional
      var defaults = {
        duration: 1000, //the duration of the scroll
        scrollToTop: true, //creates scroll to top item when true
        appendScrollTo: 'body', //item to append Scroll to top item
        scrollToTopText: 'Top', //Text in Scroll to top item
        scrollToTopStart: 50, //pixels from top where scroll to top will unhide. Set to 0 to always show
        fadeInDuration: 100, //duration of the fading in of scroll to top
        fadeOutDuration: 0 //duration of the fading out of scroll to top
      }
      
      var options =  $.extend(defaults, options);
            
      return this.each(function() {
        var o = options;
        var $el = $(this);
        var l = $el.attr('href')
        
        //if scroll to top create item & functionality
        if(o.scrollToTop) {
          $(o.appendScrollTo).append('<div class="scroll-to-top-wrap"><div class="scroll-to-top-icon">^</div><!-- .scroll-to-top-icon --><div class="scroll-to-top-text"></div><!-- .scroll-to-top-text -->'+o.scrollToTopText+'</div><!-- .scroll-to-top -->');
          var $si = $('.scroll-to-top-wrap');
          $si.click(function(){
            scrollToItem(0,o.duration);
          });
          $si.hide()
          $(window).scroll(function() {
            if(!o.scrollToTopStart) {
              $si.fadeIn(o.fadeInDuration);
            } else {
              if($(document).scrollTop() > o.scrollToTopStart) {
                $si.fadeIn(o.fadeInDuration);
              } else {
                $si.fadeOut(o.fadeOutDuration);
              }
            }
          })
        }
        $el.click(function(){
          scrollToItem(l,o.duration);
          return false;
        });
        
      });
    }
  });
  function scrollToItem(item, duration) {
    //if string get offset
    if(typeof item == 'string') {
      var item = $(item).offset().top;
    }      
    $('body,html').animate({ scrollTop: item }, duration);
  }
})(jQuery);