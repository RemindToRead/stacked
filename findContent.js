var Stacked = Stacked || {};

/**
 * Analyze object
 *
 * The functions under Analyze will grab page content and analyze it.
 *
 * Specifically, the Analyze object will identify how much content needs
 * to be Cardified. The content will be examined for word count, potential
 * card breaks, and any assets requiring special layout.
 *
 * Eventually, Analyze will be fed content from Gather. The results will
 * be sent to Construct.
 *
 */
 Stacked.Analyze = {

  /**
   * Options for Analyze
   *
   * Initialize default values. None of them should need to be used.
   *
   */
  options: {
    view: {
      wordCapacity: 0,
      fontSize: 10,
    },
    doc: {
      page: {},
      content: {}
    },
  },

  blastoff: function(){


    // this.analyzeWindow();
    // this.analyzePage();
  },



  /**
   * All the window analysis functions get initialized under here
   * @initBy blastOff
   */
  analyzeWindow: function(){
    this.getBodyFontSize();
    this.getWordCount();
  },

  /**
   * Use the body node as reference for card font-size
   * @initBy analyzeWindow
   */
  getBodyFontSize: function(){
    var body = querySelector('body');
    var bodyFontSize = window.getComputedStyle(body, null).getPropertyValue('font-size');

    this.options.view.fontSize = bodyFontSize; // Get body font size getComputedStyle
  },

  /**
   * Look at window and guestimate the number of characters per cards
   * @initBy analyzeWindow
   */
  getWordCount: function(){
    window;   // Make analysis decisions from here

    this.options.view.wordCapacity = 0; // window
  },

  /**
   * Grab the entire DOM and save the reference to nodes
   */
  analyzePage: function(){
    this.getAllNodes();
    this.getNodeReference();
    this.getMainContent();
  },

  /**
   * Access document to save all the nodes.
   * @initBy analyzePage
   */
  getAllNodes: function(){
    var page = document.querySelectorAll('*'); // Get content from here

    this.options.doc.page = page;
  },
  /**
   * Find the element with the most h1, h2, h3, h4, h5, p tags
   */
  getNodeReference: function(){
    var page = this.options.doc.page;

    this.options.doc.reference = this.processAllNodes(page);
  },

  /**
   * Process current page to identify the main content
   */
  getMainContent: function(){
    var reference = this.options.doc.reference;

    this.options.doc.content = this.findContentNode(reference); // Save this
  },

  /**
   * Identify the reference index with highest count
   */
  findContentNode: function(reference){
    var largest = 0;
    for(i = 0; i < reference.length; i++){
      if(reference[i]['count'] > reference[largest]['count']){
        largest = i;
      }
    }

    return reference[largest];
  },

  /**
   * Loop through the body's nodes and pass on to functional methods
   * @return reference [Object] Collected count of nodes likelyhood of content
   */
  processAllNodes: function(){
    var properties = {},
        reference = [];
    for(i = 0; i < page.length; i++){
      properties.el = page[i];
      properties.count = this.countContentTags(page[i]);
      reference.push(properties);
    }

    return reference;
  },

  /**
   * Count the number of content tags in the element
   * @initBy processAllTags
   * @return countedTags
   *
   * Potentially, this could be used in the future to keep track of how many
   * of each tag there are. Also, keep track of how many works are in the tags.
   *
   * This would create the potential for identifying the type of content.
   * If there are a lot of images, then its most likely a slideshow.
   *
   * For example, h1: 1, h2: 0, [...] p: 12.
   *
   */
  countContentTags: function(tag){
    var totalCount = 0;
    var match = [ 'H1', 'H2', 'H3', 'H4', 'H5', 'P', 'BLOCKQUOTE', 'IMG' ];
    var tagsChildren = tag.childNodes;
    for(i = 0; i < tagsChildren.length; i++){
      for(j = 0; j < match.length; j++){
        if(tagsChildren[i].nodeName.toUpperCase() == match[j].toUpperCase()){
          totalCount++;
        }
      }
    }

    return totalCount;
  }

};
