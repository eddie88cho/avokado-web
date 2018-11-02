/************************************************************************************
 * Avokado javascript utilities
 *  - 아보카도 자바스크립트 유틸리티
 *  - IE11 이하에서는 동작여부 보장 못함 ( 자주 사용하는 function은 polyfill 처리 )
 * 
 * @author Cho Hyun Kwon
 * @version 1.0.0
 * @update 20181031 - 1.0.0
 ************************************************************************************/

/**
 * Avokado 유틸리티
 */
;var AvkdUtil = (function(){
	var _utils = {};
	
	polyfill();
	
	return init();
	
	function init() {
		/////////////////////////////////////////////////////////////////////////
		// PUBLIC FUNCTIONS
		/////////////////////////////////////////////////////////////////////////
		// 1. 기본 유틸
		/**
		 * 객체의 empty 여부 체크
		 * @param obj - 검사할 객체
		 */
		_utils.isEmpty = function( obj ) {
			return isEmpty( obj );
		};
		/**
		 * 문자열의 공백 여부 체크 
		 * @param str - 검사할 문자열
		 */
		_utils.isBlank = function( str ) {
			return isBlank( str );
		}
		
		// 2. 유효성 검사 set
		_utils.isValid = {};
		/**
		 * 주민등록번호 유효성 검사
		 * @param rrn - 주민등록번호
		 */
		_utils.isValid.rrn = function( rrn ) {
			if( isBlank(rrn) ) return false;
			return validRegistrationNumber(rrn,'rrn');
		};
		/**
		 * 외국인 등록번호 유효성 검사
		 * @param frn - 외국인등록번호
		 */
		_utils.isValid.frn = function( frn ) {
			if( isBlank(frn) ) return false;
			return validRegistrationNumber(frn,'frn');
		};
		/**
		 * 올바른 성명 여부 검사
		 * @param name - 성명
		 * @param type - 검사 타입( optional )
		 *          ㄴ (default) : 특수문자, 숫자, 공백을 포함하지 않은 문자
		 *          ㄴ kr        : 오직 한글로만 구성된 이름
		 *          ㄴ en        : 영문이름 (ex : "Dennis O'reilly", "Martin Luther King, Jr.", "Francis Scott Key", "Mary-Jane")
		 */
		_utils.isValid.name = function( name, type ) {
			if( isBlank(name) ) return false;
			// 한글 이름
			if( type === 'kr' ) {
				if( name.length === 1 ) return false;
				var regexKorean = /^[가-힣]+$/;
				return regexKorean.test(name);
			}
			// 영문 이름
			else if( type === 'en' ) {
				var regexEnglishName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
				return regexEnglishName.test(name);
			} 
			// default
			else {
				return ( !hasWhiteSpace(name) && !hasNumber(name) && !hasSpecialChar(name) );
			}
			/***/
			function hasWhiteSpace( str ) { return str.indexOf(' ') >= 0; };
			function hasNumber( str ) { return /\d/.test(str); };
			function hasSpecialChar( str ) { return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str); };
		};
		/**
		 * 이메일 유효성 검사
		 * @param email - 이메일 주소
		 */
		_utils.isValid.email = function( email ) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		};
		/**
		 * 핸드폰 번호 유효성 검사
		 * - 국내 핸드폰 번호만 검사
		 * - 국가 코드 82가 아닐 경우 return false;
		 * @param phoneNo - 핸드폰 번호
		 */
		_utils.isValid.phoneNo = function( phoneNo ) {
			if( isBlank(phoneNo) ) return false;
			phoneNo = phoneNo.trim();
			if( phoneNo.startsWith('+') ) {
				if( phoneNo.startsWith("+82") ) {
					phoneNo = '0'+phoneNo.substring(3);
				} else return false;
			}
			phoneNo = phoneNo.split("-").join('');
			var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
			return regPhone.test(phoneNo);
		};
		/**
		 * 유선 번호 유효성 검사
		 * @param tel - 유선전화번호
		 */
		_utils.isValid.telNo = function( tel ) {
			if( isBlank(tel) ) return false;
			var valid = false;
			// TODO hyphen 제거
			// TODO 정규식 체크
			return valid;
		}
		/**
		 * 연,월,일 유효성 검사
		 */
		_utils.isValid.date = function(year, month, day) {
			// TODO 연월일 검사
		}
		
		// 3. 문자열 마스킹
		_utils.mask = {};
		
		/**
		 * 성명 마스킹
		 * @param name - 성명
		 * @param pattern( optional ) - 마스킹 패턴
		 *         ㄴ 0 : (default) 조*권, 제갈*명, 황금**리, Ed**e
		 *         ㄴ 1 : 조**, 제갈**, 황금***, Ed***
		 */
		_utils.mask.name = function( name, pattern ) {
			if( isBlank(name) ) throw "매개변수 'name'이 존재하지 않습니다.";
			name = name.trim();
			if( name.length === 1 ) return name;
			if( name.length === 2 ) return name[0]+"*";
			
			var _p = pattern>>0, masked = '';
			switch( _p ) {
			// 이*, 조**, 제갈**, 황금***, Ed****
			case 1 :
				var headStr;
				if( name.length === 3 ) {
					headStr = name[0];
				}
				else {
					headStr = name.substring(0,2);
				}
				masked = headStr.padEnd(name.length, '*');
				break;
			// 이*, 조*권, 제갈*명, 황금**리, Ed***n
			case 0: default:
				var headStr,tailStr;
				if( name.length === 3 ) {
					masked = name[0]+'*'+name[2];
				}
				else {
					headStr = name.substring(0,2);
					tailStr = name[name.length-1];
					masked = headStr+'*'.repeat(name.length-headStr.length-1)+tailStr;
				}
			}
			return masked;
		};
		/**
		 * 아이디 마스킹
		 * @param userId - 사용자 아이디
		 * @param pattern( optional ) - 마스킹 패턴
		 *         ㄴ 0 : (default) e*********
		 *         ㄴ 1 : e********o
		 *         ㄴ 2 : ed********
		 */
		_utils.mask.id = function( userId, pattern ) {
			if( isBlank(userId) ) throw "매개변수 'userId'이 존재하지 않습니다.";
			var _p = pattern>>0, masked = '';
			userId = userId.trim();
			
			if( userId.length === 1 ) return userId;
			else if( userId.length === 2 ) return userId[0]+'*';
			
			var headStr;
			switch( _p ) {
			case 2:
				headStr = userId.substring(0,2);
				masked = headStr.padEnd(userId.length, '*');
				break;
			case 1:
				headStr = userId[0];
				var tailStr = userId[userId.length-1];
				masked = headStr+'*'.repeat(userId.length-2)+tailStr;
				break;
			case 0: default:
				masked = userId[0].padEnd(userId.length, '*');
			}
			
			return masked;
		}
		/**
		 * 핸드폰 번호 마스킹
		 * @param phoneNo - 핸드폰 번호
		 * @param useHyphen( optional ) - 결과값 하이픈(-) 삽입 여부
		 *         ㄴ true : (default) 010-83**-32**
		 *         ㄴ false : 01083**32**
		 * @param pattern( optional ) - 마스킹 패턴
		 *         ㄴ 0 : (default) 010-92**-96**
		 *         ㄴ 1 : 019-83**-**32
		 *         ㄴ 2 : 01*-82**-52**
		 *         ㄴ 3 : 01*-76**-**90
		 */
		_utils.mask.phoneNo = function( phoneNo, useHyphen, pattern ) {
			if( isBlank(phoneNo) ) throw "매개변수 'phoneNo'가 존재하지 않습니다.";
			if( !_utils.isValid.phoneNo(phoneNo) ) throw '올바른 핸드폰 번호가 아닙니다.';
			var _p = pattern>>0, _uh = typeof useHyphen !== 'boolean'?true:useHyphen;
			phoneNo = phoneNo.split("-").join('');
			var tempPhone = phoneNo.replace(/(^01[0|1|6|7|8|9]{1})([0-9]{3,4})([0-9]{4})/,'$1-$2-$3');
			var pArr = tempPhone.split('-'),p1=pArr[0]+'',p2=pArr[1]+'',p3=pArr[2]+'';
			
			// 핸드폰 번호 마스킹 
			switch( _p ) {
			case 3 : // 01*-76**-**90
				pArr[0] = '01*';
				pArr[1] = p2.substring(0,p2.length-2).padEnd(p2.length,'*');
				pArr[2] = p3.substring(2,4).padStart(4,'*');
				break;
			case 2 : // 01*-82**-52**
				pArr[0] = '01*';
				pArr[1] = p2.substring(0,p2.length-2).padEnd(p2.length,'*');
				pArr[2] = p3.substring(0,2).padEnd(4,'*');
				break;
			case 1 : // 019-83**-**32
				pArr[0] = p1;
				pArr[1] = p2.substring(0,p2.length-2).padEnd(p2.length,'*');
				pArr[2] = p3.substring(2,4).padStart(4,'*');
				break;
			case 0 : default : // 010-92**-96**
				pArr[0] = p1;
				pArr[1] = p2.substring(0,p2.length-2).padEnd(p2.length,'*');
				pArr[2] = p3.substring(0,2).padEnd(4,'*');
			}
			return pArr.join(_uh?'-':'');
		};
		/**
		 * 주민(외국인)등록 번호 마스킹
		 * @param rn - 주민(외국인)등록번호
		 * @param pattern - 마스킹 패턴
		 *         ㄴ 0 : (default) 880823-1******
		 *         ㄴ 1 : 030831-*******
		 * @param useHyphen - 결과값 하이픈(-) 삽입 여부
		 *         ㄴ true : (default) 880823-1******
		 *         ㄴ false : 8808231******
		 */
		_utils.mask.rn = function( rn, useHyphen, pattern ) {
			if( isBlank(rn) ) throw "매개변수 'rn'이 존재하지 않습니다.";
			if( !validRegistrationNumber(rn) ) throw '올바른 주민(외국인)등록번호가 아닙니다.';
			var _p = pattern>>0, _uh=(typeof useHyphen != 'boolean')?true:useHyphen, rn = rn.split("-").join('');
			var rnArr = [];
			// TODO 주민(외국인)등록번호 마스킹 
			rnArr[0] = rn.substr(0,6);
			switch( _p ) {
			case 1:
				rnArr[1] = '*'.repeat(7);
				break;
			case 0: default:
				rnArr[1] = rn.substr(6,1).padEnd(6,'*');
			}
			
			return rnArr.join(_uh?'-':'');
		};
		
		return _utils;
	}
	
	/////////////////////////////////////////////////////////////////////////
	// PRIVATE FUNCTIONS
	/////////////////////////////////////////////////////////////////////////
	// empty check
	function isEmpty( obj ) {
		return ( obj == null || obj == undefined );
	};
	// blank check
	function isBlank( str ) {
		return (!str || str.trim().length === 0);
	};
	
	// Check registration number 
	function validRegistrationNumber( rn, type ) {
		rn = rn.split("-").join('');
		if( rn.length !== 13 ) return false;
		
		var genderCd = rn.substr(6,1)>>0, rrnGenderSet=[1,2,3,4], frnGenderSet=[5,6,7,8];
		if( type === 'rrn' && (rrnGenderSet.indexOf(genderCd) < 0) ) {
			return false;
		}
		else if( type == 'frn' && (frnGenderSet.indexOf(genderCd) < 0) ) {
			return false;
		}
		else {
			if( (rrnGenderSet.indexOf(genderCd) < 0) && (frnGenderSet.indexOf(genderCd) < 0) ) return false;
		}
		var checkSum = 0;
		for(var i=0; i<12; i++) checkSum += ((rn.substr(i,1)>>0)*((i%8)+2));
		var rrnMatch = ((11-(checkSum%11))%10) == rn.substr(12, 1);
		var frnMatch = (((11-(checkSum%11))%10+2)%10) == rn.substr(12, 1);
		if( type === 'rrn' ) {
			return rrnMatch;
		}
		else if( type === 'frn' ) {
			return frnMatch;
		}
		return rrnMatch || frnMatch;
	};
	
	function polyfill() {
		// startsWith
		if( !String.prototype.startsWith ) {
			String.prototype.startsWith = function(search, pos) {
				return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
			}
		}
		// repeat
		if( !String.prototype.repeat ) {
			String.prototype.repeat = function( count ) {
				'use strict';
				if( this == null ) {
					throw new TypeError("can't convert " + this + " to object");
				}
				var str = ''+this;
				count = +count;
				if( count != count ) count = 0;
				if( count < 0 ) throw new RangeError('음수는 반복될 수 \'count\'로 사용할 수 없습니다.');
				if( count == Infinity ) throw new RangeError('무한대수는 반복될 수 \'count\'로 사용할 수 없습니다.');
				
				count = Math.floor(count);
				if( str.length ==0 || count == 0 ) {
					return '';
				}
				if( str.length * count >= 1<<28 ) throw new RangeError('반복될 수는 문자열의 최대 길이를 초과할 수 없습니다.');
				
				var maxCount = str.length * count;
				count = Math.floor(Math.log(count) / Math.log(2));
				while (count) {
					str += str;
					count--;
				}
				str += str.substring(0, maxCount - str.length);
				return str;
			}
		}
		
		// padStart
		if( !String.prototype.padStart ) {
			String.prototype.padStart = function padStart( targetLength, padString ) {
				targetLength = targetLength>>0;
				padString = String( (typeof padString !== 'undefined' ? padString : ' ') );
				if( this.length >= targetLength ) return String(this);
				else {
					targetLength = targetLength - this.length;
					if( targetLength > padString.length ) {
						padString += padString.repeat(targetLength/padString.length);
					}
					return padString.slice(0, targetLength) + String(this);
				}
			}
		}
		
		// padEnd
		if( !String.prototype.padEnd ) {
			String.prototype.padEnd = function padEnd( targetLength, padString ) {
				targetLength = targetLength>>0;
				padString = String( (typeof padString !== 'undefined' ? padString : ' ') );
				if( this.length > targetLength ) return String(this);
				else {
					targetLength = targetLength-this.length;
					if( targetLength > padString.length ) {
						padString += padString.repeat(targetLength/padString.length);
					}
					return String(this) + padString.slice(0, targetLength);
				}
			}
		}
	}
})();