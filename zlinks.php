<?php
/*

Info for WordPress:
==============================================================================
Plugin Name: zLinks
Plugin URI: http://zlinks.zitgist.com
Description: Provides a clickable icon for every post, comment and embedded link that leads to additional semantic Web and related data resources; also provides annotation capabilities.
Version: 0.2
Author: Zitgist
Author URI: http://www.zitgist.com


  	    _____________________________________________________
       |                                                    |
       |              zLinks WordPress Plugin               |
       |                  © Zitgist LLC                     |
       |____________________________________________________|

	© Copyright 2007.  Zitgist LLC (zlinks dot support at zitgist dot com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

	----------------------------------------------------------------------------

	For INSTALLATION and USAGE guidance, see:
	   http://zlinks.zitgist.com/faq.html

	----------------------------------------------------------------------------

*/

function zlinks_content($content)
{
	$link_img_url = "";
	$local_path_url = "";

	if(!is_feed())
	{
	
	//http://www.fgiasson.com/blog
	
		if(substr($_SERVER['HTTP_HOST'], 0, 4) == "www.")
		{
			if(!stristr(get_option('siteurl'), $_SERVER['HTTP_HOST']))
			{
				$link_img_url = str_replace(substr($_SERVER['HTTP_HOST'], 4, strlen($_SERVER['HTTP_HOST'])), $_SERVER['HTTP_HOST'], get_option('siteurl'))."/wp-content/plugins/zlinks/imgs/";
				$local_path_url = str_replace(substr($_SERVER['HTTP_HOST'], 4, strlen($_SERVER['HTTP_HOST'])), $_SERVER['HTTP_HOST'], get_option('siteurl'))."/wp-content/plugins/zlinks/";
			}
			else
			{
				$link_img_url = get_option('siteurl')."/wp-content/plugins/zlinks/imgs/";
				$local_path_url = get_option('siteurl')."/wp-content/plugins/zlinks/";
			}
		}
		else
		{
			if(substr(get_option('siteurl'), 0, 11) == "http://www.")
			{
				$link_img_url = str_replace("http://www.", "http://", get_option('siteurl')."/wp-content/plugins/zlinks/imgs/");
				$local_path_url = str_replace("http://www.", "http://", get_option('siteurl')."/wp-content/plugins/zlinks/");
			}
			else
			{
				$link_img_url = get_option('siteurl')."/wp-content/plugins/zlinks/imgs/";
				$local_path_url = get_option('siteurl')."/wp-content/plugins/zlinks/";
			}
		}
	
		global $post;
		global $userdata;
	
		if(is_user_logged_in() && $userdata->ID == $post->post_author)
		{
			$content = preg_replace( "|<a(.*)href=\"(.*)\"(.*)>(.*)(</a.*>)|Uei", "'<a'.stripslashes('$1').'href=\"'.make_abs('$2', get_permalink()).'\"'.stripslashes('$3').'>'.stripslashes('$4$5').''.restrict_zlinks_inclusion_annotations('$4', '$2', \"".$local_path_url."\", \"".$userdata->ID."\").''", $content);
		}
		else
		{
			$content = preg_replace( "|<a(.*)href=\"(.*)\"(.*)>(.*)(</a.*>)|Uei", "'<a'.stripslashes('$1').'href=\"'.make_abs('$2', get_permalink()).'\"'.stripslashes('$3').'>'.stripslashes('$4$5').''.restrict_zlinks_inclusion('$4', '$2', \"".$local_path_url."\").''", $content);
	
		}
	}
	
	return $content;
}

function restrict_zlinks_inclusion_annotations($link_content, $uri, $local_path_url, $user_id)
{

	global $wpdb;
	$table_name = $wpdb->prefix . "zlinks_annotations";

	$query = 	"SELECT * FROM " . $table_name .
					" WHERE annotated_resource = '$uri' ORDER BY created";
	$annotations = $wpdb->get_results($query);

	$img = "mini_rdf.gif";
//	$alt = " alt=\"zLinks links popup\" title=\"zLinks links popup\" ";

	foreach ($annotations as $annotation) 
	{
		$img = "mini_rdf_annotated.gif";
//		$alt = " alt=\"zLinks links popup plus annotations\" title=\"zLinks links popup plus annotations\" ";
	}


	if(!stristr($link_content, "<img"))
	{
		return "<img src=\"".$local_path_url."imgs/annotation10.gif\" border=\"0\" style=\"cursor: pointer; padding:0px 0px 0px 1px; margin:0px;\" onclick=\"assignAnnotationPopup(this, '".make_abs($uri, get_permalink())."', '$local_path_url', '".$user_id."');\" alt=\"Annotate this link\" title=\"Annotate this link\" /><img src=\"".$local_path_url."imgs/$img\" border=\"0\" style=\"cursor: pointer; padding:0px 0px 0px 1px; margin:0px;\" onmouseover=\"assignPopup(this, '".make_abs($uri, get_permalink())."', '$local_path_url');\" />";
	}
	
	return "";	
}

