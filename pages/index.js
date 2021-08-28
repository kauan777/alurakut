import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/JsMasterCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar({ githubUser }) {

  return (
    <Box >
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: "8px" }} />
    </Box>
  )
}

export default function Home() {

  const githubUser = 'kauan777'
  const pessoasFavoritas = [
    'filipedeschamps',
    'omariosouto',
    'peas',
    'maykbrito',
    'bryanmaraujo544',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>

        <div className="profileRelationArea" style={{ gridArea: 'profileRelationArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((person) => (
                <li>
                  <a href={`/users/${person}`} key={person}>
                    <img src={`https://github.com/${person}.png`} />
                    <span>{person}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}
