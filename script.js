// Data Storage
const appData = {
    progress: {
        math: 0,
        ppkn: 0
    },
    completedLessons: {
        math: [],
        ppkn: []
    },
    quizScores: {
        math: null,
        ppkn: null
    },
    studyTime: 0,
    achievements: [],
    gameStats: {
        quizBattle: { played: 0, bestScore: 0 },
        memoryMatch: { played: 0, bestTime: null },
        speedQuiz: { played: 0, bestScore: 0 }
    }
};

// Lesson Content Data
const lessonContent = {
    kalkulus: {
        title: "Turunan Fungsi (Kalkulus)",
        content: `
            <h3>📚 Pengertian Turunan</h3>
            <p>Turunan fungsi adalah konsep fundamental dalam kalkulus yang mengukur laju perubahan suatu fungsi terhadap variabelnya. Turunan menggambarkan gradien atau kemiringan garis singgung pada suatu titik pada kurva fungsi.</p>

            <h3>🔢 Notasi Turunan</h3>
            <p>Jika y = f(x), maka turunan fungsi dapat ditulis sebagai:</p>
            <div class="formula-box">
                f'(x) atau dy/dx atau df(x)/dx
            </div>

            <h3>📐 Rumus Dasar Turunan</h3>
            <div class="formula-box">
                1. f(x) = c → f'(x) = 0 (konstanta)<br>
                2. f(x) = x^n → f'(x) = n·x^(n-1) (pangkat)<br>
                3. f(x) = c·g(x) → f'(x) = c·g'(x) (konstanta kali fungsi)<br>
                4. f(x) = u(x) + v(x) → f'(x) = u'(x) + v'(x) (penjumlahan)<br>
                5. f(x) = u(x)·v(x) → f'(x) = u'(x)·v(x) + u(x)·v'(x) (perkalian)
            </div>

            <h3>💡 Contoh Soal 1</h3>
            <div class="example-box">
                <h4>Soal:</h4>
                <p>Tentukan turunan dari f(x) = 3x² + 5x - 7</p>
                <h4>Penyelesaian:</h4>
                <p>f'(x) = 3·(2x) + 5·(1) - 0</p>
                <p>f'(x) = 6x + 5</p>
            </div>

            <h3>💡 Contoh Soal 2</h3>
            <div class="example-box">
                <h4>Soal:</h4>
                <p>Tentukan turunan dari f(x) = 4x³ - 2x² + x - 8</p>
                <h4>Penyelesaian:</h4>
                <p>f'(x) = 4·(3x²) - 2·(2x) + 1 - 0</p>
                <p>f'(x) = 12x² - 4x + 1</p>
            </div>

            <h3>🎯 Aplikasi Turunan</h3>
            <ul>
                <li><strong>Kecepatan:</strong> Turunan pertama dari fungsi posisi terhadap waktu</li>
                <li><strong>Percepatan:</strong> Turunan kedua dari fungsi posisi</li>
                <li><strong>Maksimum/Minimum:</strong> Mencari titik ekstrem dengan f'(x) = 0</li>
                <li><strong>Gradien:</strong> Menentukan kemiringan garis singgung kurva</li>
            </ul>

            <div class="note-box">
                <strong>Catatan Penting:</strong> Turunan sangat berguna dalam menganalisis perubahan, optimasi masalah, dan pemodelan fenomena alam!
            </div>
        `
    },
    integral: {
        title: "Integral",
        content: `
            <h3>📚 Pengertian Integral</h3>
            <p>Integral adalah kebalikan dari turunan (anti-turunan). Integral digunakan untuk menghitung luas daerah di bawah kurva, volume benda putar, dan banyak aplikasi lainnya.</p>

            <h3>🔢 Jenis-jenis Integral</h3>
            <p><strong>1. Integral Tak Tentu:</strong> Hasil integral yang masih mengandung konstanta C</p>
            <p><strong>2. Integral Tentu:</strong> Integral dengan batas atas dan bawah yang menghasilkan nilai tertentu</p>

            <h3>📐 Rumus Dasar Integral Tak Tentu</h3>
            <div class="formula-box">
                1. ∫ k dx = kx + C (konstanta)<br>
                2. ∫ x^n dx = (x^(n+1))/(n+1) + C, n ≠ -1<br>
                3. ∫ (f(x) + g(x)) dx = ∫f(x)dx + ∫g(x)dx<br>
                4. ∫ k·f(x) dx = k·∫f(x)dx
            </div>

            <h3>📐 Rumus Integral Tentu</h3>
            <div class="formula-box">
                ∫[a,b] f(x)dx = F(b) - F(a)<br>
                dimana F(x) adalah anti-turunan dari f(x)
            </div>

            <h3>💡 Contoh Soal 1: Integral Tak Tentu</h3>
            <div class="example-box">
                <h4>Soal:</h4>
                <p>Tentukan ∫(6x² + 4x - 3)dx</p>
                <h4>Penyelesaian:</h4>
                <p>∫(6x² + 4x - 3)dx = 6·(x³/3) + 4·(x²/2) - 3x + C</p>
                <p>= 2x³ + 2x² - 3x + C</p>
            </div>

            <h3>💡 Contoh Soal 2: Integral Tentu</h3>
            <div class="example-box">
                <h4>Soal:</h4>
                <p>Hitung ∫[1,3] (x² + 2x)dx</p>
                <h4>Penyelesaian:</h4>
                <p>F(x) = x³/3 + x²</p>
                <p>∫[1,3] = F(3) - F(1)</p>
                <p>= (27/3 + 9) - (1/3 + 1)</p>
                <p>= (9 + 9) - (1/3 + 1) = 18 - 4/3 = 50/3</p>
            </div>

            <h3>🎯 Aplikasi Integral</h3>
            <ul>
                <li><strong>Menghitung Luas:</strong> Luas daerah di bawah kurva</li>
                <li><strong>Volume Benda Putar:</strong> Volume yang terbentuk saat kurva diputar</li>
                <li><strong>Panjang Kurva:</strong> Menghitung panjang busur kurva</li>
                <li><strong>Fisika:</strong> Menghitung kerja, momentum, dan energi</li>
            </ul>

            <div class="note-box">
                <strong>Tips:</strong> Jangan lupa menambahkan konstanta C pada integral tak tentu!
            </div>
        `
    },
    matriks: {
        title: "Matriks",
        content: `
            <h3>📚 Pengertian Matriks</h3>
            <p>Matriks adalah susunan bilangan berbentuk persegi panjang yang disusun dalam baris dan kolom. Matriks sangat penting dalam aljabar linear dan memiliki banyak aplikasi dalam berbagai bidang.</p>

            <h3>🔢 Notasi Matriks</h3>
            <p>Matriks berordo m × n memiliki m baris dan n kolom:</p>
            <div class="formula-box">
                A = [a₁₁  a₁₂  a₁₃]<br>
                    [a₂₁  a₂₂  a₂₃]<br>
                Matriks A berordo 2×3
            </div>

            <h3>📐 Operasi Matriks</h3>
            <p><strong>1. Penjumlahan Matriks</strong></p>
            <p>Syarat: Ordo kedua matriks harus sama</p>
            <div class="formula-box">
                A + B = [aᵢⱼ + bᵢⱼ]
            </div>

            <p><strong>2. Pengurangan Matriks</strong></p>
            <div class="formula-box">
                A - B = [aᵢⱼ - bᵢⱼ]
            </div>

            <p><strong>3. Perkalian Skalar</strong></p>
            <div class="formula-box">
                k × A = [k × aᵢⱼ]
            </div>

            <p><strong>4. Perkalian Matriks</strong></p>
            <p>Syarat: Jumlah kolom matriks pertama = jumlah baris matriks kedua</p>

            <h3>💡 Contoh Soal 1: Penjumlahan</h3>
            <div class="example-box">
                <h4>Soal:</h4>
                <p>A = [2  3]  dan B = [1  4]</p>
                <p>    [1  5]          [2  3]</p>
                <p>Hitunglah A + B</p>
                <h4>Penyelesaian:</h4>
                <p>A + B = [2+1  3+4] = [3  7]</p>
                <p>        [1+2  5+3]   [3  8]</p>
            </div>

            <h3>💡 Contoh Soal 2: Perkalian</h3>
            <div class="example-box">
                <h4>Soal:</h4>
                <p>A = [1  2]  dan B = [5  6]</p>
                <p>    [3  4]          [7  8]</p>
                <p>Hitunglah A × B</p>
                <h4>Penyelesaian:</h4>
                <p>A × B = [(1×5+2×7)  (1×6+2×8)]</p>
                <p>        [(3×5+4×7)  (3×6+4×8)]</p>
                <p>      = [19  22]</p>
                <p>        [43  50]</p>
            </div>

            <h3>🎯 Determinan Matriks 2×2</h3>
            <div class="formula-box">
                det(A) = |a  b| = ad - bc<br>
                         |c  d|
            </div>

            <h3>🎯 Invers Matriks 2×2</h3>
            <div class="formula-box">
                A⁻¹ = 1/det(A) × [d  -b]<br>
                                 [-c  a]
            </div>

            <div class="note-box">
                <strong>Aplikasi Matriks:</strong> Sistem persamaan linear, transformasi geometri, ekonomi, komputer grafis, dan kriptografi!
            </div>
        `
    },
    bhinneka: {
        title: "Bhineka Tunggal Ika",
        content: `
            <h3>📚 Makna Bhineka Tunggal Ika</h3>
            <p>"Bhineka Tunggal Ika" berasal dari bahasa Sanskerta yang berarti "berbeda-beda tetapi tetap satu". Semboyan ini menjadi pemersatu bangsa Indonesia yang memiliki keragaman suku, agama, ras, dan budaya.</p>

            <h3>🏛️ Sejarah Bhineka Tunggal Ika</h3>
            <p>Semboyan ini berasal dari Kakawin Sutasoma karya Mpu Tantular pada masa Kerajaan Majapahit (abad ke-14). Kalimat lengkapnya adalah:</p>
            <div class="formula-box">
                "Bhinnêka tunggal ika tan hana dharma mangrwa"<br>
                (Berbeda-beda tetapi tetap satu, tak ada kebenaran yang mendua)
            </div>

            <h3>🌟 Nilai-nilai Bhineka Tunggal Ika</h3>
            <ul>
                <li><strong>Toleransi:</strong> Menghormati perbedaan agama, suku, dan budaya</li>
                <li><strong>Persatuan:</strong> Menjaga keutuhan NKRI di tengah keberagaman</li>
                <li><strong>Kesetaraan:</strong> Semua warga negara memiliki hak yang sama</li>
                <li><strong>Gotong Royong:</strong> Bekerja sama untuk kepentingan bersama</li>
                <li><strong>Menghargai Keberagaman:</strong> Menjadikan perbedaan sebagai kekuatan</li>
            </ul>

            <h3>🇮🇩 Keberagaman Indonesia</h3>
            <div class="example-box">
                <h4>Fakta Keberagaman Nusantara:</h4>
                <ul>
                    <li>Lebih dari 300 suku bangsa</li>
                    <li>Lebih dari 700 bahasa daerah</li>
                    <li>6 agama resmi yang diakui</li>
                    <li>34 provinsi dengan karakteristik unik</li>
                    <li>Ribuan pulau dari Sabang sampai Merauke</li>
                </ul>
            </div>

            <h3>💡 Contoh Penerapan dalam Kehidupan</h3>
            <div class="example-box">
                <h4>Di Sekolah:</h4>
                <p>Berteman dengan semua teman tanpa membeda-bedakan suku, agama, atau latar belakang</p>
                <h4>Di Masyarakat:</h4>
                <p>Ikut serta dalam kegiatan gotong royong, menghormati tradisi tetangga yang berbeda</p>
                <h4>Di Media Sosial:</h4>
                <p>Tidak menyebarkan konten yang memecah belah atau menyinggung SARA</p>
            </div>

            <h3>⚠️ Tantangan terhadap Bhineka Tunggal Ika</h3>
            <ul>
                <li>Radikalisme dan intoleransi</li>
                <li>Konflik horizontal antar kelompok</li>
                <li>Hoaks dan ujaran kebencian di media sosial</li>
                <li>Separatisme dan disintegrasi bangsa</li>
                <li>Kesenjangan ekonomi antar daerah</li>
            </ul>

            <div class="note-box">
                <strong>Ingat:</strong> Bhineka Tunggal Ika adalah pilar utama persatuan Indonesia. Kita harus menjaga dan mengamalkannya dalam kehidupan sehari-hari!
            </div>
        `
    },
    demokrasi: {
        title: "Sistem dan Dinamika Demokrasi Pancasila",
        content: `
            <h3>📚 Pengertian Demokrasi Pancasila</h3>
            <p>Demokrasi Pancasila adalah sistem demokrasi yang berlandaskan pada nilai-nilai Pancasila. Demokrasi ini mengutamakan musyawarah mufakat, bukan voting semata, dan menempatkan kepentingan bersama di atas kepentingan individu atau kelompok.</p>

            <h3>🏛️ Prinsip-prinsip Demokrasi Pancasila</h3>
            <ul>
                <li><strong>Permusyawaratan:</strong> Keputusan diambil melalui musyawarah untuk mufakat</li>
                <li><strong>Ketuhanan Yang Maha Esa:</strong> Kebebasan beragama dijamin negara</li>
                <li><strong>Kemanusiaan:</strong> Menghormati hak asasi manusia</li>
                <li><strong>Persatuan:</strong> Mengutamakan kepentingan bangsa</li>
                <li><strong>Kerakyatan:</strong> Kedaulatan ada di tangan rakyat</li>
                <li><strong>Keadilan Sosial:</strong> Kesejahteraan untuk semua warga</li>
            </ul>

            <h3>🔄 Perbedaan Demokrasi Pancasila dengan Demokrasi Liberal</h3>
            <div class="example-box">
                <h4>Demokrasi Pancasila:</h4>
                <ul>
                    <li>Musyawarah mufakat</li>
                    <li>Kepentingan bersama diutamakan</li>
                    <li>Berlandaskan nilai Pancasila</li>
                    <li>Kebebasan bertanggung jawab</li>
                </ul>
                <h4>Demokrasi Liberal:</h4>
                <ul>
                    <li>Voting/suara terbanyak</li>
                    <li>Kebebasan individu mutlak</li>
                    <li>Sekuler (pemisahan agama-negara)</li>
                    <li>Kompetisi bebas tanpa batas</li>
                </ul>
            </div>

            <h3>🗳️ Pelaksanaan Demokrasi di Indonesia</h3>
            <p><strong>1. Pemilu (Pemilihan Umum)</strong></p>
            <ul>
                <li>Pemilu Presiden dan Wakil Presiden</li>
                <li>Pemilu Legislatif (DPR, DPD, DPRD)</li>
                <li>Pemilihan Kepala Daerah (Pilkada)</li>
            </ul>

            <p><strong>2. Sistem Pemerintahan</strong></p>
            <ul>
                <li>Sistem Presidensial</li>
                <li>Trias Politika (Eksekutif, Legislatif, Yudikatif)</li>
                <li>Checks and Balances</li>
            </ul>

            <h3>💡 Hak dan Kewajiban Warga Negara dalam Demokrasi</h3>
            <div class="example-box">
                <h4>Hak Politik:</h4>
                <ul>
                    <li>Memilih dan dipilih dalam Pemilu</li>
                    <li>Menyampaikan pendapat</li>
                    <li>Berserikat dan berkumpul</li>
                    <li>Mendapat perlindungan hukum</li>
                </ul>
                <h4>Kewajiban:</h4>
                <ul>
                    <li>Mematuhi hukum dan peraturan</li>
                    <li>Berpartisipasi dalam Pemilu</li>
                    <li>Membayar pajak</li>
                    <li>Ikut serta dalam pertahanan negara</li>
                </ul>
            </div>

            <h3>⚡ Tantangan Demokrasi di Indonesia</h3>
            <ul>
                <li>Politik uang (money politics)</li>
                <li>Korupsi di lembaga pemerintahan</li>
                <li>Polarisasi politik yang tajam</li>
                <li>Rendahnya partisipasi pemilih muda</li>
                <li>Penyebaran hoaks dan disinformasi</li>
                <li>Intoleransi dan radikalisme</li>
            </ul>

            <div class="note-box">
                <strong>Peran Generasi Muda:</strong> Sebagai agen perubahan, kalian harus aktif, kritis, dan bertanggung jawab dalam kehidupan berdemokrasi!
            </div>
        `
    },
    internasional: {
        title: "Hubungan Internasional Indonesia",
        content: `
            <h3>📚 Pengertian Hubungan Internasional</h3>
            <p>Hubungan internasional adalah interaksi antara negara dengan negara lain atau dengan organisasi internasional dalam berbagai bidang seperti politik, ekonomi, sosial, budaya, dan pertahanan-keamanan.</p>

            <h3>🌏 Politik Luar Negeri Indonesia</h3>
            <p>Indonesia menganut politik luar negeri yang <strong>Bebas Aktif</strong>:</p>
            <ul>
                <li><strong>Bebas:</strong> Tidak memihak blok kekuatan manapun, tidak terpengaruh politik negara lain</li>
                <li><strong>Aktif:</strong> Berperan aktif dalam menciptakan perdamaian dunia</li>
            </ul>

            <div class="formula-box">
                Landasan: Pembukaan UUD 1945 Alinea I dan IV<br>
                "...ikut melaksanakan ketertiban dunia berdasarkan kemerdekaan, perdamaian abadi dan keadilan sosial"
            </div>

            <h3>🤝 Peran Indonesia di Organisasi Internasional</h3>
            
            <p><strong>1. Perserikatan Bangsa-Bangsa (PBB)</strong></p>
            <div class="example-box">
                <ul>
                    <li>Indonesia menjadi anggota PBB ke-60 (28 September 1950)</li>
                    <li>Pernah keluar dari PBB tahun 1965, masuk kembali 1966</li>
                    <li>Aktif dalam misi perdamaian (peacekeeping)</li>
                    <li>Pernah menjadi anggota tidak tetap Dewan Keamanan PBB</li>
                </ul>
            </div>

            <p><strong>2. ASEAN (Association of Southeast Asian Nations)</strong></p>
            <div class="example-box">
                <ul>
                    <li>Indonesia adalah salah satu pendiri ASEAN (8 Agustus 1967)</li>
                    <li>Deklarasi Bangkok ditandatangani di Bangkok, Thailand</li>
                    <li>Tujuan: Kerja sama ekonomi, sosial, budaya, dan keamanan</li>
                    <li>Indonesia menjadi lokomotif ASEAN</li>
                </ul>
            </div>

            <p><strong>3. Gerakan Non-Blok (GNB)</strong></p>
            <ul>
                <li>Indonesia adalah salah satu pendiri GNB</li>
                <li>Konferensi Asia-Afrika Bandung 1955</li>
                <li>Prinsip: Tidak memihak Blok Barat atau Blok Timur</li>
            </ul>

            <p><strong>4. Organisasi Kerja Sama Islam (OKI)</strong></p>
            <ul>
                <li>Indonesia menjadi anggota OKI</li>
                <li>Tujuan: Solidaritas negara-negara Islam</li>
            </ul>

            <h3>💡 Contoh Peran Indonesia di Dunia Internasional</h3>
            <div class="example-box">
                <h4>Peran Aktif Indonesia:</h4>
                <ul>
                    <li><strong>Mediator Konflik:</strong> Penyelesaian konflik Kamboja, Filipina (Mindanao)</li>
                    <li><strong>Pasukan Garuda:</strong> Misi perdamaian PBB di berbagai negara</li>
                    <li><strong>KAA 1955:</strong> Menggagas solidaritas Asia-Afrika</li>
                    <li><strong>ASEAN Chair:</strong> Memimpin ASEAN berkali-kali</li>
                    <li><strong>Diplomasi Iklim:</strong> Aktif dalam penanganan perubahan iklim</li>
                </ul>
            </div>

            <h3>🌍 Bentuk Kerja Sama Internasional</h3>
            <ul>
                <li><strong>Bilateral:</strong> Kerja sama antara 2 negara</li>
                <li><strong>Multilateral:</strong> Kerja sama lebih dari 2 negara</li>
                <li><strong>Regional:</strong> Kerja sama dalam satu kawasan (ASEAN)</li>
                <li><strong>Internasional:</strong> Kerja sama global (PBB, WTO, WHO)</li>
            </ul>

            <h3>📊 Manfaat Hubungan Internasional</h3>
            <ul>
                <li>Meningkatkan kerja sama ekonomi dan perdagangan</li>
                <li>Transfer teknologi dan ilmu pengetahuan</li>
                <li>Menjaga perdamaian dan keamanan</li>
                <li>Meningkatkan citra Indonesia di mata dunia</li>
                <li>Mendapat bantuan dalam pembangunan</li>
            </ul>

            <div class="note-box">
                <strong>Tantangan:</strong> Globalisasi, konflik regional, terorisme, kejahatan transnasional, dan ketergantungan ekonomi. Indonesia harus tetap konsisten dengan politik Bebas Aktif!
            </div>
        `
    }
};

