
var save_type = "new";
var current_edited_annotation_element = -1;


function assignAnnotationPopup(element, uri, local_path, author_id) 
{
    if(element.id == "") /* only way to get it working on FF, IE, safari, and opera. There is an issue in Event un-registration with IE. */
    {
		var generated_id = generateId();

		element.id = 'annotation_popup_btn_' + generated_id;
		
		var uri = uri;
		
		var zitgist_popup = OAT.Dom.create("div",{},"zitgist_popup");
		zitgist_popup.id = "annotation_popup_" + generated_id;
		OAT.Style.opacity(zitgist_popup, 0);
		OAT.Dom.hide(zitgist_popup);
		document.body.appendChild(zitgist_popup);
		
		var header_container = OAT.Dom.create("div",{},"header_container_annotations");
		zitgist_popup.appendChild(header_container);
	
	
		header_container.innerHTML = "<table width=\"400\"><tr><td align=\"left\"><a href=\"http://zlinks.zitgist.com\" style=\"color:#666666;\" alt=\"zLinks Homepage\" target=\"_blank\"><img style=\"margin-left:30px;\" src=\""+local_path+"/imgs/zlinks_logo_45.png\" alt=\"zLinks homepage\" title=\"zLinks homepage\" border=\"0\" /></a></td><td align=\"center\" width=\"75%\"></td><td align=\"right\"><a href=\"http://zlinks.zitgist.com/faq.html\" style=\"color:#666666;\" alt=\"FAQ about zLinks\" target=\"_blank\"><strong>FAQ</strong></a>&nbsp;&nbsp;<a href=\"http://zlinks.zitgist.com/news.html\" target=\"_blank\" style=\"color:#666666;\" alt=\"News about zLinks\"><strong>News</strong></a></td></tr></table>";

	
		var annotations_container = OAT.Dom.create("div",{},"annotations_container");
		zitgist_popup.appendChild(annotations_container);
	
		show_annotations(uri, annotations_container, local_path);
	
		var add_annotation_container = OAT.Dom.create("div",{},"editor_annotation_container");
		zitgist_popup.appendChild(add_annotation_container);
		
		var annotation_button_container = OAT.Dom.create("div",{},"btn_annotation_container");
		zitgist_popup.appendChild(annotation_button_container);
	
		var annotation_editor = OAT.Dom.create("textarea",{},"annotation_editor");
		add_annotation_container.appendChild(annotation_editor);
	
		var annotation_button = OAT.Dom.create("img",{},"annotation_button");
		annotation_button.src = local_path + 'imgs/annotate_btn.gif';
		annotation_button_container.appendChild(annotation_button);
	
		OAT.Event.attach(annotation_button,"click",function(event) 
		{
			
			// Check if we save an edition or a new annotaiton
			if(save_type == "edit")
			{
				var id = current_edited_annotation_id;

				var annotation_body_text = document.getElementById("annotation_editor_" + id).value;

				OAT.Event.source(event).src = local_path+"imgs/waiting_ajax.gif";
				
				var params = "id="+id+"&author="+ author_id +"&body="+escape(annotation_body_text);
				
				OAT.Event.source(event).src = local_path+"imgs/waiting_ajax.gif";
				OAT.Event.source(event).width = "16";
				OAT.Event.source(event).height = "16";
				

				if (window.XMLHttpRequest) 
				{
					req_anno_4 = new XMLHttpRequest();
					req_anno_4.uri = uri;
					req_anno_4.container = annotations_container;
					req_anno_4.local_path = local_path;
					req_anno_4.annotation_btn = OAT.Event.source(event);
					req_anno_4.onreadystatechange = process_edit_annotation;
					req_anno_4.open("POST", local_path + "edit_annotation.php", true);
					
					req_anno_4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					req_anno_4.setRequestHeader("Content-length", params.length);
					req_anno_4.setRequestHeader("Connection", "close");			
					
					req_anno_4.send(params);

				// branch for IE/Windows ActiveX version
				} 
				else if (window.ActiveXObject) 
				{
					req_anno_4 = new ActiveXObject("Microsoft.XMLHTTP");
					if (req_anno_4) 
					{
						req_anno_4.uri = uri;
						req_anno_4.container = annotations_container;
						req_anno_4.local_path = local_path;
						req_anno_4.annotation_btn = OAT.Event.source(event);
						req_anno_4.onreadystatechange = process_edit_annotation;
						req_anno_4.open("POST", local_path + "edit_annotation.php", true);
						
						req_anno_4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						req_anno_4.setRequestHeader("Content-length", params.length);
						req_anno_4.setRequestHeader("Connection", "close");			
						
						req_anno_4.send(params);
					}
				}		
				
				save_type = "new";
			}
			else if(save_type == "new")
			{
				if(annotation_editor.value == "")
				{
					alert("Please add a body to your annotation");
				}
				else
				{
					var params = "partial_uri="+escape(local_path)+escape("annotations/?id=")+"&author="+author_id+"&annotated_resource="+escape(uri)+"&body="+escape(annotation_editor.value);
			
					OAT.Event.source(event).src = local_path+"imgs/waiting_ajax.gif";
					OAT.Event.source(event).width = "16";
					OAT.Event.source(event).height = "16";
								
					// branch for native XMLHttpRequest object
					if (window.XMLHttpRequest) 
					{
						req_anno = new XMLHttpRequest();
						req_anno.annotation_editor = annotation_editor;
						req_anno.annotations_container = annotations_container;
						req_anno.annotation_btn = OAT.Event.source(event);
						req_anno.local_path = local_path;
						req_anno.uri = uri;
						req_anno.onreadystatechange = update_annotations;
						req_anno.open("POST", local_path + "add_annotation.php", true);
						
						req_anno.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						req_anno.setRequestHeader("Content-length", params.length);
						req_anno.setRequestHeader("Connection", "close");			
						
						req_anno.send(params);
					// branch for IE/Windows ActiveX version
					} 
					else if (window.ActiveXObject) 
					{
						req_anno = new ActiveXObject("Microsoft.XMLHTTP");
						if (req_anno) 
						{
							req_anno.annotation_editor = annotation_editor;
							req_anno.annotations_container = annotations_container;
							req_anno.annotation_btn = OAT.Event.source(event);
							req_anno.uri = uri;
							req_anno.local_path = local_path;
							req_anno.onreadystatechange = update_annotations;
							req_anno.open("POST", local_path + "add_annotation.php", true);
							
							req_anno.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							req_anno.setRequestHeader("Content-length", params.length);
							req_anno.setRequestHeader("Connection", "close");			
							
							req_anno.send(params);
						}
					}
				}
			}
		});
	
	
	
		var a1 = new OAT.AnimationOpacity(zitgist_popup,{opacity:1});
		var a2 = new OAT.AnimationOpacity(zitgist_popup,{opacity:0});
	
	
	
		// First mouseover behavior
		var position = OAT.Dom.position(element);
		zitgist_popup.style.left = (position[0]+10)+"px";
		zitgist_popup.style.top = (position[1]+10)+"px";
		
		OAT.Dom.show(zitgist_popup);
		
		a1.start();
	
		reposition_popup(zitgist_popup);
	
		OAT.MSG.attach(a2.animation,OAT.MSG.ANIMATION_STOP,function(){ /* hide after opacity gets to 0 */
			OAT.Dom.hide(zitgist_popup);
		});
	
		// Re-asign the mouse over event.
		OAT.Event.attach(element,"click",function(event) { /* start displaying on mouseover */
			a2.stop();

			var position = OAT.Event.position(event);
			zitgist_popup.style.left = (position[0]+5)+"px";
			zitgist_popup.style.top = (position[1]+5)+"px";
			
			OAT.Dom.show(zitgist_popup);
			a1.start();
			
			reposition_popup(zitgist_popup);
		});
		
		
		var element_over = true;
		
		OAT.Event.attach(window.document,"click",function(event) {
			if(!element_over)
			{
				a1.stop();
				a2.start();
			}
			else
			{
				element_over = false;
			}
		});
		
		OAT.Event.attach(zitgist_popup,"click",function(event) {
			element_over = true;
		});

		OAT.Event.attach(element,"click",function(event) {
			element_over = true;
		});
	}
}