function restrict_zlinks_inclusion($link_content, $uri, $local_path_url)
{
	global $wpdb;
	$table_name = $wpdb->prefix . "zlinks_annotations";

	$query = 	"SELECT * FROM " . $table_name .
					" WHERE annotated_resource = '$uri' ORDER BY created";
	$annotations = $wpdb->get_results($query);

	$img = "mini_rdf.gif";

	if(count($annotations) > 0)
	{
		foreach ($annotations as $annotation) 
		{
			$img = "mini_rdf_annotated.gif";
		}
	}

	if(!stristr($link_content, "<img"))
	{
		return "<img src=\"".$local_path_url."imgs/$img\" border=\"0\" style=\"cursor: pointer; padding:0px 0px 0px 1px; margin:0px;\" onmouseover=\"assignPopup(this, '".make_abs($uri, get_permalink())."', '$local_path_url');\" alt=\"\" />";
	
	}
	
	return "";	
}


function zlinks_comment($content)
{
	$link_img_url = get_option('siteurl')."/wp-content/plugins/zlinks/imgs/";
	$local_path_url = get_option('siteurl')."/wp-content/plugins/zlinks/";
	
	$content = preg_replace( "|<a(.*)href=\"(.*)\"(.*)>([^<>]+)(</a.*>)|Uei", "'<a'.stripslashes('$1').'href=\"'.make_abs('$2', get_permalink()).'\"'.stripslashes('$3').'>'.stripslashes('$4$5').'<img src=\"".$link_img_url."mini_rdf.gif\" border=\"0\" style=\"cursor: pointer; padding:0px 0px 0px 1px; margin:0px;\" onmouseover=\"assignPopup(this, \''.make_abs('$2', get_permalink()).'\', \'$local_path_url\');\" alt=\"\" />'", $content);

	return $content;
}


function zlinks_register_headers()
{
	
	$js_url = get_option('siteurl')."/wp-content/plugins/zlinks/js/";
	$css_url = get_option('siteurl')."/wp-content/plugins/zlinks/css/";
	
    echo "<script type=\"text/javascript\">\n";
    echo "    var featureList=[\"animation\", \"dimmer\"];\n";
    echo "    function init() {\n";
    echo "    }\n";
    echo "</script>\n";
    echo "<script type=\"text/javascript\" src=\"".$js_url."oat/loader.js\"></script>\n";
	echo '<script language="JavaScript" type="text/javascript" src="' . $js_url . 'scroll.js"></script>';
	echo '<script language="JavaScript" type="text/javascript" src="' . $js_url . 'script.js"></script>';
	echo '<script language="JavaScript" type="text/javascript" src="' . $js_url . 'annotation.js"></script>';
	echo '<link rel="stylesheet" type="text/css" href="' . $css_url . 'scroll.css" />';
	echo '<link rel="stylesheet" type="text/css" href="' . $css_url . 'style.css" />';
}


function make_abs($rel_uri, $base, $REMOVE_LEADING_DOTS = true) 
{ 

	// check if the base is part of the uri
	if($base == substr($rel_uri, 0, strlen($base)))
	{
		// The "relative URI" already have the "base URI" in it.
		// so this is not a relative URI but a base URI.
		return $rel_uri;
	}
	
	// there is a URI protocol prefix, and the base is not part of the "relative uri"
	// in that case we have two different uris.
	if(preg_match("'^[^:]+://'", $rel_uri))
	{
		return $rel_uri;
	}
	
	// Else we continue

	preg_match("'^([^:]+://[^/]+)/'", $base, $m); 
	
	$base_start = $m[1]; 
	
	if (preg_match("'^/'", $rel_uri)) 
	{ 
	  return $base_start . $rel_uri; 
	} 
	
	$base = preg_replace("{[^/]+$}", '', $base); 
	$base .= $rel_uri; 
	$base = preg_replace("{^[^:]+://[^/]+}", '', $base); 
	$base_array = explode('/', $base); 
	
	if (count($base_array) and!strlen($base_array[0])) 
	  array_shift($base_array); 

	$i = 1; 
	while ($i < count($base_array)) 
	{ 
	  	if ($base_array[$i - 1] == ".") 
		{ 
		   array_splice($base_array, $i - 1, 1); 
		   if ($i > 1) $i--; 
		} 
		elseif ($base_array[$i] == ".." and $base_array[$i - 1]!= "..") 
		{ 
			array_splice($base_array, $i - 1, 2); 
			if ($i > 1) 
			{ 
				$i--; 
				if ($i == count($base_array)) array_push($base_array, ""); 
			} 
		} 
		else 
		{ 
		   $i++; 
  		} 
	} 
	
	if (count($base_array) and $base_array[-1] == ".") 
	  $base_array[-1] = ""; 

	if ($REMOVE_LEADING_DOTS) 
	{ 
		while (count($base_array) and preg_match("/^\.\.?$/", $base_array[0])) 
		{ 
			array_shift($base_array); 
		} 
	} 
	return($base_start . '/' . implode("/", $base_array)); 
}

