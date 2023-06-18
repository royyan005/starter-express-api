module.exports = {

    HurufMutu: (average) => {
        var hurufmutu = ''
        if (average <= 0) {
            return hurufmutu = ''
        } else if (average <= 50) {
            return hurufmutu = 'E'
        } else if (average <= 55) {
            return hurufmutu = 'D'
        } else if (average <= 65) {
            return hurufmutu = 'C'
        } else if (average <= 70) {
            return hurufmutu = 'C+'
        } else if (average <= 75) {
            return hurufmutu = 'B'
        } else if (average <= 81) {
            return hurufmutu = 'B+'
        } else if (average <= 100) {
            return hurufmutu = 'A'
        } else {
            return hurufmutu = ''
        }
    },
    
    AngkaMutu: (hurufmutu) => {
        var angkamutu = ''
        if (hurufmutu == 'A') {
            return angkamutu = 4
        } else if (hurufmutu == 'B+') {
            return angkamutu = 3.5
        } else if (hurufmutu == 'B') {
            return angkamutu = 3
        } else if (hurufmutu == 'C+') {
            return angkamutu = 2.5
        } else if (hurufmutu == 'C') {
            return angkamutu = 2
        } else if (hurufmutu == 'D') {
            return angkamutu = 1
        } else if (hurufmutu == 'E') {
            return angkamutu = 0
        } else {
            return angkamutu = ''
        }
    },
    
    AngkaMutuAverage: (angkamutu) => {
        var angkamutufinal = 0
        if (angkamutu <= 4 && angkamutu >= 3.5) {
            return angkamutufinal = 'A'
        } else if (angkamutu <= 3.49 && angkamutu >= 3) {
            return angkamutufinal = 'B+'
        } else if (angkamutu <= 2.99 && angkamutu >= 2.5) {
            return angkamutufinal = 'B'
        } else if (angkamutu <= 2.49 && angkamutu >= 2) {
            return angkamutufinal = 'C+'
        } else if (angkamutu <= 1.99 && angkamutu >= 1.5) {
            return angkamutufinal = 'C'
        } else if (angkamutu <= 1.49 && angkamutu >= 1) {
            return angkamutufinal = 'D'
        } else if (angkamutu <= 0.99 && angkamutu >= 0) {
            return angkamutufinal = 'E'
        } else {
            return angkamutufinal
        }
    }

}
