# Pauper Scholar

Pauper Scholar is a Chrome extension for the Google Scholar website which adds an ability to differentiate between free-access and paid-access articles, concretely, it can hide all paid-access articles in search results.

Please note that the extension detects the type of an article based on whether there's a url to an article text or to a library specified in your settings next to its search result. If there's no such a url, the extension claims it's a paid-access one. However, it could still be a free-access one which was indexed wrong (see [Inclusion#Indexing]) and thus lacks a direct url to its text on the search result page.

If you have a relatively small total number of search results, Pauper Scholar recommends that you first look through all free-access results, and then try high-probability paid-access results some of which may turn out to be free-access ones.

If you see a small number of results per page after applying a filter, Pauper Scholar recommends that you go to setting and choose to show 20 results per page. Some of 20 results will be hidden and you will be left with several of them.

![Demonstration of the extension's work.](demo.png)

## Installation

Unfortunately, this extension is not available in Chrome Web Store so you'll need to install it manually. There are two ways to install the extension. If none of them works for you, go to the [issues tab] and look for installation issues. If there are no installation issues, create a new issue and explain what exactly went wrong when you followed both of the instructions. Please specify the operating system you use (Windows, Mac, Linux) and your Chrome version (can be found at `chrome://help`). 

### Method 1
1. Download the [packaged extension].
2. Go to ```chrome://extensions```
3. Check the Developer mode checkbox if it isn't checked already.
4. Drag and drop the `pauper-scholar.crx` file onto the Extensions page.
5. In the appeared pop-up, click Add extension.
6. Uncheck the Developer mode checkbox if you checked it in the 3rd item.

### Method 2
1. Download the [repository].
2. Unzip the `master.zip` file.
3. Go to ```chrome://extensions```
4. Check the Developer mode checkbox if it isn't checked already.
5. Click Load unpacked extension...
6. In the appeared Select the extension directory window, choose the `src` directory inside of the unzipped `master` directory.
7. Uncheck the Developer mode checkbox if you checked it in the 4th item.

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

## Attribution
The Pauper Scholar [icon](src/icon128.png) is a derivative work of the `school` icon from the [Material icons] collection.


   [Inclusion#Indexing]: <https://scholar.google.com/intl/en/scholar/inclusion.html#indexing>
   [issues tab]: <https://github.com/murfel/pauper-scholar/issues/>
   [packaged extension]: <https://github.com/murfel/pauper-scholar/raw/master/pauper-scholar.crx>
   [repository]: <https://github.com/murfel/pauper-scholar/archive/master.zip>
   [Material icons]: <https://design.google.com/icons/>
