const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here

    await prisma.user.create({
        data:{
            name:'Bob',
            email:'Bob@knights.ucf.edu'
        },
    })

    // const users = await prisma.user.findMany();
    // console.dir(users,{depth:null})

    // const view = await prisma.user.findMany({
    //     include:{
    //         posts: true,
    //         profile:true,
    //     },
    // })

    //  console.dir(view,{depth:null})

    const usersWithPosts = await prisma.user.findMany({
        include:{
            posts:true,
        },
    })

    console.dir(usersWithPosts,{depth:null})


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })