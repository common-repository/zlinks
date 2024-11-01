var reqs  = new Array();
var reqs2 = new Array();
var reqs3 = new Array();

function assignPopup(element, uri, local_path) 
{
	var popup_show_timeout_id;
	var popup_hide_timeout_id;
	
    if(element.id == "" && !isAnnotationPopupOpen(element)) /* only way to get it working on FF, IE, safari, and opera. There is an issue in Event un-registration with IE. */
    {
		var generated_id = generateId();
		
        element.id = 'zitgist_popup_btn_' + generated_id;
		
		var zitgist_popup = OAT.Dom.create("div",{},"zitgist_popup");
		
		/*@cc_on
			zitgist_popup = OAT.Dom.create("div",{},"zitgist_popup_ie");
		@*/
		
		zitgist_popup.id = "zitgist_popup_" + generated_id;
		OAT.Style.opacity(zitgist_popup, 0);
		OAT.Dom.hide(zitgist_popup);
		document.body.appendChild(zitgist_popup);
		
		var header_container = OAT.Dom.create("div",{},"header_container");
		zitgist_popup.appendChild(header_container);
	
//		header_container.innerHTML = "<center><a href=\"http://zlinks.zitgist.com\" style=\"color:#666666;\" alt=\"zLinks Homepage\" target=\"_blank\"><img src=\""+local_path+"/imgs/zlinks_logo_45.png\" alt=\"zLinks homepage\" title=\"zLinks homepage\" border=\"0\" /></a></center><span style=\"float:right; position:relative; top:-15px;\"><a href=\"http://zlinks.zitgist.com/faq.html\" style=\"color:#666666;\" alt=\"FAQ about zLinks\" target=\"_blank\"><strong>FAQ</strong></a>&nbsp;&nbsp;<a href=\"http://zlinks.zitgist.com/news.html\" target=\"_blank\" style=\"color:#666666;\" alt=\"News about zLinks\"><strong>News</strong></a></span>";

		header_container.innerHTML = "<table width=\"400\"><tr><td align=\"left\"><a href=\"http://zlinks.zitgist.com\" style=\"color:#666666;\" alt=\"zLinks Homepage\" target=\"_blank\"><img style=\"margin-left:30px;\" src=\""+local_path+"/imgs/zlinks_logo_45.png\" alt=\"zLinks homepage\" title=\"zLinks homepage\" border=\"0\" /></a></td><td align=\"center\" width=\"75%\"></td><td align=\"right\"><a href=\"http://zlinks.zitgist.com/faq.html\" style=\"color:#666666;\" alt=\"FAQ about zLinks\" target=\"_blank\"><strong>FAQ</strong></a>&nbsp;&nbsp;<a href=\"http://zlinks.zitgist.com/news.html\" target=\"_blank\" style=\"color:#666666;\" alt=\"News about zLinks\"><strong>News</strong></a></td></tr></table>";


		/*@cc_on
			var br = OAT.Dom.create("br",{},"");
			zitgist_popup.appendChild(br);
	
			var br = OAT.Dom.create("br",{},"");
			zitgist_popup.appendChild(br);
	
			var br = OAT.Dom.create("br",{},"");
			zitgist_popup.appendChild(br);
		@*/


		var content_container = OAT.Dom.create("div",{},"content_container");
		content_container.id = "content_container_id_" + generated_id;
		zitgist_popup.appendChild(content_container);

		var scroll_prent_content_container = OAT.Dom.create("div",{},"scrolldiv_parentContainer");
		scroll_prent_content_container.id = "scrolldiv_parentContainer_id_" + generated_id;
		content_container.appendChild(scroll_prent_content_container);


		var scroll_content_container = OAT.Dom.create("div",{},"scrolldiv_content");
		scroll_content_container.id = "scrolldiv_content_id_" + generated_id;
		scroll_prent_content_container.appendChild(scroll_content_container);

	
		// Service Container 1
		var service_1_container = OAT.Dom.create("div",{},"service_1_container");
		service_1_container.id = "service_1_container_id_" + generated_id;
		scroll_content_container.appendChild(service_1_container);

		var menu1 = OAT.Dom.create("div",{},"zitgist_menu");		
		service_1_container.appendChild(menu1);
		
		var waiting_container1 = OAT.Dom.create("div",{},"waiting_container");
		menu1.appendChild(waiting_container1);
		
		waiting_container1.innerHTML = service_1_container.innerHTML + '<img src="' + local_path + 'imgs/waiting_ajax.gif" border="0" style="padding:10px 50px 10px 50px; " />';	
		
		var menu_separator1 = OAT.Dom.create("div",{},"zitgist_menu_separator");		
		menu1.appendChild(menu_separator1);					


		// Service Container 3
		var service_3_container = OAT.Dom.create("div",{},"service_3_container");
		service_3_container.id = "service_3_container_id_" + generated_id;
		scroll_content_container.appendChild(service_3_container);

		var menu3 = OAT.Dom.create("div",{},"zitgist_menu");		
		service_3_container.appendChild(menu3);
		
		var waiting_container3 = OAT.Dom.create("div",{},"waiting_container");
		menu3.appendChild(waiting_container3);
		
		waiting_container3.innerHTML = service_3_container.innerHTML + '<img src="' + local_path + 'imgs/waiting_ajax.gif" border="0" style="padding:10px 50px 10px 50px; " />';	
		
		var menu_separator3 = OAT.Dom.create("div",{},"zitgist_menu_separator");		
		menu3.appendChild(menu_separator3);					


		// Service Container 2
		var service_2_container = OAT.Dom.create("div",{},"service_2_container");
		service_2_container.id = "service_2_container_id_" + generated_id;
		scroll_content_container.appendChild(service_2_container);

		var menu2 = OAT.Dom.create("div",{},"zitgist_menu");		
		service_2_container.appendChild(menu2);
		
		var waiting_container2 = OAT.Dom.create("div",{},"waiting_container");
		menu2.appendChild(waiting_container2);
		
		waiting_container2.innerHTML = service_2_container.innerHTML + '<img src="' + local_path + 'imgs/waiting_ajax.gif" border="0" style="padding:10px 50px 10px 50px; " />';	
		


		var scrolldiv_slider = OAT.Dom.create("div",{},"scrolldiv_slider");
		scrolldiv_slider.id = "scrolldiv_slider_id_" + generated_id;
		content_container.appendChild(scrolldiv_slider);

		var scrolldiv_scrollUp = OAT.Dom.create("div",{},"scrolldiv_scrollUp");
		scrolldiv_scrollUp.id = "scrolldiv_scrollUp_id_" + generated_id;
		scrolldiv_slider.appendChild(scrolldiv_scrollUp);

		var scrolldiv_scrollbar = OAT.Dom.create("div",{},"scrolldiv_scrollbar");
		scrolldiv_scrollbar.id = "scrolldiv_scrollbar_id_" + generated_id;
		scrolldiv_slider.appendChild(scrolldiv_scrollbar);

		var scrolldiv_theScroll = OAT.Dom.create("div",{},"scrolldiv_theScroll");
		scrolldiv_theScroll.id = "scrolldiv_theScroll_id_" + generated_id;
		scrolldiv_scrollbar.appendChild(scrolldiv_theScroll);

		var scrolldiv_theScroll_span = OAT.Dom.create("span",{},"");
		scrolldiv_theScroll.appendChild(scrolldiv_theScroll_span);



		var scrolldiv_scrollDown = OAT.Dom.create("div",{},"scrolldiv_scrollDown");
		scrolldiv_scrollDown.id = "scrolldiv_scrollDown_id_" + generated_id;
		scrolldiv_slider.appendChild(scrolldiv_scrollDown);


		scrolldiv_initScroll(generated_id);


		var a1 = new OAT.AnimationOpacity(zitgist_popup,{opacity:1});
		var a2 = new OAT.AnimationOpacity(zitgist_popup,{opacity:0});
	
	
	
		// First mouseover behavior
		var position = OAT.Dom.position(element);
		
		
		load_service_1(uri, service_1_container, local_path); // Web Page + Semantic Page
		load_service_3(uri, service_3_container, local_path); // Author's Annotations
		load_service_2(uri, service_2_container, local_path); // Semantic Web Entities
		
		/*@cc_on
		popup_show_timeout_id = setTimeout((function show_zlinks_popup(zitgist_popup, position, a1, a2)
																		{
																			return function()
																			{
																				// Check if the annotation window is already open. If it is not, then show the zitgist_popup
																				if(!isAnnotationPopupOpen(document.getElementById("zitgist_popup_btn_" + zitgist_popup.id.substr(14, zitgist_popup.id.length - 14))))
																				{
																					a2.stop();
																			
																					zitgist_popup.style.left = (position[0]+10)+"px";
																					zitgist_popup.style.top = (position[1]+5)+"px";
																					
																					
																					OAT.Dom.show(zitgist_popup);
																					a1.start();
																					
																					reposition_popup(zitgist_popup);
																				}
																			}
																			
																		}	)(zitgist_popup, position, a1, a2), 500);	
		@*/

		if(!OAT.Browser.isIE)
		{
			popup_show_timeout_id = setTimeout(show_zlinks_popup, 500, zitgist_popup, position, a1, a2);	
		}


		var scroll_over = false;
		
		OAT.Event.attach(content_container,"mouseover",function(event) { /* start displaying on mouseover */
			if(scroll_over == false)
			{				
				if (window.addEventListener)
						// DOMMouseScroll is for mozilla. 
						window.addEventListener('DOMMouseScroll', wheel, false);
				// IE/Opera. 
				window.onmousewheel = document.onmousewheel = wheel;
				
				scrolldiv_initScroll_mouseover(generated_id);	
				scroll_over = true;
			}
		});
	

		OAT.Event.attach(content_container,"mouseout",function(event) { /* start displaying on mouseover */
			if(scroll_over == true)
			{
				if (window.removeEventListener)
						// DOMMouseScroll is for mozilla. 
						window.removeEventListener('DOMMouseScroll', wheel, false);
				// IE/Opera. 
				window.onmousewheel = document.onmousewheel = null;
			
				scroll_over = false;
			}
			
		});

	
	
		OAT.MSG.attach(a2.animation,OAT.MSG.ANIMATION_STOP,function(){ /* hide after opacity gets to 0 */
			OAT.Dom.hide(zitgist_popup);
		});
	
		// Re-asign the mouse over event.
		OAT.Event.attach(element,"mouseover",function(event) { /* start displaying on mouseover */

			var position = OAT.Event.position(event);
			
			clearTimeout(popup_hide_timeout_id);
			
			/*@cc_on
				popup_show_timeout_id = setTimeout((function show_zlinks_popup(zitgist_popup, position, a1, a2)
																			{
																				return function()
																				{
																					if(!isAnnotationPopupOpen(document.getElementById("zitgist_popup_btn_" + zitgist_popup.id.substr(14, zitgist_popup.id.length - 14))))
																					{
																						a2.stop();
																				
																						zitgist_popup.style.left = (position[0]+10)+"px";
																						zitgist_popup.style.top = (position[1]+5)+"px";
																						
																						
																						OAT.Dom.show(zitgist_popup);
																						a1.start();
																						
																						reposition_popup(zitgist_popup);
																					}
																				}
																				
																			}	)(zitgist_popup, position, a1, a2), 500);	
			@*/

			if(!OAT.Browser.isIE)
			{
				popup_show_timeout_id = setTimeout(show_zlinks_popup, 500, zitgist_popup, position, a1, a2);
			}

		});
		
		OAT.Event.attach(element,"mouseout",function(event) { /* start hiding on mouseout */
													 
			clearTimeout(popup_show_timeout_id);

			/*@cc_on
				popup_hide_timeout_id = setTimeout((function hide_zlinks_popup(a1, a2)
																			{
																				return function()
																				{
																					a1.stop();
																					a2.start();
																				}
																				
																			}	)(a1, a2), 1000);	
			@*/

			if(!OAT.Browser.isIE)
			{
				popup_hide_timeout_id = setTimeout(hide_zlinks_popup, 1000,  a1, a2);
			}

		});
		
	
		OAT.Event.attach(zitgist_popup,"mouseover",function(event) { /* start displaying on mouseover */
			clearTimeout(popup_hide_timeout_id);
			OAT.Dom.show(zitgist_popup);
			a1.start();
		});
	
		OAT.Event.attach(zitgist_popup,"mouseout",function(event) { /* start hiding on mouseout */
			clearTimeout(popup_show_timeout_id);

			/*@cc_on
				popup_hide_timeout_id = setTimeout((function hide_zlinks_popup(a1, a2)
																			{
																				return function()
																				{
																					a1.stop();
																					a2.start();
																				}
																				
																			}	)(a1, a2), 1000);	
			@*/
			
			if(!OAT.Browser.isIE)
			{
				popup_hide_timeout_id = setTimeout(hide_zlinks_popup, 1000,  a1, a2);
			}
			
		});
        
        // The problem here was that the scrolldiv_initScroll function was trigged before the content of the popup (waiting_icons) when loaded by Firefox. So we have to delay the init of the scroll to make sure
        // that the images are loaded so that the scroll get the good length.
        // This issue doesn't exist in IE, so we don't ahve to handle ti for this browser.
        if(!OAT.Browser.isIE)
        {
            setTimeout(delay_scroll, 1000,  generated_id);
        }         
	}
}