// Quiz Data - Materi Kelas 12
const quizData = {
    math: [
        {
            question: "Turunan pertama dari f(x) = 3x⁴ - 2x² + 5 adalah...",
            options: ["12x³ - 4x", "12x³ - 2x", "3x³ - 4x", "12x⁴ - 4x²"],
            correct: 0
        },
        {
            question: "Hasil dari ∫(4x³ + 6x)dx adalah...",
            options: ["x⁴ + 3x² + C", "4x⁴ + 6x² + C", "x⁴ + 6x² + C", "12x² + 6 + C"],
            correct: 0
        },
        {
            question: "Jika matriks A = [2 3] dan B = [1 0], maka A + B = ...",
            options: ["[3 3] [6 5]", "[3 3] [4 7]", "[1 3] [6 3]", "[3 0] [4 7]"],
            correct: 0
        },
        {
            question: "Determinan dari matriks [3 2] adalah...",
            options: ["5", "1", "7", "11"],
            correct: 1
        },
        {
            question: "Jika f(x) = x² + 4x, maka f'(2) = ...",
            options: ["8", "12", "6", "4"],
            correct: 0
        }
    ],
    ppkn: [
        {
            question: "Arti dari 'Bhineka Tunggal Ika' adalah...",
            options: [
                "Satu untuk semua",
                "Berbeda-beda tetapi tetap satu",
                "Bersatu kita teguh",
                "Persatuan Indonesia"
            ],
            correct: 1
        },
        {
            question: "Semboyan Bhineka Tunggal Ika berasal dari kitab...",
            options: ["Negarakertagama", "Sutasoma", "Arjunawiwaha", "Ramayana"],
            correct: 1
        },
        {
            question: "Politik luar negeri Indonesia adalah...",
            options: ["Bebas Aktif", "Liberal", "Sosialis", "Blok Barat"],
            correct: 0
        },
        {
            question: "Indonesia keluar dari keanggotaan PBB pada tahun...",
            options: ["1960", "1965", "1970", "1950"],
            correct: 1
        },
        {
            question: "ASEAN didirikan pada tanggal...",
            options: ["17 Agustus 1945", "8 Agustus 1967", "28 Oktober 1928", "18 Agustus 1945"],
            correct: 1
        }
    ]
};

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateDashboard();
    updateGameStats();
    startStudyTimer();
    
    // Setup game buttons setelah delay pendek
    setTimeout(() => {
        setupGameButtons();
    }, 300);
});

