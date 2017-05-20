(function() {
	function SongPlayer(Fixtures) {
		
		var SongPlayer = {};
		
		var currentAlbum = Fixtures.getAlbum();
		
		/*
		* @desc Buzz object audio file
		* @type {Object}
		*/
		
		var currentBuzzObject = null;
		
		SongPlayer.currentSong = null;
		
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		/*
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		
		var setSong = function(song) {
			
			if (currentBuzzObject) {

				stopSong(SongPlayer.currentSong);
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {

				formats: ['mp3'],
				preload: true
			});

			SongPlayer.currentSong = song;
		};
		
		var playSong = function(song) {
			
			currentBuzzObject.play();
			
			song.playing = true;
		};
		
		var stopSong = function(song) {
			
			currentBuzzObject.stop();
			
			console.log(currentBuzzObject, 'this is current buzz object1');
			
			song.playing = null;
		};
		
		SongPlayer.play = function(song) {
			
			song = song || SongPlayer.currentSong;
			
			if (SongPlayer.currentSong !== song) {
				
				setSong(song);

				playSong(song);
				
			} else if (SongPlayer.currentSong === song) {
				
				if (currentBuzzObject.isPaused()) {
					
					console.log(currentBuzzObject, 'this is current buzz object2');
					
					currentBuzzObject.play();
				}
			}
		};
		
		SongPlayer.pause = function(song) {
			
			song = song || SongPlayer.currentSong;
			
			currentBuzzObject.pause();
			
			song.playing = false;
		};
		
		SongPlayer.previous = function() {
			
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
			
				stopSong(SongPlayer.currentSong);
				
			} else {

				var song = currentAlbum.songs[currentSongIndex];

				setSong(song);

				playSong(song);
			}
		};
		
		SongPlayer.next = function() {
			
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			
     		currentSongIndex++;
			
			if (currentSongIndex > SongPlayer.length) {
				
         		stopSong(SongPlayer.currentSong);
				
			} else {
				
         		var song = currentAlbum.songs[currentSongIndex];
				
         		setSong(song);
				
         		playSong(song);
     		}
		};
		
		
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['Fixtures', SongPlayer]);
})();