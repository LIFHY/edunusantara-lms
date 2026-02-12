/**
 * EduNusantara LMS - Login & session pelajar (localStorage + sessionStorage)
 */
(function (global) {
    'use strict';

    var SESSION_KEY = 'edunusantara_session';
    var USER_KEY = 'edunusantara_current_user';

    function getCurrentUser() {
        try {
            var raw = localStorage.getItem(USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function setCurrentUser(user) {
        try {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            sessionStorage.setItem(SESSION_KEY, '1');
            return true;
        } catch (e) {
            return false;
        }
    }

    function isLoggedIn() {
        return !!getCurrentUser();
    }

    function logout() {
        try {
            localStorage.removeItem(USER_KEY);
            sessionStorage.removeItem(SESSION_KEY);
            return true;
        } catch (e) {
            return false;
        }
    }

    function requireLogin() {
        if (!isLoggedIn()) {
            var returnUrl = encodeURIComponent(window.location.href);
            window.location.replace('login.html?return=' + returnUrl);
            return false;
        }
        return true;
    }

    global.EDU_AUTH = {
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser,
        isLoggedIn: isLoggedIn,
        logout: logout,
        requireLogin: requireLogin
    };
})(typeof window !== 'undefined' ? window : this);
