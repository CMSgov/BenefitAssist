"use strict";

var stringUtil = {};

var TRIM_REG_EX = /^\s+|\s+$/g;

stringUtil.makeSafe = function(obj) {
	return (obj === null || obj === undefined) ? '' : String(obj);
};

stringUtil.isNotEmpty = function(s) {
	return (!stringUtil.isEmpty(s));
};

stringUtil.isEmpty = function(s) {
	return (!s || 0 === s.length || /^[\s\xa0]*$/.test(s));
};

stringUtil.trim = function(s) {
	return s ? s.replace(TRIM_REG_EX, '') : s;
};

stringUtil.toDigitsOnly = function(s, maxlen) {
	if(stringUtil.isEmpty(s)) return '';

	s = s.replace(/[^0-9.]/gi, '');
	if (!s.length) return '';

	if(maxlen && s.length > maxlen) s = s.substr(0, maxlen);

	return s;
};

stringUtil.zeropad = function (value, len){
	len = len || 2;
	value += '';
	return value.length >= len ? value : new Array(len - value.length + 1).join('0') + value;
};

/**
 * Formats a string to a number with thousand comma separators
 *
 * @param {?string|number} s The string to process.
 * @return {string}
 */
stringUtil.toThousandCommas = function(s) {
	if(undefined === s || null === s) return '';

	s += '';
	if(stringUtil.isEmpty(s)) return '';

	var rgx = /(\d+)(\d{3})/,
		x = s.split('.'),
		x1 = x[0],
		x2 = x.length > 1 ? '.' + x[1] : '';

	x1 = x1.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return x1 + x2;
};

/**
 * @param {string} s
 * @return {string}
 */
stringUtil.capitalize = function(s) {
	return s.replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();});
};

/**
 * @param {string} s
 * @return {string}
 */
stringUtil.encodeXml = function (s) {
	return s.toString().replace(/&/g, '')    // need to fix &amp; causes an error in customer central
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/"/g, '&quot;')
						.replace(/'/g, '&apos;');
};

/**
 * @param {string} s
 * @return {string}
 */
stringUtil.binaryToBase64 = function(binary) {
	//var buffer = new Buffer(binary.toString(), 'binary');
	return new Buffer(binary).toString('base64');

	//var buffer = new Buffer(base64EncodedDoc, 'base64')
	//return buffer.toString()
};

/**
 * @param {string} s
 * @return {string}
 */
stringUtil.base64ToBinary = function(base64) {
	return new Buffer(base64, 'base64').toString();
};

//------------------------------------------------------
// Utility function to covert a string into an
// existing class function
// May return null if no function exists in the namespace
//------------------------------------------------------
stringUtil.stringToFunction = function (str, context) {
	var arr = str.split(".");

	var fn = (context);
	for (var i = 0, len = arr.length; i < len; i++) {
		fn = fn[arr[i]];
		if (typeof fn === 'undefined') {
			return undefined;
		}
	}
	return fn;
};


module.exports = stringUtil;
