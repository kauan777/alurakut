import { AlurakutMenu } from '../../src/lib/JsMasterCommons'
import { Community } from '../../src/styles/comunidade'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'



export default function idCommunity({comunidadeEspecifica}){


    return(
        <>
      <AlurakutMenu/>
        <Community>
            <h1>{comunidadeEspecifica.title}</h1>
            <img src={comunidadeEspecifica.imageUrl}/>
        </Community>
        </>
    )
}

//Função que roda sempre do lado do servidor, antes do componente ser redenrizado
export async function getStaticProps({params}){

    //Pega tudo do datodms e me retorna todas as comunidades
    const response = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            'authorization': 'c9c6885efad04c10705391089b5a95',
            'Content-type': 'application/json',
            'Accept': 'application/json'

        },
        body: JSON.stringify({"query":`
            query {
                allCommunities {
                    id
                    title
                    imageUrl
                    creatorSlug
                  }
            }
        `})
    })

    const communities = await response.json()
    const allCommunities = communities.data.allCommunities
    const comunidadeEspecifica = allCommunities.filter(comunidade => comunidade.id == params.id)[0]

    return {
        props: {comunidadeEspecifica}, 
        revalidate: 60 * 60 * 24 * 30
    }
}

export async function getStaticPaths(){
    

    const response = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            'authorization': 'c9c6885efad04c10705391089b5a95',
            'Content-type': 'application/json',
            'Accept': 'application/json'

        },
        body: JSON.stringify({"query": `
            query {
                allCommunities {
                    id
                    title
                    imageUrl
                    creatorSlug
                  }
            }
        `})
    })


    const communitiesInJson = await response.json()
    const allCommunities = communitiesInJson.data.allCommunities
    const paths = allCommunities.map(item => {
        const id = item.id
        return {
            params: {
                id
            }
        }
    })

    return {
        paths,
        fallback: false,
    }
}


 





