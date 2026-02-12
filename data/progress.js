/**
 * EduNusantara LMS - Skema penyimpanan progress pembelajaran
 * Progress HANYA dari quiz yang diselesaikan (quizIds completed per user).
 * Dibaca oleh progress-calculator.js untuk hitung % per sub materi & mapel.
 */
(function (global) {
    'use strict';

    var STORAGE_KEY = 'edunusantara_progress';

    function getProgressForUser(userId) {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return {};
            var all = JSON.parse(raw);
            return all[userId] || { completedQuizIds: [], lastUpdated: null };
        } catch (e) {
            return { completedQuizIds: [], lastUpdated: null };
        }
    }

    function setProgressForUser(userId, data) {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            var all = raw ? JSON.parse(raw) : {};
            data.lastUpdated = new Date().toISOString();
            all[userId] = data;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
            return true;
        } catch (e) {
            return false;
        }
    }

    function addCompletedQuiz(userId, quizId) {
        var data = getProgressForUser(userId);
        var ids = data.completedQuizIds || [];
        if (ids.indexOf(quizId) === -1) ids.push(quizId);
        data.completedQuizIds = ids;
        return setProgressForUser(userId, data);
    }

    function isQuizCompleted(userId, quizId) {
        var data = getProgressForUser(userId);
        return (data.completedQuizIds || []).indexOf(quizId) !== -1;
    }

    global.EDU_PROGRESS_STORAGE = {
        getProgressForUser: getProgressForUser,
        setProgressForUser: setProgressForUser,
        addCompletedQuiz: addCompletedQuiz,
        isQuizCompleted: isQuizCompleted,
        STORAGE_KEY: STORAGE_KEY
    };
})(typeof window !== 'undefined' ? window : this);
