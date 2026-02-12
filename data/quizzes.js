/**
 * EduNusantara LMS - Bank Soal Quiz per Mapel/Kelas
 * Digunakan untuk materi (quiz per sub materi) dan Fun Games (random soal).
 * Siap untuk diganti dengan API backend.
 */
(function (global) {
    'use strict';

    // Soal per quiz: { id, question, options[], correctIndex }
    var QUIZ_BANK = {
        'q-m7-a1-1': {
            id: 'q-m7-a1-1',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Koefisien dari variabel x pada bentuk 3x + 5 adalah ...',
            options: ['3', '5', '3x', '8'],
            correctIndex: 0
        },
        'q-m7-a1-2': {
            id: 'q-m7-a1-2',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Bentuk sederhana dari 2x + 3x adalah ...',
            options: ['5x', '6x', '5', '6'],
            correctIndex: 0
        },
        'q-m7-a2-1': {
            id: 'q-m7-a2-1',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Hasil dari 2x . 3x adalah ...',
            options: ['5x', '6x', '6x²', '5x²'],
            correctIndex: 2
        },
        'q-m7-a2-2': {
            id: 'q-m7-a2-2',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Hasil dari (2x + 1) + (3x - 2) adalah ...',
            options: ['5x - 1', '5x + 1', '6x - 1', 'x - 1'],
            correctIndex: 0
        },
        'q-m7-a2-3': {
            id: 'q-m7-a2-3',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Konstanta dari 4x² - 3x + 7 adalah ...',
            options: ['4', '-3', '7', '0'],
            correctIndex: 2
        },
        'q-m7-a-tryout': {
            id: 'q-m7-a-tryout',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Tryout Aljabar: Nilai 2a + 3b untuk a=1, b=2 adalah ...',
            options: ['5', '7', '8', '10'],
            correctIndex: 2
        },
        'q-m7-b1-1': {
            id: 'q-m7-b1-1',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Hasil dari -5 + 3 adalah ...',
            options: ['-8', '-2', '2', '8'],
            correctIndex: 1
        },
        'q-m7-b1-2': {
            id: 'q-m7-b1-2',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Hasil dari 10 - (-4) adalah ...',
            options: ['6', '-6', '14', '-14'],
            correctIndex: 2
        },
        'q-m7-b2-1': {
            id: 'q-m7-b2-1',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Hasil dari (-3) x 4 adalah ...',
            options: ['12', '-12', '7', '-7'],
            correctIndex: 1
        },
        'q-m7-b2-2': {
            id: 'q-m7-b2-2',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Hasil dari (-20) : 4 adalah ...',
            options: ['5', '-5', '24', '-24'],
            correctIndex: 1
        },
        'q-m7-b-tryout': {
            id: 'q-m7-b-tryout',
            subjectId: 'matematika',
            classLevel: 7,
            question: 'Tryout Bilangan: -6 x (-2) = ...',
            options: ['-12', '12', '-8', '8'],
            correctIndex: 1
        },
        'q-p7-1-1': {
            id: 'q-p7-1-1',
            subjectId: 'ppkn',
            classLevel: 7,
            question: 'Sila pertama Pancasila dilambangkan dengan ...',
            options: ['Bintang', 'Rantai', 'Pohon beringin', 'Kepala banteng'],
            correctIndex: 0
        },
        'q-p7-1-2': {
            id: 'q-p7-1-2',
            subjectId: 'ppkn',
            classLevel: 7,
            question: 'Ketuhanan Yang Maha Esa merupakan sila ke ...',
            options: ['1', '2', '3', '4'],
            correctIndex: 0
        },
        'q-p7-2-1': {
            id: 'q-p7-2-1',
            subjectId: 'ppkn',
            classLevel: 7,
            question: 'Contoh pengamalan sila kedua di sekolah adalah ...',
            options: ['Menghormati teman', 'Beribadah', 'Musyawarah', 'Kerja bakti'],
            correctIndex: 0
        },
        'q-p7-tryout': {
            id: 'q-p7-tryout',
            subjectId: 'ppkn',
            classLevel: 7,
            question: 'Pancasila disahkan pada tanggal ...',
            options: ['1 Juni 1945', '18 Agustus 1945', '17 Agustus 1945', '22 Juni 1945'],
            correctIndex: 1
        },
        'q-bi7-1-1': {
            id: 'q-bi7-1-1',
            subjectId: 'indonesia',
            classLevel: 7,
            question: 'Gagasan utama paragraf biasanya terdapat di ...',
            options: ['Kalimat pertama', 'Kalimat terakhir', 'Kalimat pertama atau terakhir', 'Tengah paragraf'],
            correctIndex: 2
        },
        'q-bi7-1-2': {
            id: 'q-bi7-1-2',
            subjectId: 'indonesia',
            classLevel: 7,
            question: 'Kalimat yang menjelaskan gagasan utama disebut ...',
            options: ['Kalimat utama', 'Kalimat penjelas', 'Kalimat penutup', 'Kalimat pembuka'],
            correctIndex: 1
        },
        'q-bi7-2-1': {
            id: 'q-bi7-2-1',
            subjectId: 'indonesia',
            classLevel: 7,
            question: 'Ringkasan harus memuat ...',
            options: ['Semua kalimat', 'Gagasan pokok saja', 'Hanya judul', 'Kesimpulan saja'],
            correctIndex: 1
        },
        'q-bi7-tryout': {
            id: 'q-bi7-tryout',
            subjectId: 'indonesia',
            classLevel: 7,
            question: 'Membaca pemahaman bertujuan untuk ...',
            options: ['Menghafal teks', 'Memahami isi teks', 'Membaca cepat', 'Mencari kata sulit'],
            correctIndex: 1
        },
        'q-en7-1-1': {
            id: 'q-en7-1-1',
            subjectId: 'english',
            classLevel: 7,
            question: 'She ... to school every day.',
            options: ['go', 'goes', 'going', 'gone'],
            correctIndex: 1
        },
        'q-en7-1-2': {
            id: 'q-en7-1-2',
            subjectId: 'english',
            classLevel: 7,
            question: 'They ... football on Sundays.',
            options: ['play', 'plays', 'playing', 'played'],
            correctIndex: 0
        },
        'q-en7-2-1': {
            id: 'q-en7-2-1',
            subjectId: 'english',
            classLevel: 7,
            question: 'Opposite of "hot" is ...',
            options: ['warm', 'cold', 'cool', 'freeze'],
            correctIndex: 1
        },
        'q-en7-tryout': {
            id: 'q-en7-tryout',
            subjectId: 'english',
            classLevel: 7,
            question: 'Simple Present tense is used for ...',
            options: ['Past events', 'Habitual actions', 'Future plans', 'Completed actions'],
            correctIndex: 1
        },
        'q-sb7-1-1': {
            id: 'q-sb7-1-1',
            subjectId: 'senibudaya',
            classLevel: 7,
            question: 'Unsur seni rupa yang paling dasar adalah ...',
            options: ['Titik', 'Garis', 'Bidang', 'Warna'],
            correctIndex: 0
        },
        'q-sb7-1-2': {
            id: 'q-sb7-1-2',
            subjectId: 'senibudaya',
            classLevel: 7,
            question: 'Garis yang memberi kesan tenang adalah ...',
            options: ['Garis lurus horizontal', 'Garis zigzag', 'Garis spiral', 'Garis patah'],
            correctIndex: 0
        },
        'q-sb7-2-1': {
            id: 'q-sb7-2-1',
            subjectId: 'senibudaya',
            classLevel: 7,
            question: 'Teknik menggambar dengan titik-titik disebut ...',
            options: ['Blok', 'Arsir', 'Pointilis', 'Dusel'],
            correctIndex: 2
        },
        'q-sb7-tryout': {
            id: 'q-sb7-tryout',
            subjectId: 'senibudaya',
            classLevel: 7,
            question: 'Seni rupa dua dimensi memiliki ...',
            options: ['Panjang dan lebar', 'Panjang, lebar, tinggi', 'Volume', 'Kedalaman'],
            correctIndex: 0
        }
    };

    var SUBJECT_NAMES = { m: 'Matematika', p: 'PPKn', bi: 'Bahasa Indonesia', en: 'Bahasa Inggris', sb: 'Seni Budaya' };
    function parseQuizId(id) {
        var m = id.match(/^q-(m|p|bi|en|sb)(\d+)-(.+)$/);
        if (!m) return { subjectKey: 'm', classLevel: 7 };
        var subjectKey = m[1];
        var classLevel = parseInt(m[2], 10);
        return { subjectKey: subjectKey, classLevel: classLevel };
    }
    function makeDummyQuiz(quizId) {
        var parsed = parseQuizId(quizId);
        var subjectId = (parsed.subjectKey === 'm' ? 'matematika' : parsed.subjectKey === 'p' ? 'ppkn' : parsed.subjectKey === 'bi' ? 'indonesia' : parsed.subjectKey === 'en' ? 'english' : 'senibudaya');
        var names = {
            matematika: ['Bilangan', 'Aljabar', 'Geometri', 'Statistika', 'Peluang'],
            ppkn: ['Pancasila', 'Norma', 'Konstitusi', 'Demokrasi'],
            indonesia: ['Membaca', 'Menulis', 'Sastra', 'Teks'],
            english: ['Reading', 'Writing', 'Grammar', 'Vocabulary'],
            senibudaya: ['Seni Rupa', 'Musik', 'Tari', 'Teater']
        };
        var topics = names[subjectId] || ['Materi'];
        var topic = topics[parsed.classLevel % topics.length];
        return {
            id: quizId,
            subjectId: subjectId,
            classLevel: parsed.classLevel,
            question: 'Soal ' + topic + ' Kelas ' + parsed.classLevel + '. Pilih jawaban yang benar.',
            options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
            correctIndex: 0
        };
    }

    function getById(quizId) {
        if (QUIZ_BANK[quizId]) return QUIZ_BANK[quizId];
        if (quizId && quizId.indexOf('q-') === 0) return makeDummyQuiz(quizId);
        return null;
    }

    function getBySubjectAndClass(subjectId, classLevel) {
        var list = [];
        Object.keys(QUIZ_BANK).forEach(function (key) {
            var q = QUIZ_BANK[key];
            if (q.subjectId === subjectId && q.classLevel === Number(classLevel)) list.push(q);
        });
        return list;
    }

    function getRandomForSubject(subjectId, classLevel, count) {
        var list = getBySubjectAndClass(subjectId, classLevel);
        var subjectKey = (subjectId === 'matematika' ? 'm' : subjectId === 'ppkn' ? 'p' : subjectId === 'indonesia' ? 'bi' : subjectId === 'english' ? 'en' : 'sb');
        if (typeof EDU_MATERIALS !== 'undefined') {
            var ids = EDU_MATERIALS.getAllQuizIdsForSubject(subjectId, classLevel);
            ids.forEach(function (id) {
                if (list.every(function (q) { return q.id !== id; })) {
                    var item = getById(id);
                    if (item) list.push(item);
                }
            });
        }
        var shuffled = list.slice().sort(function () { return Math.random() - 0.5; });
        return shuffled.slice(0, count || 10);
    }

    global.EDU_QUIZZES = {
        getById: getById,
        getBySubjectAndClass: getBySubjectAndClass,
        getRandomForSubject: getRandomForSubject,
        QUIZ_BANK: QUIZ_BANK
    };
})(typeof window !== 'undefined' ? window : this);
