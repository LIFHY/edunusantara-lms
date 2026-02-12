/**
 * EduNusantara LMS - Speed Quiz (60 detik, soal random, skor kecepatan & akurasi)
 */
(function (global) {
    'use strict';

    var totalTime = 60;
    var remaining = 60;
    var timerInterval = null;
    var correctCount = 0;
    var wrongCount = 0;
    var score = 0;
    var questions = [];
    var currentIndex = 0;
    var onGameEnd = null;

    function getQuestionArea() { return document.getElementById('speed-question-area'); }
    function getTimerEl() { return document.getElementById('speed-timer-display'); }
    function getScoreEl() { return document.getElementById('speed-score-display'); }
    function getCorrectEl() { return document.getElementById('speed-correct-display'); }
    function getWrongEl() { return document.getElementById('speed-wrong-display'); }

    function showNextQuestion() {
        var area = getQuestionArea();
        if (!area) return;
        if (currentIndex >= questions.length || remaining <= 0) {
            endGame();
            return;
        }
        var q = questions[currentIndex];
        if (!q) {
            endGame();
            return;
        }
        var html = '<div class="speed-question-box"><h4>' + q.question + '</h4><div class="speed-options">';
        (q.options || []).forEach(function (opt, idx) {
            html += '<button type="button" class="btn speed-option" data-idx="' + idx + '">' + opt + '</button>';
        });
        html += '</div></div>';
        area.innerHTML = html;
        area.querySelectorAll('.speed-option').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(this.dataset.idx, 10);
                var correct = idx === q.correctIndex;
                if (correct) {
                    correctCount++;
                    var bonus = Math.min(20, Math.max(5, Math.floor(remaining / 3)));
                    score += 10 + bonus;
                } else {
                    wrongCount++;
                }
                if (getScoreEl()) getScoreEl().textContent = score;
                if (getCorrectEl()) getCorrectEl().textContent = correctCount;
                if (getWrongEl()) getWrongEl().textContent = wrongCount;
                currentIndex++;
                showNextQuestion();
            });
        });
    }

    function endGame() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = null;
        var area = getQuestionArea();
        if (area) {
            area.innerHTML = '<div class="game-over"><h3>Waktu habis!</h3><p>Skor: ' + score + ' | Benar: ' + correctCount + ' | Salah: ' + wrongCount + '</p><button type="button" class="btn btn-game" onclick="window.EDU_SPEED_QUIZ.start()">Main Lagi</button></div>';
        }
        var user = typeof EDU_AUTH !== 'undefined' && EDU_AUTH.getCurrentUser();
        if (user && typeof EDU_SCORE_ENGINE !== 'undefined') {
            EDU_SCORE_ENGINE.recordAndLeaderboard(user.id, user.nama, 'speed-quiz', null, score);
        }
        if (typeof onGameEnd === 'function') onGameEnd({ score: score, correct: correctCount, wrong: wrongCount });
    }

    function tick() {
        remaining--;
        if (getTimerEl()) getTimerEl().textContent = remaining + 's';
        if (remaining <= 0) endGame();
    }

    function start(options) {
        options = options || {};
        var subjectId = options.subjectId || 'matematika';
        var classLevel = options.classLevel || 7;
        if (typeof EDU_QUIZZES !== 'undefined') {
            questions = EDU_QUIZZES.getRandomForSubject(subjectId, classLevel, 30);
        } else {
            questions = [];
        }
        remaining = totalTime;
        correctCount = 0;
        wrongCount = 0;
        score = 0;
        currentIndex = 0;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(tick, 1000);
        if (getTimerEl()) getTimerEl().textContent = remaining + 's';
        if (getScoreEl()) getScoreEl().textContent = '0';
        if (getCorrectEl()) getCorrectEl().textContent = '0';
        if (getWrongEl()) getWrongEl().textContent = '0';
        showNextQuestion();
    }

    global.EDU_SPEED_QUIZ = {
        start: start,
        setOnGameEnd: function (fn) { onGameEnd = fn; }
    };
})(typeof window !== 'undefined' ? window : this);