function update_annotations()
{
	if (req_anno.readyState == 4) 
	{
		window.status = '';
		
		if (req_anno.status == 200) 
		{
			req_anno.annotation_btn.src = req_anno.local_path + 'imgs/annotate_btn.gif';
			req_anno.annotation_btn.width = "102";
			req_anno.annotation_btn.height = "25";			
			
			req_anno.annotation_editor.value = "";
			
			show_annotations(req_anno.uri, req_anno.annotations_container, req_anno.local_path)
		}
	}
}


function show_annotations(uri, container, local_path)
{
	container.innerHTML = "<img src=\""+local_path+"imgs/waiting_ajax.gif\" />";
	
	if (window.XMLHttpRequest) 
	{
		req_anno_2 = null;
		req_anno_2 = new XMLHttpRequest();
		req_anno_2.container = container;
		req_anno_2.uri = uri;
		req_anno_2.local_path = local_path;
		req_anno_2.onreadystatechange = process_show_annotations;
		req_anno_2.open("GET", local_path + "annotations.php?uri="+escape(uri), true);
		req_anno_2.send(null);
	// branch for IE/Windows ActiveX version
	} 
	else if (window.ActiveXObject) 
	{
		req_anno_2 = null;
		req_anno_2 = new ActiveXObject("Microsoft.XMLHTTP");
		if (req_anno_2) 
		{
			req_anno_2.container = container;
			req_anno_2.uri = uri;
			req_anno_2.local_path = local_path;
			req_anno_2.onreadystatechange = process_show_annotations;
			req_anno_2.open("GET", local_path + "annotations.php?uri="+escape(uri)+"&refresh="+ generateId(), true);
			req_anno_2.send(null);
		}
	}	
}

