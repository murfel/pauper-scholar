// I omitted aria-checked='true' from the <a> tag.
// I didn't notice it trigger anything when I was writing the code
// so I removed it to keep the code stable.
var html = `
<div class='gs_pad'>
  <div class='gs_hr'></div>
</div>
<ul id='gs_lnv_access' class='gs_pad'>
  <li class='gs_inw'><a role='checkbox' id='free' class='gs_in_cb'><span class='gs_lbl'>free-access articles</span><span class='gs_chk'></span><span class='gs_cbx'></span></a></li>
  <li class='gs_inw'><a role='checkbox' id='paid' class='gs_in_cb'><span class='gs_lbl'>paid-access articles</span><span class='gs_chk'></span><span class='gs_cbx'></span></a></li>
</ul>
`;

// Insert the HTML code for unchecked checkboxes.
document.getElementById('gs_lnv_misc').insertAdjacentHTML('afterEnd', html);


// 'free' for free-access articles,
// 'paid' for paid-access articles.
// Note, that some 'paid' articles can in fact be free-access ones
// which were indexed wrong and lack a direct url to them.
var typesOnPage = new Set(['free', 'paid']);


// Retrieve search results.
var searchResults = Array.from(document.getElementsByClassName('gs_r'));

// Classify them into 'free', 'paid', and 'other'.
var searchResultTypes = [];
for (var i = 0; i < searchResults.length; i++) {
  // TODO: handle citations and patents properly.
  // As of now, they are being classified as 'paid' articles.

  // Avoid hiding 'User profiles for' and other possible non-article
  // results by marking them as 'other'.
  // Alternatively, I could use if length >= 11, blah...
  // 'gs_ri' -- class for a search result info (e.g. a user profile).
  if (searchResults[i].getElementsByClassName('gs_ri').length == 0)
    searchResultTypes.push('other');
  // 'gs_ggs' -- class for a url to the text of an article or to a library.
  else if (!searchResults[i].getElementsByClassName('gs_ggs').length)
    searchResultTypes.push('paid');
  else
    searchResultTypes.push('free');
}

// Sync with previously set values and call to render results.
chrome.storage.sync.get(['free', 'paid'], function(checkboxes) {
  // If checkboxes' values are not set, initialize them to true.
  if (!checkboxes.hasOwnProperty('free')) {
    chrome.storage.sync.set({'free': true, 'paid': true});
    checkboxes.free = true;
    checkboxes.paid = true;
  }
  
  var types = new Set();
  if (checkboxes.free) {
    document.getElementById('free').classList.add('gs_sel');
    types.add('free');
  }
  if (checkboxes.paid) {
    document.getElementById('paid').classList.add('gs_sel');
    types.add('paid');
  }
  renderResults(types);
});


// Listen to checkboxe toggling.
document.getElementById('free').onclick = function() {toggleCheck('free');};
document.getElementById('paid').onclick = function() {toggleCheck('paid');};


// If toggled, sync the checkbox value, and call to render results.
function toggleCheck(type) {
  var dataObj = {};
  var types = typesOnPage;
  var cl = document.getElementById(type).classList;
  if (cl.contains('gs_sel')) {
    cl.remove('gs_sel');
    dataObj[type] = false;
    chrome.storage.sync.set(dataObj);
    types.delete(type);
  }
  else {
    cl.add('gs_sel');
    dataObj[type] = true;
    chrome.storage.sync.set(dataObj);
    types.add(type);
  }
  renderResults(types);
}

function renderResults(types) {
  types.add('other');
  for (var i = 0; i < searchResultTypes.length; i++) {
    if (types.has(searchResultTypes[i]))
      searchResults[i].style.display = 'block';
    else
      searchResults[i].style.display = 'none';
  }
  typesOnPage = types;
}
