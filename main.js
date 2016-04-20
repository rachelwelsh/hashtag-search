curl \-F 'client_id=6adedf760d08471099116d3eb04ee026' \
-F 'client_secret=e600de60d1654920b80c89e794f1954e' \
-F 'grant_type=authorization_code' \
-F 'redirect_uri=http://hashtag-search.azurewebsites.net/' \
-F 'code=1b0430d5891d4ef78bfe4b1ff0e00d68' \
https://api.instagram.com/oauth/access_token

var form = $('#tagsearch');
form.on('submit', function(ev) {
    var q = this.tag.value;
    if (q.length) {
        //console.log(q);
        grabImages(q, 40, access_parameters);
    }
    ev.preventDefault();
});

function grabImages(tag, count, access_parameters) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
}

function onDataLoaded(instagram_data) {
    var target = $("#target");
    //console.log(instagram_data);
    if (instagram_data.meta.code == 200) {
        var photos = instagram_data.data;
        //console.log(photos);
        if (photos.length > 0) {
            target.empty();
            for (var key in photos) {
                var photo = photos[key];
                target.append('<a href="' + photo.link + '"><img src="' + photo.images.thumbnail.url + '"></a>')
            }
        } else {
            target.html("nothing found");
        }
    } else {
        var error = instagram_data.meta.error_message;
        target.html(error);
    }
}

grabImages('unicorn', 40, access_parameters);