function initializeApp() {
    console.log('EduNusantara LMS Kelas 12 Initialized');
}

function setupEventListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateTo(page);
        });
    });

    const lessonChecks = document.querySelectorAll('.lesson-check');
    lessonChecks.forEach(check => {
        check.addEventListener('change', function() {
            handleLessonComplete(this);
        });
    });
}

function setupGameButtons() {
    console.log('🎮 Setting up game buttons with direct IDs...');
    
    // Quiz Battle Button
    const btnQuizBattle = document.getElementById('btn-quiz-battle');
    if (btnQuizBattle) {
        console.log('✅ Found Quiz Battle button');
        btnQuizBattle.onclick = function() {
            console.log('🎯 Quiz Battle clicked!');
            openGameHandler('quiz-battle');
        };
    } else {
        console.log('❌ Quiz Battle button NOT found');
    }
    
    // Memory Match Button
    const btnMemoryMatch = document.getElementById('btn-memory-match');
    if (btnMemoryMatch) {
        console.log('✅ Found Memory Match button');
        btnMemoryMatch.onclick = function() {
            console.log('🧠 Memory Match clicked!');
            openGameHandler('memory-match');
        };
    } else {
        console.log('❌ Memory Match button NOT found');
    }
    
    // Speed Quiz Button
    const btnSpeedQuiz = document.getElementById('btn-speed-quiz');
    if (btnSpeedQuiz) {
        console.log('✅ Found Speed Quiz button');
        btnSpeedQuiz.onclick = function() {
            console.log('⚡ Speed Quiz clicked!');
            openGameHandler('speed-quiz');
        };
    } else {
        console.log('❌ Speed Quiz button NOT found');
    }
    
    console.log('✅ Game buttons setup complete!');
}

