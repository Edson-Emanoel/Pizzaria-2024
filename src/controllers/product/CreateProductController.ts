import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController{
    async handle(req: Request, res: Response) {

        const { name, price, description, category_id } = req.body;

        let banner = '';

        if (!req.file) {
            throw new Error("Erro ao fazer o upload da imagem")
        }else{
            const { originalname, filename: banner } = req.file;

            const createProductService = new CreateProductService();

            const product = await createProductService.execute({
                name,
                price,
                description,
                banner,
                category_id
            });

            return res.json(product);
        }

    }
}

export { CreateProductController }