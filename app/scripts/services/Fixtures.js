(function(){
	function Fixtures() {
		var Fixtures = {};
		
		var albumPicasso = {
			title: 'The Colors',
			artist: 'Pablo Picasso',
			label: 'Cubism',
			year: '1881',
			albumArtUrl: 'assets/images/album_covers/01.png',
			songs: [
				{ title: 'Blue', duration: 161.71, audioUrl: '/assets/music/blue' },
				{ title: 'Green', duration: 103.96, audioUrl: '/assets/music/green' },
				{ title: 'Red', duration: 268.45, audioUrl: '/assets/music/red' },
				{ title: 'Pink', duration: 153.14, audioUrl: '/assets/music/pink' },
				{ title: 'Magenta', duration: 374.22, audioUrl: '/assets/music/magenta' }
			]
		};

		var albumMarconi = {
			title: 'The Telephone',
			artist: 'Guglielmo Marconi',
			label: 'EM',
			year: '1909',
			albumArtUrl: 'assets/images/album_covers/20.png',
			songs: [
				{ title: 'Hello, Operator?', duration: '1:01' },
				{ title: 'Ring, ring, ring', duration: '5:01' },
				{ title: 'Fits in your pocket', duration: '3:21' },
				{ title: 'Can you hear me now?', duration: '3:14' },
				{ title: 'Wrong phone number', duration: '2:15' }
			]
		};

		var albumKennedy = {
			title: 'Dominic Pt. 1',
			artist: 'Dom Kennedy',
			label: 'Get Home Safely',
			year: '2013',
			albumArtUrl: 'assets/images/album_covers/DKGHS.jpg',
			songs: [
				{ title: '17', duration: '3:13' },
				{ title: 'If It Dont Make Money', duration: '3:00' },
				{ title: 'Dominic', duration: '4:16'},
				{ title: 'Still Callin', duration: '4:26' },
				{ title: 'South Central Love', duration: '3:07'}
			]
		};
		
		Fixtures.getAlbum = function(){
			return albumPicasso;
		};
		
		Fixtures.getCollection = function(numberOfAlbums){
			var arr = [];
			while(arr.length < numberOfAlbums) { 		arr.push(albumPicasso); 
			}
			return arr;
		};

		return Fixtures;
	}
	
	angular 
		.module('blocJams')
		.factory('Fixtures', Fixtures);
})();