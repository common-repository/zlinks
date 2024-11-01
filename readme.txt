=== Plugin Name ===
Contributors: Zitgist
Tags: zlinks, semantic web, links, linked data, rdf, related data
Requires at least: 2.0.0
Tested up to: 2.2
Stable tag: 1.0

A clickable icon for every post, comment and embedded link leads to additional semantic Web and related data resources. 

== Description ==

This plug-in shows blog readers existing related data for a given URL and, in some cases, enables them to perform actions based on this data.

More explanations and examples are available from the online help or from this article: "[Blogs, Wordpress, Zitgist and the Semantic Web](http://fgiasson.com/blog/index.php/2007/09/01/blogs-wordpress-zitgist-and-the-semantic-web/ "")

== Installation ==

The zLinks plugin is simple to install and get working:

   1. Unzip the distribution package locally
   2. Upload the folder`zlinks` and its subdirectories to the `/wp-content/plugins/` directory
   3. Activate the plugin through the 'Plugins' menu in the WordPress Administration panel.

That's it!

All links within your blog posts and comments will now display an icon to its immediate right, which your blog readers may click to invoke a popup with additional links and resources related to that link.

== Frequently Asked Questions ==

What is zLinks?
---------------
    zLinks is a service expressed on a user's client that enables all links from within a blog post and its comments (or from a CMS -- content management system) to be displayed with additional and related data and information.  zLinks thus becomes a nexus -- or jumping off point -- for additional exploration and learning.

    In this specific instance, zLinks resides as a plug-in to WordPress; other instances may also occur as plug-ins to existing client-side software.

    The interlinkable linked data phenomenon underlying zLinks is a key underpinning of the semantic Web, and an expression of the unique technologies and data mastery provided by zLinks' parent company, Zitgist. 


What is the value of zLinks links?
----------------------------------
    The Internet and the Web first showed the power of linked and networked documents.  The interlinked links provided by zLinks takes this understanding to a new level:  the freeing and linking of all data objects and concepts with related information.

    We have seen a bit of this trend in the past few years with "mashups" that are able to, for example, plot geographic information from one source onto a different map source, or time-related information on calendars or timelines.

    But these first baby steps required specific coding to make data from two different sources relate.

    zLinks now offers a single facility for exposing data linkages everywhere and in any form.  These linkages are a floodgate about ready to open.  The value is that related data will find itself and find its relationships by virtue of its linked character and quality.  The added value to standard Web users is limitless. 


Is there anything I should do in advance of installation?
---------------------------------------------------------
    No, there is nothing you need to do in advance.  It is useful to already have a personal URI, FOAF file or OpenID, but those can also be obtained after initial installation; see this other link.


Where do I find the zLinks download?
------------------------------------
    The current zLinks download is always available directly from the WordPress download site at: http://wordpress.org/extend/plugins/zlinks/. 


Where and how do I upgrade my zLinks plug-in?
---------------------------------------------
    The most recent version and upgrade instructions may also be found from the same WordPress distribution site.


How do I install the plug-in?
-----------------------------
       1. Upload the folder`zitgist_browser_linker` to the `/wp-content/plugins/` directory
       2. Activate the plugin through the 'Plugins' menu in WordPress


    Then you are done. All links within your blog posts and comments will have now an icon displayed to the right of all links that, when the mouse passes over, causes a popup dialog to appear with the linked data information.
 

