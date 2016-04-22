window.Instagram = {
    /**
     * Store application settings
     */
    config: {},

    BASE_URL: 'https://api.instagram.com/v1',

    init: function( opt ) {
        opt = opt || {};

        this.config.client_id = opt.client_id;
    },

    /**
     * Get a list of popular media.
     */
    popular: function( callback ) {
        var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },

    /**
     * Get a list of recently tagged media.
     */
    tagsByName: function( name, callback ) {
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },

    getJSON: function( url, callback ) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    }
};

Instagram.init({
    client_id: 'd49da08a520f47cbb6e7618f077f33ef'
});


$( document ).ready(function() {


    Instagram.popular(function( response ) {
        var $instagram = $( '#results' );
        for ( var i = 0; i < response.data.length; i++ ) {
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append( '<img src="' + imageUrl + '" />' );
        }
    });

    $( 'form' ).on('submit', function( e ) {
        e.preventDefault();

        var tagName = $( '#search' ).val();
        Instagram.tagsByName(tagName, function( response ) {
            var $instagram = $( '#results' );
                $instagram.html('');
			console.log(response);
            for ( var i = 0; i < response.data.length; i++ ) {
                imageUrl = response.data[i].images.low_resolution.url;
				caption = response.data[i].caption.text;
				insta_link = response.data[i].link;
                $instagram.append( "<div class='imgWrap'><img src='"+imageUrl+"' alt='"+insta_link+"' width='300' height='300'><span class='imgDescription' data-url='"+insta_link+"'>"+caption+"</span></div>");
            }
			
			$(".imgDescription").click(function(){
				window.open($(this).attr("data-url"));
			});
        });

	


    });

});
