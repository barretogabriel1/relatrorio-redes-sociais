import { getCSS, criarGrafico, incluirTexto} from "./common.js"


async function redesSociaisFavoritasMinhaEscola() {
    const dadosLocaisString = localStorage.getItem('respostaRedesSociais')
    if (dadosLocaisString) {
        const dadosLocais = JSON.parse(dadosLocaisString)
        processarDados(dadosLocais)
    } else {
        const url = 'https://script.google.com/macros/s/AKfycbyjwWb6Pl9itprbXvykuYqXdq69UxRNs2Ak1tm0EkA7LXNwFVn2kJRnTdw8NJVLiHowtA/exec'
        const res = await fetch(url)
        const dados = await res.json()
        localStorage.setItem('respostaRedesSociais', JSON.stringify(dados))
        processarDados(dadosLocais)
    }
}

function processarDados(dados) {

    const redesSociais = dados.slice(1).map(redes => redes[1])
    const motivos = dados.slice(1).map(redes => redes[2])

    const contagemRedesSociais = redesSociais.reduce((acc, redesSociais) => {
        acc[redesSociais] = (acc[redesSociais] || 0) + 1 
        return acc
    }, {})

    const valores = Object.values(contagemRedesSociais)
    const labels = Object.keys(contagemRedesSociais)

    const data = [
        {
            values: valores,
            labels: labels,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ]

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 700,
        title: {
            text: 'Redes sociais que as pessoas da minha escola mais gostam',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30
            }
        },
        legend: {
            font: {
                color: getCSS('--primary-color'),
                size: 16
            }
        }

    }

    criarGrafico(data, layout)
    incluirTexto(`Como no mundo, a amostra de pessoas entrevistadas por mim, demonstra um apreço pelo <span>Instagram</span>
    em relação a outra redes.`)

}

redesSociaisFavoritasMinhaEscola()