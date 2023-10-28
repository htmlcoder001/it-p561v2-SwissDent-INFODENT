(function ($, Drupal, drupalSettings) {
// Aggiungo la classe pagina-contatti al blocco della pagina contatti, in modo da mettere la larghezza del messaggio di conferma al 100%
if (window.location.href.indexOf("contatti") > 0) {
    $('.region-full-content').addClass('pagina-contatti');
}
  /**
  * Custom function to create div clickable to play YTVideos
  */
  function createDivVideos(elements){
    $(elements).each(function( index ) {
      $(this).addClass('psuodo-element');
      if (!$(this).find('.my-div').length) {
        let newDiv = $(this).append('<div class="my-div"></div>');
        newDiv.on('click', function(){
              const iframeElement = $(this).find('iframe').get(0);
              const src = iframeElement.getAttribute('src');
              let newSrc = src.replace('autoplay=0', 'autoplay=1').replace('start=0', 'start=1') + '&mute=1';;
              iframeElement.setAttribute('src', newSrc);
              $(this).removeClass('psuodo-element');
              let nnn = $(this).find('.my-div').remove();
            });
          }
        });
      }

  /**
   * Custom function to create div clickable to play NOT YTVideos
   * @param element
   */
  function createDivNotYT(elements){
    $(elements).each(function( index ) {
      $(this).addClass('psuodo-element');
      let newDiv = $(this).append('<div class="my-div"></div>');
    });
  }

  /**
   * UI for Page single focus page(video slider)
   */
  if($('.slide__media .video-embed-field-provider-youtube iframe').length){
    $( document ).ajaxComplete(function() {
      $('.slide__media .video-embed-field-provider-youtube iframe').each(function( index ) {
        createDivVideos($(this).parent().parent());
      });
    });
  }


  /**
   * UI for Page single video from YT
   */
  if($('.view .views-field-field-video-url iframe').length){
    $( document ).ajaxComplete(function() {
      $('.view .views-field-field-video-url iframe').each(function( index ) {
        createDivVideos($(this).parent().parent().parent());
      });
    });
  }

  /**
   * UI for videos loaded not from youtube
   */
  if($('.view .views-field-field-media-video-file video').length){
    $('.view .views-field-field-media-video-file video').each(function( index ) {
      createDivNotYT($(this).parent());
    });
    $('.view .views-field-field-media-video-file .my-div').click(function(){
      $(this).siblings('video').trigger('play');
      $('.view .views-field-field-media-video-file .field-content').removeClass('psuodo-element');
      $(this).hide();
    });
  }

  $(document).ready(function() {
    setTimeout(function() {
        // Funzione che aggiunge pulsante "pulisci filtri" ai filtri della pagina eventi ed annunci
        // Eventi
        $('#edit-submit-hub-eventi').click(function(){
            if ($('#views-exposed-form-hub-eventi-block-1').find('.clean-filter-btn').length == 0) {
                $('#views-exposed-form-hub-eventi-block-1 .form--inline').append('<a class="clean-filter-btn button js-form-submit form-submit btn btn-primary" href="/eventi">Ripulisci filtri</a>');
            }
        })
        if (window.matchMedia('(max-width: 991px)').matches) {
            if (window.location.href.indexOf("data_inizio_evento") > 0) {
                if ($('#views-exposed-form-hub-eventi-block-1').find('.clean-filter-btn').length == 0) {
                    $('#views-exposed-form-hub-eventi-block-1 .form--inline').append('<a class="clean-filter-btn button js-form-submit form-submit btn btn-primary" href="/eventi">Ripulisci filtri</a>');
                }    
            }
        }
        if (window.matchMedia('(min-width: 992px)').matches) {
            $('.block-facet-blockdata-inizio-evento .facet-item a').click(function(){
                if ($('#views-exposed-form-hub-eventi-block-1').find('.clean-filter-btn').length == 0) {
                    $('#views-exposed-form-hub-eventi-block-1 .form--inline').append('<a class="clean-filter-btn button js-form-submit form-submit btn btn-primary" href="/eventi">Ripulisci filtri</a>');
                }
            })       
        }
        // Annunci
        $('#edit-submit-lista-degli-annunci--3').on('click', function(){
            if (($('#edit-actions--3').find('.clean-filter-btn').length == 0) && ($('#edit-actions--3').find('#edit-reset-lista-degli-annunci--2').length == 0)) {
                $('#edit-actions--3').append('<a class="clean-filter-btn button js-form-submit form-submit btn btn-primary" href="/annunci">Ripulisci filtri</a>');
            }
        })
        $('#edit-reset-lista-degli-annunci--2').on('click', function(event){
            event.preventDefault();
            window.location.href='/annunci';
        })
        // Funzione che nasconde la sezione "materiale informativo" dei focus singoli quando è vuota
        let materialeInformativo = $('.view-approfondimenti-focus').find('.final-wrapper').length;
        if(materialeInformativo < 1) {
            $('#block-views-block-single-focus-block-3-2').css('display','none')
        }
    }, 200);

    setTimeout(function() {
        $('.link-task-add-announce').parent().addClass('menuItemAddAnnounce');
    }, 200);

    // function to wrap banner of single confronto inside a container
    $('div#block-views-block-frontend-estrazione-banner-block-7, div#block-views-block-frontend-estrazione-banner-block-9').wrapAll('<div class="container confronti-banner-container"></div>');

    //Switch banner body based width
    if($('body.path-frontpage').length > 0){
      if (window.matchMedia('(max-width: 991px)').matches) {
        $('.view-id-3_recent_annunci_for_homepage').remove().insertAfter($('#block-views-block-all-news-for-homepage-block-1'));
      }
      setTimeout(function() {
        switchBanner();
      }, 200);
    }

    setTimeout(function() {
      // Sotto i 991 sposto i filtri per gli anni al primo posto nella pagina eventi
      if (window.matchMedia('(max-width: 991px)').matches) {
        $('div#block-datainizioevento').remove().insertAfter($('div#block-formespostohub-eventiblock-1'));
      }
      if($('div#block-tutti-gli-annunci-filtri-di-ricerca').length > 0){
        if (window.matchMedia('(max-width: 991px)').matches) {
          $('div#block-tutti-gli-annunci-filtri-di-ricerca').remove().insertAfter($('div#block-views-block-frontend-estrazione-banner-block-1'));
          $('div#block-tutti-gli-annunci-filtri-di-ricerca').prepend('<a class="custom-filter-setter view-less-filter-annunci show">Mostra meno filtri</a>');
          $('div#block-tutti-gli-annunci-filtri-di-ricerca').prepend('<a class="custom-filter-setter view-more-filter-annunci hide">Mostra più filtri</a>');
        }
      }
    }, 400);

    setTimeout(function() {
      // Sotto i 991 sposto i filtri di ricerca al primo posto nella pagina aziende
      if (window.matchMedia('(max-width: 991px)').matches) {
        $('div#block-formespostosingle-aziendablock-2').remove().insertAfter($('div#block-titleforaziendepage'));
      }
    }, 200);

    $('body').on('click', '.view-less-filter-annunci', function() {
      $('.view-less-filter-annunci').removeClass('show').addClass('hide');
      $('.view-more-filter-annunci').removeClass('hide').addClass('show');
      $('div#block-tutti-gli-annunci-filtri-di-ricerca > form').hide();
    });

    $('body').on('click', '.view-more-filter-annunci', function() {
      $(this).removeClass('show').addClass('hide');
      $('.view-less-filter-annunci').removeClass('hide').addClass('show');
      $('div#block-tutti-gli-annunci-filtri-di-ricerca > form').show();
    });

    /**
     * Custom function to switch banner body to banner top in homepage
     */
    function switchBanner(){

      let body_clone = $("div.banner-body .view-content").clone();
      let body_mobile_clone = $("div.banner-body-mobile .view-content").clone();
      if(window.matchMedia('(max-width: 1200px)').matches){
        $('div.banner-body').empty();
      }
      else{
        $('div.banner-body-mobile').empty();
      }

      $(window).resize(function() {
        if (window.matchMedia('(max-width: 1200px)').matches) {
          if (!$('div.banner-body').is(':empty')){
            $('div.banner-body').empty();
          }
          if ($('div.banner-body-mobile').is(':empty')){
            body_mobile_clone.appendTo('div.banner-body-mobile');
          }
        }
        else {
          if (!$('div.banner-body-mobile').is(':empty')){
            $('div.banner-body-mobile').empty();
          }
          if ($('div.banner-body').is(':empty')){
            body_clone.appendTo('div.banner-body');
          }
        }
      });
    }

    if($('a.banner-link img').length){
      getCsrfToken();
    }
    // COMMENT SECTION
    // custom function to wrap all the comments nested inside a parent comment, in the Announce section
    $("div[class^='deep-']:not(.deep-0)").map(function() {
      if($(this).prev().hasClass("deep-0")) {
        let elementsToWrap = $(this).prev().nextUntil(".deep-0").addBack();
        return elementsToWrap;
      }
    }).wrap("<div class='wrap views-row' />");

    /////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////
    // VIDEO SECTION

    //open other rows when click on button in video page
    if (document.getElementById('show-section-videos')) {
      var button=document.getElementById('show-section-videos');
      button.onclick = function() {
        var parent=document.getElementById('block-views-block-recent-videos-for-videos-page-block-2')
        parent.classList.add("customstyle");
      }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // SINGLE FOCUS
    setTimeout(function() {
        $('.single-focus-expand-body').click(function(){
            $(this).next().css('display', function(_, displayValue) {
                return displayValue === 'block' ? 'none' : 'block';
            });
            $(this).next().children().css('display', function(_, displayValue) {
                return displayValue === 'block' ? 'none' : 'block';
            });
        })
      }, 100);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // NEWS CATEGORY PAGE

    //open other rows when click on button in news category page
    if (document.getElementById('show-section')) {
      var button=document.getElementById('show-section');
      button.onclick = function() {
        var parent3=document.querySelector(".view-display-id-block_3")
        parent3.classList.add("customstyle");
      }
    }

    //search box in responsive
   const mediaQuery1 = window.matchMedia('(max-width: 991px)')
   if (mediaQuery1.matches) {
     if (document.getElementById('block-b5infodent-search-form')) {
       var button=document.getElementById('block-b5infodent-search-form');
       button.onclick = function() {
         var parent=document.getElementById('block-b5infodent-search-form')
         parent.classList.add("customsearch1");
       }
     }
   }

    //footer in responsive
   // Create a media condition that targets viewports at least 991px wide
       const mediaQuery = window.matchMedia('(max-width: 991px)')
       // Check if the media query is true
       if (mediaQuery.matches) {
         var a = document.getElementById("block-infoecondizioni")
         a.onclick = function(){
           $(this).toggleClass("opened-menu-footer")
         }
         var b = document.getElementById("block-sitemap")
         b.onclick = function(){
           $(this).toggleClass( "opened-menu-footer" )
         }
         var c = document.getElementById("block-inostrisiti")
         c.onclick = function(){
           $(this).toggleClass( "opened-menu-footer" )
         }
       }

    // In this part we are trying to add progressive margin to all the nested comments
    let wrapclasses= document.getElementsByClassName('wrap')
    for (const num of wrapclasses) {
      var margin = 100;
      let numb = num.children;
      for (const num of numb) {
        if (num.classList.contains('deep-6')){
          return
        }
        if (num.classList.contains('deep-0')){
          continue;
        }else {
          margin+=20%margin
          num.style.marginLeft = margin +"px";
        }
      }
    }
  });

  /**
   * Custom function to rearrange Annunci and News block in homepage mobile
   */
  function rearrangeHomepageElements() {
    if (window.matchMedia('(max-width: 991px)').matches) {
      $('.view-id-3_recent_annunci_for_homepage').remove().insertAfter($('#block-views-block-all-news-for-homepage-block-1'));
    }else{
      $('.path-frontpage .content-region-external-wrapper .content-section .region-content .views-element-container .view-all-news-for-homepage .view-footer').append($( ".view-id-3_recent_annunci_for_homepage" ))
    }
  }

  /**
   * Custom function to rearrange filters inside annunci page
   */
  function rearrangeAnnunciFilters() {
    if (window.matchMedia('(max-width: 991px)').matches) {
      $('div#block-tutti-gli-annunci-filtri-di-ricerca').remove().insertAfter($('div#block-views-block-frontend-estrazione-banner-block-1'));
      if(!($('.view-less-filter-annunci').length > 0)){
        $('div#block-tutti-gli-annunci-filtri-di-ricerca').prepend('<a class="custom-filter-setter view-less-filter-annunci show">Mostra meno filtri</a>');
      }
      if(!($('.view-more-filter-annunci').length > 0)){
        $('div#block-tutti-gli-annunci-filtri-di-ricerca').prepend('<a class="custom-filter-setter view-more-filter-annunci hide">Mostra più filtri</a>');
      }
    }else{
      $('.page-node-type-page .content-region-external-wrapper .sidebar-first .region-sidebar-first').prepend($( "div#block-tutti-gli-annunci-filtri-di-ricerca" ))
      $('.custom-filter-setter').remove();
    }
  }

    /**
   * Custom function to rearrange filters inside eventi and aziende page
   */
    function rearrangeEventiAziendeFilters() {
      if (window.matchMedia('(max-width: 991px)').matches) {
        $('div#block-datainizioevento').remove().insertAfter($('div#block-formespostohub-eventiblock-1'));
      }
    }

  // rearrangeElements();
  $(window).resize(function() {
    rearrangeHomepageElements();
    rearrangeAnnunciFilters();
    rearrangeEventiAziendeFilters();
  });
  //Per reimpostare la posizione dei filtri nella pagina azienda al resize, devo usare bind('orientationchange') invece della funzione resize, altrimenti causa un bug alla tastiera 
  //che compare sul mobile dopo aver cliccato sull'input
  $(window).bind('orientationchange', function () {
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('div#block-formespostosingle-aziendablock-2').remove().insertAfter($('div#block-titleforaziendepage'));
    }
    if (window.matchMedia('(min-width: 992px)').matches) {
        $('div#block-formespostosingle-aziendablock-2').remove().insertBefore($('div#block-views-block-frontend-estrazione-banner-block-19'));
    }
  });

  /* Anchor smooth scroll */
  (() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.body.classList.remove('body--has-active-cheese');
        document.querySelector('.cheeseburger-menu__backdrop').classList.remove('cheeseburger-menu__backdrop--active');
        document.querySelector('.block-cheeseburgermenu-container').classList.remove('block-cheeseburgermenu-container--is-open');

        const offset = -30,
          element = document.querySelector(this.getAttribute('href')),
          target = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({top: target, behavior: 'smooth'});
      });
    });
  })();

  /**
   * Custom post to call impression manager API
   * @param idImpression
   * @param idBanner
   */
  function impressionManager(idImpression, XCSRF) {

    let body = {};
    body['id_impression'] = idImpression;
    $.ajax({
      url: '/rest/impression-manager',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': XCSRF
      },
      data: JSON.stringify(body),
      success: function (success) {
        // console.log(e);
      },
      error: function (e) {
        console.log("Status: " + e.status);
        console.log("Error: " + e.responseJSON.message);
      }
    });
  }

  /**
   * Custom post to call click rest API
   * @param idImpression
   * @param hashed_crentials
   */
  function postClick(idImpression, XCSRF) {
    let body = {};
    body['id_impression'] = idImpression;
    $.ajax({
      url: '/rest/click-counter',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
      success: function (e) {
        // console.log(e);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      }
    });
  }

})(jQuery, Drupal, drupalSettings);