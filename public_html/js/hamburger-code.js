let sub1 = postal.subscribe({
            channel: "modal",
            topic: "#",
            callback: function (data, envelope) {
                if (envelope.topic === 'open')
                {
                    $('.main-content').addClass('no-scroll');
                }
                if (envelope.topic === 'close')
                {
                    $('.main-content').removeClass('no-scroll');
                }
            }
        });

 
 //
function menuCall(callValue)
{

    postal.publish({
        channel: "menu.channel",
        topic: "select-page",
        data: {page: callValue}
    });
    if ($(".label-trigger").hasClass('active'))
    {
        $(".label-trigger").click();
    }

}

$(function () {
    //Set up the click behavior
    $(".label-trigger").click(function () {
        //Toggle the class .active on the hamburger icon
        var trMenu = "215px";
        var trBlock = '210px';
        if ($(this).hasClass('active'))
        {
            trMenu = "10px";
            trBlock = '0px';
        }

        $(this).toggleClass("active");
        $(this).animate({

            left: trMenu
        }, 200, function () {
            // Animation complete.
        });

        $('.main-container').animate({

            left: trBlock
        }, 200, function () {
            // Animation complete.
        });

    });

    //set up menu code
    $("#Home").click(function (ev) {
        ev.preventDefault();
        menuCall("Home");
    });
    $("#Writers").click(function (ev) {
        ev.preventDefault();
        menuCall("Writers");
    });
    $("#Characters").click(function (ev) {
        ev.preventDefault();
        menuCall("Characters");
    });


});




$(window).resize(function () {
    //console.log($(window).width());
    var w = $(window).width();
    var mainContainer = $('.main-content');
    if (w > 640)
    {
        $(".label-trigger").removeClass('active');
        $('.main-container').animate({

            left: '0px'
        }, 1, function () {
            // Animation complete.
        });
        $(".label-trigger").animate({

            left: '10px'
        }, 1, function () {
            // Animation complete.
        });

        //linear best fit from several widths to position thor at the center
        var ex = "-" + (480 + (w - 640)) + "px";
        //background image handling

        mainContainer.attr('style', 'background-position-y: ' + ex);
    } else
    {
        mainContainer.removeAttr('style');
    }

});