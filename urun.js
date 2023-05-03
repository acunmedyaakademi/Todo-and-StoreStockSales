// Kategoriler listesi
let kategoriler = [
    { kategoriID: 1, kategoriAdi: "Elektroni" },
    { kategoriID: 2, kategoriAdi: "Giyim" },
    { kategoriID: 3, kategoriAdi: "Ev ve Bahçe" },
    { kategoriID: 4, kategoriAdi: "Kitap" },
    { kategoriID: 5, kategoriAdi: "Mutfak" },
    { kategoriID: 6, kategoriAdi: "Spor ve Outdoor" },
    { kategoriID: 7, kategoriAdi: "Oyuncak" },
    { kategoriID: 8, kategoriAdi: "Sağlık ve Güzellik" },
];


// Kategorileri göster
function kategorilerGoster() {
    console.log("Kategoriler:");
    kategoriler.forEach((kategori) => {
        console.log(`ID: ${kategori.kategoriID}, Ad: ${kategori.kategoriAdi}`);
    });
}

// Yeni kategori ekleme fonksiyonu
function yeniKategoriEkle(kategoriAdi) {
    let yeniKategoriID = kategoriler.length + 1;
    let yeniKategori = {
        kategoriID: yeniKategoriID,
        kategoriAdi: kategoriAdi
    };
    kategoriler.push(yeniKategori);
    console.log(kategoriAdi + " kategorisi başarıyla eklendi.");
}

// Ürünler listesi
let urunler = [
    { urunID: 1, urunAd: "Laptop", urunFiyat: 5000, urunStok: 10, urunKategori: [1] },
    { urunID: 2, urunAd: "Telefon", urunFiyat: 2000, urunStok: 20, urunKategori: [1] },
    { urunID: 3, urunAd: "Tişört", urunFiyat: 50, urunStok: 50, urunKategori: [2] },
    { urunID: 4, urunAd: "Masa", urunFiyat: 300, urunStok: 5, urunKategori: [3] },
    { urunID: 5, urunAd: "Bahçe Sandalyesi", urunFiyat: 150, urunStok: 10, urunKategori: [3] },
    { urunID: 6, urunAd: "Kazak", urunFiyat: 100, urunStok: 30, urunKategori: [2] },
    { urunID: 7, urunAd: "Bisiklet", urunFiyat: 1500, urunStok: 5, urunKategori: [6, 10] },
    { urunID: 8, urunAd: "Kettle", urunFiyat: 120, urunStok: 20, urunKategori: [1, 5] },
    { urunID: 9, urunAd: "Roman", urunFiyat: 20, urunStok: 100, urunKategori: [4] },
    { urunID: 10, urunAd: "Koltuk", urunFiyat: 2000, urunStok: 2, urunKategori: [3] },
    { urunID: 11, urunAd: "Sweatshirt", urunFiyat: 80, urunStok: 25, urunKategori: [2] },
    { urunID: 12, urunAd: "Çaydanlık", urunFiyat: 100, urunStok: 15, urunKategori: [5] },
    { urunID: 13, urunAd: "Cep Kitabı", urunFiyat: 10, urunStok: 200, urunKategori: [4] }
];

// Ürünleri göster
function urunleriGoster() {
    console.log("Ürünler:");
    urunler.forEach((urun) => {
        console.log(`ID: ${urun.urunID}, Ad: ${urun.urunAd}, Fiyat: ${urun.urunFiyat}, Stok: ${urun.urunStok}, Kategori: ${urun.urunKategori.join(", ")}`);
    });
}

// Yeni ürün ekleme fonksiyonu
function yeniUrunEkle(urunAd, urunFiyat, urunStok, urunKategori) {
    let yeniUrunID = urunler.length + 1;
    let yeniUrun = {
        urunID: yeniUrunID,
        urunAd: urunAd,
        urunFiyat: urunFiyat,
        urunStok: urunStok,
        urunKategori: urunKategori
    };
    urunler.push(yeniUrun);
    console.log(urunAd + " ürünü başarıyla eklendi.");
}

// Sepet listesi
let sepet = [];

// Sepeti göster
function sepetiGoster() {
    console.log("Sepetinizdeki ürünler:");
    let toplamBorc = 0;
    let adetKadarFiyat = 0;
    for (let i = 0; i < sepet.length; i++) {
        console.log(
            "ÜrünID:" +
            sepet[i].urunID + " - " +
            sepet[i].urunAd + " - " +
            sepet[i].urunFiyat + " TL - " +
            sepet[i].adet + " adet sepetinizde.  " +
            "Kalan ürün stoğu:" + sepet[i].urunStok
        );
        adetKadarFiyat = sepet[i].urunFiyat * sepet[i].adet;
        toplamBorc += adetKadarFiyat;
    }
    console.log("Toplam borç: " + toplamBorc + " TL");
}

