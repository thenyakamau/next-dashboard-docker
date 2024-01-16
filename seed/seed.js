
const {placeHolderData} = require('./placeholder-data')
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    placeHolderData.map(async (user) => {
      console.log(`Inserting/Updating user with slug: ${user.slug}`);
      
      await prisma.users.upsert({
        where: {
          slug: user.slug,
        },
        update: user,
        create: user,
      });
      console.log(`Inserted/Updated user with slug: ${user.slug}`);
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
