"use strict";
let mhs1 = {
    nama: "John",
    nilai: 80,
    absensi: 90,
};
let mhs2 = {
    nama: "Jane",
    nilai: 60,
    absensi: 65,
};
let mhs3 = {
    nama: "Alice",
    nilai: 100,
    absensi: 85,
};
// console.log(mhs1);
// console.log(mhs2);
// console.log(mhs3);
function prosessTypeof(mahasiswa) {
    if (typeof mahasiswa.nilai === "number" &&
        typeof mahasiswa.absensi === "number") {
        if (mahasiswa.nilai === 100 && mahasiswa.absensi > 80) {
            return "lulus dengan predikat cumlaude";
        }
        else if (mahasiswa.nilai >= 70 && mahasiswa.absensi >= 70) {
            return "Selamat anda lulus ";
        }
        else {
            return "tidak lulus";
        }
    }
}
console.log(`${mhs1.nama} ${prosessTypeof(mhs1)}`);
console.log(`${mhs2.nama} ${prosessTypeof(mhs2)}`);
console.log(`${mhs3.nama} ${prosessTypeof(mhs3)}`);
