import "server-only";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