function delay_scroll(generated_id)
{
    scrolldiv_initScroll(generated_id);
    
}
	
function show_zlinks_popup(zitgist_popup, position, a1, a2)
{
	if(!isAnnotationPopupOpen(document.getElementById("zitgist_popup_btn_" + zitgist_popup.id.substr(14, zitgist_popup.id.length - 14))))
	{
		a2.stop();
	
		zitgist_popup.style.left = (position[0]+10)+"px";
		zitgist_popup.style.top = (position[1]+5)+"px";
		
		
		OAT.Dom.show(zitgist_popup);
		a1.start();
		
		reposition_popup(zitgist_popup);
	}
}

function hide_zlinks_popup(a1, a2)
{
	a1.stop();
	a2.start();
}

 	
	
function load_service_1(uri, element, local_path) 
{
	var imgs_path = local_path + 'imgs/';
	var url     = local_path + 'proxy.php?';
	url           = url + 'service=all&';
	url           = url + 'from='+local_path+'&';
	url           = url + 'uri=' + escape(uri);

	reqs.push(load_service_response_XML_1(url, uri, element.firstChild, imgs_path));
}

function load_service_2(uri, element, local_path) 
{
	var imgs_path = local_path + 'imgs/';
	var url     = local_path + 'proxy.php?';
	url           = url + 'service=rdf&';
	url           = url + 'from='+local_path+'&';
	url           = url + 'uri=' + escape(uri);

	reqs2.push(load_service_response_XML_2(url, uri, element.firstChild, imgs_path));
}

