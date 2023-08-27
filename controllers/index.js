const user = require('./user')
const mahasiswa = require('./mahasiswa')
const form = require('./form')
const klasifikasi_sub_matkul = require('./klasifikasi_sub_matkul')
const klasifikasi_sub_sub_matkul = require('./klasifikasi_sub_sub_matkul')
const matkul = require('./matkul')
const nilai_matkul = require('./nilai_matkul')
const nilai_sub_matkul = require('./nilai_sub_matkul')
const nilai_sub_sub_matkul = require('./nilai_sub_sub_matkul')
const pembimbing = require('./pembimbing')
const sub_matkul = require('./sub_matkul')
const sub_sub_matkul = require('./sub_sub_matkul')
const total_nilai_matkul = require('./total_nilai_matkul')
const berita_acara = require('./berita_acara')


module.exports = {
    user,
    mahasiswa,
    form,
    klasifikasi_sub_matkul,
    klasifikasi_sub_sub_matkul,
    matkul,
    nilai_matkul,
    nilai_sub_matkul,
    nilai_sub_sub_matkul,
    pembimbing,
    sub_matkul,
    sub_sub_matkul,
    total_nilai_matkul,
    berita_acara
};