/**
 * EduNusantara LMS - Penyimpanan localStorage (MVP)
 * Siap diganti dengan panggilan API backend.
 */
(function (global) {
    'use strict';

    var PREFIX = 'edunusantara_';

    function get(key) {
        try {
            var raw = localStorage.getItem(PREFIX + key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function set(key, value) {
        try {
            localStorage.setItem(PREFIX + key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    function remove(key) {
        try {
            localStorage.removeItem(PREFIX + key);
            return true;
        } catch (e) {
            return false;
        }
    }

    global.EDU_STORAGE = {
        get: get,
        set: set,
        remove: remove,
        PREFIX: PREFIX
    };
})(typeof window !== 'undefined' ? window : this);
