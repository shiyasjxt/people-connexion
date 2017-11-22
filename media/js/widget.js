!(function($){
	$(function(){

		var searchButtonSelector = "#prefix_search-link";
		var keywordsInputSelector = "#keywords";
		var defaultSearchValue = "Search";
		
		if ( $(keywordsInputSelector).length )
		{
			$(keywordsInputSelector).val(defaultSearchValue);
		}
		
		$("form").first().keypress(function(e){
			if ( 13 == e.which )
			{
				$(searchButtonSelector).mousedown();
				$(searchButtonSelector).click();
				return false;
			}
		});
		
		$(keywordsInputSelector).focus(function(){
			if ( defaultSearchValue == $(this).val() )
			{
				$(this).val("");
			}
		});
		$(keywordsInputSelector).blur(function(){
			if ( "" == $(this).val() )
			{
				$(this).val(defaultSearchValue);
			}
		});
		
		$(searchButtonSelector).mousedown(function(){
			if ( $(keywordsInputSelector).val() == defaultSearchValue )
			{
				$(keywordsInputSelector).val("");
			}
		})
		
		// uniform 
		if ( $.fn.customSelect )
		{
			$("select").customSelect();
		}

	});
})(jQuery);