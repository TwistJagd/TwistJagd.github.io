const value_reference = "";
const scanner = new Html5QrcodeScanner('reader', {
qrbox: {
width: 250,
height: 250,
},
fps: 20,
});

scanner.render(success, error);
function success(result) {
    document.getElementById('result').innerHTML = `
    <p>Tarama sonucu bulunulan veri: ${result}</p>
    `;
    fetch('HERKES_barkod.json')
    .then(response => response.json())
    .then(data => {
    // Örneğin, 'mezun_barkod_listesi' bölümünü kontrol etmek istiyoruz
    if ('mezun_barkod_listesi' in data) {
      console.log("mezun_barkod_listesi mevcut!");

      // Şimdi 'mezun_barkod_listesi' içindeki her bir öğeyi kontrol edebiliriz
      data.mezun_barkod_listesi.forEach(item => {
        // Burada her bir öğeyi kontrol edebilir veya işleyebilirsiniz
        if (item.qrcode === result) {
          document.getElementById('check').innerHTML = `
          <p>Şahıs sistemde yer almaktadır: ${item.name}</p>
          `;
          console.log("Aranan QR kodu bulundu! Öğe:", item);
          // İşlemleriniz
        }
      });
    } else {
      console.log("mezun_barkod_listesi mevcut değil!");
    }
    })
    .catch(error => {
      console.error('Bir hata oluştu:', error);
    });
}
function error(err) {
  console.error(err);
  }