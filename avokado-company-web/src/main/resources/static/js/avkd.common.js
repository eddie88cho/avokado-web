/************************************************************************************
 * Avokado common js
 *  - 아보카도 공통 영역 자바스크립트
 * 
 * @author Cho Hyun Kwon
 * @version 1.0.0
 * @update 20181102 - 1.0.0
 ************************************************************************************/
(function($){
	'use strict';
	
	var Avkd = function() {
		try{console.info("Avokado common js initialized.");} catch(e){};
		this.pageScrollElement = 'html, body';
		this.$body = $('body');
		
		this.setUserOS();
		this.setUserAgent();
	};
	
	/*
	 * Form groups
	 * ------------------------------------------------------------------------------
	 */
	$('body').on('focus','.form-group.form-group-default :input', function() {
		$('.form-group.form-group-default').removeClass('focused');
		$(this).parents('.form-group').addClass('focused');
	});
	$('body').on('blur','.form-group.form-group-default :input', function() {
		$(this).parents('.form-group').removeClass('focused');
		if( $(this).val() ) {
			$(this).closest('.form-group').find('label').addClass('fade');
		} else {
			$(this).closest('.form-group').find('label').removeClass('fade');
		}
	});
	
	Avkd.prototype.setUserOS = function() {
		var OSName = "";
		
		if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
		if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
		if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
		if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";
		this.$body.addClass(OSName);
	};

	Avkd.prototype.setUserAgent = function() {
		if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
			this.$body.addClass('mobile');
		} else {
			this.$body.addClass('desktop');
			if (navigator.userAgent.match(/MSIE 9.0/)) {
				this.$body.addClass('ie9');
			}
		}
	}
	
	Avkd.prototype.setFullScreen = function(element) {
		// Supports most browsers and their versions.
		var requestMethod = element.requestFullScreen
				|| element.webkitRequestFullScreen
				|| element.mozRequestFullScreen || element.msRequestFullscreen;

		if (requestMethod) { // Native full screen.
			requestMethod.call(element);
		} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript !== null) {
				wscript.SendKeys("{F11}");
			}
		}
	}
	
	$.Avkd = new Avkd();
	$.Avkd.Constructors = Avkd;
})(window.jQuery);
