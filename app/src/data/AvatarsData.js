define(function(require, exports, module) {
  var AvatarsData = {};

  AvatarsData.getUrl = function() {
    return 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=22dd21a10d1e41ddf3bbefdd25208b33&tags=portrait&is_commons=&format=json&nojsoncallback=1';
  };

  AvatarsData.parse = function(data) {
    var urls = [];
    data = JSON.parse(data);
    for (var i=0, l=data.photos.photo.length, photo; i<l; i+=1) {
      photo = data.photos.photo[i];

      urls.push('https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_s.jpg');
    }

    return urls;
  };

  module.exports = AvatarsData;
});