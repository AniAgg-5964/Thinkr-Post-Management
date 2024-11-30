const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid'); 
const methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {   id:uuidv4(),
        username:"anixavi87",
        content:"i love singing",
    },
    {   id:uuidv4(),
        username:"caprous_11",
        content:"i love painting",
    },
    {   id:uuidv4(),
        username:"pranshubansal",
        content:"i love coding"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    //ERROR EJS TEMPLATE CAN BE built
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        res.render("error.ejs");
    } else {
        res.render("show.ejs", { post });
    }
    })

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    console.log(id);
    let post = posts.find((p) =>  id===p.id);
    let newContent=req.body.content;
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");

})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})