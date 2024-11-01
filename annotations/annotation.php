<?php

// A single annotation
$rdf_n3_file_annotation = "annotation.n3.php?id=$id";
$rdf_xml_file_annotation = "annotation.rdf.php?id=$id";


$header_list = parseAccept($_SERVER['HTTP_ACCEPT'], array("text/html", "application/rdf+xml", "text/rdf+n3", "application/rdf+n3", "application/turtle", "*/*"));

$uri = "";

if($_SERVER['SERVER_PORT'] != 80)
{
	$uri = "http://". $_SERVER['SERVER_NAME'] . ":" . $_SERVER['SERVER_PORT'] . $_SERVER['REQUEST_URI'];
	$uri = substr($uri, 0, strlen($uri)-strlen(strrchr($uri, "?")));
}
else
{
	$uri = "http://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
	$uri = substr($uri, 0, strlen($uri)-strlen(strrchr($uri, "?")));
}


foreach($header_list as $format)
{
	switch($format[0])
	{
		// HTML or anything else.
		case "text/html":
		case "*/*":
			header('Content-type: text/html');
			header('HTTP/1.1 303 See Other');
			header("Location: $base_path".urlencode($uri."?id=".$id));
			
			exit;
		break;
		
		// RDF/XML
		case "application/rdf+xml":
			header('Content-type: application/rdf+xml');
			header('HTTP/1.1 303 See Other');
			header("Location: $uri$rdf_xml_file_annotation");
			exit;
		break;
		
		// RDF/N3
		case "text/rdf+n3":
			header('Content-type: text/rdf+n3');
			header('HTTP/1.1 303 See Other');
			header("Location: $uri$rdf_n3_file_annotation");
			exit;
		break;

		case "application/turtle":
			header('Content-type: application/turtle');
			header('HTTP/1.1 303 See Other');
			header("Location: $uri$rdf_n3_file_annotation");
			exit;
		break;

		case "application/rdf+n3":
			header('Content-type: application/rdf+n3');
			header('HTTP/1.1 303 See Other');
			header("Location: $uri$rdf_n3_file_annotation");
			exit;
		break;
		
		default:
			header('Content-type: text/rdf+n3');
			header('HTTP/1.1 303 See Other');
			header("Location: $uri$rdf_n3_file_annotation");
			exit;
		break;
	}
}






?>
