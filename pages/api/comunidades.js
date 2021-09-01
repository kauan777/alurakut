import { SiteClient } from 'datocms-client'


export default async function recebedorDeRequests(request, response) {

    if (request.method === "POST") {

        const TOKEN = `3033a7879304664e6b33a9d3434ef6`
        const client = new SiteClient(TOKEN)

        //Importante validar os dados, antes de sair cadastrando
        const registrocriado = await client.items.create({
            itemType: "1119787",// ID DO MODELO criado pelo Dato
            ...request.body

            //   title: "Comunidade teste",
            //   imageUrl: "https://github.com/kauan777.png",
            //   creatorSlug: "comunidade-teste"

        })

        response.json({
            dados: "algm dado qualquer",
            registrocriado: registrocriado
        })
        return;
    }
    response.status(404).json({
        message: "Ainda não temos nada no GET, MAS no POST tem!"
    })
}