function openGameHandler(gameType) {
    console.log('🚀 Opening game:', gameType);
    const modal = document.getElementById('game-modal');
    const container = document.getElementById('game-container');
    
    if (!modal) {
        console.error('❌ Game modal not found!');
        alert('Error: Game modal tidak ditemukan. Silakan refresh halaman.');
        return;
    }
    
    if (!container) {
        console.error('❌ Game container not found!');
        alert('Error: Game container tidak ditemukan. Silakan refresh halaman.');
        return;
    }
    
    console.log('✅ Modal and container found, initializing game...');
    
    try {
        if (gameType === 'quiz-battle') {
            console.log('Initializing Quiz Battle...');
            initQuizBattle(container);
        } else if (gameType === 'memory-match') {
            console.log('Initializing Memory Match...');
            initMemoryMatch(container);
        } else if (gameType === 'speed-quiz') {
            console.log('Initializing Speed Quiz...');
            initSpeedQuiz(container);
        } else {
            console.error('❌ Unknown game type:', gameType);
            return;
        }
        
        console.log('✅ Game initialized, showing modal...');
        modal.classList.add('show');
        console.log('✅ Modal shown!');
    } catch (error) {
        console.error('❌ Error initializing game:', error);
        alert('Error: ' + error.message);
    }
}

// Navigation
function navigateTo(pageName) {
    console.log('📍 Navigating to:', pageName);
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(pageName).classList.add('active');
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

    if (pageName === 'profile') {
        updateProfilePage();
    }
    
    if (pageName === 'fun-games') {
        console.log('🎮 Entering Fun Games page...');
        updateGameStatsPage();
        
        // Setup game buttons dengan delay
        setTimeout(() => {
            console.log('⏰ Setting up game buttons after delay...');
            setupGameButtons();
        }, 200);
    }
}

