import cloudinary from "@/lib/cloudinary";
import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
// import { writeFile } from "fs/promises";
const fs = require("fs");

const { NextResponse } = require("next/server");

//API Endpoint to get all blogs
export async function GET(request) {
  await ConnectDB();
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

//API Endpoint for Uploading blogs
export async function POST(request) {
  await ConnectDB();
  const formData = await request.formData();
  const image = formData.get("image");

  // if (!image || typeof image === "string") {
  //   return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  // }

  // const timestamp = Date.now();
  // const imageByData = await image.arrayBuffer();
  // const buffer = Buffer.from(imageByData);
  // const path = `./public/${timestamp}_${image.name}`;
  // await writeFile(path, buffer);
  // const imgUrl = `/${timestamp}_${image.name}`;
  // console.log(imgUrl);

  let imgUrl = "/default.png";
  let imgPublicId = "default-img";

  if (image && typeof image !== "string") {
    const buffer = Buffer.from(await image.arrayBuffer());

    // Convert buffer ke base64 string
    const base64Image = `data:${image.type};base64,${buffer.toString(
      "base64"
    )}`;

    // Upload ke Cloudinary
    const uploadRes = await cloudinary.uploader.upload(base64Image, {
      folder: "blog-images",
    });

    imgUrl = uploadRes.secure_url;
    imgPublicId = uploadRes.public_id;
  }

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    // image: `${imgUrl}`,
    image: imgUrl,
    authorImg: `${formData.get("authorImg")}`,
    imagePublicId: imgPublicId,
  };

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}

export async function DELETE(request) {
  await ConnectDB();
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  // if (blog.imagePublicId) {
  //   await cloudinary.uploader.destroy(blog.imagePublicId);
  // }
  // fs.unlink(`./public${blog.image}`, () => {});
  // await BlogModel.findByIdAndDelete(id);
  // return NextResponse.json({ msg: "Blog Deleted" });
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  // ✅ Hapus gambar dari Cloudinary jika public_id ada
  if (blog.imagePublicId && blog.imagePublicId !== "default-img") {
    const result = await cloudinary.uploader.destroy(blog.imagePublicId);
    console.log("Cloudinary delete result:", result);
  }

  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({ msg: "Blog Deleted" });
}
