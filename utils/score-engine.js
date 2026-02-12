/**
 * EduNusantara LMS - Pencatatan skor Fun Games & riwayat user
 */
(function (global) {
    'use strict';

    var GAME_HISTORY_KEY = 'edunusantara_game_history';

    function getGameHistory(userId) {
        try {
            var raw = localStorage.getItem(GAME_HISTORY_KEY);
            var all = raw ? JSON.parse(raw) : {};
            return all[userId] || [];
        } catch (e) {
            return [];
        }
    }

    function addGameRecord(userId, record) {
        var all = {};
        try {
            var raw = localStorage.getItem(GAME_HISTORY_KEY);
            if (raw) all = JSON.parse(raw);
        } catch (e) {}
        if (!all[userId]) all[userId] = [];
        all[userId].push({
            gameType: record.gameType,
            subjectId: record.subjectId || null,
            score: record.score,
            timestamp: new Date().toISOString()
        });
        try {
            localStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(all));
            return true;
        } catch (e) {
            return false;
        }
    }

    function getStatsByGameType(userId) {
        var history = getGameHistory(userId);
        var stats = { quizBattle: { played: 0, bestScore: 0 }, memoryMatch: { played: 0, bestTime: null }, speedQuiz: { played: 0, bestScore: 0 } };
        history.forEach(function (r) {
            var key = r.gameType === 'quiz-battle' ? 'quizBattle' : r.gameType === 'memory-match' ? 'memoryMatch' : 'speedQuiz';
            stats[key].played += 1;
            if (r.score != null) {
                if (key === 'quizBattle' || key === 'speedQuiz') {
                    if (r.score > stats[key].bestScore) stats[key].bestScore = r.score;
                }
                if (key === 'memoryMatch' && r.timeSec != null) {
                    if (stats[key].bestTime == null || r.timeSec < stats[key].bestTime) stats[key].bestTime = r.timeSec;
                }
            }
        });
        return stats;
    }

    function recordAndLeaderboard(userId, userName, gameType, subjectId, score, timeSec) {
        addGameRecord(userId, { gameType: gameType, subjectId: subjectId, score: score, timeSec: timeSec });
        if (typeof EDU_LEADERBOARD !== 'undefined') {
            EDU_LEADERBOARD.addEntry({ userId: userId, userName: userName || 'Siswa', gameType: gameType, subjectId: subjectId, score: score });
        }
    }

    global.EDU_SCORE_ENGINE = {
        getGameHistory: getGameHistory,
        addGameRecord: addGameRecord,
        getStatsByGameType: getStatsByGameType,
        recordAndLeaderboard: recordAndLeaderboard
    };
})(typeof window !== 'undefined' ? window : this);
