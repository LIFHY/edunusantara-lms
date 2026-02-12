/**
 * EduNusantara LMS - Struktur Materi: Mapel → Kelas → Bab → Sub Materi
 * Materi dummy lengkap per kelas (7, 8, 9) untuk 5 mapel.
 */
(function (global) {
    'use strict';

    function q(subjectPrefix, kelas, bab, sub, num) {
        return 'q-' + subjectPrefix + kelas + '-' + bab + '-' + sub + '-' + num;
    }
    function qTryout(subjectPrefix, kelas, bab) {
        return 'q-' + subjectPrefix + kelas + '-' + bab + '-tryout';
    }

    var MATERIALS = {
        matematika: {
            7: [
                { id: 'bilangan-bulat', title: 'Bilangan Bulat', tryoutQuizId: qTryout('m', 7, 'b'),
                    subMaterials: [
                        { id: 'sm7b1', title: 'Pengertian dan Sifat Bilangan Bulat', quizIds: [q('m',7,'b',1,1), q('m',7,'b',1,2)] },
                        { id: 'sm7b2', title: 'Operasi Penjumlahan dan Pengurangan', quizIds: [q('m',7,'b',2,1), q('m',7,'b',2,2)] },
                        { id: 'sm7b3', title: 'Operasi Perkalian dan Pembagian', quizIds: [q('m',7,'b',3,1), q('m',7,'b',3,2)] }
                    ] },
                { id: 'aljabar-dasar', title: 'Aljabar Dasar', tryoutQuizId: qTryout('m', 7, 'a'),
                    subMaterials: [
                        { id: 'sm7a1', title: 'Pengertian Variabel dan Koefisien', quizIds: [q('m',7,'a',1,1), q('m',7,'a',1,2)] },
                        { id: 'sm7a2', title: 'Operasi Bentuk Aljabar', quizIds: [q('m',7,'a',2,1), q('m',7,'a',2,2), q('m',7,'a',2,3)] }
                    ] },
                { id: 'geometri-7', title: 'Geometri Dasar', tryoutQuizId: qTryout('m', 7, 'g'),
                    subMaterials: [
                        { id: 'sm7g1', title: 'Sudut dan Jenis-jenis Sudut', quizIds: [q('m',7,'g',1,1), q('m',7,'g',1,2)] },
                        { id: 'sm7g2', title: 'Keliling dan Luas Bangun Datar', quizIds: [q('m',7,'g',2,1), q('m',7,'g',2,2)] }
                    ] },
                { id: 'statistika-7', title: 'Statistika', tryoutQuizId: qTryout('m', 7, 's'),
                    subMaterials: [
                        { id: 'sm7s1', title: 'Mean, Median, dan Modus', quizIds: [q('m',7,'s',1,1), q('m',7,'s',1,2)] },
                        { id: 'sm7s2', title: 'Penyajian Data', quizIds: [q('m',7,'s',2,1)] }
                    ] },
                { id: 'peluang-7', title: 'Peluang', tryoutQuizId: qTryout('m', 7, 'p'),
                    subMaterials: [
                        { id: 'sm7p1', title: 'Peluang Kejadian Sederhana', quizIds: [q('m',7,'p',1,1), q('m',7,'p',1,2)] }
                    ] }
            ],
            8: [
                { id: 'aljabar-8', title: 'Faktorisasi Aljabar', tryoutQuizId: qTryout('m', 8, 'a'),
                    subMaterials: [
                        { id: 'sm8a1', title: 'Faktor Persekutuan', quizIds: [q('m',8,'a',1,1), q('m',8,'a',1,2)] },
                        { id: 'sm8a2', title: 'Selisih Dua Kuadrat', quizIds: [q('m',8,'a',2,1), q('m',8,'a',2,2)] }
                    ] },
                { id: 'lingkaran-8', title: 'Lingkaran', tryoutQuizId: qTryout('m', 8, 'l'),
                    subMaterials: [
                        { id: 'sm8l1', title: 'Unsur-unsur Lingkaran', quizIds: [q('m',8,'l',1,1), q('m',8,'l',1,2)] },
                        { id: 'sm8l2', title: 'Luas dan Keliling', quizIds: [q('m',8,'l',2,1)] }
                    ] },
                { id: 'bangun-ruang-8', title: 'Bangun Ruang Sisi Datar', tryoutQuizId: qTryout('m', 8, 'r'),
                    subMaterials: [
                        { id: 'sm8r1', title: 'Kubus dan Balok', quizIds: [q('m',8,'r',1,1), q('m',8,'r',1,2)] },
                        { id: 'sm8r2', title: 'Prisma dan Limas', quizIds: [q('m',8,'r',2,1)] }
                    ] },
                { id: 'persamaan-8', title: 'Persamaan Linear', tryoutQuizId: qTryout('m', 8, 'p'),
                    subMaterials: [
                        { id: 'sm8p1', title: 'Persamaan Linear Satu Variabel', quizIds: [q('m',8,'p',1,1), q('m',8,'p',1,2)] }
                    ] }
            ],
            9: [
                { id: 'persamaan-kuadrat-9', title: 'Persamaan Kuadrat', tryoutQuizId: qTryout('m', 9, 'k'),
                    subMaterials: [
                        { id: 'sm9k1', title: 'Bentuk Umum dan Akar-akar', quizIds: [q('m',9,'k',1,1), q('m',9,'k',1,2)] },
                        { id: 'sm9k2', title: 'Menyelesaikan Persamaan Kuadrat', quizIds: [q('m',9,'k',2,1), q('m',9,'k',2,2)] }
                    ] },
                { id: 'fungsi-kuadrat-9', title: 'Fungsi Kuadrat', tryoutQuizId: qTryout('m', 9, 'f'),
                    subMaterials: [
                        { id: 'sm9f1', title: 'Grafik Fungsi Kuadrat', quizIds: [q('m',9,'f',1,1), q('m',9,'f',1,2)] }
                    ] },
                { id: 'transformasi-9', title: 'Transformasi Geometri', tryoutQuizId: qTryout('m', 9, 't'),
                    subMaterials: [
                        { id: 'sm9t1', title: 'Refleksi dan Translasi', quizIds: [q('m',9,'t',1,1), q('m',9,'t',1,2)] },
                        { id: 'sm9t2', title: 'Rotasi dan Dilatasi', quizIds: [q('m',9,'t',2,1)] }
                    ] }
            ]
        },
        ppkn: {
            7: [
                { id: 'pancasila-7', title: 'Pancasila sebagai Dasar Negara', tryoutQuizId: qTryout('p', 7, 'a'),
                    subMaterials: [
                        { id: 'pp7a1', title: 'Nilai-nilai Pancasila', quizIds: [q('p',7,'a',1,1), q('p',7,'a',1,2)] },
                        { id: 'pp7a2', title: 'Pengamalan dalam Kehidupan', quizIds: [q('p',7,'a',2,1), q('p',7,'a',2,2)] }
                    ] },
                { id: 'norma-7', title: 'Norma dan Hukum', tryoutQuizId: qTryout('p', 7, 'n'),
                    subMaterials: [
                        { id: 'pp7n1', title: 'Jenis-jenis Norma', quizIds: [q('p',7,'n',1,1), q('p',7,'n',1,2)] },
                        { id: 'pp7n2', title: 'Hukum dan Penegakannya', quizIds: [q('p',7,'n',2,1)] }
                    ] },
                { id: 'bhineka-7', title: 'Bhineka Tunggal Ika', tryoutQuizId: qTryout('p', 7, 'b'),
                    subMaterials: [
                        { id: 'pp7b1', title: 'Keragaman di Indonesia', quizIds: [q('p',7,'b',1,1), q('p',7,'b',1,2)] }
                    ] }
            ],
            8: [
                { id: 'konstitusi-8', title: 'Konstitusi Negara', tryoutQuizId: qTryout('p', 8, 'k'),
                    subMaterials: [
                        { id: 'pp8k1', title: 'UUD 1945', quizIds: [q('p',8,'k',1,1), q('p',8,'k',1,2)] },
                        { id: 'pp8k2', title: 'Amandemen UUD 1945', quizIds: [q('p',8,'k',2,1)] }
                    ] },
                { id: 'demokrasi-8', title: 'Demokrasi', tryoutQuizId: qTryout('p', 8, 'd'),
                    subMaterials: [
                        { id: 'pp8d1', title: 'Prinsip Demokrasi', quizIds: [q('p',8,'d',1,1), q('p',8,'d',1,2)] },
                        { id: 'pp8d2', title: 'Partisipasi Warga Negara', quizIds: [q('p',8,'d',2,1)] }
                    ] }
            ],
            9: [
                { id: 'globalisasi-9', title: 'Globalisasi', tryoutQuizId: qTryout('p', 9, 'g'),
                    subMaterials: [
                        { id: 'pp9g1', title: 'Dampak Globalisasi', quizIds: [q('p',9,'g',1,1), q('p',9,'g',1,2)] },
                        { id: 'pp9g2', title: 'Pengaruh terhadap NKRI', quizIds: [q('p',9,'g',2,1)] }
                    ] }
            ]
        },
        indonesia: {
            7: [
                { id: 'membaca-7', title: 'Membaca Pemahaman', tryoutQuizId: qTryout('bi', 7, 'm'),
                    subMaterials: [
                        { id: 'bi7m1', title: 'Gagasan Utama dan Penjelas', quizIds: [q('bi',7,'m',1,1), q('bi',7,'m',1,2)] },
                        { id: 'bi7m2', title: 'Ringkasan dan Kesimpulan', quizIds: [q('bi',7,'m',2,1)] }
                    ] },
                { id: 'menulis-7', title: 'Menulis', tryoutQuizId: qTryout('bi', 7, 'n'),
                    subMaterials: [
                        { id: 'bi7n1', title: 'Paragraf Deskripsi', quizIds: [q('bi',7,'n',1,1), q('bi',7,'n',1,2)] },
                        { id: 'bi7n2', title: 'Paragraf Narasi', quizIds: [q('bi',7,'n',2,1)] }
                    ] },
                { id: 'sastra-7', title: 'Apresiasi Sastra', tryoutQuizId: qTryout('bi', 7, 's'),
                    subMaterials: [
                        { id: 'bi7s1', title: 'Unsur Cerpen', quizIds: [q('bi',7,'s',1,1), q('bi',7,'s',1,2)] }
                    ] }
            ],
            8: [
                { id: 'teks-8', title: 'Teks Eksposisi', tryoutQuizId: qTryout('bi', 8, 't'),
                    subMaterials: [
                        { id: 'bi8t1', title: 'Struktur Teks Eksposisi', quizIds: [q('bi',8,'t',1,1), q('bi',8,'t',1,2)] },
                        { id: 'bi8t2', title: 'Menulis Eksposisi', quizIds: [q('bi',8,'t',2,1)] }
                    ] },
                { id: 'puisi-8', title: 'Puisi', tryoutQuizId: qTryout('bi', 8, 'p'),
                    subMaterials: [
                        { id: 'bi8p1', title: 'Unsur Pembangun Puisi', quizIds: [q('bi',8,'p',1,1), q('bi',8,'p',1,2)] }
                    ] }
            ],
            9: [
                { id: 'argumentasi-9', title: 'Teks Argumentasi', tryoutQuizId: qTryout('bi', 9, 'a'),
                    subMaterials: [
                        { id: 'bi9a1', title: 'Struktur Argumentasi', quizIds: [q('bi',9,'a',1,1), q('bi',9,'a',1,2)] },
                        { id: 'bi9a2', title: 'Fakta dan Opini', quizIds: [q('bi',9,'a',2,1)] }
                    ] }
            ]
        },
        english: {
            7: [
                { id: 'reading-7', title: 'Reading Comprehension', tryoutQuizId: qTryout('en', 7, 'r'),
                    subMaterials: [
                        { id: 'en7r1', title: 'Simple Present Tense', quizIds: [q('en',7,'r',1,1), q('en',7,'r',1,2)] },
                        { id: 'en7r2', title: 'Vocabulary in Context', quizIds: [q('en',7,'r',2,1)] }
                    ] },
                { id: 'writing-7', title: 'Descriptive Text', tryoutQuizId: qTryout('en', 7, 'w'),
                    subMaterials: [
                        { id: 'en7w1', title: 'Describing People and Things', quizIds: [q('en',7,'w',1,1), q('en',7,'w',1,2)] }
                    ] },
                { id: 'speaking-7', title: 'Expressions', tryoutQuizId: qTryout('en', 7, 's'),
                    subMaterials: [
                        { id: 'en7s1', title: 'Greetings and Introductions', quizIds: [q('en',7,'s',1,1), q('en',7,'s',1,2)] }
                    ] }
            ],
            8: [
                { id: 'recount-8', title: 'Recount Text', tryoutQuizId: qTryout('en', 8, 'r'),
                    subMaterials: [
                        { id: 'en8r1', title: 'Simple Past Tense', quizIds: [q('en',8,'r',1,1), q('en',8,'r',1,2)] },
                        { id: 'en8r2', title: 'Structure of Recount', quizIds: [q('en',8,'r',2,1)] }
                    ] },
                { id: 'procedure-8', title: 'Procedure Text', tryoutQuizId: qTryout('en', 8, 'p'),
                    subMaterials: [
                        { id: 'en8p1', title: 'Imperative and Sequence', quizIds: [q('en',8,'p',1,1), q('en',8,'p',1,2)] }
                    ] }
            ],
            9: [
                { id: 'narrative-9', title: 'Narrative Text', tryoutQuizId: qTryout('en', 9, 'n'),
                    subMaterials: [
                        { id: 'en9n1', title: 'Story Structure', quizIds: [q('en',9,'n',1,1), q('en',9,'n',1,2)] },
                        { id: 'en9n2', title: 'Past Continuous', quizIds: [q('en',9,'n',2,1)] }
                    ] }
            ]
        },
        senibudaya: {
            7: [
                { id: 'rupa-7', title: 'Seni Rupa', tryoutQuizId: qTryout('sb', 7, 'r'),
                    subMaterials: [
                        { id: 'sb7r1', title: 'Unsur-unsur Seni Rupa', quizIds: [q('sb',7,'r',1,1), q('sb',7,'r',1,2)] },
                        { id: 'sb7r2', title: 'Teknik Menggambar', quizIds: [q('sb',7,'r',2,1)] }
                    ] },
                { id: 'musik-7', title: 'Seni Musik', tryoutQuizId: qTryout('sb', 7, 'm'),
                    subMaterials: [
                        { id: 'sb7m1', title: 'Unsur Musik dan Notasi', quizIds: [q('sb',7,'m',1,1), q('sb',7,'m',1,2)] }
                    ] },
                { id: 'tari-7', title: 'Seni Tari', tryoutQuizId: qTryout('sb', 7, 't'),
                    subMaterials: [
                        { id: 'sb7t1', title: 'Gerak dan Iringan Tari', quizIds: [q('sb',7,'t',1,1), q('sb',7,'t',1,2)] }
                    ] }
            ],
            8: [
                { id: 'rupa-8', title: 'Seni Rupa Terapan', tryoutQuizId: qTryout('sb', 8, 'r'),
                    subMaterials: [
                        { id: 'sb8r1', title: 'Ragam Karya Seni Rupa', quizIds: [q('sb',8,'r',1,1), q('sb',8,'r',1,2)] }
                    ] },
                { id: 'teater-8', title: 'Teater', tryoutQuizId: qTryout('sb', 8, 't'),
                    subMaterials: [
                        { id: 'sb8t1', title: 'Unsur Pementasan', quizIds: [q('sb',8,'t',1,1), q('sb',8,'t',1,2)] }
                    ] }
            ],
            9: [
                { id: 'apresiasi-9', title: 'Apresiasi Seni', tryoutQuizId: qTryout('sb', 9, 'a'),
                    subMaterials: [
                        { id: 'sb9a1', title: 'Kritik Seni', quizIds: [q('sb',9,'a',1,1), q('sb',9,'a',1,2)] },
                        { id: 'sb9a2', title: 'Pameran Seni', quizIds: [q('sb',9,'a',2,1)] }
                    ] }
            ]
        }
    };

    function getChapters(subjectId, classLevel) {
        var subject = MATERIALS[subjectId];
        if (!subject) return [];
        var level = Number(classLevel) || 7;
        return subject[level] || [];
    }

    function getSubMaterials(subjectId, classLevel) {
        var chapters = getChapters(subjectId, classLevel);
        var out = [];
        chapters.forEach(function (ch) {
            (ch.subMaterials || []).forEach(function (sm) {
                out.push({
                    chapterId: ch.id,
                    chapterTitle: ch.title,
                    subMaterialId: sm.id,
                    title: sm.title,
                    quizIds: sm.quizIds || [],
                    tryoutQuizId: ch.tryoutQuizId
                });
            });
        });
        return out;
    }

    function getAllQuizIdsForSubject(subjectId, classLevel) {
        var chapters = getChapters(subjectId, classLevel);
        var ids = [];
        chapters.forEach(function (ch) {
            (ch.subMaterials || []).forEach(function (sm) {
                (sm.quizIds || []).forEach(function (qid) { ids.push(qid); });
                if (ch.tryoutQuizId) ids.push(ch.tryoutQuizId);
            });
        });
        return ids.filter(function (id, i, arr) { return arr.indexOf(id) === i; });
    }

    global.EDU_MATERIALS = {
        getChapters: getChapters,
        getSubMaterials: getSubMaterials,
        getAllQuizIdsForSubject: getAllQuizIdsForSubject,
        MATERIALS: MATERIALS
    };
})(typeof window !== 'undefined' ? window : this);
