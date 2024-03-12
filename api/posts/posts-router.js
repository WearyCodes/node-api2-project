// implement your posts router here
const express = require('express')
const router = express.Router()

const Post = require('./posts-model')

router.get('/', (req, res) => {
Post.find()
    .then(found =>{
        res.json(found)}
    )
    .catch(err => {
        res.status(500).json({
            message: 'The posts information could not be retrieved',
            err: err.message,
            stack: err.stack
        })
    })
})

router.get('/:id', async (req, res) => {
try {
    const post = await Post.findById(req.params.id)
    if (!post) {
        res.status(404).json({
            message: 'The post with the specified ID does not exist',
        })
    } else {
        res.json(post)
    }
} catch (err) {
    res.status(500).json({
        message: 'The post information could not be retrieved',
        err: err.message,
        stack: err.stack,
    })
}
})

router.post('/', (req, res) => {
    const {title, contents} = req.body
if (!title || !contents) {
    res.status(400).json({
    message: 'Please provide title and contents for the post'})
} 
else { Post.insert({title, contents})
.then(({id}) => {
    return Post.findById(id)
})
.then(post => {
    res.status(201).json(post)
})
.catch(err => {
    res.status(500).json({
        message: 'There was an error while saving the post to the database',
        err: err.message,
        stack: err.stack,
    })
})
}}

)

router.delete('/:id', async (req, res) => {
    const postId = req.params.id
    try {
        const post = await Post.findById(postId)
        if (!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            const deletedStuff = await Post.remove(postId)
            res.json(post)
        }
    }
    catch (err) {
            res.status(500).json({
                message: 'The post information could not be retrieved',
                err: err.message,
                stack: err.stack,
            })
    }
})

router.put('/:id', (req, res) => {
    const post = Post.findById(req.params.id)
    const {title, contents} = req.body
    if (!title || !contents) {
        res.status(400).json({
        message: 'Please provide title and contents for the post'})
    } else {
        Post.findById(req.params.id)
        .then(something => {
        if (!something) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            return Post.update(req.params.id, req.body)
        }
        })
        .then( data => 
            {return Post.findById(req.params.id)}
            ).then(post => res.json(post))
        .catch(err => {
            res.status(500).json({
                message: 'The post information could not be retrieved',
                err: err.message,
                stack: err.stack,
            })
        })
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                message: 'The post with the specified ID does not exist',
            })
        } else {
            await Post.findPostComments(req.params.id).then(
                 comments => res.json(comments)
            )
        }
    }
    catch (err){
        res.status(404).json({
            message: 'The comments information could not be retrieved',
            err: err.message,
            stack: err.stack,
        })
    }
})
module.exports = router