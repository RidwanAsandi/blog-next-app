"use client";

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import TiptapEditor from "@/components/TiptapEditor";

const page = () => {
  const [image, setImage] = useState(false);
  const [clearEditor, setClearEditor] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Ridwan Asandi",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Ridwan Asandi",
          authorImg: "/author_img.png",
        });
        setClearEditor(true);
      } else {
        toast.error("Gagal Menyimpan");
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="pt-5 mb-5 px-5 sm:pt-12 sm:pl-16"
      >
        <p className="text-xl">Upload thumbnails</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={150}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4">Blog Description</p>
        <TiptapEditor
          description={data.description}
          setDescription={(value) =>
            setData((prev) => ({ ...prev, description: value }))
          }
          clearTrigger={clearEditor}
          onClearDone={() => setClearEditor(false)}
        />
        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border border-solid border-black text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Otomotif">Otomotif</option>
        </select>
        <div className="flex justify-start items-center">
          <button
            type="submit"
            className="mt-8 w-40 h-12 bg-black text-white rounded-full"
          >
            ADD
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
