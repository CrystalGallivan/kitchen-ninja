<template>
  <div class="col communication-list d-flex justify-content-center">
    <!-- Blog Card List -->
    <div class="card" style="width: 70vw;">
      <div class="row">
        <div class="col-auto pr-0">
          <img :src="blogData.image" class="blog-img img-fluid">
        </div>
        <div class="col">
          <div class="card-block">
            <div class="row">
              <div class="col-md-11 pt-2 pr-1">
                <h4 class="card-title text-left">{{blogData.title}}</h4>
              </div>
              <div class="col-md-1">
                <div class="dropdown dropleft d-flex justify-content-end align-self-right"
                  v-if="blogData.authorId == user._id || user.role == 'admin'">
                  <!-- NOTE is role under user? -->
                  <button class="btn d-down" type="button" id="dropdownBlogButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <img src="../assets/BlogMenu-vertical-32.png" alt="" srcset="">
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a data-toggle="modal" :data-target="'#editBlogModal'+blogData._id" class="dropdown-item"
                      href="#">Edit
                      Blog</a>
                    <a @click='deleteBlog' class="dropdown-item" href="#">Delete Blog</a>
                  </div>
                </div>
              </div>
            </div>
            <p class="card-text text-left blog-content">{{blogData.content}}</p>
          </div>
          <div class="card-footer d-flex justify-content-end mr-1 mt-5">
            <!-- NOTE <small class="author-name text-right text-muted">@{{blogData.timestap}}</small> -->
            <!-- NOTE If you want to add the date to communication blogs -->
            <small class="author-name text-right text-muted">@{{blogData.author}}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Blog Modal -->
    <div class="modal fade" :id="'editBlogModal'+blogData._id" tabindex="-1" role="dialog"
      aria-labelledby="blogModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="blogModalLabel">Blog Creator</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editBlog">
              <div class="modalform-group">
                <label for="blogInputTitle" class="mt-2 mb-0">Blog Title</label>
                <input v-model="blog.title" type="text" class="form-control" id="blogInputTitle"
                  aria-describedby="blogHelp" placeholder="Enter Blog Title" required>
                <small id="blogHelp" class="form-text text-muted">Enter a descriptive blog title.</small>
              </div>
              <div class="modal-form-group">
                <label for="inputBlogAuthor" class="mt-2 mb-0">Blog Author</label>
                <input v-model="blog.author" type="text" class="form-control" id="inputBlogAuthor"
                  placeholder="Enter Username" required>
              </div>
              <div class="modal-form-group">
                <label for="inputBlogImage" class="mt-2 mb-0">Blog Image</label>
                <input v-model="blog.image" type="url" class="form-control" id="inputBlogImage"
                  aria-describedby="blogImageHelp" placeholder="Enter Image">
                <small id="blogImageHelp" class="form-text text-muted">Image not required.</small>
              </div>
              <div class="modal-form-group">
                <label for="inputBlogContent" class="mt-2 mb-0">Blog Content</label>
                <textarea rows="3" v-model="blog.content" type="text" class="form-control" id="inputBlogContent"
                  aria-describedby="blogContentHelp" placeholder="Enter Blog Content" required></textarea>
                <small id="blogContentHelp" class="form-text text-muted">Enter blog content here.</small>
              </div>
              <button type="submit" class="btn btn-success mb-3 mt-3">Save Blog</button>
              <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommunicationList",
    props: ['blogData'],
    data() {
      return {
        blog: {
          title: this.blogData.title || "",
          image: this.blogData.image || "",
          content: this.blogData.content || "",
          author: this.blogData.author || "",
          id: this.blogData._id
        },
        eId: this.blogData._id
      }
    },
    computed: {
      blogs() {
        return this.$store.state.blogs
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      editBlog() {
        if (this.blog) {
          this.blogData.blog = this.blog
          this.$store.dispatch('editBlog', this.blog)
        }
        let eId = this.eId
        // TODO get this close modal working
        $("'#editBlogModal'+eId").modal("hide");
        $(".modal-backdrop").remove();
      },
      deleteBlog() {
        this.$store.dispatch("deleteBlog", this.blog.id)
      }
    },
  }
</script>

<style scoped>
  .card {
    margin-top: .5rem;
    margin-bottom: .5rem;
    min-height: max-content;
    /* display: inline-flex; */
  }

  .card-body {
    padding-left: 0px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .blog-content {
    font-family: 'Aleo', serif;
    font-size: 18px;
    color: rgb(5, 38, 45);
  }

  .card-title {
    font-family: 'Bree Serif', serif;
    color: rgb(5, 38, 45);
    /* padding-left: 0px; */
  }

  .card-footer {
    background: transparent;
    border: none;
    padding-left: 0px;
    padding-right: 2px;
    padding-top: 5px;
    padding-bottom: 5px;
    /* position: absolute; */
  }

  .blog-img {
    max-height: 300px;
    max-width: 300px;
    padding-left: .2rem;
  }

  .d-down {
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
</style>