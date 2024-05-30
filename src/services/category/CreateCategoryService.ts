import prismaClient from "../../prisma"

interface CategoryRequest{
    name: String
}

class CreateCategoryService {
    async execute ({ name }: CategoryRequest){
        
        if (name === '') {
            throw new Error('Nome inválido!')
        }

        const category = await prismaClient.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true,
            }
        })

        return category;

    }
}

export { CreateCategoryService }