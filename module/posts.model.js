const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
            end_year: String,
            intensity: Number,
            sector: String,
            topic: String,
            insight: String,
            url: String,
            region: String,
            start_year: String,
            impact: String,
            added: String,
            published: String,
            country: String,
            relevance: Number,
            pestle: String,
            source: String,
            title: String,
            likelihood: Number
},{
    versionKey:false
})

const PostsModel=mongoose.model("posts",postSchema);

module.exports={
    PostsModel
}