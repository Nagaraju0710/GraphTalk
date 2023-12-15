const express=require("express")
const {PostsModel}=require("../module/posts.model")
// const {auth}=require("../middleware/auth.middleware");

const postsRoutes=express.Router()

// postsRoutes.use(auth);


postsRoutes.post("/add",async(req,res)=>{
  const {end_year,intensity,sector,topic,insight,url,region,start_year,impact,added,published,country,relevance,pestle,source,title,likelihood}=req.body;
    // const payload=req.res
    // console.log(payload)

    try{
      const user= new PostsModel({
        end_year,
        intensity,
        sector,
        topic,
        insight,
        url,
        region,
        start_year,
        impact,
        added,
        published,
        country,
        relevance,
        pestle,
        source,
        title,
        likelihood
      });
  
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.log(error); // Log the error for debugging
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

// const createAppointment = async (req, res) => {
//   const { user, slot, date, isBooked } = req.body;

//   try {
//     const newAppointment = new Appointment({
//       user,
//       slot,
//       date,
//       isBooked,
//     });

//     await newAppointment.save();
//     res.status(201).json(newAppointment);
//   } catch (error) {
//     console.log(error); // Log the error for debugging
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// postsRoutes.get("/posts",async(req,res)=>{
//     const post=await PostsModel.find()
//     res.status(200).json(post);

    // res.status(200).send(post)
// })
postsRoutes.get("/",async(req,res)=>{
  try {
    const users = await PostsModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// postsRoutes.get("/posts/:id",async(req,res)=>{
//     const post=await PostsModel.find({userId:req.body.userId,_id:req.params.id})
//     res.status(200).send(post)
// })


// postsRoutes.patch("/update/:id",auth,async(req,res)=>{
//     const {id}= req.params
//     const post=await PostsModel.findOne({_id:id})
//     console.log(post)
//   try{
// await PostsModel.findByIdAndUpdate({_id:id},req.body);
// res.status(200).send(post)
//   }catch(err){
//     res.status(200).send({"error":err})
//   }
    
// })

// postsRoutes.delete("/delete/:id",auth,async(req,res)=>{
//     const {id}= req.params
//     const post=await PostsModel.findOne({_id:id})
//     console.log(post)
//   try{
//     if(req.body.userId!==post.userId){
//         res.status(200).send({"msg":"You are not authorized"})
//     }
//     else{
//         await PostsModel.findByIdAndDelete({_id:id});
//         res.status(200).send({"msg":"post deleted"})
//     }

//   }catch(err){
//     res.status(200).send({"error":err})
//   }
    
// })


module.exports={
    postsRoutes
}