function load_service_3(uri, element, local_path) 
{
	var imgs_path = local_path + 'imgs/';
	var url     = local_path + 'annotations.php?';
	url           = url + 'uri=' + escape(uri);
	
	reqs3.push(load_service_response_XML_3(url, uri, element.firstChild, imgs_path));
}


function load_service_response_XML_1(url, uri, element, imgs_path) 
{
	var req;
	
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest) 
	{
		req = new XMLHttpRequest();
		req.element = element;
		req.imgs_path = imgs_path;
		req.onreadystatechange = process_service_response_1;
		req.open("GET", url, true);
		req.send(null);
	// branch for IE/Windows ActiveX version
	} 
	else if (window.ActiveXObject) 
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) 
		{
			req.element = element;
			req.imgs_path = imgs_path;
			req.onreadystatechange = process_service_response_1;
			req.open("GET", url, true);
			req.send();
		}
	}
	
	return req;
}


function load_service_response_XML_2(url, uri, element, imgs_path) 
{
	var req2;

	// branch for native XMLHttpreq2uest object
	if (window.XMLHttpRequest) 
	{
		req2 = new XMLHttpRequest();
		req2.element = element;
		req2.imgs_path = imgs_path;
		req2.onreadystatechange = process_service_response_2;
		req2.open("GET", url, true);
		req2.send(null);
	// branch for IE/Windows ActiveX version
	} 
	else if (window.ActiveXObject) 
	{
		req2 = new ActiveXObject("Microsoft.XMLHTTP");
		if (req2) 
		{
			req2.element = element;
			req2.imgs_path = imgs_path;
			req2.onreadystatechange = process_service_response_2;
			req2.open("GET", url, true);
			req2.send();
		}
	}
	
	return req2;
}

