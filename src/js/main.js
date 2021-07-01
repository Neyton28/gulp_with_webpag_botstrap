
// all func

// overlay func


function showTransparentOverlay() {
    $('.js-transparent-overlay').fadeIn(500);
    $('body').addClass('fixed');
}

function hideTransparentOverlay() {
    $('.js-transparent-overlay').fadeOut(500);
    $('body').removeClass('fixed');
}


// overlay func end

// menubar func

let menuBarFlag = false;

function openMenuBar() {
    $('.js-menubar').addClass('active');
    showTransparentOverlay();
    menuBarFlag = true;
}

function closeMenuBar() {
    $('.js-menubar').removeClass('active');
    hideTransparentOverlay();
    menuBarFlag = false;
}

$('.js-open-menubar').on('click', openMenuBar);

$('.js-close-menubar').on('click', closeAllMenus);


$(document).mouseup(function (e) {
    let div = $(".js-menubar");
    if (!div.is(e.target) && div.has(e.target).length === 0 && menuBarFlag == true) {
        closeMenuBar();
    }
});

// searchbar func

let searchBarFlag = false;

function openSearchBar() {
    $('.js-searchbar').addClass('active');
    showTransparentOverlay();
    searchBarFlag = true;
}

function closeSearchBar() {
    $('.js-searchbar').removeClass('active');
    hideTransparentOverlay();
    searchBarFlag = false;
}

$('.js-open-searchbar').on('click', openSearchBar);

$('.js-close-searchbar').on('click', closeAllMenus);

$(document).mouseup(function (e) {
    let div = $(".js-searchbar");
    if (!div.is(e.target) && div.has(e.target).length === 0 && searchBarFlag == true) {
        closeSearchBar();
    }
});


function closeAllMenus() {
    closeMenuBar();
    closeSearchBar();
}

// advanced search func
const $advancedSearch = $('.js-advanced-search');
const $introText = $('.js-intro-text');

function showAdvancedSearch() {
    $introText.slideUp();
    $advancedSearch.slideDown().addClass('active');
}

function hideAdvancedSearch() {
    $introText.slideDown();
    $advancedSearch.slideUp().addClass('active');
}

$('.js-advanced-btn').on('click', function() {

    if($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('.js-btn-text').text('Advanced Search');
        hideAdvancedSearch();
    } else {
        $(this).addClass('active');
        $(this).find('.js-btn-text').text('Hide Options');
        showAdvancedSearch();
    }
});

// advanced search func end

// adaptive section content

function adaptiveContent() {
    let headerHeight = $('.js-header').innerHeight();
    let footer = $('.js-footer').innerHeight();
    let sum = headerHeight + footer;

    $('section').css('min-height', 'calc(100vh - '+ sum +'px)')
}

// height of search result

function getResultHeight() {
    if($(window).width() > 768) {
        let headerHeight = $('.js-header').innerHeight();
        let footer = $('.js-footer').innerHeight();

        let sum = headerHeight + footer + 120;

        $('.js-result-table').css('height', 'calc(100vh - ' + sum +'px)');
    } else {
        $('.js-result-table').css('height', 'auto');

    }
}


// height of search result end

// result table func

function showSearchResult() {
    $('.js-result-search').slideDown();
    closeAllMenus();
    $('.js-search-form, .js-intro-text').slideUp();
}

function hideSearchResult() {
    $('.js-result-search').slideUp();
}

$('.js-search').on('click', function(e) {
    e.preventDefault();
    showSearchResult();
});

// result table func end

// accordion func

$('.js-accordion-wrapper li h4').on('click', function() {
    $(this).parents('li').toggleClass('active');
    $(this).parents('li').find('>div').slideToggle(500);
});

// accordion func end

// ready func
$(document).ready( function() {

    const d = new Date();
    $('.js-copyright').text(d.getFullYear());

    adaptiveContent();
    getResultHeight();
    
    new PerfectScrollbar('.js-result-table', {
        suppressScrollX: false
    });

    // resize func

    $(window).on('resize', function() {
        adaptiveContent();
        getResultHeight();
    });

    // resize func end
});


// ready func end