// Calendario.jsx
import { useState, useRef } from "react"
import {FaChevronLeft} from 'react-icons/fa'
import {FaChevronRight} from 'react-icons/fa'
import {FaPencilAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'


function Calendario() {    
    const arrayMesesAno = [
        {nome: "Janeiro", dias: []},
        {nome: "Fevereiro", dias: []},
        {nome: "Março", dias: []},
        {nome: "Abril", dias: []},
        {nome: "Maio", dias: []},
        {nome: "Junho", dias: []},
        {nome: "Julho", dias: []},
        {nome: "Agosto", dias: []},
        {nome: "Setembro", dias: []},
        {nome: "Outubro", dias: []},
        {nome: "Novembro", dias: []},
        {nome: "Dezembro", dias: []}
    ]
    
    const escalaSalva = JSON.parse(localStorage.getItem('escalaSalva'))

    const [dataBase, setDataBase] = useState(()=>{
        if(escalaSalva){
            const apenasDataTexto = escalaSalva.dataBase.split('T')[0]
            const dataComBarras = apenasDataTexto.replace(/-/g, '/')
            const newData = new Date(dataComBarras)
            newData.setHours(0,0,0,0)

            return newData
        }else{
            const hoje = new Date();
            const hojeZerado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
            hojeZerado.setHours(0,0,0,0)
            return hojeZerado
        }
    })
    const [diasServico, setDiasServico] = useState(()=>{
        if(escalaSalva){
            return escalaSalva.diasServico
        }else{
            return 2
        }
    })
    const [diasFolga, setDiasFolga] = useState(()=>{
        if(escalaSalva){
            return escalaSalva.diasFolga
        }else{
            return 6
        }
    })
    // const [escalaPermanente, setEscalaPermanente] = useState(false)

    const [inputDataBase, setInputDataBase] = useState(dataBase)
    const [inputDiasServico, setInputDiasServico] = useState(diasServico)
    const [inputDiasFolga, setInputDiasFolga] = useState(diasFolga)
    // const [inputEscalaPermanente, setInputEscalaPermanente] = useState(escalaPermanente)
    
    const modalRef = useRef(null)



    function handdleSubmiForm(event) {
        event.preventDefault()
        definirConfigEscala()
        closeModal()
    }

    function definirConfigEscala(dia) {        

        const dataAlvo = dia ? dia : inputDataBase;
        dataAlvo.setHours(0, 0, 0, 0);

        setDataBase(dataAlvo)
        setDiasServico(Number(inputDiasServico))
        setDiasFolga(Number(inputDiasFolga))

        const escalaSalva = {
            dataBase: dataAlvo,
            diasServico: Number(inputDiasServico),
            diasFolga: Number(inputDiasFolga)
        }

        // if(!dia){
            localStorage.removeItem('escalaSalva')
            localStorage.setItem('escalaSalva', JSON.stringify(escalaSalva))

            
            // DISPARAR O ALERTA DE SUCESSO AQUI!
            toast.success(
                <div>
                    <strong style={{ display: "block", marginBottom: "6px", color: "#555" }}>
                        ESCALA DEFINIDA
                    </strong>
                    <span style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                        🗓️ Início: {dataAlvo.toLocaleDateString('Pt-br')} <br />
                        ⚔️ Dias de trabalho: {String(inputDiasServico).padStart(2, '0')} <br />
                        🏖️ Dias de folga: {String(inputDiasFolga).padStart(2, '0')} <br />
                    </span>
                </div>,
                {
                    style:{
                        backgroundColor: '#e9f2ef'
                    }
                }
            )

        // }


        
        
    }

    function definirAnoEscala(action) {
        const newDate = new Date(dataBase)

        if(action == "previous"){ newDate.setFullYear(dataBase.getFullYear() - 1) }
        if(action == "next"){ newDate.setFullYear(dataBase.getFullYear() + 1) }
        
        setDataBase(newDate)
    }

    function openModal() {
        modalRef.current?.showModal()

        setInputDataBase(dataBase)
        setInputDiasServico(diasServico)
        setInputDiasFolga(diasFolga)
    }

    function closeModal() {
        modalRef.current?.close()
    }

    function fecharModalOaClicarFora(event) {
        if(event.target === modalRef.current){
            closeModal()
        }
    }


    // GERAR O CALENDÁRIO COM OS MESES
    function gerarCalendario(){
        arrayMesesAno.forEach((mes, indexMes) => {
            const numeroDiasMes = new Date(dataBase.getFullYear(), indexMes+1, 0).getDate()
            const primeiroDiaMes = new Date(dataBase.getFullYear(), indexMes, 1)
            const diaSemanaPrimeiroDiaMes = primeiroDiaMes.getDay()
            const diaSemanaUltimoDiaMes = new Date(dataBase.getFullYear(), indexMes, numeroDiasMes).getDay()
            
            const diasNulosInicio = diaSemanaPrimeiroDiaMes
            const diasNulosFinal = (6 - diaSemanaUltimoDiaMes)

            // const diferencaPrimeiroDiaParaDataBase = Math.trunc(Math.abs(primeiroDiaMes - dataBase)/86400000)
            
            const utc1 = Date.UTC(primeiroDiaMes.getUTCFullYear(), primeiroDiaMes.getUTCMonth(), primeiroDiaMes.getUTCDate());
            const utc2 = Date.UTC(dataBase.getUTCFullYear(), dataBase.getUTCMonth(), dataBase.getUTCDate());
            const diferencaPrimeiroDiaParaDataBase = Math.abs(utc1 - utc2)/86400000

            let marcador = null
    
            
            if(primeiroDiaMes < dataBase){
                marcador = (diasServico + diasFolga) - (diferencaPrimeiroDiaParaDataBase % (diasServico + diasFolga)) + 1
                if(marcador > (diasServico + diasFolga)){
                    marcador = 1
                }
            }else{
                marcador = (diferencaPrimeiroDiaParaDataBase % (diasServico + diasFolga)) + 1
                if(marcador > (diasServico + diasFolga)){
                    marcador = 1
                }
            }


            // GERA OS DIAS DO MES DO LOOP
            for (let indexDia = 0; indexDia < numeroDiasMes; indexDia++) {
                let classes = "diaBox diaMes"

                const dataDoDiaAtual = new Date(dataBase.getFullYear(), indexMes, indexDia + 1)
                const diaDaSemana = dataDoDiaAtual.getDay()
                
                if (diaDaSemana === 0 || diaDaSemana === 6) {
                    classes += " diaFimDeSemana"
                }

                // Dia Trabalho
                if(marcador <= diasServico){
                    classes = classes + " diaTrabalho"
                    
                }

                const hoje = new Date()
                if(dataBase.getFullYear() == hoje.getFullYear() && indexMes == hoje.getMonth() && indexDia+1 == hoje.getDate()){
                    classes = classes + " diaHoje"
                }


                // DEFINIR A CLASSE DIA SELECIONADO
                const diaSelecionado = new Date(dataBase.getFullYear(), indexMes, indexDia+1)
                const diaComparar = new Date(dataBase)
                diaComparar.setDate(dataBase.getDate() + diasServico)

                if(diaSelecionado >= dataBase && diaSelecionado < diaComparar){
                    classes += " diaSelecionado"
                }

                if(marcador >= (diasServico + diasFolga)){
                    marcador = 1
                }else{
                    marcador++
                }

                mes.dias.push(
                    {
                        dia: indexDia + 1, 
                        classes: classes
                    }
                )
            }


            // GERA OS DIAS NULOS NO INICIO DO ARRAY DOS DIAS
            for (let i = 0; i < diasNulosInicio; i++) {
                mes.dias.unshift(
                    { dia: "", classes: "diaBox, diaNulo" }
                )
            }

            // GERA OS DIAS NULOS NO FINAL DO ARRAY DOS DIAS
            for (let i = 0; i < diasNulosFinal; i++) {
                mes.dias.push(
                    { dia: "", classes: "diaBox, diaNulo" }
                )
            }

        })
        
    }

    gerarCalendario()

    return(
        <section className="calendario">
            <br />
            {/* ############################### */}
            {/* MODAL DE CONFIGURAÇÃO DA ESCALA */}

            <dialog ref={modalRef} id="meuModal" className="meuModal" onClick={fecharModalOaClicarFora}>
                <div className="modal-conteudo">
                    <div className="modal-cabecalho">
                        <h3>Configurar Escala</h3>
                    </div>
                    
                    <form id="formEscala" onSubmit={handdleSubmiForm}>
                        <div className="grupo-input">
                            <label htmlFor="dataInicio">Data do início do serviço</label>
                            <input type="date" id="dataInicio" required value={inputDataBase.toISOString().split("T")[0]} onChange={(e)=>{setInputDataBase(new Date(e.target.value.replace(/-/g, '/') ))}}/>
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="diasTabalho">Dias de trabalho</label>
                            <input type="number" id="diasTabalho" placeholder="Ex: 2" min="1" required value={inputDiasServico} onChange={(e)=>{setInputDiasServico(e.target.value)}}/>
                        </div>
                        
                        <div className="grupo-input">
                            <label htmlFor="diasFolga">Dias de folga</label>
                            <input type="number" id="diasFolga" placeholder="Ex: 6" min="0" required value={inputDiasFolga} onChange={(e)=>{setInputDiasFolga(e.target.value)}}/>
                        </div>
                        
                        <div className="modal-acoes">
                            <button type="button" id="btnFechar" className="btn-secundario" onClick={closeModal}>Cancelar</button>
                            <button type="submit" className="btn-primario" >Salvar Escala</button>
                        </div>
                    </form>
                </div>
            </dialog>


            {/* ################################# */}
            {/* CABEÇALHO DO CALENDÁRIO  */}
            <div className="calendarioCabecalho">
                <div className="showAno">
                    <button onClick={()=>{definirAnoEscala("previous")}}>
                        <FaChevronLeft/>
                    </button>
                    <h2>{dataBase.getFullYear()}</h2>
                    <button onClick={()=>{definirAnoEscala("next")}}>
                        <FaChevronRight/>
                    </button>
                </div>
                <div className="configEscala" onClick={openModal}>
                    <span>{dataBase.toLocaleDateString("Pt-Br")}</span>
                    <span><FaPencilAlt color="orange"/>  escala ({diasServico}x{diasFolga})</span>
                </div>
            </div>
            
            <br />

            {/* ################################## */}
            {/* LOOP DE GERAÇÃO DOS MESES */}
            <div className="meses">
                {
                    arrayMesesAno.map((mes, i)=>(
                        <div key={mes.nome} className="mes">
                            <div className="grupoTituloMes">
                                <h3>{mes.nome}</h3>
                            </div>
                            <div className="grupoDiasSemanas">
                                <div className="diaBox diaSemana">D</div>
                                <div className="diaBox diaSemana">S</div>
                                <div className="diaBox diaSemana">T</div>
                                <div className="diaBox diaSemana">Q</div>
                                <div className="diaBox diaSemana">Q</div>
                                <div className="diaBox diaSemana">S</div>
                                <div className="diaBox diaSemana">S</div>
                            </div>
                            <div className="grupoDiasMes">
                                {
                                    mes.dias.map((dia, j)=>(
                                        <div key={j} className={dia.classes} onClick={()=>{definirConfigEscala(new Date(dataBase.getFullYear(), i, dia.dia))}}>
                                            {dia.dia}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
        
    )
}

export default Calendario