function load_service_response_XML_3(url, uri, element, imgs_path) 
{
	var req3;
	
	// branch for native XMLHttpreq2uest object
	if (window.XMLHttpRequest) 
	{
		req3 = new XMLHttpRequest();
		req3.element = element;
		req3.imgs_path = imgs_path;
		req3.onreadystatechange = process_service_response_3;
		req3.open("GET", url, true);
		req3.send(null);
	// branch for IE/Windows ActiveX version
	} 
	else if (window.ActiveXObject) 
	{
		req3 = new ActiveXObject("Microsoft.XMLHTTP");
		if (req3) 
		{
			req3.element = element;
			req3.imgs_path = imgs_path;
			req3.onreadystatechange = process_service_response_3;
			req3.open("GET", url, true);
			req3.send();
		}
	}
	
	return req3;
}

function process_service_response_1() 
{
	for (var i = 0; i < reqs.length; i++) 
	{	
		if (reqs[i].readyState == 4) 
		{
			window.status = '';
			if (reqs[i].status == 200) 
			{
				if(reqs[i].element)
				{
					reqs[i].element.innerHTML = "";					
				}
				
				if(reqs[i].responseXML)
				{
					var response = reqs[i].responseXML.documentElement;
					var blank_icon = "<img src=\"" + reqs[i].imgs_path + "blank.gif\" border=\"0\" class=\"zitgist_menu_img\" />";
		
					var isAnyElement = false;
		
					if(response.getElementsByTagName('amazon')[0]) 
					{
						var buyurl = response.getElementsByTagName('amazon')[0].getElementsByTagName('buyurl')[0].firstChild.data;
						
						var menu_item = OAT.Dom.create("div",{},"zitgist_menu_item");
						menu_item.innerHTML = '<a href="' + buyurl +'">' + blank_icon + '<img alt=\"Buy on Amazon.com\" title=\"Buy on Amazon.com\" src="' + reqs[i].imgs_path + 'amazon.gif" border="0" class="zitgist_menu_img"  />' + 'Buy on Amazon</a>';
						reqs[i].element.appendChild(menu_item);
						
						isAnyElement = true;
					}	
		
		
					if(response.getElementsByTagName('webpage')[0]) 
					{
						var menu_item = OAT.Dom.create("div",{},"zitgist_menu_item");
						var url = "";
						
						if(response.getElementsByTagName('amazon')[0])
						{
							url = unescape(response.getElementsByTagName('webpage')[0].firstChild.data) + '/searchcom07-20';
						}
						else
						{
							url = unescape(response.getElementsByTagName('webpage')[0].firstChild.data);
						}
						
						menu_item.innerHTML = '<a href="' + url +'">' + blank_icon + '<img alt=\"See the Web Page\" title=\"See the Web page\" src="' + reqs[i].imgs_path + 'webpage.gif" border="0" class="zitgist_menu_img"  />' + 'Web page</a>';
						reqs[i].element.	appendChild(menu_item);
						
						isAnyElement = true;
					}	
					
					if(response.getElementsByTagName('rdfdocument')[0]) 
					{
						var menu_item = OAT.Dom.create("div",{},"zitgist_menu_item");
						menu_item.innerHTML = '<a href="http://browser.zitgist.com/?uri=' + response.getElementsByTagName('rdfdocument')[0].firstChild.data+'">' + blank_icon + '<img alt=\"See the Semantic Web Page\" title=\"See the Semantic Web Page\" src="' + reqs[i].imgs_path + 'semanticpage.gif" border="0" class="zitgist_menu_img" />' + 'Semantic page</a>';
						reqs[i].element.	appendChild(menu_item);
						
						isAnyElement = true;
					}	
					
					if(isAnyElement)
					{
						var menu_separator = OAT.Dom.create("div",{},"zitgist_menu_separator");		
						reqs[i].element.appendChild(menu_separator);		
					}
					
					
					if(reqs[i].element)
					{
						reposition_popup(reqs[i].element.parentNode.parentNode.parentNode.parentNode.parentNode);
					}
					
					scrolldiv_initScroll(reqs[i].element.parentNode.parentNode.id.substr(21, reqs[i].element.parentNode.parentNode.id.length - 21));
				}
			}
		}
	}
}