function zlinks_install()
{
   global $wpdb;
   
   global $userdata;

   $table_name = $wpdb->prefix . "zlinks_annotations";
   
   if($wpdb->get_var("show tables like '$table_name'") != $table_name) 
   {
		
		$sql = "CREATE TABLE " . $table_name . " (
				  id mediumint(9) NOT NULL AUTO_INCREMENT,
				  partial_uri TEXT NOT NULL,
				  author_id mediumint(9) NOT NULL,
				  body TEXT NOT NULL,
				  annotated_resource TEXT NOT NULL,
				  created datetime NOT NULL,
				  UNIQUE KEY id (id)
				);";
		
		require_once(ABSPATH . 'wp-admin/upgrade-functions.php');
		
		dbDelta($sql);
		
		update_option("zlinks_option_uri_".$userdata->ID, "default");
		update_option("zlinks_option_uri_existing_".$userdata->ID, "");
		update_option("zlinks_option_uri_sameas_".$userdata->ID, "");
		update_option("zlinks_option_private_".$userdata->ID, "false");
   }
   
   add_option("zlinks_db_version", "0.2");
}


function zlinks_options_page()
{
	global $userdata;
	
	$local_path_url = get_option('siteurl')."/wp-content/plugins/zlinks/";
	
	if (isset($_POST['zlinks_options_update'])) 
	{	
		update_option("zlinks_option_uri_".$userdata->ID, stripslashes($_POST["zlinks_option_uri_".$userdata->ID]));
		update_option("zlinks_option_uri_existing_".$userdata->ID, stripslashes($_POST["zlinks_option_uri_existing_".$userdata->ID]));
		update_option("zlinks_option_uri_sameas_".$userdata->ID, stripslashes($_POST["zlinks_option_uri_sameas_".$userdata->ID]));
		update_option("zlinks_option_private_".$userdata->ID, stripslashes($_POST["zlinks_option_private_".$userdata->ID]));
	}
	
	
	?>
		<div class="wrap"><form method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">

		<h2>zLinks Options</h2>
		<p>Set your <strong>zLinks</strong> configurations options here.</p>

		<h3 style="background-color: #e5f3ff; margin: 0; padding: 2px 8px;">Private/Public Annotations</h3>

		<p>You may keep your annotations private or share them publicly with others.  Private annotations remain private internally to the blog and its authors.</p>

		<div class="wrap" style="background-color:#e7e7e7">
			<table>
				<tr>
					<td>
<?php
						if(get_option("zlinks_option_private_".$userdata->ID) == "false" || get_option("zlinks_option_private_".$userdata->ID) == "")
						{
							?><input type="radio" name="zlinks_option_private_<?php echo $userdata->ID; ?>" value="false" Checked><?php
						}
						else
						{
							?><input type="radio" name="zlinks_option_private_<?php echo $userdata->ID; ?>" value="false"><?php
						}
?>
					</td>
					<td>
						Share publicly
					</td>
				</tr>
				<tr>
					<td>
<?php
						if(get_option("zlinks_option_private_".$userdata->ID) == "true")
						{
							?><input type="radio" name="zlinks_option_private_<?php echo $userdata->ID; ?>" value="true" Checked><?php
						}
						else
						{
							?><input type="radio" name="zlinks_option_private_<?php echo $userdata->ID; ?>" value="true"><?php
						}
?>
					</td>
					<td>
						Keep private
					</td>
				</tr>
			</table>
		</div>

		<p>You can learn more <a href="http://zlinks.zitgist.com/faq.html#private">here</a> regarding public and private annotations.</p>

		<p>When you make annotations public, you also must grant access to the <a href="http://pingthesemanticweb.com/">Ping the Semantic
		Web</a> service so that notifications can be posted. <br />You do so by modifying your robots.txt file in your root directory to read:
		# Disallow: /wp-content/ . <br />(Note the added pound sign at the beginning of the line followed by a space. You can learn more about
		this requirement <a href="http://zlinks.zitgist.com/faq.html#robots">here</a>.</p>


		<h3 style="background-color: #e5f3ff; margin: 0; padding: 2px 8px;">Author Identifier</h3>

		<p>If you share annotations publicly, you may want a more useful author identity. You may select from three options:</p>

		<div class="wrap"  style="background-color:#e7e7e7">
			<table>
				<tr>
					<td>
<?php
						if(get_option("zlinks_option_uri_".$userdata->ID) == "default" || get_option("zlinks_option_uri_".$userdata->ID) == "")
						{
							?><input type="radio" name="zlinks_option_uri_<?php echo $userdata->ID; ?>" value="default" Checked><?php
						}
						else
						{
							?><input type="radio" name="zlinks_option_uri_<?php echo $userdata->ID; ?>" value="default"><?php
						}
?>
					</td>
					<td>
						Use the generic WordPress ID number: <?php echo $local_path_url; ?>authors/?id=<?php echo $userdata->ID; ?>
					</td>
				</tr>
				<tr>
					<td>
<?php
						if(get_option("zlinks_option_uri_".$userdata->ID) == "existing")
						{
							?><input type="radio" name="zlinks_option_uri_<?php echo $userdata->ID; ?>" value="existing" Checked><?php
						}
						else
						{
							?><input type="radio" name="zlinks_option_uri_<?php echo $userdata->ID; ?>" value="existing"><?php
						}
?>
					</td>
					<td>
						Reuse an existing identifier (the URI describing you): <input size="20" type="text" name="zlinks_option_uri_existing_<?php echo $userdata->ID; ?>" value="<?php echo get_option("zlinks_option_uri_existing_".$userdata->ID); ?>" />
					</td>
				</tr>
				<tr>
					<td>
<?php
						if(get_option("zlinks_option_uri_".$userdata->ID) == "same_as")
						{
							?><input type="radio" name="zlinks_option_uri_<?php echo $userdata->ID; ?>" value="same_as" Checked><?php
						}
						else
						{
							?><input type="radio" name="zlinks_option_uri_<?php echo $userdata->ID; ?>" value="same_as"><?php
						}
?>					
					</td>
					<td>
						Use a new identifier at a later time: <?php echo $local_path_url; ?>authors/?id=<?php echo $userdata->ID; ?>; link it to this new identifier once obtained: <input size="30" type="text" name="zlinks_option_uri_sameas_<?php echo $userdata->ID; ?>" value="<?php echo get_option("zlinks_option_uri_sameas_".$userdata->ID); ?>" />
					</td>
				</tr>
			</table>
		</div>

 	<p>You can learn more <a href="http://zlinks.zitgist.com/faq.html#author_id">here</a> regarding author identity options.</p>



	<h3 style="background-color: #e5f3ff; margin: 0; padding: 2px 8px;">Additional Information</h3>

	<p><ul>
	<li>You can learn more about other <strong>zLinks</strong> topics from its <a href="http://zlinks.zitgist.com/faq.html">FAQ</a>, especially with regard to <a href="http://zlinks.zitgist.com/faq.html#before_install">installation</a>, <a href="http://zlinks.zitgist.com/faq.html#interpretation">using</a>, or <a href="http://zlinks.zitgist.com/faq.html#std_icons">tailorin</a>g to your own content.</li>
	<li>Your annotations are also separately available as resources at this location: <a href="<?php echo $local_path_url; ?>annotations"><?php echo $local_path_url; ?>annotations</a>.</li>
	</ul></p>





	<p class="submit">
	<input type="submit" name="zlinks_options_update" value="<?php _e('Update Options') ?>" />
	</p>
	</div>
	</form><?php

	
}
      
	  
// action function for above hook
function add_zlinks_options_page() 
{
    // Add a new submenu under Options:
    add_options_page('zLinks', 'zLinks', 8, 'zlinksoptions', 'zlinks_options_page');
}


add_filter('the_content', 'zlinks_content');
add_filter('comment_text', 'zlinks_comment');
add_action('wp_head', 'zlinks_register_headers');
add_action('activate_zlinks/zlinks.php', 'zlinks_install');
add_action('admin_menu', 'add_zlinks_options_page');

?>
