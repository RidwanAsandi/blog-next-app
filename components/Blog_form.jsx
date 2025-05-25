import React from "react";

const BlogForm = () => {
  return (
    <div>
      <form
        action="http://localhost:3000/api/blog"
        method="POST"
        enctype="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          className="border border-solid border-black"
          placeholder="nama"
        />
        <input
          type="text"
          name="description"
          className="border border-solid border-black"
          placeholder="description"
        />
        <input
          type="text"
          name="category"
          className="border border-solid border-black"
          placeholder="category"
        />
        <input
          type="text"
          name="author"
          className="border border-solid border-black"
          placeholder="author"
        />
        <input
          type="text"
          name="authorImg"
          className="border border-solid border-black"
          placeholder="authorImg"
        />
        <input type="file" name="image" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default BlogForm;
