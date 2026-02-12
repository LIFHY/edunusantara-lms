/**
 * EduNusantara LMS - Quiz Battle (Tic Tac Toe + Soal)
 * Pilih mapel, jawab benar untuk isi kotak. Lawan BOT. Skor dicatat ke leaderboard.
 */
(function (global) {
    'use strict';

    var board = [];
    var currentTurn = 'X';
    var scoreX = 0;
    var scoreO = 0;
    var currentSubjectId = 'matematika';
    var currentClassLevel = 7;
    var questionPool = [];
    var currentQuestion = null;
    var onGameEnd = null;

    function getBoardEl() { return document.getElementById('battle-board'); }
    function getQuestionArea() { return document.getElementById('battle-question-area'); }
    function getResultArea() { return document.getElementById('battle-result-area'); }
    function getTurnEl() { return document.getElementById('current-turn'); }
    function getScoreEl() { return document.getElementById('battle-score'); }

    function renderBoard() {
        var el = getBoardEl();
        if (!el) return;
        el.innerHTML = '';
        for (var i = 0; i < 9; i++) {
            var cell = document.createElement('div');
            cell.className = 'battle-cell';
            cell.dataset.index = i;
            cell.textContent = board[i] || '';
            if (!board[i]) {
                cell.addEventListener('click', function () { handleCellClick(parseInt(this.dataset.index, 10)); });
            }
            el.appendChild(cell);
        }
    }

    function showQuestion(callback) {
        var area = getQuestionArea();
        if (!area || !currentQuestion) {
            if (callback) callback(false);
            return;
        }
        var q = currentQuestion;
        var html = '<div class="battle-question-box"><h4>' + q.question + '</h4><div class="battle-options">';
        (q.options || []).forEach(function (opt, idx) {
            html += '<button type="button" class="btn battle-option" data-idx="' + idx + '">' + opt + '</button>';
        });
        html += '</div></div>';
        area.innerHTML = html;
        area.querySelectorAll('.battle-option').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(this.dataset.idx, 10);
                var correct = idx === q.correctIndex;
                area.innerHTML = correct ? '<p class="correct-answer">Benar!</p>' : '<p class="wrong-answer">Salah. Jawaban: ' + (q.options[q.correctIndex] || '') + '</p>';
                setTimeout(function () {
                    if (callback) callback(correct);
                }, 800);
            });
        });
    }

    function pickNextQuestion() {
        if (questionPool.length === 0 && typeof EDU_QUIZZES !== 'undefined') {
            questionPool = EDU_QUIZZES.getRandomForSubject(currentSubjectId, currentClassLevel, 15);
        }
        if (questionPool.length === 0) {
            currentQuestion = { question: 'Pilih jawaban yang benar.', options: ['A', 'B', 'C', 'D'], correctIndex: 0 };
            return;
        }
        currentQuestion = questionPool.shift();
    }

    function handleCellClick(index) {
        if (currentTurn !== 'X' || board[index]) return;
        pickNextQuestion();
        showQuestion(function (correct) {
            if (correct) {
                board[index] = 'X';
                scoreX += 10;
                renderBoard();
                updateScoreDisplay();
                checkWinner();
                if (getBoardEl() && !document.querySelector('.battle-result-area .game-over')) {
                    currentTurn = 'O';
                    if (getTurnEl()) getTurnEl().textContent = 'O (Bot)';
                    setTimeout(botTurn, 600);
                }
            }
        });
    }

    function botTurn() {
        if (currentTurn !== 'O' || typeof EDU_BOT === 'undefined') return;
        var move = EDU_BOT.chooseMove(board);
        if (move === -1) return;
        pickNextQuestion();
        showQuestion(function (correct) {
            if (correct) {
                board[move] = 'O';
                scoreO += 10;
            } else {
                var empty = EDU_BOT.getEmptyIndices(board);
                if (empty.length > 0) {
                    var fallback = empty[Math.floor(Math.random() * empty.length)];
                    board[fallback] = 'O';
                    scoreO += 5;
                }
            }
            renderBoard();
            updateScoreDisplay();
            checkWinner();
            currentTurn = 'X';
            if (getTurnEl()) getTurnEl().textContent = 'X (Kamu)';
        });
    }

    function checkWinner() {
        var lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (var i = 0; i < lines.length; i++) {
            var a = lines[i][0], b = lines[i][1], c = lines[i][2];
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                endGame(board[a] === 'X' ? 'player' : 'bot');
                return;
            }
        }
        if (getEmptyIndices().length === 0) endGame('draw');
    }

    function getEmptyIndices() {
        var out = [];
        for (var i = 0; i < 9; i++) if (!board[i]) out.push(i);
        return out;
    }

    function endGame(winner) {
        var resultArea = getResultArea();
        if (resultArea) {
            var msg = winner === 'player' ? 'Kamu menang!' : winner === 'bot' ? 'Bot menang!' : 'Seri!';
            resultArea.innerHTML = '<div class="game-over"><h3>' + msg + '</h3><p>Skor: ' + scoreX + ' - ' + scoreO + '</p><button type="button" class="btn btn-game" onclick="window.EDU_QUIZ_BATTLE.start()">Main Lagi</button></div>';
        }
        var user = typeof EDU_AUTH !== 'undefined' && EDU_AUTH.getCurrentUser();
        if (user && typeof EDU_SCORE_ENGINE !== 'undefined') {
            EDU_SCORE_ENGINE.recordAndLeaderboard(user.id, user.nama, 'quiz-battle', currentSubjectId, scoreX);
        }
        if (typeof onGameEnd === 'function') onGameEnd({ winner: winner, scoreX: scoreX, scoreO: scoreO });
    }

    function updateScoreDisplay() {
        var el = getScoreEl();
        if (el) el.textContent = scoreX + ' - ' + scoreO;
    }

    function start(options) {
        options = options || {};
        currentSubjectId = options.subjectId || 'matematika';
        currentClassLevel = options.classLevel || 7;
        if (typeof EDU_QUIZZES !== 'undefined') {
            questionPool = EDU_QUIZZES.getRandomForSubject(currentSubjectId, currentClassLevel, 15);
        }
        board = [ '', '', '', '', '', '', '', '', '' ];
        currentTurn = 'X';
        scoreX = 0;
        scoreO = 0;
        getResultArea().innerHTML = '';
        getQuestionArea().innerHTML = '<p>Pilih kotak lalu jawab soal untuk mengisi.</p>';
        if (getTurnEl()) getTurnEl().textContent = 'X (Kamu)';
        updateScoreDisplay();
        renderBoard();
    }

    global.EDU_QUIZ_BATTLE = {
        start: start,
        setOnGameEnd: function (fn) { onGameEnd = fn; }
    };
})(typeof window !== 'undefined' ? window : this);
