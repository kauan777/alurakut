
import MainGrid from '../src/components/MainGrid'
import nookies from 'nookies'
import Box from '../src/components/Box'
import jwt from 'jsonwebtoken'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/JsMasterCommons'
import { useState, useEffect } from 'react'
import ProfileRelationsBox from '../src/components/ProfileRelationsBox'
import { Toaster, toast } from 'react-hot-toast'


function ProfileSidebar({ user }) {

  return (
    <Box as="aside">
      <img src={`https://github.com/${user}.png`} style={{ borderRadius: "8px" }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${user}`}>
          @{user}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>

  )
}


export default function Home({githubUser}) {

  const user = githubUser
  const [comunidades, setComunidades] = useState([]);  //Use State tem essa destruturação de array, pq o primeiro indice é o valor inicial e o segundo a função
  const pessoasFavoritas = [
    { login: "filipedeschamps"},
    { login: "omariosouto"},
    { login: "peas"},
    { login: "maykbrito"},
    { login: "bryanmaraujo544"},
    { login: "felipefialho"},
    { login: "peleteiro"},
  ]

  const [seguidores, setSeguidores] = useState([]);

  useEffect(() => {
    //requisição da API do GITHUB

    fetch(`https://api.github.com/users/${user}/followers`) //GET padrão
      .then((respostaDoServidor) => {
        return respostaDoServidor.json()
      })
      .then((respostaEmJson) => {
        setSeguidores(respostaEmJson)
      })

    //requisição da API do DATOCMS 
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': `c9c6885efad04c10705391089b5a95`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query{ 
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
      .then((response) => response.json()) //pega o retorno do response.josn() e já retorna
      .then((respostaEmJson) => {
        const comunidadesDoDato = respostaEmJson.data.allCommunities

        setComunidades(comunidadesDoDato)
      })

  }, [])


  function handleSubmitForm(event) {
    event.preventDefault()

    const dadosDoForm = new FormData(event.target)  //Event referencia ao evento OnSubmit e target referencia ao form

    async function sendDate() {

      const comunidade = {
        title: dadosDoForm.get('title'),
        imageUrl: dadosDoForm.get('image'),
        creatorSlug: user
      }

      const response = await fetch("/api/comunidades", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comunidade)

      })

      const dados = await response.json()
      const comunidadeADD = dados.registrocriado
      const comunidadesAtualizadas = [...comunidades, comunidadeADD];
      setComunidades(comunidadesAtualizadas)
    }
    sendDate()

    toast.promise(
      sendDate(),
      {
        loading: 'Adicionando...',
        success: <b>Comunidade adicionada</b>,
        error: <b>Erro ao adicionar.</b>,
      }
    );
  }

  return (
    <>
      <div><Toaster /></div>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar user={user} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja a fazer?</h2>
            <form onSubmit={handleSubmitForm}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationArea" style={{ gridArea: 'profileRelationArea' }}>
          <ProfileRelationsBox items={seguidores} title="Seguidores" />
          <ProfileRelationsBox items={comunidades} title="Comunidades" />
          <ProfileRelationsBox items={pessoasFavoritas} title="Meus amigos" />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  
  
  // // Desestrutro a propriedade que é rotornada do objeto da promise
  const { isAuthenticated } = await fetch('https://alurakut-kauancosta.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then(resposta => resposta.json())
  
  if(!isAuthenticated){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
    
  }

  const {githubUser} = jwt.decode(token)

  // Faço o decode do token para acessar suas informaçoes
  return {
    props: {
      // Se o nome da propriedade e valor for o mesmo  posso deixar só um
      // githubUser: githubUser
      githubUser
    }, // will be passsed to the page component as props
  }
}