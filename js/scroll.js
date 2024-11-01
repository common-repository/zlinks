var scrollActive = false;


var contentHeight = 0; 	// The total height of the content
var visibleContentHeight = 0;	

var scrollHandleObj = false; // reference to the scroll handle
var scrollHandleHeight = false;
var scrollbarTop = false;
var eventYPos = false;

var scrollbuttonActive = false;
var scrollbuttonDirection = false;
var scrollbuttonSpeed = 2;
var scrollTimer = 10;	// Also how fast the content scrolls. By decreasing this value, the content will move faster	

var scrollMoveToActive = false;
var scrollMoveToYPosition = false;

var element_id = "";

var operaBrowser = false;
if(navigator.userAgent.indexOf('Opera') >= 0)
{
	operaBrowser=1;
}

	
function scrollDiv_startScroll(e)
{
	if(document.all && !operaBrowser)
	{
			e = event;
	}
	
	scrollbarTop = document.getElementById('scrolldiv_theScroll_id_' + element_id).offsetTop;
	eventYPos = e.clientY;
	scrollActive = true;
}

function scrollDiv_stopScroll()
{
	scrollActive = false;
	scrollbuttonActive = false;
	scrollMoveToActive = false;
}

function scrollDiv_scroll(e)
{
	if(scrollActive)
	{
		if(!scrollActive)
		{
			return;
		}
	}
	else
	{
		return;
	}
	
	if(document.all && !operaBrowser)
	{
			e = event;
	}
	
	if(e.button!=1 && document.all)
	{
		return;
	}
	
	var topPos = scrollbarTop + e.clientY - eventYPos; 
	
	if(topPos<0)
	{
		topPos=0;
	}
	
	if(topPos/1>visibleContentHeight-(scrollHandleHeight+4)/1)
	{
		topPos = visibleContentHeight-(scrollHandleHeight+4);
	}
	
	document.getElementById('scrolldiv_theScroll_id_' + element_id).style.top = topPos + 'px';
	document.getElementById('scrolldiv_content_id_' + element_id).style.top = 0 - Math.floor((contentHeight) * ((topPos)/(visibleContentHeight-scrollHandleHeight)))+'px' 
}

/*
Click on the slider
Move the content to the this point
*/
function scrolldiv_scrollMoveToInit(e)
{		
	if(document.all && !operaBrowser)
	{
		e = event;
	}
	
	scrollMoveToActive = true;
	scrollMoveToYPosition = e.clientY - document.getElementById('scrolldiv_scrollbar_id_' + element_id).offsetTop;
//	scrollMoveToYPosition = e.clientY;
	
	if(document.getElementById('scrolldiv_theScroll_id_' + element_id).offsetTop/1 > scrollMoveToYPosition) 
	{
		scrollbuttonDirection = scrollbuttonSpeed*-2; 
	}
	else
	{
		scrollbuttonDirection = scrollbuttonSpeed*2;
	}
	
	scrolldiv_scrollMoveTo();	
}

function scrolldiv_scrollMoveTo()
{
	// Disable scroll if the content is smaller than the scroll container
	if(document.getElementById('scrolldiv_slider_id_' + element_id).scrollHeight >= document.getElementById('scrolldiv_content_id_' + element_id).scrollHeight)
	{
		return;
	}
	
	
	if(!scrollMoveToActive || scrollActive)
	{
		return;
	}
	
	var topPos = document.getElementById('scrolldiv_theScroll_id_' + element_id).style.top.replace('px','');
	
	topPos = topPos/1 + scrollbuttonDirection;
	
	if(topPos<0)
	{
		topPos=0;
		scrollMoveToActive=false;
	}
	
	if(topPos/1>visibleContentHeight-(scrollHandleHeight+4)/1)
	{
		topPos = visibleContentHeight-(scrollHandleHeight+4);	
		scrollMoveToActive=false;
	}
	
	if(scrollbuttonDirection<0 && topPos<scrollMoveToYPosition-scrollHandleHeight/2)
	{
			return;	
	}
	
	if(scrollbuttonDirection>0 && topPos>scrollMoveToYPosition-scrollHandleHeight/2)
	{
		return;			
	}
	
	document.getElementById('scrolldiv_theScroll_id_' + element_id).style.top = topPos + 'px';
	document.getElementById('scrolldiv_content_id_' + element_id).style.top = 0 - Math.floor((contentHeight) * ((topPos)/(visibleContentHeight-scrollHandleHeight)))+'px' 		
	setTimeout('scrolldiv_scrollMoveTo()',scrollTimer);		
}

function cancelEvent()
{
	return false;			
}

function scrolldiv_scrollButtonDown()
{
	document.getElementById('scrolldiv_scrollDown_id_' + element_id).style.backgroundColor = "#A4A4A4";
	
	scrollbuttonDirection = scrollbuttonSpeed; 
	scrollbuttonActive=true;
	scrolldiv_scrollButtonScroll();
}

function scrolldiv_scrollButtonUp()
{
	document.getElementById('scrolldiv_scrollUp_id_' + element_id).style.backgroundColor = "#A4A4A4";

	scrollbuttonDirection = scrollbuttonSpeed * - 1;
	scrollbuttonActive=true;
	scrolldiv_scrollButtonScroll();
}


