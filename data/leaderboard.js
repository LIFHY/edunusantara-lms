/**
 * EduNusantara LMS - Leaderboard (skor Fun Games)
 * Data real dari gameplay: userId, gameType, mapel, score, timestamp.
 */
(function (global) {
    'use strict';

    var STORAGE_KEY = 'edunusantara_leaderboard';

    function getEntries() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function addEntry(entry) {
        var list = getEntries();
        list.push({
            userId: entry.userId,
            userName: entry.userName || 'Siswa',
            gameType: entry.gameType,
            subjectId: entry.subjectId || null,
            score: entry.score,
            timestamp: new Date().toISOString()
        });
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            return true;
        } catch (e) {
            return false;
        }
    }

    function getTopScores(limit, period) {
        var list = getEntries();
        var now = Date.now();
        var periodMs = { weekly: 7 * 24 * 60 * 60 * 1000, monthly: 30 * 24 * 60 * 60 * 1000, alltime: Infinity };
        var ms = periodMs[period] || periodMs.alltime;
        var filtered = list.filter(function (e) { return now - new Date(e.timestamp).getTime() <= ms; });
        var byUser = {};
        filtered.forEach(function (e) {
            var key = e.userId;
            if (!byUser[key]) byUser[key] = { userId: e.userId, userName: e.userName, totalScore: 0, gamesPlayed: 0 };
            byUser[key].totalScore += e.score;
            byUser[key].gamesPlayed += 1;
        });
        var sorted = Object.values(byUser).sort(function (a, b) { return b.totalScore - a.totalScore; });
        return sorted.slice(0, limit || 20);
    }

    function getRankForUser(userId, period) {
        var top = getTopScores(999, period || 'alltime');
        var idx = top.findIndex(function (e) { return e.userId === userId; });
        return idx === -1 ? null : idx + 1;
    }

    global.EDU_LEADERBOARD = {
        getEntries: getEntries,
        addEntry: addEntry,
        getTopScores: getTopScores,
        getRankForUser: getRankForUser,
        STORAGE_KEY: STORAGE_KEY
    };
})(typeof window !== 'undefined' ? window : this);
