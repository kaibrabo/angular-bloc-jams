(function() {
	function LandingCtrl() {
		this.heroTitle = "Turn Up The Music";
	}
	
	angular
		.module('blocJams')
		.controller('LandingCtrl', LandingCtrl);
})();