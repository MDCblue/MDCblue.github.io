/* 
* Created By: MDC Web Services 
* Description: MDC Script File 
* Revised: 4/24/2014
*/

/* MDC RED/WHITE CALENDAR STRING SPLIT FUNCTION 
 * Uses: Javascript and jQuery 
------------------------------------------------------------------------------------------ */

/* UTL Functions */
function returnMonth(calString) { return calString.substring(0, 3); }
function returnDay(calString) { return calString.substring(calString.length - 2, calString.length); }

/* convert MMM-DD into MMM and DD 
   idealy remove the timeout */
$(function () {
    setTimeout(function () {
        $('.cal-date a').each(function () {
            var $calSpan = $(this);
            var month = returnMonth($calSpan.text());
            var day = returnDay($calSpan.text());
            $calSpan.empty().append('<span class="month">' + month + '</span>');
            $calSpan.append('<span class="day">' + day + '</span>');
        });
    }, 5000);
});


/* ACCORDION WITH ICONS SCRIPT  
 * Uses: Javascript and jQuery 
------------------------------------------------------------------------------------------ */
$('.accordion').on('show hide', function (e) {
    $(e.target).siblings('.accordion-heading').find('.accordion-toggle i').toggleClass('icon-plus icon-minus', 200);
});


/* HERO UNIT SCRIPT EXTENSION 
   With the use of data attribute we can custom our hero unit by color, image...
-------------------------------------------------------------------------------------------*/
$('.hero-unit').each(function () {
    $this = $(this);
    var bcolor = $this.data('background-color'),
        fcolor = $this.data('color'),
        bimage = $this.data('background-image');

    if (bcolor) {
        $this.css({ "background-color": bcolor });
    }
    if (fcolor) {
        $this.css({ "color": fcolor });
    }
    if (bimage) {
        $this.css({ "background-image": "url(" + bimage + ")" });
    }
});


/* ACCESSIBILITY
* Uses: Javascript and jQuery
------------------------------------------------------------------------------------------ */
$(function() {
    /* remove attribute from tags for accessibility */
    setTimeout(function () {
        $('img').removeAttr('border');
        $('iframe').removeAttr('frameborder');        
        $('iframe').removeAttr('scrolling');
        $('iframe').removeAttr('marginwidth');
        $('iframe').removeAttr('marginheight');
    }, 2000);

    /* Tabs and accordions */
    $("a[role='tab'], a[role='button']").click(function() {      
        $("a[role='tab'], a[role='button']").attr("aria-selected","false"); //deselect all the tabs 
        $(this).attr("aria-selected","true"); // select this tab
        // accordion content
        var isVisible = $(this).parent().parent().next(".panel-collapse").is(":visible");
        if (isVisible) {
            $(this).attr("aria-selected","false");      
        }
        setTimeout(function() { 
            // remove the aria-expanded states from tabpanels since they are the content that gets expanded, not the expanding control
            $(".panel-collapse").removeAttr("aria-expanded");     
        }, 1000);
    });

    // Buttons for play/pause
    var playButton = document.getElementById("play-pause");
    $(playButton).click(function () {
        var playPause = playButton.getElementsByClassName('glyphicon')[0];

        if (playPause.className == "glyphicon glyphicon-pause") {
            // Update the button text to 'Play symbol'
            playButton.innerHTML = '<span class="glyphicon glyphicon-play"></span>';
            $(playButton).attr("aria-label","Play rotating images")
            $('.carousel').carousel('pause');
        }  
        else {
            // Update the button text to 'Pause symbol'
            playButton.innerHTML = '<span class="glyphicon glyphicon-pause"></span>';
             $(playButton).attr("aria-label","Pause rotating images")
            $('.carousel').carousel('cycle');
        }           
    });
});