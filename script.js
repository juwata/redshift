const c = 299792 // velocidade da luz em km/s
const button = document.getElementById("calc")
const resultBox = document.getElementById("result")
const star = document.getElementById("star")


// fundo de estrelas
const starsBg = document.getElementById("stars")
for (let i = 0 ; i < 150 ; i++) {
    const s = document.createElement("span")
    s.style.left = Math.random() * 100 + "%"
    s.style.top = Math.random() * 100 + "%"
    s.style.animationDelay = Math.random() * 3 + "s"
    s.style.opacity = Math.random()
    starsBg.appendChild(s)
}

button.addEventListener("click", () => {
    const H0 = parseFloat(document.getElementById("hubble").value)
    const d = parseFloat(document.getElementById("distance").value)

    if (isNaN(H0) || isNaN(d)) {
        resultBox.textContent = "Por favor, insira valores válidos!"
        return
    }

    const v = H0 * d     // velocidade
    const z = v / c      // redshift

    resultBox.innerHTML = `
        Velocidade: ${v.toFixed(2)} km/s <br>
        Redshift: ${z.toFixed(5)}
    `

    // cor redshift
    let color
    if (z < 0) {

        // blueshift — azul intenso e brilhante
        const intensity = Math.min(255, 255 * Math.abs(z) * 50 + 100)
        color = `rgb(${100 - Math.abs(z) * 200}, ${120 - Math.abs(z) * 100}, ${intensity})`

    } else {
        
        // redshift — vermelho cada vez mais quente
        const red = Math.min(255, 200 + z * 90000)
        const blue = Math.max(0, 255 - z * 100000)
        color = `rgb(${red}, ${150 - z * 20000}, ${blue})`
    }

    star.style.background = `radial-gradient(circle at center, #fff, ${color})`
    star.style.boxShadow = `0 0 ${40 + Math.abs(z) * 400}px ${color}`
    star.style.animationDuration = `${2 - Math.min(Math.abs(z) * 8, 1.5)}s`
    })