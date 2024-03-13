import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [getPosts, setGetPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchPosts = async (page) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `https://hyrr.onrender.com/post/getAllPosts?page=${page}`,
        config
      );

      const { data, totalPages } = response.data;
      setGetPosts(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPosts(page);
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  return (
    <div className="container my-2">
      <div className="row">
        {getPosts ? (
          getPosts.map((post) => {
            return (
              <>
                <div className="col-lg-3 col-md-4 post mb-2">
                  <div className="card">
                    <div className="card-body">
                      <p>{post.id}</p>
                      <hr />
                      <p>
                        <b>Title</b>
                      </p>
                      <h5 className="card-title">{post.title}</h5>
                      <hr />
                      <p>
                        <b>Body</b>
                      </p>

                      <p className="card-text">{post.body?.slice(0, 70)}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <span>
        <b>Page No - {currentPage}</b>
      </span>
      <div>
        {Array.from({ length: totalPages }, (val, index) => (
          <button
            key={index + 1}
            className="page-btn"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Posts;
