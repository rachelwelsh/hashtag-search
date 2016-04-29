window.Instagram = {
    //store application settings 
    config: {},

    BASE_URL: 'https://api.instagram.com/v1',

    init: function( opt ) {
        opt = opt || {};

        this.config.client_id = opt.client_id;
    },

    //get a list of popular media  
    popular: function( callback ) {
        var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },

    //get a list of recently tagged media 
    tagsByName: function( name, callback ) {
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },
		//get JSON date using AJAX
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

//authorising to API
Instagram.init({
    client_id: 'd49da08a520f47cbb6e7618f077f33ef'
});

//waiting for document to be ready 
$( document ).ready(function() {

    //getting popular posts from Instagram 
    Instagram.popular(function( response ) {

        //getting DOM element
        var $instagram = $( '#results' );
				//iterating results
        for ( var i = 0; i < response.data.length; i++ ) {
        	//takes link to the image
            imageUrl = response.data[i].images.low_resolution.url;
            //adding elemnt to documents 
            $instagram.append( '<img src="' + imageUrl + '" />' );
        }
    });

		//form subbmiting
    $( 'form' ).on('submit', function( e ) {
    	//cancel difault function
        e.preventDefault();
				//get the value of inputbox
        var tagName = $( '#search' ).val();
        //quering Instagram for tags
        Instagram.tagsByName(tagName, function( response ) {
        	//getting dom elm.
            var $instagram = $( '#results' );
            //clearing element
                $instagram.html('');
                //iterating results
            for ( var i = 0; i < response.data.length; i++ ) {
            	//getting img url
                imageUrl = response.data[i].images.low_resolution.url;
                //getting caption
				caption = response.data[i].caption.text;
				//getting post url
				insta_link = response.data[i].link;
				//appending element
                $instagram.append( "<div class='imgWrap'><img src='"+imageUrl+"' alt='"+insta_link+"' width='300' height='300'><span class='imgDescription' data-url='"+insta_link+"'>"+caption+"</span></div>");
            }
			//element click listener
			$(".imgDescription").click(function(){
				//opening new tab with given url
				window.open($(this).attr("data-url"));
			});
        });

	


    });

});
