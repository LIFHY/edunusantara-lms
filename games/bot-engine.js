/**
 * EduNusantara LMS - Bot untuk Quiz Battle (Tic Tac Toe)
 * Bot memilih kotak secara acak atau blokir/menang jika mungkin.
 */
(function (global) {
    'use strict';

    var BOT_MARK = 'O';
    var PLAYER_MARK = 'X';

    function getEmptyIndices(board) {
        var out = [];
        for (var i = 0; i < 9; i++) {
            if (!board[i]) out.push(i);
        }
        return out;
    }

    function getWinningMove(board, mark) {
        var lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (var i = 0; i < lines.length; i++) {
            var a = lines[i][0], b = lines[i][1], c = lines[i][2];
            if (board[a] === mark && board[b] === mark && !board[c]) return c;
            if (board[a] === mark && !board[b] && board[c] === mark) return b;
            if (!board[a] && board[b] === mark && board[c] === mark) return a;
        }
        return -1;
    }

    function chooseMove(board) {
        var empty = getEmptyIndices(board);
        if (empty.length === 0) return -1;
        var win = getWinningMove(board, BOT_MARK);
        if (win !== -1) return win;
        var block = getWinningMove(board, PLAYER_MARK);
        if (block !== -1) return block;
        return empty[Math.floor(Math.random() * empty.length)];
    }

    global.EDU_BOT = {
        BOT_MARK: BOT_MARK,
        PLAYER_MARK: PLAYER_MARK,
        getEmptyIndices: getEmptyIndices,
        getWinningMove: getWinningMove,
        chooseMove: chooseMove
    };
})(typeof window !== 'undefined' ? window : this);
