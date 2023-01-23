const express = require('express');
const { urlencoded } = require('express');
const dotenv = require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const port = process.env.PORT || 5001;
const prisma = new PrismaClient()
const app = express();

app.use(express.json());
app.use(urlencoded({extended:false}));

app.get('/api/user', async (req: any,res: any) =>{
  const users = await prisma.user.findMany();
  res.json(users);
  console.dir(users,{depth:null})
});

app.get('/api/allUsers', async (req:any, res:any) =>{

    const allUsers = await prisma.user.findMany({
      include:{
        posts:true,
        profile:true
      }
    });
    res.status(200).json(allUsers);

    console.dir(allUsers,{depth:null})
});

app.post('/api/user', async (req: any,res: any) => {
  const {name,email} = req.body;
  console.log(name + " " + email);
  const addNewUser = await prisma.user.create({
        data:{
            name: name,
            email: email
        },
    });
  res.status(200).json(addNewUser);
});


// broken for somereason...
app.put('/api/updateUser/:id', async (req :any,res:any) =>{
  const {id} = req.params;
  const {name} = req.body;
  console.log(`${id} ${name}`);
  const post = await prisma.user.update({
    where:{id},
    data:{
      name:name,
    }
  });
  res.json(post);
});

app.listen(port,() =>{
  console.log(`Server starting on port ${port}`);
});







// async function main() {
//   // ... you will write your Prisma Client queries here

//     // await prisma.user.create({
//     //     data:{
//     //         name:'Bob',
//     //         email:'Bob@knights.ucf.edu'
//     //     },
//     // })

//     const users = await prisma.user.findMany();
//     console.dir(users,{depth:null})

//     const view = await prisma.user.findMany({
//         include:{

//             posts: true,
//             profile:true,
//         },
//     })

//     // const usersWithPosts = await prisma.user.findMany({
//     //     include:{
//     //         posts:true,
//     //     },
//     // })

//     // console.dir(usersWithPosts,{depth:null})

// }
