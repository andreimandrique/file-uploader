import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dashboardGet = async (req, res) => {
  const allFile = await prisma.file.findMany({
    where: {
      owner_id: req.user.user_id,
    },
  });
  res.render("dashboard", { files: allFile });
};

export { dashboardGet };
