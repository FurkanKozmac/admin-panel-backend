import { Router } from "express";
import {
  createProduct,
  getProducts,
  deleteProductById,
} from "../controllers/inventoryController";

const router = Router();

router.post("/", createProduct);
router.delete("/:productId", deleteProductById);
router.get("/", getProducts);

export default router;
