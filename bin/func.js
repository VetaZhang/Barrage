
exports.protect = function(data) {
	return data.
		replace(/\s+/g          , '&nbsp;'   ).
    replace( /&(?!#?\w+;)/g , '&amp;'    ).
    replace( /"([^"]*)"/g   , '“$1”'     ).
    replace( /</g           , '&lt;'     ).
    replace( />/g           , '&gt;'     ).
    replace( /…/g           , '&hellip;' ).
    replace( /“/g           , '&ldquo;'  ).
    replace( /”/g           , '&rdquo;'  ).
    replace( /‘/g           , '&lsquo;'  ).
    replace( /’/g           , '&rsquo;'  ).
    replace( /—/g           , '&mdash;'  ).
    replace( /–/g           , '&ndash;'  );
};
