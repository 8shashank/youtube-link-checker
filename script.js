(function() {

    function makeAJAXRequest(e) {
        var xhr = new XMLHttpRequest();
        var expr = /(youtu\.be\/|[?&]v=)([^&]+)/;
        try {
            var id = e.href.match(expr)[2];
        } catch (e) { //return if false positive
            return;
        }
        var url = api_link + id + "?alt=json";
        xhr.onreadystatechange = callback;
        xhr.open("GET",
            url,
            true);
        xhr.send(null);

        function callback() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText === "Invalid id") {
                    e.style.textDecoration = "line-through";
                    return;
                }
                var res = JSON.parse(xhr.responseText);
                if (res.entry.app$control !== undefined) {
                    e.style.textDecoration = "line-through";
                }
            }
        }
    }

    var api_link = "http://gdata.youtube.com/feeds/api/videos/";

    var youtube_links = Array.prototype.slice.call(document.getElementsByTagName('a')).filter(function(e, i, a) {
        return (e.href.replace(".", "").indexOf("youtube") !== -1);
    });

    youtube_links.forEach(makeAJAXRequest);
})();