// Module Toggle
function toggleModule(moduleNum) {
    const moduleItem = document.querySelector(`[data-module="${moduleNum}"]`);
    moduleItem.classList.toggle('active');
}

// Open Lesson Modal
function openLesson(lessonId) {
    const lesson = lessonContent[lessonId];
    if (!lesson) return;

    const modal = document.getElementById('lesson-modal');
    const container = document.getElementById('lesson-container');

    container.innerHTML = `
        <div class="lesson-content">
            <h2>${lesson.title}</h2>
            ${lesson.content}
        </div>
    `;

    modal.classList.add('show');
}

// Close Lesson Modal
function closeLesson() {
    const modal = document.getElementById('lesson-modal');
    modal.classList.remove('show');
}

// Lesson Completion
function handleLessonComplete(checkbox) {
    const course = checkbox.dataset.course;
    const lesson = checkbox.dataset.lesson;

    if (checkbox.checked) {
        if (!appData.completedLessons[course].includes(lesson)) {
            appData.completedLessons[course].push(lesson);
        }
    } else {
        const index = appData.completedLessons[course].indexOf(lesson);
        if (index > -1) {
            appData.completedLessons[course].splice(index, 1);
        }
    }

    updateProgress();
    updateDashboard();
    checkAchievements();
}

// Progress Calculation
function updateProgress() {
    const totalLessons = {
        math: 3,
        ppkn: 3
    };

    appData.progress.math = Math.round((appData.completedLessons.math.length / totalLessons.math) * 100);
    appData.progress.ppkn = Math.round((appData.completedLessons.ppkn.length / totalLessons.ppkn) * 100);

    document.getElementById('math-progress').style.width = appData.progress.math + '%';
    document.getElementById('ppkn-progress').style.width = appData.progress.ppkn + '%';
}

// Dashboard Updates
function updateDashboard() {
    const totalProgress = Math.round((appData.progress.math + appData.progress.ppkn) / 2);
    document.getElementById('total-progress').textContent = totalProgress + '%';

    let completedCourses = 0;
    if (appData.progress.math === 100) completedCourses++;
    if (appData.progress.ppkn === 100) completedCourses++;
    document.getElementById('completed-courses').textContent = completedCourses + '/2';

    let totalScore = 0;
    if (appData.quizScores.math !== null) totalScore += appData.quizScores.math;
    if (appData.quizScores.ppkn !== null) totalScore += appData.quizScores.ppkn;
    document.getElementById('total-score').textContent = totalScore;
}

// Quiz System
let currentQuiz = null;
let currentAnswers = [];

