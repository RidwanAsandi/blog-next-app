"use client";

// import BlogForm from "@/components/Blog_form";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      {/* <BlogForm /> */}
      <BlogList />
      <Footer />
    </>
  );
}
