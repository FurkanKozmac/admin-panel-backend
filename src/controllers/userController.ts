import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, userName, password } = req.body;
    const user = await prisma.user.create({
      data: {
        userId,
        userName,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Couldn't create user." });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const users = await prisma.user.findMany({
      where: {
        userName: {
          contains: search,
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Couldn't retrieve users data." });
  }
};