function startQuiz(subject) {
    currentQuiz = subject;
    currentAnswers = new Array(quizData[subject].length).fill(null);
    
    const modal = document.getElementById('quiz-modal');
    const container = document.getElementById('quiz-container');
    
    let quizHTML = `<h2>Kuis ${subject === 'math' ? 'Matematika' : 'PPKn'} Kelas 12</h2>`;
    
    quizData[subject].forEach((q, index) => {
        quizHTML += `
            <div class="quiz-question">
                <h3>Pertanyaan ${index + 1}</h3>
                <p>${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((opt, optIndex) => `
                        <div class="quiz-option" onclick="selectAnswer(${index}, ${optIndex})">
                            ${String.fromCharCode(65 + optIndex)}. ${opt}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    quizHTML += `
        <button class="btn btn-primary quiz-submit" onclick="submitQuiz()">
            Submit Jawaban
        </button>
    `;
    
    container.innerHTML = quizHTML;
    modal.classList.add('show');
}

function selectAnswer(questionIndex, optionIndex) {
    currentAnswers[questionIndex] = optionIndex;
    
    const questionDiv = document.querySelectorAll('.quiz-question')[questionIndex];
    const options = questionDiv.querySelectorAll('.quiz-option');
    
    options.forEach((opt, idx) => {
        opt.classList.remove('selected');
        if (idx === optionIndex) {
            opt.classList.add('selected');
        }
    });
}

function submitQuiz() {
    if (currentAnswers.includes(null)) {
        alert('Mohon jawab semua pertanyaan terlebih dahulu!');
        return;
    }
    
    let correctCount = 0;
    quizData[currentQuiz].forEach((q, index) => {
        if (currentAnswers[index] === q.correct) {
            correctCount++;
        }
    });
    
    const score = Math.round((correctCount / quizData[currentQuiz].length) * 100);
    appData.quizScores[currentQuiz] = score;
    
    const resultDiv = document.getElementById(`${currentQuiz}-quiz-result`);
    resultDiv.innerHTML = `
        <h3>Hasil Kuis</h3>
        <p style="font-size: 2.5rem; color: var(--primary-color); font-weight: bold; margin: 1rem 0;">${score}</p>
        <p style="font-size: 1.2rem;">Jawaban benar: ${correctCount} dari ${quizData[currentQuiz].length}</p>
        <p style="font-size: 1.3rem; margin: 1rem 0;">${score >= 80 ? '🎉 Luar biasa! Nilai sempurna!' : score >= 60 ? '👍 Bagus! Terus tingkatkan!' : '💪 Tetap semangat! Coba lagi!'}</p>
        ${score < 100 ? `<button class="btn btn-retry" onclick="retryQuiz('${currentQuiz}')">🔄 Coba Lagi</button>` : ''}
    `;
    resultDiv.classList.add('show');
    
    closeQuiz();
    updateDashboard();
    checkAchievements();
}

function retryQuiz(subject) {
    const resultDiv = document.getElementById(`${subject}-quiz-result`);
    resultDiv.classList.remove('show');
    startQuiz(subject);
}

function closeQuiz() {
    const modal = document.getElementById('quiz-modal');
    modal.classList.remove('show');
    currentQuiz = null;
    currentAnswers = [];
}

// Profile Page
function updateProfilePage() {
    const totalCompleted = appData.completedLessons.math.length + appData.completedLessons.ppkn.length;
    document.getElementById('total-lessons').textContent = `${totalCompleted}/6`;
    
    let scores = [];
    if (appData.quizScores.math !== null) scores.push(appData.quizScores.math);
    if (appData.quizScores.ppkn !== null) scores.push(appData.quizScores.ppkn);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    document.getElementById('average-score').textContent = avgScore;
    
    const hours = Math.floor(appData.studyTime / 60);
    const minutes = appData.studyTime % 60;
    document.getElementById('study-time').textContent = hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;
}

// Achievements System
function checkAchievements() {
    const achievements = document.querySelectorAll('.achievement-item');
    
    const totalLessons = appData.completedLessons.math.length + appData.completedLessons.ppkn.length;
    if (totalLessons > 0 && !appData.achievements.includes('pemula')) {
        achievements[0].classList.remove('locked');
        achievements[0].classList.add('unlocked');
        appData.achievements.push('pemula');
    }
    
    if (totalLessons >= 3 && !appData.achievements.includes('rajin')) {
        achievements[1].classList.remove('locked');
        achievements[1].classList.add('unlocked');
        appData.achievements.push('rajin');
    }
    
    if ((appData.quizScores.math === 100 || appData.quizScores.ppkn === 100) && !appData.achievements.includes('sempurna')) {
        achievements[2].classList.remove('locked');
        achievements[2].classList.add('unlocked');
        appData.achievements.push('sempurna');
    }
    
    if (appData.progress.math === 100 && appData.progress.ppkn === 100 && !appData.achievements.includes('lulus')) {
        achievements[3].classList.remove('locked');
        achievements[3].classList.add('unlocked');
        appData.achievements.push('lulus');
    }
}

// Study Timer
function startStudyTimer() {
    setInterval(() => {
        appData.studyTime++;
    }, 60000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const quizModal = document.getElementById('quiz-modal');
    const lessonModal = document.getElementById('lesson-modal');
    const gameModal = document.getElementById('game-modal');
    if (event.target === quizModal) {
        closeQuiz();
    }
    if (event.target === lessonModal) {
        closeLesson();
    }
    if (event.target === gameModal) {
        closeGame();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQuiz();
        closeLesson();
        closeGame();
    }
});

// Game System
const gameQuestions = {
    all: [
        { q: "Turunan dari f(x) = 3x² adalah...", opts: ["6x", "3x", "6x²", "9x"], ans: 0, subj: "MTK" },
        { q: "∫2x dx = ...", opts: ["x² + C", "2x² + C", "x + C", "2x + C"], ans: 0, subj: "MTK" },
        { q: "Determinan [2 1; 3 4] adalah...", opts: ["5", "8", "11", "2"], ans: 0, subj: "MTK" },
        { q: "Arti Bhineka Tunggal Ika adalah...", opts: ["Berbeda-beda tetap satu", "Satu untuk semua", "Persatuan", "Keberagaman"], ans: 0, subj: "PKN" },
        { q: "ASEAN didirikan tahun...", opts: ["1967", "1945", "1950", "1970"], ans: 0, subj: "PKN" },
        { q: "Politik luar negeri Indonesia adalah...", opts: ["Bebas Aktif", "Liberal", "Sosialis", "Netral"], ans: 0, subj: "PKN" },
        { q: "f'(x⁴) = ...", opts: ["4x³", "x³", "4x⁴", "x⁵"], ans: 0, subj: "MTK" },
        { q: "Semboyan Bhineka berasal dari kitab...", opts: ["Sutasoma", "Ramayana", "Mahabharata", "Negarakertagama"], ans: 0, subj: "PKN" },
        { q: "Integral dari 3 adalah...", opts: ["3x + C", "3", "0", "x + C"], ans: 0, subj: "MTK" },
        { q: "Indonesia keluar dari PBB tahun...", opts: ["1965", "1960", "1970", "1950"], ans: 0, subj: "PKN" },
        { q: "Turunan konstanta adalah...", opts: ["0", "1", "∞", "C"], ans: 0, subj: "MTK" },
        { q: "Demokrasi Pancasila mengutamakan...", opts: ["Musyawarah mufakat", "Voting", "Kekuasaan mayoritas", "Kebebasan mutlak"], ans: 0, subj: "PKN" }
    ]
};

function updateGameStats() {
    const quizBattleBest = document.getElementById('quiz-battle-best');
    const quizBattlePlayed = document.getElementById('quiz-battle-played');
    const memoryBest = document.getElementById('memory-best');
    const memoryPlayed = document.getElementById('memory-played');
    const speedBest = document.getElementById('speed-best');
    const speedPlayed = document.getElementById('speed-played');
    
    if (quizBattleBest) quizBattleBest.textContent = appData.gameStats.quizBattle.bestScore;
    if (quizBattlePlayed) quizBattlePlayed.textContent = appData.gameStats.quizBattle.played;
    if (memoryBest) memoryBest.textContent = appData.gameStats.memoryMatch.bestTime || '-';
    if (memoryPlayed) memoryPlayed.textContent = appData.gameStats.memoryMatch.played;
    if (speedBest) speedBest.textContent = appData.gameStats.speedQuiz.bestScore;
    if (speedPlayed) speedPlayed.textContent = appData.gameStats.speedQuiz.played;
    
    updateGameStatsPage();
}

function updateGameStatsPage() {
    const quizBattleBestPage = document.getElementById('quiz-battle-best-page');
    const quizBattlePlayedPage = document.getElementById('quiz-battle-played-page');
    const memoryBestPage = document.getElementById('memory-best-page');
    const memoryPlayedPage = document.getElementById('memory-played-page');
    const speedBestPage = document.getElementById('speed-best-page');
    const speedPlayedPage = document.getElementById('speed-played-page');
    
    if (quizBattleBestPage) quizBattleBestPage.textContent = appData.gameStats.quizBattle.bestScore;
    if (quizBattlePlayedPage) quizBattlePlayedPage.textContent = appData.gameStats.quizBattle.played;
    if (memoryBestPage) memoryBestPage.textContent = appData.gameStats.memoryMatch.bestTime || '-';
    if (memoryPlayedPage) memoryPlayedPage.textContent = appData.gameStats.memoryMatch.played;
    if (speedBestPage) speedBestPage.textContent = appData.gameStats.speedQuiz.bestScore;
    if (speedPlayedPage) speedPlayedPage.textContent = appData.gameStats.speedQuiz.played;
}

function openGame(gameType) {
    console.log('⚠️ openGame called (legacy):', gameType);
    openGameHandler(gameType);
}

// Make functions available globally
window.openGame = openGame;
window.closeGame = closeGame;
window.selectBattleCell = selectBattleCell;
window.answerBattle = answerBattle;
window.initQuizBattle = initQuizBattle;
window.flipMemoryCard = flipMemoryCard;
window.initMemoryMatch = initMemoryMatch;
window.answerSpeed = answerSpeed;
window.initSpeedQuiz = initSpeedQuiz;

function closeGame() {
    const modal = document.getElementById('game-modal');
    if (modal) {
        modal.classList.remove('show');
    }
    
    // Clear any running timers
    if (memoryState.timer) {
        clearInterval(memoryState.timer);
        memoryState.timer = null;
    }
    if (speedState.timer) {
        clearInterval(speedState.timer);
        speedState.timer = null;
    }
}

// Quiz Battle (Tic-Tac-Toe)
let battleState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    gameOver: false,
    currentCell: null,
    score: { X: 0, O: 0 }
};

function initQuizBattle(container) {
    battleState = {
        board: Array(9).fill(null),
        currentPlayer: 'X',
        gameOver: false,
        currentCell: null,
        score: { X: 0, O: 0 }
    };
    
    renderQuizBattle(container);
}

function renderQuizBattle(container) {
    container.innerHTML = `
        <div class="quiz-battle-container">
            <h2>🎯 Quiz Battle</h2>
            <p>Jawab pertanyaan dengan benar untuk mengisi kotak!</p>
            
            <div class="battle-info">
                <div>
                    <h3 class="player-x">X (Kamu)</h3>
                    <p>Score: ${battleState.score.X}</p>
                </div>
                <div>
                    <h3 class="player-o">O (AI)</h3>
                    <p>Score: ${battleState.score.O}</p>
                </div>
            </div>
            
            <div class="tic-tac-toe-board" id="battle-board">
                ${battleState.board.map((cell, i) => `
                    <div class="tic-cell ${cell ? 'filled ' + cell.toLowerCase() : ''}" 
                         onclick="selectBattleCell(${i})" data-cell="${i}">
                        ${cell || ''}
                    </div>
                `).join('')}
            </div>
            
            <div id="battle-question-area"></div>
            <div id="battle-result-area"></div>
            
            <button class="btn btn-primary" onclick="initQuizBattle(document.getElementById('game-container'))" style="margin-top: 1rem;">
                🔄 Main Lagi
            </button>
        </div>
    `;
}

function selectBattleCell(cellIndex) {
    if (battleState.gameOver || battleState.board[cellIndex] || battleState.currentCell !== null) return;
    
    battleState.currentCell = cellIndex;
    showBattleQuestion();
}

function showBattleQuestion() {
    const questionArea = document.getElementById('battle-question-area');
    const randomQ = gameQuestions.all[Math.floor(Math.random() * gameQuestions.all.length)];
    
    questionArea.innerHTML = `
        <div class="battle-question">
            <h3>${randomQ.subj}: ${randomQ.q}</h3>
            <div class="battle-options">
                ${randomQ.opts.map((opt, i) => `
                    <div class="battle-option" onclick="answerBattle(${i}, ${randomQ.ans})">
                        ${String.fromCharCode(65 + i)}. ${opt}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function answerBattle(selected, correct) {
    const questionArea = document.getElementById('battle-question-area');
    
    if (selected === correct) {
        battleState.board[battleState.currentCell] = battleState.currentPlayer;
        battleState.score[battleState.currentPlayer]++;
        questionArea.innerHTML = `<div class="battle-result" style="color: green;">✅ Benar! Kotak berhasil diisi!</div>`;
        
        if (checkBattleWinner()) {
            handleBattleEnd();
            return;
        }
        
        battleState.currentPlayer = 'O';
        setTimeout(aiTurn, 1000);
    } else {
        questionArea.innerHTML = `<div class="battle-result" style="color: red;">❌ Salah! Giliran AI!</div>`;
        battleState.currentPlayer = 'O';
        setTimeout(aiTurn, 1000);
    }
    
    battleState.currentCell = null;
    renderQuizBattle(document.getElementById('game-container'));
}

function aiTurn() {
    if (battleState.gameOver) return;
    
    const emptyCells = battleState.board.map((cell, i) => cell === null ? i : null).filter(i => i !== null);
    if (emptyCells.length === 0) {
        handleBattleEnd();
        return;
    }
    
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    if (Math.random() > 0.3) {
        battleState.board[randomCell] = 'O';
        battleState.score.O++;
    }
    
    if (checkBattleWinner()) {
        handleBattleEnd();
        return;
    }
    
    battleState.currentPlayer = 'X';
    renderQuizBattle(document.getElementById('game-container'));
    document.getElementById('battle-question-area').innerHTML = '<p>Giliran kamu! Pilih kotak kosong.</p>';
}

function checkBattleWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (battleState.board[a] && battleState.board[a] === battleState.board[b] && battleState.board[a] === battleState.board[c]) {
            battleState.gameOver = true;
            return battleState.board[a];
        }
    }
    
    if (!battleState.board.includes(null)) {
        battleState.gameOver = true;
        return 'DRAW';
    }
    
    return null;
}