function process_service_response_2() 
{
	for (var ii = 0; ii < reqs2.length; ii++) 
	{	
		if (reqs2[ii].readyState == 4) 
		{
			window.status = '';
			
			if (reqs2[ii].status == 200) 
			{
				if(reqs2[ii].element)
				{
					reqs2[ii].element.innerHTML = "";					
				}
	
				if(reqs2[ii].responseXML)
				{
					var response = reqs2[ii].responseXML.documentElement;			
					
					for(var i = 0; i < response.getElementsByTagName('entity').length; i++)
					{
						if(response.getElementsByTagName('entity')[i]) 
						{
							var menu_item = OAT.Dom.create("div",{},"zitgist_menu_item");
							var entity = response.getElementsByTagName('entity')[i];
							
							var entity_type = extractTypeName(entity.attributes[2].nodeValue)
							var entity_img = reqs2[ii].imgs_path;
							
							entity_img = entity_img + entity_type + ".gif";
							
							var entity_rel_backlink = "<img src=\"" + reqs2[ii].imgs_path + "blank.gif\" border=\"0\" class=\"zitgist_menu_img\" />";
							
							if(entity.attributes[5].nodeValue == "backlink")
							{
								entity_rel_backlink = "<img alt=\"Incoming reference has predicate: "+extractTypeName(entity.attributes[4].nodeValue)+"\" title=\"Incoming reference. Relation: "+extractTypeName(entity.attributes[4].nodeValue)+"\" src=\"" + reqs2[ii].imgs_path + "backlink.gif\" border=\"0\" class=\"zitgist_menu_img\" />";
							}
							
							
							if(entity.attributes[3].nodeValue == "")
							{
								if(entity_type == "")
								{							
									menu_item.innerHTML = '<a href="http://browser.zitgist.com/?uri=' + escape(entity.attributes[0].nodeValue) + '&dataspace='+ escape(entity.attributes[1].nodeValue)  +'">' + entity_rel_backlink + '<img onerror="this.onerror=null; this.src=\'' + reqs2[ii].imgs_path + 'undefined.gif\';" src="' + entity_img + '" border="0" class="zitgist_menu_img" alt=\"Resource type: '+entity_type+'\" title=\"Resource type: '+entity_type+'\" />' + entity_rel_backlink + 'undefined</a>';
								}
								else
								{
									menu_item.innerHTML = '<a href="http://browser.zitgist.com/?uri=' + escape(entity.attributes[0].nodeValue) + '&dataspace='+ escape(entity.attributes[1].nodeValue)  +'">' + entity_rel_backlink + '<img onerror="this.onerror=null; this.src=\'' + reqs2[ii].imgs_path + 'undefined.gif\';" src="' + entity_img + '" border="0" class="zitgist_menu_img" alt=\"Resource type: '+entity_type+'\" title=\"Resource type: '+entity_type+'\" />' + entity_type + '</a>'				
								}
							}
							else
							{
								if(entity_type == "")
								{
									menu_item.innerHTML = '<a href="http://browser.zitgist.com/?uri=' + escape(entity.attributes[0].nodeValue) + '&dataspace='+ escape(entity.attributes[1].nodeValue)  +'">' + entity_rel_backlink + '<img onerror="this.onerror=null; this.src=\'' + reqs2[ii].imgs_path + 'undefined.gif\';" src="' + entity_img + '" border="0" class="zitgist_menu_img" alt=\"Resource type: '+entity_type+'\" title=\"Resource type: '+entity_type+'\" />' + entity.attributes[3].nodeValue + '</a>';
								}
								else
								{
									menu_item.innerHTML = '<a href="http://browser.zitgist.com/?uri=' + escape(entity.attributes[0].nodeValue) + '&dataspace='+ escape(entity.attributes[1].nodeValue)  +'">' + entity_rel_backlink + '<img onerror="this.onerror=null; this.src=\'' + reqs2[ii].imgs_path + 'undefined.gif\';" src="' + entity_img + '" border="0" class="zitgist_menu_img" alt=\"Resource type: '+entity_type+'\" title=\"Resource type: '+entity_type+'\" />' + entity.attributes[3].nodeValue + ' <em>(' + entity_type + ')</em></a>';								
								}
							}
	
							reqs2[ii].element.appendChild(menu_item);
						}		
					}
					
					if(reqs2[ii].element)
					{
						reposition_popup(reqs2[ii].element.parentNode.parentNode.parentNode.parentNode.parentNode);
					}
					
					scrolldiv_initScroll(reqs2[ii].element.parentNode.parentNode.id.substr(21, reqs2[ii].element.parentNode.parentNode.id.length - 21));
				}
			}
		}
	}
}




