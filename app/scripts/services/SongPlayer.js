(function() {
	function SongPlayer($rootScope, Fixtures) {

		var SongPlayer = {};
		var currentAlbum = Fixtures.getAlbum();
		/*
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		SongPlayer.currentSong = null;
		/**
		* @desc Current playback time (in seconds) of currently playing song
		* @type {Number}
		*/
		SongPlayer.currentTime = null;
		/**
		* @desc Volume control
		* @type {Number}
		*/
		SongPlayer.volume = 80;


        // Functions

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

				currentBuzzObject.stop();

				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(	song.audioUrl, {
																	formats: ['mp3'],
																	preload: true
																});

			SongPlayer.volume = new buzz.sound(	song.audioUrl, {
																	formats: ['mp3'],
																	preload: true,
																	volume: 0
																});

            // Sets updated time as Song plays
			currentBuzzObject.bind('timeupdate', function() {

				$rootScope.$apply(function() {

					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});

			SongPlayer.currentSong = song;
		};

		var playSong = function(song) {

			currentBuzzObject.play();

			song.playing = true;
		};

		var stopSong = function(song) {

			currentBuzzObject.stop();

			song.playing = false;
		};

		SongPlayer.play = function(song) {

			if (SongPlayer.currentSong !== song) {
				SongPlayer.currentSong = song;

				setSong(song);

				playSong(song);

			} else if (SongPlayer.currentSong === song) {

				if (currentBuzzObject.isPaused()) {

					currentBuzzObject.play();
				}
			}
		};

		SongPlayer.pause = function(song) {

			currentBuzzObject.pause();
			// song.playing = false;
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

		/**
		* @function setCurrentTime
		* @desc Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time) {

			if (currentBuzzObject) {

				currentBuzzObject.setTime(time);
			}
		};

		SongPlayer.setVolume = function(volume){

			if (currentBuzzObject) {

				currentBuzzObject.setVolume(volume);
			}
		}

		return SongPlayer;
	}

	angular
	.module('blocJams')
	.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
