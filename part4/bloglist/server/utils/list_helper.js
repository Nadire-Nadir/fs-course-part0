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
    if (blogs.length === 0) {
        return null
    } else {
        const favorite = blogs.reduce((prev, current) =>
            prev.likes > current.likes ? prev : current
        )
        return favorite
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        let authorCounts = blogs.reduce((authorCount, blog) => {
            authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
            return authorCount
        }, {})

        let maxBlogs = Math.max(...Object.values(authorCounts))
        let topAuthor = Object.keys(authorCounts).filter(author => authorCounts[author] === maxBlogs)
        return {
            author: topAuthor[0],
            blogs: maxBlogs
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        let likesCounts = blogs.reduce((likesCount, blog) => {
            likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
            return likesCount
        }, {})
        let maxCount = Math.max(...Object.values(likesCounts))
        let mostLiked = Object.keys(likesCounts).filter(author => likesCounts[author] === maxCount)
        return {
            author: mostLiked[0],
            likes: maxCount
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