function process_service_response_3() 
{
	for (var iii = 0; iii < reqs3.length; iii++) 
	{	
		if (reqs3[iii].readyState == 4) 
		{
			window.status = '';
			
			if (reqs3[iii].status == 200) 
			{
				if(reqs3[iii].element)
				{
					reqs3[iii].element.innerHTML = "";					
				}
	
				if(reqs3[iii].responseXML)
				{
					var response = reqs3[iii].responseXML.documentElement;			
					
					for(var i = 0; i < response.getElementsByTagName('annotation').length; i++)
					{
						if(response.getElementsByTagName('annotation')[i]) 
						{
							var menu_item = OAT.Dom.create("div",{},"zitgist_menu_item");
							var annotation_item = response.getElementsByTagName('annotation')[i];
									
							var annotation_item_body = OAT.Dom.create("div",{},"annotation_item_body");
							
							menu_item.appendChild(annotation_item_body);
							
							var clean_text = removeHTML(annotation_item.getElementsByTagName('body')[0].firstChild.data);
	
							var icons = "<img src=\"" + reqs3[iii].imgs_path + "blank.gif\" border=\"0\" class=\"zitgist_menu_img\" /><img src=\""+reqs3[iii].imgs_path+"annotation.gif\"  style=\"padding-right:5px;\" alt=\"Author's annotation\" title=\"Author's annotation\" />";
	
							if(clean_text.length > 50)
							{
								annotation_item_body.innerHTML = icons + clean_text.substr(0, 50) + "... <br /><br /><center><a style=\"cursor:pointer;	font-size:125%;\" id=\"dimmer_content_a_id_" + annotation_item.getElementsByTagName('id')[0].firstChild.data+"\">Read full annotation</a></center>";
	
								// Adding the anchor element to open the dimmer
								menu_item.appendChild(annotation_item_body);
								
								
								// Creating the Dimmer content
								var dimmer_content = OAT.Dom.create("div",{},"seemore_dimmer_content");
								dimmer_content.id = "dimmer_content_id_" + annotation_item.getElementsByTagName('id')[0].firstChild.data;
								
								OAT.Dom.hide(dimmer_content);
								OAT.Dom.attach(annotation_item_body.getElementsByTagName('a')[0], "click", function (event) {
																													 
									var id = OAT.Event.source(event).id.substr(19,OAT.Event.source(event).id.length - 19);
									OAT.Dimmer.show(document.getElementById("dimmer_content_id"+id), {popup:true}); 
									OAT.Dom.center(document.getElementById("dimmer_content_id"+id), 1, 1);
									
								});
								
								// Dimmer close button
								var dimmer_content_close_btn = OAT.Dom.create("img",{},"close_dimmer_btn");
								dimmer_content_close_btn.src = reqs3[iii].imgs_path+"close.gif";
								dimmer_content_close_btn.alt = "Close";
								dimmer_content_close_btn.title = "Close";
								dimmer_content.appendChild(dimmer_content_close_btn);
								
								OAT.Dom.attach(dimmer_content_close_btn, "click", function (event) {
									OAT.Dimmer.hide();
								});
								
								var dimmer_content_p = OAT.Dom.create("p",{},"");
								dimmer_content.appendChild(dimmer_content_p);
	
	
								dimmer_content_p.innerHTML = annotation_item.getElementsByTagName('body')[0].firstChild.data;
								
								menu_item.appendChild(dimmer_content);
								
							}
							else
							{
								annotation_item_body.innerHTML = icons + annotation_item.getElementsByTagName('body')[0].firstChild.data;
							}
	
							reqs3[iii].element.appendChild(menu_item);
							
							var menu_separator = OAT.Dom.create("div",{},"zitgist_menu_separator");		
							reqs3[iii].element.appendChild(menu_separator);	
							
						}		
					}
					
					if(reqs3[iii].element)
					{
						reposition_popup(reqs3[iii].element.parentNode.parentNode.parentNode.parentNode.parentNode);
					}
					
					scrolldiv_initScroll(reqs3[iii].element.parentNode.parentNode.id.substr(21, reqs3[iii].element.parentNode.parentNode.id.length - 21));
				}
			}
		}
	}
}