function scrolldiv_scrollButtonScroll()
{
	// Disable scroll if the content is smaller than the scroll container
	if(document.getElementById('scrolldiv_slider_id_' + element_id).scrollHeight >= document.getElementById('scrolldiv_content_id_' + element_id).scrollHeight)
	{
		return;
	}
	
	
	if(!scrollbuttonActive)
	{
		return;
	}
	
	var topPos = document.getElementById('scrolldiv_theScroll_id_' + element_id).style.top.replace('px','');
	
	topPos = topPos/1 + scrollbuttonDirection;
	
	if(topPos<0)
	{
		topPos=0;
		scrollbuttonActive=false;
	}
	
	if(topPos/1>visibleContentHeight-(scrollHandleHeight+4)/1)
	{
		topPos = visibleContentHeight-(scrollHandleHeight+4);	
		scrollbuttonActive=false;
	}
	
	document.getElementById('scrolldiv_theScroll_id_' + element_id).style.top = topPos + 'px';
	document.getElementById('scrolldiv_content_id_' + element_id).style.top = 0 - Math.floor((contentHeight) * ((topPos)/(visibleContentHeight-scrollHandleHeight)))+'px' 			
	
	setTimeout('scrolldiv_scrollButtonScroll()',scrollTimer);
}


function scrolldiv_scrollButtonStopUp()
{
	document.getElementById('scrolldiv_scrollUp_id_' + element_id).style.backgroundColor = "";
	scrolldiv_scrollButtonStop();
}

function scrolldiv_scrollButtonStopDown()
{
	document.getElementById('scrolldiv_scrollDown_id_' + element_id).style.backgroundColor = "";
	scrolldiv_scrollButtonStop();
}


function scrolldiv_scrollButtonStop()
{
	scrollbuttonActive = false;
}





function scrolldiv_initScroll(generated_id)
{
	document.getElementById('scrolldiv_content_id_' + generated_id).style.top = 0;	
	scrollinit(generated_id);
}

function scrolldiv_initScroll_mouseover(generated_id)
{
	scrollinit(generated_id);
}


function scrollinit(generated_id)
{
	element_id = generated_id;
	visibleContentHeight = document.getElementById('scrolldiv_scrollbar_id_' + generated_id).offsetHeight ;
	contentHeight = document.getElementById('scrolldiv_content_id_' +  generated_id).offsetHeight - visibleContentHeight;		
	scrollHandleObj = document.getElementById('scrolldiv_theScroll_id_' + generated_id);
	scrollHandleHeight = scrollHandleObj.offsetHeight;
	scrollbarTop = document.getElementById('scrolldiv_scrollbar_id_' + generated_id).offsetTop;		
	document.getElementById('scrolldiv_theScroll_id_' + generated_id).onmousedown = scrollDiv_startScroll;
	document.body.onmousemove = scrollDiv_scroll;
	document.getElementById('scrolldiv_scrollbar_id_' + generated_id).onselectstart = cancelEvent;
	document.getElementById('scrolldiv_theScroll_id_' + generated_id).onmouseup = scrollDiv_stopScroll;
	
	if(document.all)
	{
		document.body.onmouseup = scrollDiv_stopScroll; 
	}
	else 
	{
		document.documentElement.onmouseup = scrollDiv_stopScroll;
	}
	
	document.getElementById('scrolldiv_scrollDown_id_' + generated_id).onmousedown = scrolldiv_scrollButtonDown;
	document.getElementById('scrolldiv_scrollUp_id_' + generated_id).onmousedown = scrolldiv_scrollButtonUp;
	document.getElementById('scrolldiv_scrollDown_id_' + generated_id).onmouseup = scrolldiv_scrollButtonStopDown;
	document.getElementById('scrolldiv_scrollUp_id_' + generated_id).onmouseup = scrolldiv_scrollButtonStopUp;
	document.getElementById('scrolldiv_scrollUp_id_' + generated_id).onselectstart = cancelEvent;
	document.getElementById('scrolldiv_scrollDown_id_' + generated_id).onselectstart = cancelEvent;
	document.getElementById('scrolldiv_scrollbar_id_' + generated_id).onmousedown = scrolldiv_scrollMoveToInit;
	
	// resize the scroll until it reaches 400 in height.
	
	var content_height = document.getElementById('scrolldiv_content_id_' +  generated_id).scrollHeight;
	
 	if(content_height < 400)
	{
		document.getElementById('scrolldiv_slider_id_' + generated_id).style.height = content_height + 'px';
		
		if(content_height - 47 <= 0)
		{
			document.getElementById('scrolldiv_scrollbar_id_' + generated_id).style.height = "13px";
			document.getElementById('content_container_id_' + generated_id).style.height = "52px";
		}
		else
		{
			document.getElementById('scrolldiv_scrollbar_id_' + generated_id).style.height = (content_height - 34) + 'px';
			document.getElementById('content_container_id_' + generated_id).style.height = (content_height +5) + 'px';
		}
		
	}
	else
	{
		document.getElementById('scrolldiv_slider_id_' + generated_id).style.height = "400px";
		document.getElementById('scrolldiv_scrollbar_id_' + generated_id).style.height = "366px";
		document.getElementById('content_container_id_' + generated_id).style.height = "405px";
	}
}


// From dhtmlgoodies.com with many modifications to make it working.
