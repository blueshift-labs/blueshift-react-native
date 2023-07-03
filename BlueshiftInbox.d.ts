// Type definitions for BlueshiftInbox.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
declare namespace renderItem{
	// renderItem.renderListItem.!0
	
	/**
	 * 
	 */
	interface RenderListItem0 {
	}
}

/**
 * 
 */
declare interface BlueshiftInbox {
		
	/**
	 * 
	 * @param pullToRefreshColor 
	 * @param loaderColor 
	 * @param customStyle 
	 * @param placeholderText 
	 * @param dateFormatter 
	 * @return  
	 */
	new (pullToRefreshColor : any, loaderColor : any, customStyle : any, placeholderText : any, dateFormatter : any): boolean;
}


/**
 * 
 */
export declare var size : string;

/**
 * 
 */
export declare var color : boolean;

/**
 * 
 */
export declare var data : /*no type*/{};

/**
 * 
 */
declare namespace renderItem{
		
	/**
	 * 
	 * @param {item} 
	 * @return  
	 */
	function renderListItem({item} : renderItem.RenderListItem0): boolean;
}

/**
 * 
 */
declare namespace ListEmptyComponent{
		
	/**
	 * 
	 * @return  
	 */
	function renderPlaceholderText(): boolean;
}

/**
 * 
 */
export declare var refreshing : /*no type*/{};

/**
 * 
 */
declare namespace onRefresh{
		
	/**
	 * 
	 */
	function handlePullToRefresh(): void;
}

/**
 * 
 */
export declare var tintColor : /*no type*/{};

/**
 * 
 */
declare var refreshControl : {
		
	/**
	 * 
	 */
	refreshing : /* refreshing */ any;
		
	/**
	 * 
	 */
	onRefresh : /* onRefresh */ any;
		
	/**
	 * 
	 */
	tintColor : /* tintColor */ any;
}