function extractTypeName(typeUri)
{
	if(typeUri.lastIndexOf('#') > 0)
	{
		return typeUri.substring(typeUri.lastIndexOf('#') + 1, typeUri.length).toLowerCase();
	}
	else
	{
		return typeUri.substring(typeUri.lastIndexOf('/') + 1, typeUri.length).toLowerCase();
	}
}

function generateId() 
{
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) 
	{
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

function removeHTML(str)
{
	return(str.replace(/<\/?[^>]+(>|$)/g, ""));
}

function reposition_popup(element)
{
	var window_top = window.pageYOffset;
	/*@cc_on
		window_top = document.documentElement.scrollTop;
	@*/
	
	var window_height = window.innerHeight;
	/*@cc_on
		window_height = document.documentElement.clientHeight;
	@*/
	var window_bottom = window_top + window_height;
	
	var popup_top = element.offsetTop;
	var popup_height = element.scrollHeight;
	var popup_bottom = popup_top + popup_height;
	
	// Check if the popup is bellow the bottom fold
	if(popup_bottom > window_bottom)
	{
		var move_top = 0;
		
		if(window_height <= popup_height)
		{
			move_top = window_top + 20;
		}
		else
		{
			move_top = popup_top - ( popup_height - (window_bottom - popup_top));
			
			move_top = move_top - 30;
		}
		
		element.style.top = move_top+"px";
	}
    
    // Now reposition from left to right.
    
    var window_width = window.innerWidth;
    /*@cc_on
        window_width = document.documentElement.clientWidth;
    @*/
   
    var popup_width = element.scrollWidth;
    var popup_left = element.offsetLeft;

    if((popup_left + popup_width) > window_width)
    {
        var move_left = 0;
        
        move_left = window_width - popup_width - 20;
        
        element.style.left = move_left+"px";
    }    
}

function isAnnotationPopupOpen(element)
{
	// Check if the annotation window is already open. If it is not, then show the zitgist_popup
	if(element)
	{
		if(element.previousSibling.nodeName == "IMG")
		{
			var id = element.previousSibling.id.substr(21, element.previousSibling.id.length - 21);
			if(!document.getElementById("annotation_popup_" + id) || document.getElementById("annotation_popup_" + id).style.display == "none")
			{
				return false;
			}
			return true;
		}
		return false;
	}
	
	return false;
}


function wheel(event){
        var delta = 0;
        if (!event) 
                event = window.event;
        if (event.wheelDelta) {
                delta = event.wheelDelta/120;
                if (window.opera)
                        delta = -delta;
        } else if (event.detail) {
                delta = -event.detail/3;
        }
        if (delta)
                mouse_wheel_handle(delta);
        if (event.preventDefault)
                event.preventDefault();
	event.returnValue = false;
}

function mouse_wheel_handle(delta)
{
	if(navigator.userAgent.indexOf('Opera') >= 0)
	{	
		if(delta < 0)
		{
			var backup_speed = scrollbuttonSpeed;
			scrollbuttonSpeed = scrollbuttonSpeed * 5;
			scrolldiv_scrollButtonUp();
			scrolldiv_scrollButtonStopUp();
			scrollbuttonSpeed = backup_speed;
		}
		
		if(delta > 0)
		{
			var backup_speed = scrollbuttonSpeed;
			scrollbuttonSpeed = scrollbuttonSpeed * 5;
			scrolldiv_scrollButtonDown();
			scrolldiv_scrollButtonStopDown();
			scrollbuttonSpeed = backup_speed;
		}
	}
	else
	{
		if(delta > 0)
		{
			var backup_speed = scrollbuttonSpeed;
			scrollbuttonSpeed = scrollbuttonSpeed * 5;
			scrolldiv_scrollButtonUp();
			scrolldiv_scrollButtonStopUp();
			scrollbuttonSpeed = backup_speed;
		}
		
		if(delta < 0)
		{
			var backup_speed = scrollbuttonSpeed;
			scrollbuttonSpeed = scrollbuttonSpeed * 5;
			scrolldiv_scrollButtonDown();
			scrolldiv_scrollButtonStopDown();
			scrollbuttonSpeed = backup_speed;
		}
	}
}