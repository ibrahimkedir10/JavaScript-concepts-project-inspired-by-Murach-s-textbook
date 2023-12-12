//window.onload = function () {

    const list = document.getElementById("list");
    const img = document.getElementById("img");
    const header = document.getElementById("header");
    const links = list.getElementsByTagName("a"); // Use getElementsByTagName on list, not document

    // process images
    let imageCache = [];
    let image, linkNode;

    for (let i = 0; i < links.length; i++) { // Change from list.length to links.length
        linkNode = links[i];

        // preload img 
        image = new Image(); // Use 'Image' constructor, not 'image'
        image.src = linkNode.getAttribute("href"); // Fix typo in 'href'
        image.title = linkNode.getAttribute("title"); // Fix typo in 'title'
        imageCache[imageCache.length] = image;
    }

    // start slide show 
    let counter = 0; // Change 'const' to 'let' for counter
    const timer = setInterval(
        function () {
            counter = (counter + 1) % imageCache.length;
            image = imageCache[counter];
            img.src = image.src;
            header.firstChild.nodeValue = image.title;
        },
        2000
    );

}