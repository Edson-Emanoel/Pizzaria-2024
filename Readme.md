## Comandos do projeto

* Comando para inicializar o projeto com JS
````
npm init -y
    ou
yarn init -y
````

* Comando para instalar o Typescript
````
npm add typescript -D
````

* Comando para instalar o express
````
npm add express
````

* Comando para instalar os types do express
````
npm add @types/express -D
````

* Comando para inicializar o Typescript
````
npx tsc --init
````

* Comando para instalar o ts-node-dev
````
npm add ts-node-dev -D
````

* Depois do comando acima devemos colocar a seguinte parte no package.json
````
"scripts": {
    "dev": "ts-node-dev --transpile-only src/server.ts"
}
````

* Comando para instalar o express-async-errors
````
npm add express-async-errors
````

* Comando para instalar o cors
````
npm add cors
````

* Comando para instalar os types do express
````
npm add @types/cors -D
````

* Comando para instalar o mysql
````
npm add mysql
````

* Comando para instalar o bcryptjs para encriptar a senha
````
npm add bcryptjs
````

* Comando para instalar os types do bcryptjs para encriptar a senha
````
npm add @types/bcryptjs -D
````

* Comando para instalar o JWT(JSONWEBTOKEN)
````
npm add jsonwebtoken
````

* Comando para instalar uma forma de acessar o .env
````
npm add dotenv
````

* Depois vá ao .enve e mude a propriedade strict para false. Dessa forma:
````
    "strict": false,
````

## Comandos do Prisma

* Comando para instalar o prisma
````
npm add prisma
````

* Comando para instalar o @prisma/client
````
npm add @prisma/client
````

* Comando para inicializar o prisma
````
npx prisma init
````

* Como o schema.prisma tem que estar cnfigurado
````
    generator client {
    provider = "prisma-client-js"
    }

    datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
    }
````

* Comando para criar uma migration com o prisma
````
npx prisma migrate dev
````

## Configurando o Multer

_1._ Use o comando a seguir para instalar o multer
````
npm add multer
````

_2._ Use o comando a seguir para instalar os types do multer
````
npm add @types/multer -D
````

_3._ Depois crie a pasta 'config' dentro do 'src' e crie o arquivo 'multer.ts'.

_4._ Depois crie a pasta 'tmp' fora de 'src'

_5._ O arquivo 'multer.ts' deverá ficar, com a seguinte estrutura:
````
    import multer from "multer";
    import crypto from "crypto";

    import {extname, resolve} from "path";

    export default{
        upload(folder: string){
            return{
                storage: multer.diskStorage({
                    destination: resolve(__dirname, '..', '..', folder),
                    filename: (request, file, callback) => {
                        const fileHash = crypto.randomBytes(16).toString("hex");
                        const fileName = `${fileHash}-${file.originalname}`;

                        return callback(null, fileName)
                    }
                })
            }
        }
    }
````

_6._ Depois adiciona as seguintes importações, no arquivo 'routes.ts'
````
    import multer from 'multer';
        e
    import uploadConfig from "./config/multer";
````

_7._ Configure o multer no arquivo, 'routes.ts' da seguinte forma:
````
    const upload = multer(uploadConfig.upload("./tmp"));
````

_8._ A Rota de Criar produtos deverá ficar assim:
````
    router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
````

_9._ E o defina o multer em uma variável, no arquivo 'CreateProductController.ts'
````
    const { originalname, filename: banner } = req.file;
````

_10._ E assim deverá ficar, a estrutura do arquivo'CreateProductController.ts'
````
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
````