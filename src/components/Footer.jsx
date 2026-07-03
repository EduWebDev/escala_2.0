// Footer.jsx




import { useState } from "react";
import { toast } from "react-toastify";

function Footer() {
    function compartilharSistema() {
        const dadosCompartilhamento = {
            title: "Skala — Calendário de Turnos",
            text: "Olha que massa essa ferramenta para gerenciar e prever escalas de serviço com apenas um clique!",
            url: window.location.href // Pega o link atual do seu site automaticamente
        };

        // Se o usuário estiver no celular (WhatsApp, Telegram, etc.)
        if (navigator.share) {
            navigator.share(dadosCompartilhamento)
                .catch((error) => console.log("Erro ao compartilhar", error));
        } else {
            // Se estiver no computador, copia o link para a área de transferência
            navigator.clipboard.writeText(window.location.href);
            toast.info("📋 Link do Skala copiado para a área de transferência!");
        }
    }

    return (
        <footer>
            <div className="container footer-grid">
                
                {/* Coluna 1: Feedback */}
                <div className="footer-coluna">
                    <h4>💡 Sugestões & Elogios</h4>
                    <p>Sua opinião é fundamental para validar e evoluir o Skala. Envie suas ideias de melhorias ou relate bugs.</p>
                    {/* <a href="mailto:seu-email@://provedor.com - Skala" className="btn-footer">
                        📧 Enviar Feedback
                    </a> */}
                </div>

                {/* Coluna 2: Compartilhar */}
                <div className="footer-coluna">
                    <h4>📢 Compartilhe</h4>
                    <p>Conhece algum colega ou gestor administrativo que sofre para prever a escala?<br/>Ajude a divulgar!</p>
                    {/* <button onClick={compartilharSistema} className="btn-footer">
                        🔗 Compartilhar Sistema
                    </button> */}
                </div>

            </div>
            
            {/* Linha de Créditos de Direitos Autorais */}
            <div className="footer-creditos">
                <h5>EduWebDev @ 2026 | Todos os direitos reservados.</h5>
            </div>
        </footer>
    );
}

export default Footer;







// function Footer() {
//     return(
//         <footer>
//             <div className="container">
//                 <h5>EduWebDev @ 2026 | Todos os direitos reservados.</h5>
//             </div>
//         </footer>
//     )
// }

// export default Footer