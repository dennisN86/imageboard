(function() {
    var app = new Vue({
        el: "#main",
        data: {
            images: []
        },
        mounted: function() {
            var self = this;
            axios.get("/images").then(function(results) {
                self.images = results.data;
            });
        }
    });
})();

// put data into .json obj
// client request to db for pictures
// loop over stuff in the html
// createdb imageboard / psql -d imageboard -f sql/images.sql
// add three pictures to db
