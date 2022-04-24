const dummy = (blog) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

const getFavoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  let favouriteBlog = blogs[0];

  blogs.forEach((blog) => {
    favouriteBlog = blog.likes > favouriteBlog.likes ? blog : favouriteBlog;
  });

  return favouriteBlog;
};

module.exports = {
  dummy,
  totalLikes,
  getFavoriteBlog,
};
