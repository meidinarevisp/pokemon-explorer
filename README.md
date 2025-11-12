# Pokémon Explorer - React Web App

Proyek ini saya buat sebagai bagian dari **tes teknis magang** untuk menunjukkan pemahaman saya terhadap dasar-dasar pengembangan web menggunakan **React**.  
Aplikasi ini menampilkan data Pokémon dari [PokéAPI](https://pokeapi.co/api/v2/pokemon), menampilkannya dengan gaya visual yang saya kreasikan sendiri, serta menambahkan beberapa fitur tambahan agar tampil lebih menarik dan interaktif.

Saya ingin menunjukkan bahwa meskipun proyek ini sederhana, saya berusaha membuatnya tidak hanya berfungsi dengan baik, tetapi juga memiliki identitas visual dan pengalaman pengguna yang menyenangkan.

## Tujuan Proyek

Tugas utamanya adalah membuat halaman web sederhana yang:

1. Mengambil data Pokémon dari API `https://pokeapi.co/api/v2/pokemon`.
2. Menampilkan minimal 10 nama Pokémon.
3. Diberi **gaya tampilan bebas**, sesuai kreativitas pribadi.
4. Boleh menambahkan fitur tambahan seperti:
   - Menampilkan gambar Pokémon,
   - Animasi atau efek hover,
   - Fitur ekstra untuk mempercantik pengalaman pengguna.

## Teknologi yang Digunakan

- **React.js** (Library utama untuk UI)
- **React Router** (Navigasi antar halaman)
- **Tailwind CSS** (Untuk styling cepat dan konsisten)
- **Framer Motion** (Untuk animasi halus)
- **PokéAPI** (Sebagai sumber data Pokémon)
- **React Icons** (Ikon-ikon kecil seperti panah dan tombol home)

## Struktur Proyek

```plaintext
src/
├── App.js                 # Routing utama (Home dan List)
├── index.js               # Entry point React
├── index.css              # Styling global dan animasi custom
│
├── utils/
│   └── api.js             # Fungsi untuk fetch data dari PokéAPI
│
├── pages/
│   ├── Home.js            # Halaman utama (intro dan preview Pokémon)
│   └── PokemonListPage.js # Halaman daftar Pokémon lengkap
│
└── components/
    ├── PokemonList.js     # Logika filter, sorting, dan load Pokémon
    ├── PokemonCard.js     # Kartu tampilan individual Pokémon
    └── PokemonDetail.js   # Detail pop-up untuk setiap Pokémon

## Pendekatan dan Cara Saya Mengerjakan

Awalnya, saya mulai dengan membuat struktur dasar React dan memastikan bisa **fetch data dari PokéAPI** dengan benar.  
Setelah data berhasil muncul di console, saya lanjut membuat **komponen daftar Pokémon** yang bisa menampilkan nama dan gambar secara dinamis.

Selanjutnya, saya tambahkan **fitur interaksi seperti sorting, filter tipe Pokémon, dan tombol “See More”** agar pengguna bisa menjelajah lebih jauh tanpa bosan.

Untuk sisi tampilan, saya tidak ingin tampil seperti proyek latihan biasa — jadi saya kembangkan konsep **retro sci-fi interface**, dengan:

- latar hitam, garis putih, dan efek “glow” yang lembut,
- animasi “floating” di background agar tidak statis,
- serta efek “shine” dan “glitch” agar terasa seperti tampilan digital lama yang modern.

## Fitur yang Saya Tambahkan

Berikut beberapa fitur tambahan di luar instruksi dasar:

- **Gambar Pokémon resmi** dari PokéAPI.
- **Filter berdasarkan tipe Pokémon** (fire, water, grass, dll).
- **Urutan tampilan (ASC/DESC)**.
- **Efek hover & transisi lembut pada kartu Pokémon.**
- **Animasi looping marquee di halaman utama.**
- **Tombol “Back to Top” dan tombol Refresh.**
- **Tampilan loading dengan animasi berputar.**
- **Desain responsif untuk berbagai ukuran layar.**

## Tantangan yang Saya Hadapi

Beberapa hal yang cukup menantang selama proses ini:

1. **Menjaga performa saat menampilkan banyak Pokémon**  
   Karena data dari API cukup besar (ratusan Pokémon), saya perlu membatasi tampilan awal dan menambahkan fitur “Load More” agar aplikasi tetap ringan.
2. **Menyesuaikan animasi CSS dan Tailwind**  
   Menggabungkan efek kompleks seperti _glitch_, _scanline_, dan _grain_ butuh pengaturan keyframe manual dan penggabungan dengan Tailwind — cukup tricky tapi menarik.
3. **Menjaga tampilan tetap konsisten di berbagai resolusi layar**  
   Terutama pada animasi marquee dan layout grid, supaya tetap rapi di desktop maupun mobile.
4. **Menjaga Kode Tetap Rapi**  
   Banyak animasi dan efek visual saya tulis manual di `index.css`, jadi saya harus memastikan semuanya tetap terorganisir dan reusable.

## Apa yang Saya Nikmati dari Proyek Ini

Yang paling saya nikmati adalah **bagian desain dan animasi**.  
Saya suka bereksperimen dengan visual dan efek halus yang bisa memberi “nyawa” pada antarmuka.  
Selain itu, bekerja dengan **PokéAPI** juga menyenangkan karena datanya lengkap dan mudah digunakan.

Saya juga merasa proyek ini memberi ruang untuk mengekspresikan **gaya desain pribadi**, yaitu tampilan yang modern, bersih, tapi tetap punya karakter visual yang kuat.

## Preview

- **Home Page:** Teks animasi bertema retro dengan marquee Pokémon berjalan.
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/01d7c116-a186-454c-b9ff-e2d11d9a4e03" />

- **List Page:** Daftar Pokémon lengkap dengan efek hover, filter, dan sorting.
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/054995da-8733-4b4e-85d0-422a47c7296a" />
  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/5d52d45b-9990-4580-b505-ba90c72877b5" />