function handleBattleEnd() {
    const winner = checkBattleWinner();
    const resultArea = document.getElementById('battle-result-area');
    
    appData.gameStats.quizBattle.played++;
    if (winner === 'X') {
        appData.gameStats.quizBattle.bestScore = Math.max(appData.gameStats.quizBattle.bestScore, battleState.score.X);
        resultArea.innerHTML = `<div class="battle-result" style="background: #2ecc71; color: white; padding: 1.5rem;">🎉 Kamu Menang! Score: ${battleState.score.X}</div>`;
    } else if (winner === 'O') {
        resultArea.innerHTML = `<div class="battle-result" style="background: #e74c3c; color: white; padding: 1.5rem;">😢 AI Menang! Coba lagi!</div>`;
    } else {
        resultArea.innerHTML = `<div class="battle-result" style="background: #f39c12; color: white; padding: 1.5rem;">🤝 Seri! Score: X=${battleState.score.X}, O=${battleState.score.O}</div>`;
    }
    
    updateGameStats();
}

// Memory Match Game
let memoryState = {
    cards: [],
    flipped: [],
    matched: [],
    moves: 0,
    startTime: null,
    timer: null
};

function initMemoryMatch(container) {
    const pairs = [
        { q: "f'(x²)", a: "2x" },
        { q: "∫x dx", a: "½x²+C" },
        { q: "ASEAN", a: "1967" },
        { q: "Bhinneka", a: "Sutasoma" },
        { q: "det[1,2;3,4]", a: "-2" },
        { q: "Politik RI", a: "Bebas Aktif" },
        { q: "f'(5)", a: "0" },
        { q: "PBB keluar", a: "1965" }
    ];
    
    const cards = [];
    pairs.forEach((pair, i) => {
        cards.push({ id: i * 2, content: pair.q, pairId: i });
        cards.push({ id: i * 2 + 1, content: pair.a, pairId: i });
    });
    
    memoryState = {
        cards: shuffleArray(cards),
        flipped: [],
        matched: [],
        moves: 0,
        startTime: Date.now(),
        timer: null
    };
    
    renderMemoryMatch(container);
    startMemoryTimer(container);
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function renderMemoryMatch(container) {
    const elapsed = memoryState.startTime ? Math.floor((Date.now() - memoryState.startTime) / 1000) : 0;
    
    container.innerHTML = `
        <div class="memory-game-container">
            <h2>🧠 Memory Match</h2>
            <p>Cocokkan rumus/pertanyaan dengan jawabannya!</p>
            
            <div class="memory-stats">
                <div>⏱️ Waktu<br><strong id="memory-timer">${elapsed}s</strong></div>
                <div>🎯 Moves<br><strong>${memoryState.moves}</strong></div>
                <div>✅ Matched<br><strong>${memoryState.matched.length/2}/8</strong></div>
            </div>
            
            <div class="memory-board">
                ${memoryState.cards.map(card => `
                    <div class="memory-card ${memoryState.flipped.includes(card.id) ? 'flipped' : ''} ${memoryState.matched.includes(card.pairId) ? 'matched' : ''}"
                         onclick="flipMemoryCard(${card.id})">
                        <div class="card-back">?</div>
                        <div class="card-front">${card.content}</div>
                    </div>
                `).join('')}
            </div>
            
            <button class="btn btn-primary" onclick="initMemoryMatch(document.getElementById('game-container'))" style="margin-top: 1rem;">
                🔄 Main Lagi
            </button>
        </div>
    `;
}

function startMemoryTimer(container) {
    if (memoryState.timer) clearInterval(memoryState.timer);
    memoryState.timer = setInterval(() => {
        const timerEl = document.getElementById('memory-timer');
        if (timerEl && memoryState.matched.length < 8) {
            const elapsed = Math.floor((Date.now() - memoryState.startTime) / 1000);
            timerEl.textContent = elapsed + 's';
        }
    }, 1000);
}

function flipMemoryCard(cardId) {
    if (memoryState.flipped.length >= 2 || memoryState.flipped.includes(cardId)) return;
    
    const card = memoryState.cards.find(c => c.id === cardId);
    if (memoryState.matched.includes(card.pairId)) return;
    
    memoryState.flipped.push(cardId);
    renderMemoryMatch(document.getElementById('game-container'));
    
    if (memoryState.flipped.length === 2) {
        memoryState.moves++;
        const card1 = memoryState.cards.find(c => c.id === memoryState.flipped[0]);
        const card2 = memoryState.cards.find(c => c.id === memoryState.flipped[1]);
        
        if (card1.pairId === card2.pairId) {
            memoryState.matched.push(card1.pairId);
            memoryState.flipped = [];
            
            if (memoryState.matched.length === 8) {
                endMemoryGame();
            }
        } else {
            setTimeout(() => {
                memoryState.flipped = [];
                renderMemoryMatch(document.getElementById('game-container'));
            }, 1000);
        }
        
        renderMemoryMatch(document.getElementById('game-container'));
    }
}

function endMemoryGame() {
    clearInterval(memoryState.timer);
    const finalTime = Math.floor((Date.now() - memoryState.startTime) / 1000);
    
    appData.gameStats.memoryMatch.played++;
    if (!appData.gameStats.memoryMatch.bestTime || finalTime < parseInt(appData.gameStats.memoryMatch.bestTime)) {
        appData.gameStats.memoryMatch.bestTime = finalTime + 's';
    }
    
    updateGameStats();
    
    setTimeout(() => {
        alert(`🎉 Selesai!\nWaktu: ${finalTime}s\nMoves: ${memoryState.moves}`);
    }, 500);
}

// Speed Quiz Game
let speedState = {
    score: 0,
    correct: 0,
    wrong: 0,
    timeLeft: 60,
    currentQ: null,
    timer: null
};

function initSpeedQuiz(container) {
    speedState = {
        score: 0,
        correct: 0,
        wrong: 0,
        timeLeft: 60,
        currentQ: null,
        timer: null
    };
    
    renderSpeedQuiz(container);
    loadSpeedQuestion();
    startSpeedTimer(container);
}

function renderSpeedQuiz(container) {
    container.innerHTML = `
        <div class="speed-quiz-container">
            <h2>⚡ Speed Quiz</h2>
            <p>Jawab sebanyak mungkin dalam 60 detik!</p>
            
            <div class="speed-timer ${speedState.timeLeft <= 10 ? 'warning' : ''}">
                ${speedState.timeLeft}s
            </div>
            
            <div class="speed-score">
                <div>💯 Score<br><strong>${speedState.score}</strong></div>
                <div>✅ Benar<br><strong>${speedState.correct}</strong></div>
                <div>❌ Salah<br><strong>${speedState.wrong}</strong></div>
            </div>
            
            <div id="speed-question-area"></div>
        </div>
    `;
}

function startSpeedTimer(container) {
    speedState.timer = setInterval(() => {
        speedState.timeLeft--;
        
        if (speedState.timeLeft <= 0) {
            endSpeedQuiz(container);
        } else {
            renderSpeedQuiz(container);
            if (speedState.currentQ) {
                displaySpeedQuestion(speedState.currentQ);
            }
        }
    }, 1000);
}

function loadSpeedQuestion() {
    speedState.currentQ = gameQuestions.all[Math.floor(Math.random() * gameQuestions.all.length)];
    displaySpeedQuestion(speedState.currentQ);
}

function displaySpeedQuestion(q) {
    const area = document.getElementById('speed-question-area');
    area.innerHTML = `
        <div class="speed-question">
            <h3>${q.subj}: ${q.q}</h3>
            <div class="speed-options">
                ${q.opts.map((opt, i) => `
                    <div class="speed-option" onclick="answerSpeed(${i}, ${q.ans})">
                        ${String.fromCharCode(65 + i)}. ${opt}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function answerSpeed(selected, correct) {
    if (selected === correct) {
        speedState.score += 10;
        speedState.correct++;
    } else {
        speedState.wrong++;
    }
    
    loadSpeedQuestion();
    renderSpeedQuiz(document.getElementById('game-container'));
}

function endSpeedQuiz(container) {
    clearInterval(speedState.timer);
    
    appData.gameStats.speedQuiz.played++;
    if (speedState.score > appData.gameStats.speedQuiz.bestScore) {
        appData.gameStats.speedQuiz.bestScore = speedState.score;
    }
    
    updateGameStats();
    
    container.innerHTML = `
        <div class="speed-quiz-container">
            <h2>⚡ Speed Quiz Selesai!</h2>
            <div class="speed-result">
                <h3>🎉 Hasil Akhir</h3>
                <p style="font-size: 3rem; color: var(--primary-color); margin: 1rem 0;">${speedState.score}</p>
                <p style="font-size: 1.2rem;">✅ Benar: ${speedState.correct}</p>
                <p style="font-size: 1.2rem;">❌ Salah: ${speedState.wrong}</p>
                <p style="margin-top: 1rem;">${speedState.score >= 100 ? '🏆 Luar biasa!' : speedState.score >= 50 ? '👍 Bagus!' : '💪 Latihan lagi!'}</p>
            </div>
            <button class="btn btn-primary" onclick="initSpeedQuiz(document.getElementById('game-container'))" style="margin-top: 1rem;">
                🔄 Main Lagi
            </button>
        </div>
    `;
}

console.log('🎓 EduNusantara LMS Kelas 12 - Sistem berhasil dimuat!');