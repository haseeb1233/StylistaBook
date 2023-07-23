import React from 'react';

const LatestNews = () => {
  return (
    <section className="blog-homepage section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <span>Read Blog</span>
              <h2>Latest News</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 animate-box" data-animate-effect="fadeInLeft">
            <div className="img left">
              <a href="post.html">
                <img
                  src="https://duruthemes.com/demo/html/belenava/demo3/img/blog/1.jpg"
                  alt=""
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
          <div className="col-md-6 valign animate-box" data-animate-effect="fadeInRight">
            <div className="content">
              <div className="cont">
                <div className="info">
                  <h6>
                    <a href="blog.html" className="tags">
                      Hair
                    </a>{' '}
                    - December 21, 2022
                  </h6>
                </div>
                <h4>How to Form a Simple Hair Care Routine</h4>
                <p>
                  Whether your hair care routine was solidified in high school, college, or during post-grad life, you
                  most likely have not made any changes since ..
                </p>
                <a href="post.html" className="more" data-splitting="">
                  <span>Read More</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Add more blog rows as needed */}
      </div>
    </section>
  );
};

export default LatestNews;
