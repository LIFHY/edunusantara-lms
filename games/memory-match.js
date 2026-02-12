/**
 * EduNusantara LMS - Memory Match (cocokkan rumus-jawaban / kata-arti)
 * Pairs dari mapel. Skor & waktu dicatat.
 */
(function (global) {
    'use strict';

    var pairs = [];
    var flipped = [];
    var matched = 0;
    var moves = 0;
    var startTime = 0;
    var timerInterval = null;
    var onGameEnd = null;

    function getBoardEl() { return document.getElementById('memory-board'); }
    function getTimerEl() { return document.getElementById('memory-timer-display'); }
    function getMovesEl() { return document.getElementById('memory-moves-display'); }
    function getMatchedEl() { return document.getElementById('memory-matched-display'); }

    function buildPairsFromSubject(subjectId, classLevel) {
        var list = [];
        if (subjectId === 'matematika') {
            list = [
                { front: '2 + 3', back: '5' },
                { front: '2 × 3', back: '6' },
                { front: 'x + x', back: '2x' },
                { front: 'a × a', back: 'a²' },
                { front: '-5 + 3', back: '-2' },
                { front: '10 - (-4)', back: '14' },
                { front: '(-3) × 4', back: '-12' },
                { front: 'Konstanta 4x² - 3x + 7', back: '7' }
            ];
        } else {
            list = [
                { front: 'Sila 1', back: 'Ketuhanan' },
                { front: 'Sila 2', back: 'Kemanusiaan' },
                { front: 'Sila 3', back: 'Persatuan' },
                { front: 'Sila 4', back: 'Kerakyatan' },
                { front: 'Sila 5', back: 'Keadilan' },
                { front: 'Gagasan utama', back: 'Kalimat utama' },
                { front: 'Simple Present', back: 'Kebiasaan' },
                { front: 'Unsur seni rupa', back: 'Titik' }
            ];
        }
        var out = [];
        list.forEach(function (p, i) {
            out.push({ id: 'f-' + i, text: p.front, pairId: i });
            out.push({ id: 'b-' + i, text: p.back, pairId: i });
        });
        for (var j = out.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1));
            var t = out[j]; out[j] = out[k]; out[k] = t;
        }
        return out;
    }

    function renderBoard() {
        var el = getBoardEl();
        if (!el) return;
        el.innerHTML = '';
        pairs.forEach(function (card, index) {
            var div = document.createElement('div');
            div.className = 'memory-card';
            div.dataset.index = index;
            div.dataset.pairId = card.pairId;
            div.innerHTML = '<div class="memory-card-inner"><div class="memory-card-front">?</div><div class="memory-card-back">' + card.text + '</div></div>';
            div.addEventListener('click', function () { handleFlip(parseInt(this.dataset.index, 10)); });
            el.appendChild(div);
        });
    }

    function handleFlip(index) {
        if (flipped.length >= 2 || flipped.indexOf(index) !== -1) return;
        var card = pairs[index];
        if (!card) return;
        flipped.push(index);
        moves++;
        var el = getBoardEl();
        if (el) {
            var cell = el.children[index];
            if (cell) cell.classList.add('flipped');
        }
        if (getMovesEl()) getMovesEl().textContent = moves;
        if (flipped.length === 2) {
            var first = pairs[flipped[0]];
            var second = pairs[flipped[1]];
            if (first.pairId === second.pairId) {
                matched++;
                if (getMatchedEl()) getMatchedEl().textContent = matched + '/' + (pairs.length / 2);
                flipped = [];
                document.querySelectorAll('.memory-card.flipped').forEach(function (c) { c.classList.add('matched'); });
                if (matched === pairs.length / 2) endGame();
            } else {
                setTimeout(function () {
                    flipped.forEach(function (i) {
                        var cardEl = getBoardEl() && getBoardEl().children[i];
                        if (cardEl) cardEl.classList.remove('flipped');
                    });
                    flipped = [];
                }, 600);
            }
        }
    }

    function endGame() {
        if (timerInterval) clearInterval(timerInterval);
        var elapsed = Math.round((Date.now() - startTime) / 1000);
        var user = typeof EDU_AUTH !== 'undefined' && EDU_AUTH.getCurrentUser();
        if (user && typeof EDU_SCORE_ENGINE !== 'undefined') {
            EDU_SCORE_ENGINE.addGameRecord(user.id, { gameType: 'memory-match', score: matched * 50, timeSec: elapsed });
            if (typeof EDU_LEADERBOARD !== 'undefined') {
                EDU_LEADERBOARD.addEntry({ userId: user.id, userName: user.nama, gameType: 'memory-match', score: matched * 50 });
            }
        }
        if (typeof onGameEnd === 'function') onGameEnd({ moves: moves, timeSec: elapsed, matched: matched });
        var resultArea = document.getElementById('memory-match-area');
        if (resultArea) {
            var msg = document.createElement('div');
            msg.className = 'game-over';
            msg.innerHTML = '<h3>Selesai!</h3><p>Waktu: ' + elapsed + 's | Moves: ' + moves + '</p><button type="button" class="btn btn-game" onclick="window.EDU_MEMORY_MATCH.start()">Main Lagi</button>';
            resultArea.appendChild(msg);
        }
    }

    function start(options) {
        options = options || {};
        var subjectId = options.subjectId || 'matematika';
        var classLevel = options.classLevel || 7;
        pairs = buildPairsFromSubject(subjectId, classLevel);
        flipped = [];
        matched = 0;
        moves = 0;
        startTime = Date.now();
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(function () {
            var el = getTimerEl();
            if (el) el.textContent = Math.round((Date.now() - startTime) / 1000) + 's';
        }, 500);
        if (getTimerEl()) getTimerEl().textContent = '0s';
        if (getMovesEl()) getMovesEl().textContent = '0';
        if (getMatchedEl()) getMatchedEl().textContent = '0/' + (pairs.length / 2);
        document.querySelectorAll('#memory-match-area .game-over').forEach(function (n) { n.remove(); });
        renderBoard();
    }

    global.EDU_MEMORY_MATCH = {
        start: start,
        setOnGameEnd: function (fn) { onGameEnd = fn; }
    };
})(typeof window !== 'undefined' ? window : this);