// UrunID ile sepete ekleme fonksiyonu
function sepeteEkle(urunID, adet) {
    let urun = urunler.find(u => u.urunID === urunID);
    if (urun) {
        let sepetUrun = sepet.find(u => u.urunID === urunID);
        if (sepetUrun) {
            if (urun.urunStok >= sepetUrun.adet + adet) { // stok kontrolü
                urun.urunStok -= adet; // ürünlerde görünen stoğu azaltma
                sepetUrun.adet += adet; // adet artırma
                sepetUrun.urunStok -= adet; // sepette görünen stoğu azaltma
                console.log(adet + " adet " + urun.urunAd + " sepete eklendi. Kalan ürün stoğu: " + urun.urunStok);
            } else {
                console.log("Stokta yeterli " + urun.urunAd + " yok.");
            }
        } else {

            if (urun.urunStok >= adet) { // stok kontrolü
                urun.urunStok -= adet; // stok azaltma
                urun.adet += adet; // adet artırma
                sepet.push({ ...urun, adet });
                console.log(adet + " adet " + urun.urunAd + " sepete eklendi. Kalan ürün stoğu: " + urun.urunStok);
            } else {
                console.log("Stokta yeterli " + urun.urunAd + " yok.");
            }
        }
    } else {
        console.log("Ürün bulunamadı.");
    }
}

// UrunID ile sepetten urun çıkarma fonksiyonu
function sepettenCikar(urunID, adet) {
    let index = sepet.findIndex(u => u.urunID === urunID);
    if (index !== -1) {
        let urun = sepet[index];
        if (urun.adet >= adet) {
            urun.adet -= adet;
            urun.urunStok += adet; //sepetteki stok güncelleme
            console.log(adet + " adet " + urun.urunAd + " sepetten çıkarıldı. Kalan ürün stoğu: " + urun.urunStok);
            if (urun.adet === 0) {
                sepet.splice(index, 1); // sepetten tamamen çıkar
            }
        } else {
            console.log("Sepette yeterli " + urun.urunAd + " yok.");
        }
    } else {
        console.log("Ürün sepetinizde bulunamadı.");
    }
    let urunIndex = urunler.findIndex(u => u.urunID === urunID);
    if (urunIndex !== -1) {
        urunler[urunIndex].urunStok += adet; //urunlerdeki stok güncelleme
    }
}

// urunler listesindeki bir ürünün stok adedini azaltır
function urunStokAzalt(urunID, adet) {
    let urun = urunler.find(u => u.urunID === urunID);
    if (urun) {
        if (urun.urunStok >= adet) {
            urun.urunStok -= adet;
            console.log(urun.urunAd + " stoğu " + adet + " adet azaltıldı, yeni stok " + urun.urunStok);
        } else {
            console.log("Stokta " + adet + " adet " + urun.urunAd + " bulunmuyor.");
        }
    } else {
        console.log("Ürün bulunamadı.");
    }
}

// urunler listesindeki bir ürünün stok adedini artırır
function urunStokArtir(urunID, adet) {
    let urun = urunler.find(u => u.urunID === urunID);
    if (urun) {
        urun.urunStok += adet;
        console.log(urun.urunAd + " stoğu " + adet + " adet arttırıldı, yeni stok " + urun.urunStok);
    } else {
        console.log("Ürün bulunamadı.");
    }
}





/* ----------- Console ----------- */

console.log("\n\nMağaza Stok-Satış");
kategorilerGoster();
yeniKategoriEkle("Müzik");
yeniKategoriEkle("Hobi");
kategorilerGoster();

urunleriGoster();
yeniUrunEkle("Yoga Matı", 500, 7, [6, 10]);
urunleriGoster();


sepetiGoster();

sepeteEkle(3, 2);
sepetiGoster();

sepeteEkle(9, 3);
sepeteEkle(7, 1);
sepeteEkle(14, 2);
sepeteEkle(1, 1);
sepetiGoster();
urunleriGoster(); //stoklar eksilir

sepeteEkle(15, 2); //Ürün bulunamadı.

sepettenCikar(14, 1);
sepettenCikar(9, 2);
sepetiGoster();
urunleriGoster(); //stoklar artar

sepettenCikar(7, 2); //Sepette yeterli Bisiklet yok.

urunStokAzalt(12, 5);
urunStokAzalt(6, 40); //Stokta 40 adet Kazak bulunmuyor.
urunStokArtir(10, 3);
urunStokAzalt(15, 5); //Ürün bulunamadı.
urunStokArtir(16, 3); //Ürün bulunamadı.




