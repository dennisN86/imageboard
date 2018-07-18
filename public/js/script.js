(function() {
    Vue.component("image-modal", {
        data: function() {
            return {
                title: ""
            };
        },
        props: ["id"],
        mounted: function() {
            var self = this;

            axios.get("/get-single-image" + this.id).then(resp => {
                self.url = resp.data.url;
                self.title = resp.data.title;
            });
        },
        template: "#id-image"
    });
    // capture the image id the user clicked on

    var app = new Vue({
        el: "#main",
        data: {
            images: [],
            title: "",
            description: "",
            username: "",
            id: null
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
            getModal: function(id) {
                this.id = id;
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
