import { type DefaultSession } from "next-auth"
import { type User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User;
    }

    interface User {
        id?: PrismaUser["id"];
        email?: PrismaUser["email"];
        username: PrismaUser["username"];
        createdAt: PrismaUser["createdAt"];
        updatedAt: PrismaUser["updatedAt"];
    }
}

import { type JWT as _JWT } from "next-auth/jwt"
// import { PrismaAdapter } from "@auth/prisma-adapter";
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
    }
}
