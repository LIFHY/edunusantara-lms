/**
 * EduNusantara LMS - Daftar Mata Pelajaran
 * Siap untuk diganti dengan API backend.
 */
(function (global) {
    'use strict';

    var SUBJECTS = [
        { id: 'matematika', name: 'Matematika', icon: 'calculator', color: 'math', slug: 'matematika' },
        { id: 'ppkn', name: 'PPKn', icon: 'landmark', color: 'ppkn', slug: 'ppkn' },
        { id: 'indonesia', name: 'Bahasa Indonesia', icon: 'book', color: 'indonesia', slug: 'bahasaindonesia' },
        { id: 'english', name: 'Bahasa Inggris', icon: 'language', color: 'english', slug: 'english' },
        { id: 'senibudaya', name: 'Seni Budaya', icon: 'palette', color: 'seni', slug: 'senibudaya' }
    ];

    function getAll() {
        return SUBJECTS.slice();
    }

    function getById(id) {
        return SUBJECTS.find(function (s) { return s.id === id; }) || null;
    }

    function getBySlug(slug) {
        return SUBJECTS.find(function (s) { return s.slug === slug; }) || null;
    }

    global.EDU_SUBJECTS = {
        getAll: getAll,
        getById: getById,
        getBySlug: getBySlug,
        SUBJECT_IDS: SUBJECTS.map(function (s) { return s.id; })
    };
})(typeof window !== 'undefined' ? window : this);
