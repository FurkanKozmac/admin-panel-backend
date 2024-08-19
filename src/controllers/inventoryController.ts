import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, stockQuantity, imageUrl, ownerId } =
      req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        stockQuantity,
        imageUrl,
        ownerId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ msg: "Couldn't create product." });
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    const deletedProduct = await prisma.products.delete({
      where: { productId: productId },
    });

    res.status(200).json({
      msg: "Product successfully deleted.",
      deletedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Product couldn't deleted or it does not exist." });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Couldn't retrieve products data." });
  }
};
