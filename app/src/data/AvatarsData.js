define(function(require, exports, module) {
  var AvatarsData = {};

  AvatarsData.getUrl = function() {
    return 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=50b491367b690efc1b9655d3803a79d2&tags=portrait&is_commons=&format=json&nojsoncallback=1';
  };

  AvatarsData.parse = function(data) {
    var urls = [];
    data = JSON.parse(data);
    console.log('DATA: ', data);
    for (var i=0, l=data.photos.photo.length, photo; i<l; i+=1) {
      photo = data.photos.photo[i];

      urls.push('https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_s.jpg');
//       s +=  '<a href="' + p_url + '">' + '<img alt="'+ photo.title + 
//         '"src="' + t_url + '")
    }
    // data = JSON.parse(data);
    // var entries = data.feed.entry;
    // for (var i = 0; i < entries.length; i++) {
    //   var media = entries[i].media$group;
    //   urls.push(media.media$content[0].url);
    // }

// "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
//       s +=  '<a href="' + p_url + '">' + '<img alt="'+ photo.title + 
//         '"src="' + t_url + '"

    return urls;
  };

  module.exports = AvatarsData;
});