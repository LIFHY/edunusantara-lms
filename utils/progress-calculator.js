/**
 * EduNusantara LMS - Perhitungan progress REAL dari quiz yang selesai
 * Progress TIDAK dari membuka halaman, hanya dari quiz selesai.
 * progress = (quizSelesai / totalQuiz) * 100
 * Mapel 100% = semua sub materi selesai + tryout dikerjakan.
 */
(function (global) {
    'use strict';

    function getSubMaterialProgress(completedQuizIds, quizIds) {
        if (!quizIds || quizIds.length === 0) return 100;
        var done = quizIds.filter(function (id) { return completedQuizIds.indexOf(id) !== -1; }).length;
        return Math.round((done / quizIds.length) * 100);
    }

    function getChapterProgress(completedQuizIds, chapter) {
        var total = 0, done = 0;
        (chapter.subMaterials || []).forEach(function (sm) {
            var ids = sm.quizIds || [];
            total += ids.length;
            ids.forEach(function (qid) {
                if (completedQuizIds.indexOf(qid) !== -1) done++;
            });
        });
        if (chapter.tryoutQuizId) {
            total += 1;
            if (completedQuizIds.indexOf(chapter.tryoutQuizId) !== -1) done += 1;
        }
        if (total === 0) return 100;
        return Math.round((done / total) * 100);
    }

    function getSubjectProgress(userId, subjectId, classLevel) {
        if (typeof EDU_PROGRESS_STORAGE === 'undefined' || typeof EDU_MATERIALS === 'undefined') return 0;
        var data = EDU_PROGRESS_STORAGE.getProgressForUser(userId);
        var completed = data.completedQuizIds || [];
        var chapters = EDU_MATERIALS.getChapters(subjectId, classLevel);
        if (chapters.length === 0) return 0;
        var completedChapters = 0;
        chapters.forEach(function (ch) {
            var allSubDone = true;
            (ch.subMaterials || []).forEach(function (sm) {
                var pct = getSubMaterialProgress(completed, sm.quizIds || []);
                if (pct !== 100) allSubDone = false;
            });
            var tryoutDone = !ch.tryoutQuizId || completed.indexOf(ch.tryoutQuizId) !== -1;
            if (allSubDone && tryoutDone) completedChapters += 1;
        });
        return Math.round((completedChapters / chapters.length) * 100);
    }

    function getAllSubjectsProgress(userId, classLevel) {
        if (typeof EDU_SUBJECTS === 'undefined') return {};
        var ids = EDU_SUBJECTS.SUBJECT_IDS || ['matematika', 'ppkn', 'indonesia', 'english', 'senibudaya'];
        var out = {};
        ids.forEach(function (id) {
            out[id] = getSubjectProgress(userId, id, classLevel);
        });
        return out;
    }

    function getOverallProgress(userId, classLevel) {
        var perSubject = getAllSubjectsProgress(userId, classLevel);
        var ids = Object.keys(perSubject);
        if (ids.length === 0) return 0;
        var sum = ids.reduce(function (acc, id) { return acc + perSubject[id]; }, 0);
        return Math.round(sum / ids.length);
    }

    /** Progress per bab dan per sub materi untuk ditampilkan di UI */
    function getProgressPerMateri(userId, subjectId, classLevel) {
        if (typeof EDU_PROGRESS_STORAGE === 'undefined' || typeof EDU_MATERIALS === 'undefined') return [];
        var data = EDU_PROGRESS_STORAGE.getProgressForUser(userId);
        var completed = data.completedQuizIds || [];
        var chapters = EDU_MATERIALS.getChapters(subjectId, classLevel);
        var result = [];
        chapters.forEach(function (ch) {
            var chapterDone = 0;
            var chapterTotal = 0;
            var subProgress = [];
            (ch.subMaterials || []).forEach(function (sm) {
                var ids = sm.quizIds || [];
                var pct = getSubMaterialProgress(completed, ids);
                var done = ids.filter(function (id) { return completed.indexOf(id) !== -1; }).length;
                chapterTotal += ids.length;
                chapterDone += done;
                subProgress.push({ id: sm.id, title: sm.title, progress: pct, done: done, total: ids.length, quizIds: ids });
            });
            if (ch.tryoutQuizId) {
                chapterTotal += 1;
                if (completed.indexOf(ch.tryoutQuizId) !== -1) chapterDone += 1;
            }
            var chapterPct = chapterTotal ? Math.round((chapterDone / chapterTotal) * 100) : 0;
            result.push({
                id: ch.id,
                title: ch.title,
                progress: chapterPct,
                tryoutQuizId: ch.tryoutQuizId,
                tryoutDone: !ch.tryoutQuizId || completed.indexOf(ch.tryoutQuizId) !== -1,
                subMaterials: subProgress
            });
        });
        return result;
    }

    global.EDU_PROGRESS_CALC = {
        getSubMaterialProgress: getSubMaterialProgress,
        getChapterProgress: getChapterProgress,
        getSubjectProgress: getSubjectProgress,
        getAllSubjectsProgress: getAllSubjectsProgress,
        getOverallProgress: getOverallProgress,
        getProgressPerMateri: getProgressPerMateri
    };
})(typeof window !== 'undefined' ? window : this);
