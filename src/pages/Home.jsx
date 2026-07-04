// Home.jsx
import Calendario from "../components/Calendario.jsx"

function Home() {
    // const {dataBase, diasServico, diasFolga, definirConfigEscalaDeServico} = useContext(EscalaContext)  

    return(
        <main>
            <div className="container">
                <section className="home-introducao">
                    <h2>Calendário Dinâmico</h2>
                    <p className="slogan">Skala — Previsibilidade e controle para a sua rotina de trabalho.</p>
                    <p className="descricao">
                        Uma ferramenta simples e visual desenvolvida para quem trabalha ou planeja sob regime de escalas rotativas.
                        Monitore seus dias de serviço, visualise seus períodos de descanso e tenha total previsibilidade da sua jornada ao longo de todo o ano.
                    </p>
                </section>

                <Calendario />

                <section className="skala-info-container">
                    <div className="info-card">
                        <h3>💡 Como funciona?</h3>
                        <p>Defina a <strong>data inicial</strong> do seu ciclo de trabalho e informe a quantidade de dias seguidos de <strong>trabalho</strong> e de <strong>folga</strong>. O Skala projeta automaticamente a sua escala de trabalho em todos os meses do ano.</p>
                    </div>

                    <div className="info-card">
                        <h3>⚡ Atalho Rápido</h3>
                        <p>Você pode alterar a data inicial da sua escala a qualquer momento de forma simples! Basta clicar diretamente em qualquer dia no calendário para recalcular todo o calendário.</p>
                    </div>

                    <div className="info-card">
                        <h3>🔒 Salvamento Automático</h3>
                        <p>Não se preocupe em perder suas configurações. O sistema memoriza seus dados localmente no navegador, garantindo que sua escala esteja disponível sempre que você voltar.</p>
                    </div>
                </section>




                <section className="skala-publico-container">
                    <div className="publico-historia">
                        <h2>Para quem é o Skala?</h2>
                        <p>
                            O <strong>Skala</strong> nasceu da dor de um profissional, que idealizou
                            uma ferramenta para vencer a imprevisibilidade de escalas dinâmicas, marcadas por permutas constantes, 
                            mudanças de plantão, e transições de setores.
                        </p>
                        <p>
                            Após perceber a escassez de ferramentas simples e visuais no mercado, esta plataforma foi desenvolvida para ser 
                            altamente flexível: permitindo recalcular meses inteiros de escalas futuras com apenas um clique sobre o calendário.
                        </p>
                    </div>

                    <div className="publico-alvo-grid">
                        <div className="alvo-card">
                            <span className="alvo-icone">🛡️</span>
                            <h4>Segurança e Saúde</h4>
                            <p>Policiais, guardas civis, bombeiros, médicos e enfermeiros que gerenciam plantões complexos e trocas de serviçoes.</p>
                        </div>

                        <div className="alvo-card">
                            <span className="alvo-icone">📊</span>
                            <h4>Gestores e Administrativo</h4>
                            <p>Setores de RH e chefias de operações que precisam monitorar e simular diversas escalas de múltiplos servidores diariamente.</p>
                        </div>

                        <div className="alvo-card">
                            <span className="alvo-icone">🚀</span>
                            <h4>Regimes Gerais</h4>
                            <p>Trabalhadores nos modelos Trabalho X Folga, ou qualquer profissional autônomo que necessite de previsibilidade a longo prazo.</p>
                        </div>
                    </div>
                </section>

                
            </div>
        </main>
    )
}

export default Home