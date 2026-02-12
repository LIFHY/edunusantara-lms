/**
 * EduNusantara LMS - Skema & default data user (pelajar)
 * Data disimpan di localStorage via storage.js; ini hanya definisi.
 */
(function (global) {
    'use strict';

    var AVATAR_OPTIONS = ['👨\u200d🎓', '👩\u200d🎓', '🧑\u200d🎓', '😊', '🌟', '📚', '🎯', '🏆'];

    function createDefaultUser(overrides) {
        return Object.assign({
            id: 'user_' + Date.now(),
            nama: 'Siswa EduNusantara',
            kelas: 7,
            avatar: AVATAR_OPTIONS[0],
            createdAt: new Date().toISOString(),
            // Progress per mapel disimpan terpisah di progress (quiz completion)
            // Riwayat game & skor di leaderboard / gameHistory
            gameHistory: []
        }, overrides || {});
    }

    function getAvatarOptions() {
        return AVATAR_OPTIONS.slice();
    }

    global.EDU_USERS = {
        createDefaultUser: createDefaultUser,
        getAvatarOptions: getAvatarOptions
    };
})(typeof window !== 'undefined' ? window : this);
