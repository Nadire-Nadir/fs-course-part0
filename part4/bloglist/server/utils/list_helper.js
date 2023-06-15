const dummy = (blogs) => {
    if (blogs) {
      return 1
  }
}

const totalLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    } if (blogs.length === 1) {
        const likesSum = blogs[0].likes
        return likesSum

    } else {
        const likesSum = blogs.reduce((likeSum, blog) => likeSum + blog.likes, 0)
        return likesSum
    }
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, current) =>
        (prev.likes > current.likes) ? prev : current
    )

    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};
