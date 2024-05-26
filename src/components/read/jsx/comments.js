const PAGE_URL = "newsua.netlify.app";
const PAGE_IDENTIFIER = `/read${article.id}`

var disqus_config = function () {
    this.page.url = PAGE_URL;  
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
(function () { 
    var d = document, s = d.createElement('script');
    s.src = 'https://newsua-1.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();