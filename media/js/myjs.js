!(function($) {
    // regular js
    // function formatDate(myDate) {
    //     var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //     var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
    //     var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
    //     var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";

    //     return myDay + "<br>" + myMonth;
    // }
function formatDate( pubDate )
{

    var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //var dateObj = new Date(Date.parse(pubDate));
    var dateObj = pubDate.split('/'),
    mnth = monthList[ parseInt(dateObj[1])-1],
    myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ",
    myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ",
    myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2] + "</span> "; 
    return myDay + '<br>' + myMonth;
            
}
    // Resize action
    $(window).on('resize', function() {

        var wi = $(this).width();

        // Mobile & Tablet
        if (wi <= 992) {
            $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
        }
        //  Desktop
        else {
            $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        }

    });

    // jquery
    $(function() {

        if ($(".linked-in-image").children("a").attr("onClick")){
            var linkattrVal = 	$(".linked-in-image").children("a").attr("onClick").replace(/'\)/,"?9')");
            $(".linked-in-image").children("a").attr("onClick", linkattrVal);
        }

        $(".p_meet-the-team").includeFeed({
            baseSettings: {
                rssURL: ["/consultantsrss.aspx"],
                addNBSP: false,
                repeatTag: "consultant"
            },
            templates: {
                itemTemplate: '<div class="row"><div class="col-md-12"><div class="staff-holder" id="{{FriendlyURL}}"><div class="row"><img alt="{{FirstName}} {{LastName}}" class="col-sm-4 hidden-xs" height="260" src={{ImageURL}} width="260" /><div class="col-sm-8 col-xs-12"><h3>{{FirstName}} {{LastName}}</h3><h4>{{PositionTitle}}</h4>{{ShortDescription}}{{FullDescription}}<p><a href={{LinkedInURL}}>Connect with {{FirstName}} on LinkedIn</a></p></div></div></div></div></div>'
            },
            complete: function() {}
        });

        if ($('#site-topnav .user-loggedIn').length) {
            $('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
        }

        var currentPage = window.location.pathname.toLowerCase();
        //Register Page mandatory fields
        if(window.location.pathname.indexOf('/member/register.aspx') > -1){
            $('#Label10').text('Upload your CV');
            $("#Label10").append("<span class='file-required errorMsg'>Attachment is required</span>");
            $(".file-required").hide();
        }
        if($('label[for="ctl00_ContentPlaceHolder1_ddlClassification"]').find('.form-required').length < 1){
                $('label[for="ctl00_ContentPlaceHolder1_ddlClassification"]').append('<span class="form-required"> *</span>');
        }
        if($('label[for="ctl00_ContentPlaceHolder1_ddlCountry"]').find('.form-required').length < 1){
                $('label[for="ctl00_ContentPlaceHolder1_ddlCountry"]').append('<span class="form-required"> *</span>');
        }
         $('body').on('change', 'select#ctl00_ContentPlaceHolder1_ddlClassification', function(){
            setTimeout( function(){
            if( $('label[for="ctl00_ContentPlaceHolder1_ddlClassification"]').find('.form-required').length < 1){
                $('label[for="ctl00_ContentPlaceHolder1_ddlClassification"]').append('<span class="form-required"> *</span>');
                
              }
                 },1000 );
                   
            });/*
        $("#btnSubmit").click(function(e){  
        if($('#ctl00_ContentPlaceHolder1_docInput')[0].files.length === 0){
             e.preventDefault();
            $('.file-required').show();   
            
        }  
        if ($('select#ctl00_ContentPlaceHolder1_ddlClassification').val() == '0'){
                    e.preventDefault();
                    if($('#ctl00_ContentPlaceHolder1_ddlClassification + .errorMsg').length < 1){
                        $('#ctl00_ContentPlaceHolder1_ddlClassification').parent().append('<div class="errorMsg">Classification is required</div>');
                    }
        }
        if ($('select#ctl00_ContentPlaceHolder1_ddlCountry').val() == '0'){
                    e.preventDefault();
                    if($('#ctl00_ContentPlaceHolder1_ddlCountry + .errorMsg').length < 1){
                        $('#ctl00_ContentPlaceHolder1_ddlCountry').parent().append('<div class="errorMsg">Country is required</div>');
                    }
        }

     });*/
        // remove empty li's on the system pages. 
        $("#side-left li:empty").remove();

        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }

        // Page Title
        $('.dynamic-content-holder h1:first').appendTo($('.page-title .container .row div.col-md-12.inner-title'));
        $('#content h1:first').appendTo($('.page-title .container .row div.col-md-12.inner-title'));
        $('#CV-content h1.CV-Builder-title').appendTo($('.page-title .container .row div.col-md-12.inner-title'));

        /* Adding Bootstrap Classes */
        // Section > Div.container
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');

        // dynamic side columns column
        $('#dynamic-side-right-container, #side-right').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
        if (!$("#r_full-width").length) {
            $('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs col-sm-4 col-md-3');
            if ($.trim($('#dynamic-side-left-container, #side-left').html()).length) {
                $('#dynamic-content, #content').addClass('col-xs-12 col-sm-8 col-md-9');
            } else {
                $('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
            }
        } else {
            $('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
            $('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
        }

        // Dynamic Content column
        if ($.trim($('#side-left').html()).length) {
            $('#dynamic-content, #content').addClass('col-xs-12 col-sm-8 col-md-9');
        } else {
            $('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
        }

        // Repsonsive image
        // $('.dynamic-content-holder img').addClass('img-responsive');

        // Responsive table
        $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');

        // Removed common bootstrap
        $('link[href="/media/COMMON/newdash/lib/bootstrap.min.css"]').remove();

        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');


        // add placeholder for search widget text field
        $('#keywords1').attr('placeholder', 'Keywords search');

        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        $(".nav li li.active").closest(".nav > li").addClass("active");

        // Contact - Google map
        $("#footer").prepend($("#contact-map"));


        // generate select navigation from sidebar Dynamic menu
        $("#dynamic-content").convertNavigation({
            title: "Related Pages",
            links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
        });

        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });

        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });





        // Resize action
        var $window = $(window);
        // Function to handle changes to style classes based on window width
        function checkWidth() {
            if ($window.width() < 992) {
                $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
            }
        }
        // Execute on load
        checkWidth();
        // Bind event listener
        $(window).resize(checkWidth);



        // Home services - carousel
        $('.t-gallery').Gallerycarousel({ autoRotate: 4000, visible: 4, speed: 800, easing: 'easeOutExpo', itemMinWidth: 250, itemMargin: 30 })


        // Latest Jobs widget
        $("#myJobsList ul").includeFeed({
            baseSettings: { rssURL: ["/job/rss.aspx?search=1&addlocation=1"], addNBSP: false },
            predicates: {
                pubDate: formatDate
            }, 
            templates: {
                itemTemplate: "<li class='rss-item'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span></li>"
            }, 
            // predicates: {
            //  pubDate: formatDate
            // }, 
            complete: function() {
                if ($(this).children().length > 2) {
                    $(this).simplyScroll({ frameRate: 60 });
                }
            }
        });
        //Latest News Widget 
         $("#myNewsFeed ul").includeFeed({
            baseSettings: { rssURL: ["/newsrss.aspx"], addNBSP: false },
            predicates: {
                pubDate: formatDate
            }, 
            templates: {
                itemTemplate: "<li class='rss-item'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span></li>"
            }, 
            // predicates: {
            //  pubDate: formatDate
            // }, 
            complete: function() {
                if ($(this).children().length > 2) {
                    $(this).simplyScroll({ frameRate: 60 });
                }
            }
        });


        // Equal Height 
        $.fn.eqHeights = function(options) {

            var defaults = { child: false };
            var options = $.extend(defaults, options);
            var el = $(this);
            if (el.length > 0 && !el.data('eqHeights')) {
                $(window).bind('resize.eqHeights', function() {
                    el.eqHeights();
                });
                el.data('eqHeights', true);
            }
            if (options.child && options.child.length > 0) {
                var elmtns = $(options.child, this);
            } else {
                var elmtns = $(this).children();
            }

            var prevTop = 0;
            var max_height = 0;
            var elements = [];
            elmtns.height('auto').each(function() {

                var thisTop = this.offsetTop;
                if (prevTop > 0 && prevTop != thisTop) {
                    $(elements).height(max_height);
                    max_height = $(this).height();
                    elements = [];
                }
                max_height = Math.max(max_height, $(this).height());
                prevTop = this.offsetTop;
                elements.push(this);
            });

            $(elements).height(max_height);
        };
        // $('.service-holder').eqHeights();

        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        if ($(window.location.hash).length) {
            setTimeout(function() {
                $("html, body").animate({
                    scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - $("#dynamic-content, #content").css("padding-top").replace(/[^-\d\.]/g, '')
                }, 100);
            }, 500);

        }

        // case studies drop down
        $(".service-holder a[data-role='toggle'], .staff-holder a[data-role='toggle']").each(function() {
            $(this).parent().nextUntil("h1, h2, h3, h4").slideUp();
            $(this).click(function() {
                $(".service-holder a[data-role='toggle'], .staff-holder a[data-role='toggle']").not($(this)).parent().nextUntil("h1, h2, h3, h4").slideUp();
                $(this).parent().nextUntil("h1, h2, h3, h4").slideDown();
            });
        });

        // if heading is empty, remove it.
        $(".page-title .text-center:empty").remove();

        // dropdown for faq pages
        $.fn.dropdowncustom({
            "/page/our-career-seekers/candidate-faq/": ["#dynamic-content h2", "h1, h2, h3, h4, h5, h6", false],
            "/page/employers/employer-faq/": ["#dynamic-content h2", "h1, h2, h3, h4, h5, h6", false]
        });
        //faq pages
      
       $(".dropdown-heading").click(function(){if($(this).siblings().is(":hidden")){
       $(this).siblings().slideDown("slow");
       }
       $(this).parent().siblings("div").children("p,ol,ul").css("display","none");
         
        });
        // if desktop view, enable featherbox.
        if (1200 < ($window).width()) {
            $("a[href*='.jpg']").featherlight();
        }
        //counter on Homepage
          var options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
        };
        var demo1 = new CountUp("countelement1", 0, 143, 0, 3, options);
        var demo2 = new CountUp("countelement2", 0, 68595, 0, 3, options);
        var demo3 = new CountUp("countelement3", 0, 61724, 0, 3, options);
        var demo4 = new CountUp("countelement4", 0, 1004, 0, 3, options);


        $(window).scroll(function() {
            if ($(window).scrollTop() > 200) {
                $("#site-topnav").addClass("shadow");
            } else {
                $("#site-topnav").removeClass("shadow");
            }

            if ($(".sec-about").length > 0) {
                if ($(window).scrollTop() > ($(".sec-about").offset().top - ($(window).height() / 2))) {
                    demo1.start();
                    demo2.start();
                    demo3.start();
                    demo4.start();

                }
            }
        });

        //counter on Homepage
        // home team member pictures
        $(".d_home-team-members").includeFeed({
            baseSettings: { 
                rssURL: ["/consultantsrss.aspx"], 
                limit: 200, 
                addNBSP: false, 
                repeatTag: "consultant"
            },
            templates: {
                itemTemplate: '<li><a href="/our-team/#{{FriendlyURL}}"><img src="{{ImageURL}}" alt="{{FirstName}} {{LastName}}"><span class="hover-details"><span>{{FirstName}} {{LastName}}</span></span></a></li>'
            }, 
            complete: function() {
                
            }
        });

    });



})(jQuery);