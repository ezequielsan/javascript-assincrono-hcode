/* Testes Aleatórios */
function writeHellow(callback) {
    return new Promise((resolve, reject) => {
        console.log("Hellow")
        resolve()
    })
}

function writeGoodBye(callback2) {
    return new Promise((resolve2, reject) => {
        console.log("GoodBye")
        resolve2()
    })
}

function writeSeeYouLater(callback3) {
    return new Promise((resolve3, reject) => {
        console.log("See yo later")
        resolve3()
    })
}
writeHellow()
    .then(writeGoodBye)
    .then(writeSeeYouLater)
    .then(() => {
        console.log("Acabou o código")
    })

    