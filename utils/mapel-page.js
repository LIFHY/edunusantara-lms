/**
 * EduNusantara LMS - Render halaman mapel dengan progress per bab & per sub materi
 * Usage: EDU_MAPEL_PAGE.render('ppkn', 'ppkn-modules', 'ppkn-class-select');
 */
(function (global) {
    'use strict';

    function render(subjectId, containerId, classSelectId) {
        var container = document.getElementById(containerId);
        var classSelect = document.getElementById(classSelectId);
        var user = typeof EDU_AUTH !== 'undefined' ? EDU_AUTH.getCurrentUser() : null;
        var kelas = (user && user.kelas) ? user.kelas : 7;
        if (classSelect) {
            classSelect.value = String(kelas);
            classSelect.addEventListener('change', function () {
                kelas = parseInt(this.value, 10);
                doRender(subjectId, containerId, classSelectId, kelas, user);
            });
        }
        doRender(subjectId, containerId, classSelectId, kelas, user);
    }

    function doRender(subjectId, containerId, classSelectId, classLevel, user) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var perMateri = (typeof EDU_PROGRESS_CALC !== 'undefined' && user && EDU_PROGRESS_CALC.getProgressPerMateri)
            ? EDU_PROGRESS_CALC.getProgressPerMateri(user.id, subjectId, classLevel)
            : [];
        if (perMateri.length === 0 && typeof EDU_MATERIALS !== 'undefined') {
            var chs = EDU_MATERIALS.getChapters(subjectId, classLevel);
            perMateri = chs.map(function (ch) {
                return {
                    id: ch.id,
                    title: ch.title,
                    progress: 0,
                    tryoutQuizId: ch.tryoutQuizId,
                    tryoutDone: false,
                    subMaterials: (ch.subMaterials || []).map(function (sm) {
                        return { id: sm.id, title: sm.title, progress: 0, done: 0, total: (sm.quizIds || []).length, quizIds: sm.quizIds || [] };
                    })
                };
            });
        }
        var html = '';
        perMateri.forEach(function (bab, idx) {
            var modNum = idx + 1;
            html += '<div class="module-item" data-module="' + modNum + '">';
            html += '<div class="module-header" onclick="toggleModule(' + modNum + ')"><div class="module-title">';
            html += '<span class="module-number">' + modNum + '</span><h3>' + bab.title + '</h3></div>';
            html += '<span class="toggle-icon"><i class="fas fa-chevron-down"></i></span></div>';
            html += '<div class="module-content">';
            html += '<div class="chapter-progress-block">';
            html += '<h4>' + bab.title + ' <span class="chapter-pct">' + bab.progress + '%</span></h4>';
            (bab.subMaterials || []).forEach(function (sm) {
                html += '<div class="sub-materi-row">';
                html += '<span class="sub-title">' + sm.title + '</span>';
                html += '<div class="sub-bar"><div class="sub-bar-fill" style="width:' + sm.progress + '%"></div></div>';
                html += '<span class="sub-progress">' + sm.progress + '% (' + sm.done + '/' + sm.total + ')</span>';
                html += '<button type="button" class="btn-quiz-sm" onclick="openSubMaterialQuiz(\'' + subjectId + '\', [' + (sm.quizIds || []).map(function (q) { return "'" + q + "'"; }).join(',') + '], \'' + containerId + '\', \'' + classSelectId + '\')"><i class="fas fa-play"></i> Quiz</button>';
                html += '</div>';
            });
            html += '</div>';
            if (bab.tryoutQuizId) {
                html += '<div class="tryout-block" style="margin-top:0.75rem; padding:0.75rem; border:1px solid rgba(0,188,212,0.3); border-radius:8px;">';
                html += '<strong>Tryout Bab</strong> ' + (bab.tryoutDone ? '<span style="color:var(--success);"> ✓ Selesai</span>' : '');
                if (!bab.tryoutDone) html += ' <button type="button" class="btn-quiz-sm" onclick="openSubMaterialQuiz(\'' + subjectId + '\', [\'' + bab.tryoutQuizId + '\'], \'' + containerId + '\', \'' + classSelectId + '\')">Kerjakan Tryout</button>';
                html += '</div>';
            }
            html += '</div></div>';
        });
        container.innerHTML = html || '<p>Belum ada materi untuk kelas ini.</p>';
    }

    function openSubMaterialQuiz(subjectId, quizIds, containerId, classSelectId) {
        if (!quizIds || quizIds.length === 0) return;
        var modal = document.getElementById('quiz-modal');
        var container = document.getElementById('quiz-container');
        if (!modal || !container) return;
        var user = typeof EDU_AUTH !== 'undefined' ? EDU_AUTH.getCurrentUser() : null;
        var idx = 0;
        var correctCount = 0;
        function showNext() {
            if (idx >= quizIds.length) {
                container.innerHTML = '<div class="quiz-modal-body"><h3>Selesai!</h3><p>Benar: ' + correctCount + '/' + quizIds.length + '</p><button type="button" class="btn-course" onclick="closeQuiz()">Tutup</button></div>';
                if (containerId && classSelectId && typeof EDU_MAPEL_PAGE !== 'undefined') {
                    var sel = document.getElementById(classSelectId);
                    if (sel) EDU_MAPEL_PAGE.render(subjectId, containerId, classSelectId);
                }
                return;
            }
            var quizId = quizIds[idx];
            var q = typeof EDU_QUIZZES !== 'undefined' ? EDU_QUIZZES.getById(quizId) : null;
            if (!q) { idx++; showNext(); return; }
            container.innerHTML = '<div class="quiz-modal-body"><h4>' + q.question + '</h4><div class="quiz-options"></div></div>';
            var opts = container.querySelector('.quiz-options');
            (q.options || []).forEach(function (opt, i) {
                var btn = document.createElement('button');
                btn.className = 'btn-course';
                btn.style.marginRight = '8px';
                btn.textContent = opt;
                btn.onclick = function () {
                    if (i === q.correctIndex) correctCount++;
                    if (user && typeof EDU_PROGRESS_STORAGE !== 'undefined') EDU_PROGRESS_STORAGE.addCompletedQuiz(user.id, quizId);
                    idx++;
                    showNext();
                };
                opts.appendChild(btn);
            });
        }
        showNext();
        modal.classList.add('show');
    }

    global.EDU_MAPEL_PAGE = {
        render: render,
        openSubMaterialQuiz: openSubMaterialQuiz
    };
    global.openSubMaterialQuiz = function (subjectId, quizIds, containerId, classSelectId) {
        EDU_MAPEL_PAGE.openSubMaterialQuiz(subjectId, quizIds, containerId, classSelectId);
    };
})(typeof window !== 'undefined' ? window : this);