function process_show_annotations()
{
	if (req_anno_2.readyState == 4) 
	{
		window.status = '';
		
		if (req_anno_2.status == 200) 
		{
			req_anno_2.container.innerHTML = "";					

			if(req_anno_2.responseXML)
			{
				var response = req_anno_2.responseXML.documentElement;			
				
				for(var i = 0; i < response.getElementsByTagName('annotation').length; i++)
				{
					if(response.getElementsByTagName('annotation')[i]) 
					{					
						var annotation_item = response.getElementsByTagName('annotation')[i];
					
						var annotation_item_container = OAT.Dom.create("div",{},"annotation_item_container");
						req_anno_2.container.appendChild(annotation_item_container);
						
						var annotation_item_header = OAT.Dom.create("div",{},"annotation_item_header");
						annotation_item_container.appendChild(annotation_item_header);

						annotation_item_header.innerHTML = "<table width=\"400\"><tr><td align=\"left\"><img alt=\"Annotation\" title=\"Annotation\" src=\""+req_anno_2.local_path+"/imgs/annotation.gif\" /></td><td align=\"center\"></td><td align=\"right\"><img id=\"edit_anno_"+annotation_item.getElementsByTagName('id')[0].firstChild.data+"\" src=\""+req_anno_2.local_path+"imgs/edit.gif\" style=\"cursor:pointer; padding-right:3px;\" alt=\"Edit annotation\" title=\"Edit annotation\" /><img id=\"del_anno_"+annotation_item.getElementsByTagName('id')[0].firstChild.data+"\" src=\""+req_anno_2.local_path+"imgs/delete_annotation.gif\" style=\"cursor:pointer;\" alt=\"Remove annotation\" title=\"Remove annotation\" /></td></tr></table>";

						// Onclick Edit Annotation
						OAT.Event.attach(annotation_item_header.getElementsByTagName('img')[1],"click",function(event) 
						{
							if(save_type == "new") // No more than one edition at time
							{
								var id = OAT.Event.source(event).id.substr(10,OAT.Event.source(event).id.length-10);
	
								var annotation_body_text = document.getElementById("annotation_item_body_id_" + id).innerHTML;
	
								// Replace <br /> by /n
								annotation_body_text = annotation_body_text.replace(/<br>/g, "\n");
	
	
								document.getElementById("annotation_item_body_id_" + id).innerHTML = "";
								
								var annotation_editor = OAT.Dom.create("textarea",{},"annotation_editor");
								annotation_editor.id = "annotation_editor_" + id;
								document.getElementById("annotation_item_body_id_" + id).appendChild(annotation_editor);
								
								annotation_editor.value = annotation_body_text;
								
								OAT.Dom.hide(OAT.Event.source(event));
								OAT.Dom.hide(document.getElementById("annotation_item_body_id_" + id).parentNode.parentNode.parentNode.lastChild.previousSibling.firstChild);
	
								save_type = "edit";
								
								current_edited_annotation_id = id;
							}
							else
							{
								alert("Edit one item at the same time");
							}
						});	


						// Onclick Delete Annotation
						OAT.Event.attach(annotation_item_header.getElementsByTagName('img')[2],"click",function(event) 
						{
							if(save_type == "new") // No deletation when editing
							{
								if (confirm("Are you sure you want to delete this annotation?"))
								{
									var id = OAT.Event.source(event).id.substr(9,OAT.Event.source(event).id.length-9);
								
									OAT.Event.source(event).src = req_anno_2.local_path+"imgs/waiting_ajax.gif";
									
	
									if (window.XMLHttpRequest) 
									{
										rewq_anno_3 = new XMLHttpRequest();
										rewq_anno_3.uri = req_anno_2.uri;
										rewq_anno_3.container = req_anno_2.container;
										rewq_anno_3.local_path = req_anno_2.local_path;
										rewq_anno_3.onreadystatechange = process_delete_annotation;
										rewq_anno_3.open("GET", req_anno_2.local_path + "delete_annotation.php?id="+id, true);
										rewq_anno_3.send(null);
									// branch for IE/Windows ActiveX version
									} 
									else if (window.ActiveXObject) 
									{
										rewq_anno_3 = new ActiveXObject("Microsoft.XMLHTTP");
										if (rewq_anno_3) 
										{
											rewq_anno_3.container = req_anno_2.container;
											rewq_anno_3.uri = req_anno_2.uri;
											rewq_anno_3.local_path = req_anno_2.local_path;
											rewq_anno_3.onreadystatechange = process_delete_annotation;
											rewq_anno_3.open("GET", req_anno_2.local_path + "delete_annotation.php?id="+id+"&refresh="+ generateId(), true);
											rewq_anno_3.send(null);
										}
									}	
								}
							}
							else
							{
								alert("Save your edition before deleting an annotation");
							}
						});						

						var annotation_item_body = OAT.Dom.create("div",{},"annotation_item_body");
						annotation_item_body.id = "annotation_item_body_id_" + annotation_item.getElementsByTagName('id')[0].firstChild.data;
						annotation_item_container.appendChild(annotation_item_body);
						
						annotation_item_body.innerHTML = annotation_item.getElementsByTagName('body')[0].firstChild.data;
						
						var item_separator = OAT.Dom.create("div",{},"zitgist_menu_separator");		
						annotation_item_container.appendChild(item_separator);			
						
						OAT.Dom.show(document.getElementById("annotation_item_body_id_" + annotation_item.getElementsByTagName('id')[0].firstChild.data).parentNode.parentNode.parentNode.lastChild.previousSibling.firstChild);
					}
				}
				reposition_popup(req_anno_2.container.parentNode)
			}
		}
	}	
}


function process_delete_annotation(container, id)
{
	if (rewq_anno_3.readyState == 4) 
	{
		window.status = '';
		
		if (rewq_anno_3.status == 200) 
		{	
			show_annotations(rewq_anno_3.uri, rewq_anno_3.container, rewq_anno_3.local_path);
		}
	}
}

function process_edit_annotation(container, id)
{
	if (req_anno_4.readyState == 4) 
	{
		window.status = '';
		
		if (req_anno_4.status == 200) 
		{
			req_anno_4.annotation_btn.src = req_anno_4.local_path + 'imgs/annotate_btn.gif';
			req_anno_4.annotation_btn.width = "102";
			req_anno_4.annotation_btn.height = "25";			
			
			show_annotations(req_anno_4.uri, req_anno_4.container, req_anno_4.local_path);
		}
	}
}