Does zLinks require cURL?
-------------------------
    Yes, zLinks requires the cURL utility (see http://en.wikipedia.org/wiki/CURL).

    Fortunately, this utility is a standard inclusion with PHP and virtually all users should experience no issues. If it does pose a problem, the link above will lead to further information to fix the problem.


Where do I find configuration settings?
---------------------------------------
    You must initially set up zLinks before you can begin entering annotations.  Like other zLinks configurations, you make these changes within the Options ? zLinks menu links within your WordPress Administration panel (see http://codex.wordpress.org/Administration_Panels). All configuration options are set via radio buttons and simple fill-in text boxes.


How do I set up my author identification?
-----------------------------------------
    You must set your author identity prior to being able to share your annotations publicly on the Semantic Web. This identifier is used to link the annotations you wrote with the URL you annotated.

    You may select from three options to set your identity:

       1. ( )  Use the generic WordPress ID number: http://blogname.com/wp-content/plugins/zlinks/user/$userid
       2. (x)  Reuse an existing identifier (the URI describing you): [enter URI]
       3. ( )  Use a new identifier at a later time: http://blogname.com/wp-content/plugins/zlinks/user/$userid; link it to this new identifier once obtained: [enter URI]

    If you don't have any existing URI and don't plan to get one, you can select option #1. In that case, your generic $userid is automatically chosen from your internal WordPress settings.  This is usually a number ID and its display can not be altered.  This is the default fallback case.

    However, on the Semantic Web, some people already have an identifier for themselves via an OpenID or a URI they own pointing to, say, a FOAF file.   This is generally the best case because the identifier is reusable for many settings and purposes and other users see the name you want to display as the annotator.

    If you already have one, use option #2, then fill in the text field with the identifier URI.

    If you don't have one, but want to use an identifier URI, you can get one prior to proceeding further with your zLinks configuration.  For example, you could obtain for yourself a URI (http://dig.csail.mit.edu/breadcrumbs/node/71) (which you then could use or not for a FOAF file and OpenID; see http://en.wikipedia.org/wiki/OpenID).  Once you have your identifier URI then proceed with option #2.

    However if you plan to use a URI identifier, but don't want to go through the effort immediately, then chose option #3.  This option starts by using the default WP $userid, but enables you to later update to a new identifier URI.  Option #3 maintains the connection between older annotations using the $userid with your new user identifier.  You fill in the text field at a later date after you have set up that new identifier.

    For all options, your user identifier is found at http://blogname.com/wp-content/plugins/zlinks/user/$userid, and is available to both browsers and as RDF.

    
	 What else do I need to do to make my annotations public?
    --------------------------------------------------------
    Part of enabling your annotations to be public is notifying a service, Ping the Semantic Web in the case of zLinks, that the annotation is available and updated. While the software install takes care of most parts of this requirement, you also need to tell your WordPress installation that is OK to notify the service. You do this by modifying the robots.txt file found in your WordPress root directory (most often called public_html).

    You need to modify that file by adding a # and a space before the line that reads Disallow: /wp-content/, so that it now becomes:
         # Disallow: /wp-content/
    That is all that must be done.

    Likely future versions of zLinks may change this arrangement. And, should you have any questions about this requirement, contact your hosting provider.


How do I keep annotations private?
----------------------------------
    You may keep your annotations private or share them publicly with others on the Semantic Web.  When public, whenever another person links to the same URL you have annotated (say, the URL http://example.com) and also has the zLinks plug-in installed, then readers of that reference blog will also now see the annotations you wrote for that URL.

    By disabling this option in the configuration dialog under Options in your WordPress Admininstrative panel, your annotations will only be visible from your blog and will remain private internally to the blog and its authors.


How do I interpret the information in the zLinks popup?
-------------------------------------------------------
    When you mouse over the small icon at the right of a link, zLinks launches its data link analysis.  You will first get an alert that the system is working, retrieving all of the necessary background link information. You will then get a popup showing the results.

    The popup results are presented in up to four sections.  The top section contains some general zLinks links (to this FAQ, for example!). 
 
    The second section presents links to either the standard Web page or the semantic Web page (resolved) for the initiating link.  The choice of this link depends on the content negotiation dictated by the starting URI in the embedded blog link.  Additionally, there may also be some actions in this section related to certain types of URis (such as those with a book or product reference on Amazon, for example).  Often, these additional actions and links are coded by a unique site icon.

    The third section presents any annotations, if present.

    The last and bottom section presents a more disaggregate view of related resources (data objects) with each link representing a unique "triple" drawn from the contributing information resources enriching the link.  This listing can get quite long, and is therefore also keyed by icon to indicate the particular kind of resource that each triple link represents (person, document, subject, music, etc; see further below).

    Clicking on one of these links takes you to a Zitgist Linked Data Server (ZLDS) with its results presented through the Zitgist Browser, where various views and data formats are displayed (again, based on data type), with still further links for additional discovery. These Zitgist views can themselves be quite rich with maps, timelines, photos, structured data, etc.

    Here is where the data discovery part is really fun!


What is a 'backlink' and how do I recognize one?
------------------------------------------------
    An incoming reference (or "backlink") is a external link pointing to your content.  A 'backlink' is akin to being the object in a subject - predicate - object triple.  All incoming references or backlinks are shown in the first column of the zLinks popup as a twisted arrow icon, or little back arrow.

    
I see some detailed information in a 'backlink' tooltip. What does this information mean?
-----------------------------------------------------------------------------------------
    When you mouseover an incoming reference ("backlink") icon, the tooltip shows a message similar to:

         Incoming reference has predicate: link_to

    Remember, an incoming reference is based on an external object referencing your current entry with a form similar to something like:

         <linking_resource> <?p> <your_uri>

    Where the form corresponds to the standard triple of <subject> <predicate> <object>.  (The predicate is called a property in RDF, but it is the same thing.)  Depending on the backlink (that is, the incoming reference) the predicate may be any of the relationships from a source.  Common ones are linked_to, homepage, see_also, sameAs, and so forth.  These variations can not be enumerated in advance because the actual predicate relationship name in zLinks is based on the nature of the source triple.

    As you become familiar with the nature of these data relationships, inspection of these 'backlinked' tooltips becomes even more valuable.


 OK, so what other common icons might I see in zLinks and what do they mean?
 ---------------------------------------------------------------------------
    There are a few common application icons you will see in zLinks (these are separate from the resource type icons; see below).  Here are these icons and their explanations:

	    Standard zLinks link icon 		standard zLinks icon that calls up the links popup
	    zLinks link with annotation 		a zLinks link that includes annotation(s)
	    working icon 							icon indicating zLinks is currently working . . . .
	    Annotation popup icon 				Annotation popup icon (authors only; click to invoke)
	    annotation indicator icon 		icon indicator for annotation
	    edit icon 								edit an existing annotation (authors only; click to invoke)
	    delete icon 							delete an existing annotation (authors only; click to invoke)
	    backlink icon 						icon indicating an incoming URI reference ("backlink")
	    Web page icon 						icon for a standard Web page link
	    close icon 							Close dialog icon


How do I annotate a link?
-------------------------
    To make a link annotation, you first must be logged in as an author of the blog (via having accessed the Administration panel).

    As a logged in author, you can then single-click on the zLinks icon, which will then bring up the separate Annotation popup.

    You simply need to add information in the text box to create your specific annotation. Note you can do this multiple times with multiple, separate annotations, or edit or modify existing ones.  When you are completed with your entry, click the Save button to save your entry to the database.

    If you click off of the Annotation popup without first saving with the Save button, the dialog will close and nothing will be changed.  However, if you return to this dialog in while the session remains active, you will see your previous unsaved changes.

    Note each time you create or delete a new annotation, zLinks pings PTSW (http://pingthesemanticweb.com) to update your listing if you have made it public (see above).


How do I annotate my entire blog entry?
---------------------------------------
    You may provide an overall annotation relating to a specific blog post in its entirety (including, as examples, categories or tags) by annotating the link associated with the post title.


How do I edit or modify an annotation?
--------------------------------------
    Simply bring up the Annotator for that link and click on the edit icon for the specific annotation you wish to change.  You will then get the text box to edit your entry.  When you are done, click the Save button to update the entry and save it to the database.  To close the dialog, click outside of the popup.


How do I delete an annotation?
------------------------------
    Simply bring up the annotator for that link and click on the delete icon for the specific annotation you wish to delete.  The entry will be removed from the database.


Can I provide more than one annotation per link?
------------------------------------------------
    Yes, you may provide as many annotation items per link as you wish.


How do I use annotations for other purposes?
--------------------------------------------
    Annotations are also separately available as resources at this location: http://blogname.com/wp-content/plugins/zlinks/annotations.

    Annotations can be referenced as rdf+xml, turtle, or rdf+n3 (application or text).  In addition, the annotations can be obtained in their entirety or by individual post.  The URIs are properly handled so that the information is available to both browsers and as RDF.


Can I include a link reference in an annotation?
------------------------------------------------
    Yes.


How long can an annotation be?
------------------------------
    At present, there is no limit. Also you can add multiple annotations per link as separate entries.


I occasionally see some long load times for the popup with the working icon. Why, is it stuck?
----------------------------------------------------------------------------------------------
    The zLinks interlinked data is not kept permanently on the Zitgist servers. Each time you access a new zLink, the references are retrieved anew.

    This is most often not a problem, but can be on occasion if either: 1) the sources of the interlinks are slow; or 2) there are many, many interlinks.

    The latter is not yet that common, because linked data is still rather young. But it will grow to be a consideration and can crop up now when some of your sources are really "semwebby."

    We will likely need to change this behavior in the near future, but, for now, you may encounter a linked site that does an awful lot of "thinking" before your get your full results.

    By the way, if it ever is a problem and you can't wait, simply move on. Just move your mouse! No harm will happen.


What are the standard icons provided with zLinks and what do they mean?
-----------------------------------------------------------------------
    These are the standard icons provided with zLinks and the name of the rdf:type to which they match:

    amazon icon 	amazon
    annotation icon 	annotation
    article icon 	article
    channel icon 	channel
    comment icon 	comment
    document icon 	document
    entry icon 		entry
    feed icon 		feed
    group icon 		group
    info icon 		info
    musicartist icon 	musicartist
    musicgroup icon 	musicgroup
    note icon 		note
    onlineaccount icon 	onlineaccount
    organization icon 	organization
    person icon 	person
    personalprofiledocument icon 	personalprofiledocument
    point icon 		point
    post icon 		post
    project icon 	project
    record icon 	record
    semanticpage icon 	semanticpage
    solomusicartist icon 	solomusicartist


How can I add my own icons to the popup display?
------------------------------------------------
    Any data resource link that appears in the lower portion of the popup may have its own associated icon.  To do so, create an icon for the type you desire (advised to keep to 16 x 16 maximum), and give it a name with the GIF extension exactly the same as the rdf:type name used to refer to it.

    Then, place the same-named item.gif in the /imgs/ directory of your zLinks plug-in.  You may add as many icons directly related to specific class names as you wish.

    Examples of the existing icons pre-loaded with zLinks are provided above.


How do I submit additional questions or support requests?
---------------------------------------------------------
    Submit any support requests that are not obvious on the Web site to zlinks-support@zitgist.com. 


What is the semantic Web?
-------------------------
    The semantic Web is an evolving extension of the World Wide Web in which web content can be expressed not only in natural language, but also in a format that can be read and used by software agents, thus permitting them to find, share and integrate information more easily.  It derives from W3C director Sir Tim Berners-Lee's vision of the Web as a universal medium for data, information, and knowledge exchange.

    At its core, the semantic web comprises a philosophy, a set of design principles,  collaborative working groups, and a variety of enabling technologies.  The most compliant versions of this definition are generally referred to in all caps as the Semantic Web, while lower case usage represents a more relaxed version with non-RDF data.


What is RDF?
------------
    Resource Description Framework (RDF) is a family of World Wide Web Consortium (W3C) specifications originally designed as a metadata model.  The RDF model is based upon the idea of making statements about resources in the form of subject - predicate - object expressions, called triples in RDF terminology. The subject denotes the resource, and the predicate denotes traits or aspects of the resource and expresses a relationship between the subject and the object.

    This mechanism for describing resources is a major component in what is proposed by the W3C's Semantic Web vision in which automated software can store, exchange, and use machine-readable information distributed throughout the web, in turn enabling users to deal with the information with greater efficiency and certainty.

    With respect to the semantic Web, RDF is also used by a number of reference vocabularies called RDF schema that provide common concepts for relating resources to one another.  It is this commonality of reference that enables data to be linked.

    RDF's simple data model and ability to model disparate, abstract concepts has also led to its increasing use in knowledge management applications unrelated to semantic Web activity.


What is linked data?
--------------------
    Linked data is a term used to describe a recommended best practice for exposing, sharing, and connecting pieces of data on the semantic Web. The practice emphasizes Web access to data using existing Web technologies such as URIs and HTTP. It also emphasizes links between related Web resources.  Linked data is by definition in RDF.


Why is linked data important?
-----------------------------
    Linked data breaks the document boundaries of the original Web by enabling information resources about any given object or concept from anywhere on the Web to be combined into more meaningful understandings of that object and its relation to other objects or concepts.

    Via a common representation (RDF) and common vocabularies (RDF schema) and interoperable tools and understandings, data from any location or provenance can now be combined.

    This link facility enables the entire Web to be treated as an interoperable knowledge base and creates the ability to learn new emergent knowledge from the combined information.


What is Zitgist and what else does it do?
-----------------------------------------
    Zitgist (pronounced "zeitgeist") (http://www.zitgist.com) is an industry standards-compliant Semantic Web query service. Its goal is to help Web users locate data, information, and knowledge on the Web. Zitgist develops and deploys Web application and data interlinking services that facilitate creation, aggregation, conversion, publication, and exchange of structured data.

    The company's main platform is the Zitgist Linked Data Server, accessed via the Zitgist Browser and Query Builder. zLinks is the client-side complement to the company's server-side technologies and services. 

    The real work of zLinks comes through its access to the remote and free Zitgist Linked Data Servers.  These Zitgist servers are the place where the heavy lifting of relating and finding new relevant information is done.  An animated "working" icon appears while these additional related information and links are assembled.  

    To learn more, check this blog post for more information: [Blogs, Wordpress, Zitgist and the Semantic Web](http://fgiasson.com/blog/index.php/2007/09/01/blogs-wordpress-zitgist-and-the-semantic-web/ "").

    The popup also has links to further FAQs and information regarding the zLinks tool.
