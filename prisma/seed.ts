import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.room.create({
    data: {
      roomNumber: "101",
      slug: "presidential-suite",
      type: "PRESIDENTIAL",
      pricePerNight: 1200,
      capacity: 2,
      description: "The pinnacle of luxury with panoramic skyline views.",
      amenities: ["Private Pool", "24/7 Butler", "Champagne Bar"],
      status: "AVAILABLE",
    },
  });
  console.log("Seeded: Presidential Suite Created");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());