import mongoose  from 'mongoose';

const postSchema = mongoose.Schema({
    userId: {
        type: 'string',
        required: true
    },
    username: 'string',
    desc: 'string',
    likes: [],
    image: 'string'
}, {timestamps: true}
);

const PostModel = mongoose.model("Posts", postSchema);
export default PostModel