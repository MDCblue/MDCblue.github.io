/* Global navigation variables */
var topNavSelector = ".page-navigation";
var leftNavSelector = ".sec-nav";

/* Highlight top and left navigation 
@navElm - top or left navigation element
@topNavFlag - used to recursively determine which top navigation item to highlight while looking at the left navigation
*/
function HighlightNavigation(navElm, topNavFlag) {

    var navUrl,
        pageUrl = window.location.href;

    $(navElm).children().each(function() {

        if ($(this).get(0).tagName.toLowerCase() == 'li') {  

            navUrl = $(this).children().first().prop('href'); // get the navigation (top or left) URL

            if (!!navUrl) {

                if (navUrl == AppendDefaultPage(pageUrl)) {                
                   $(this).addClass('active');                   
                }

                //console.log(AppendDefaultPage(pageUrl));

                // check for top navigation flag
                if (topNavFlag) {
                    if (navUrl.indexOf(ExtractParentFolderName(pageUrl)) != -1)  {
                        $(this).addClass('active');  
                        topNavFlag = false; 
                    }
                }

                // left navigation - recursively determine which top navigation item to highlight while looking at the left navigation
                if (leftNavSelector == navElm) {
                    HighlightNavigation(topNavSelector, true);                   
                }                                 
                               
            }
            
        }
    });

}

/* Extract the parent folder name 
@url - the URL of the page
*/
function ExtractParentFolderName(url) {
    var arr = url.split('/');
    return '/' + arr[arr.length-2] + '/';
}

/* Append 'default.aspx' file name if not included in the URL
@url - the URL of the page
*/
function AppendDefaultPage(url) {
    var arr = url.split('/'); 
    var defaultPage = (!arr[arr.length-1]) ? url + "default.aspx" : url;
    return defaultPage;
}

/* Call highlight function */
$(function () { HighlightNavigation(topNavSelector, false); HighlightNavigation(leftNavSelector, false); })