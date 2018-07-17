(function() {
    var app = new Vue({
        el: "#main",
        data: {
            images: [],
            title: "",
            description: "",
            username: ""
        },
        mounted: function() {
            var self = this;
            axios.get("/images").then(function(results) {
                self.images = results.data;
            });
        },
        methods: {
            imageSelected: function(e) {
                this.imageFile = e.target.files[0];
                console.log(e.target.files[0]);
            },
            upload: function() {
                console.log("This file uploading", this.imageFile);
                var formData = new FormData();
                formData.append("file", this.imageFile);
                formData.append("title", this.title);
                formData.append("description", this.description);
                formData.append("username", this.username);
                axios.post("/upload", formData).then(function(res) {
                    app.images.unshift(res.data.image);
                });
            }
        }
    });
})();
