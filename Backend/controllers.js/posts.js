import mongoose from 'mongoose';


import PostMessage from '../models/postMessage.js'
export const getPosts  = async (req,res)=>{
    try {
        const postMessages = await PostMessage.find();
        // console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(403).json({message: error.message})
    }
};


export const createPosts= async (req,res)=>{
    const post=  req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409),json({message: error.message})
    }
};

export const updatePost = async (req,res)=>{
    const { id:_id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id found');
    
    const updatedPost= await PostMessage.findByIdAndUpdate(_id, {...post,_id} ,{new: true})

    res.json(updatedPost);
}
export const deletePost = async (req,res)=>{
    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id found');
    

    await PostMessage.findByIdAndRemove(_id);

    res.json({message: 'Post deleted successful'})
}

export const likePost = async(req,res)=>{
    const {id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id found');

    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {like: post.like+1},{new: true});
    
    res.json(updatedPost);
}

export const disLikePost = async ( req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id found');
    const post = await PostMessage.findById(_id);
    // const updatedPost = await PostMessage.findByIdAndUpdate(_id,{disLike:post.disLike+1},{new:true});
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {disLike: post.disLike+1},{new: true});

    res.json(updatedPost);
}