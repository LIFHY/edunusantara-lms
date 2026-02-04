// ===== DATA STORAGE =====

let appData = {
    currentClass: 7,
    progress: {
        matematika: { kelas7: 75, kelas8: 45, kelas9: 20 },
        indonesia: { kelas7: 50, kelas8: 30, kelas9: 10 },
        ipa: { kelas7: 90, kelas8: 60, kelas9: 35 },
        ips: { kelas7: 40, kelas8: 25, kelas9: 15 },
        english: { kelas7: 65, kelas8: 40, kelas9: 15 },
        ppkn: { kelas7: 30, kelas8: 20, kelas9: 10 },
        senibudaya: { kelas7: 25, kelas8: 15, kelas9: 5 },
        pjok: { kelas7: 35, kelas8: 20, kelas9: 10 },
        prakarya: { kelas7: 20, kelas8: 10, kelas9: 5 },
        informatika: { kelas7: 85, kelas8: 60, kelas9: 40 }
    },
    completedLessons: {
        matematika: { kelas7: ['lesson-0', 'lesson-1', 'lesson-2'], kelas8: ['lesson-0'], kelas9: [] },
        indonesia: { kelas7: ['lesson-0', 'lesson-1'], kelas8: [], kelas9: [] },
        ipa: { kelas7: ['lesson-0', 'lesson-1', 'lesson-2', 'lesson-3'], kelas8: ['lesson-0', 'lesson-1'], kelas9: [] },
        ips: { kelas7: ['lesson-0'], kelas8: [], kelas9: [] },
        english: { kelas7: ['lesson-0', 'lesson-1'], kelas8: [], kelas9: [] },
        ppkn: { kelas7: ['lesson-0'], kelas8: [], kelas9: [] },
        senibudaya: { kelas7: ['lesson-0'], kelas8: [], kelas9: [] },
        pjok: { kelas7: ['lesson-0'], kelas8: [], kelas9: [] },
        prakarya: { kelas7: [], kelas8: [], kelas9: [] },
        informatika: { kelas7: ['lesson-0', 'lesson-1', 'lesson-2', 'lesson-3'], kelas8: ['lesson-0', 'lesson-1'], kelas9: [] }
    },
    quizScores: {
        matematika: { kelas7: 85, kelas8: null, kelas9: null },
        indonesia: { kelas7: 70, kelas8: null, kelas9: null },
        ipa: { kelas7: 95, kelas8: null, kelas9: null },
        ips: { kelas7: 60, kelas8: null, kelas9: null },
        english: { kelas7: 75, kelas8: null, kelas9: null },
        ppkn: { kelas7: 55, kelas8: null, kelas9: null },
        senibudaya: { kelas7: null, kelas8: null, kelas9: null },
        pjok: { kelas7: null, kelas8: null, kelas9: null },
        prakarya: { kelas7: null, kelas8: null, kelas9: null },
        informatika: { kelas7: 90, kelas8: null, kelas9: null }
    },
    studyTime: 245,
    achievements: ['pemula', 'rajin'],
    streakDays: 7,
    lastStudyDate: new Date().toDateString(),
    gameStats: {
        quizBattle: { played: 15, bestScore: 950 },
        memoryMatch: { played: 20, bestTime: '01:25' },
        speedQuiz: { played: 25, bestScore: 880 }
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 EduNusantara SMP Platform Initialized');
    
    // Initialize with animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    loadData();
    highlightActiveNav();
    
    // Setup untuk semua halaman
    setupCommonFeatures();
    
    // Halaman spesifik initialization
    initializePage();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Setup performance monitoring
    setupPerformanceMonitoring();
});

function initializePage() {
    const currentPage = getCurrentPage();
    
    const pageInitializers = {
        'index': initializeDashboard,
        'matematika': () => initializeSubject('matematika'),
        'bahasaindonesia': () => initializeSubject('indonesia'),
        'ipa': () => initializeSubject('ipa'),
        'ips': () => initializeSubject('ips'),
        'english': () => initializeSubject('english'),
        'ppkn': () => initializeSubject('ppkn'),
        'senibudaya': () => initializeSubject('senibudaya'),
        'pjok': () => initializeSubject('pjok'),
        'prakarya': () => initializeSubject('prakarya'),
        'informatika': () => initializeSubject('informatika'),
        'fungames': initializeFunGames,
        'profile': initializeProfile
    };
    
    if (pageInitializers[currentPage]) {
        pageInitializers[currentPage]();
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page || 'index';
}

// ===== DATA MANAGEMENT =====
function loadData() {
    try {
        const saved = localStorage.getItem('edunusantara_smp_data_v2');
        if (saved) {
            const parsed = JSON.parse(saved);
            appData = { ...appData, ...parsed };
            console.log('📂 Data loaded from localStorage');
            showToast('Data berhasil dimuat', 'success');
        }
    } catch (error) {
        console.error('Error loading data:', error);
        showToast('Menggunakan data demo', 'warning');
    }
}

function saveData() {
    try {
        localStorage.setItem('edunusantara_smp_data_v2', JSON.stringify(appData));
        console.log('💾 Data saved to localStorage');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// ===== NAVIGATION ENHANCEMENTS =====
function highlightActiveNav() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if ((currentPage === 'index' || currentPage === '') && href === 'index.html') {
            link.classList.add('active');
        } else if (href && href.includes(currentPage + '.html')) {
            link.classList.add('active');
        }
    });
    
    // Mobile navigation highlighting
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        
        if (href && (href === 'index.html' && currentPage === 'index') || 
            (href && href.includes(currentPage + '.html'))) {
            item.classList.add('active');
        }
    });
}

function setupNavigationDropdowns() {
    // Mega menu hover effects
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const megaMenu = dropdown.querySelector('.mega-menu');
        if (!megaMenu) return;
        
        dropdown.addEventListener('mouseenter', () => {
            megaMenu.style.opacity = '1';
            megaMenu.style.visibility = 'visible';
            megaMenu.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            megaMenu.style.opacity = '0';
            megaMenu.style.visibility = 'hidden';
            megaMenu.style.transform = 'translateX(-50%) translateY(10px)';
        });
    });
    
    // Mobile dropdown toggle
    const mobileDropdownToggles = document.querySelectorAll('.mobile-nav-dropdown .dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.fa-chevron-down');
            
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            icon.style.transform = content.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
}

// ===== COMMON FEATURES - ENHANCED =====
function setupCommonFeatures() {
    // Setup enhanced navigation
    setupNavigationDropdowns();
    
    // Notification system
    setupNotificationSystem();
    
    // Theme system
    setupThemeSystem();
    
    // Class selection
    setupClassSelection();
    
    // Mobile navigation
    setupMobileNavigation();
    
    // Interactive elements
    setupInteractiveElements();
    
    // Hero animations
    setupHeroAnimations();
    
    // Performance optimizations
    setupPerformanceOptimizations();
    
    // Progress animations
    animateProgressBars();
}

function setupNotificationSystem() {
    const notificationBtn = document.getElementById('notification-btn');
    const notificationPanel = document.getElementById('notification-panel');
    const closeNotifications = document.getElementById('close-notifications');
    const markAllReadBtn = document.getElementById('mark-all-read');
    
    if (notificationBtn && notificationPanel) {
        // Enhanced toggle with animation
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationPanel.classList.toggle('show');
            
            if (notificationPanel.classList.contains('show')) {
                animateNotificationPanel();
                playSound('notification-open');
            }
        });
        
        if (closeNotifications) {
            closeNotifications.addEventListener('click', () => {
                notificationPanel.classList.remove('show');
                playSound('notification-close');
            });
        }
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
                notificationPanel.classList.remove('show');
            }
        });
        
        // Mark all as read
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', async () => {
                const notificationItems = document.querySelectorAll('.notification-item.new');
                
                notificationItems.forEach(item => {
                    item.classList.remove('new');
                    const unreadDot = item.querySelector('.notification-unread');
                    if (unreadDot) unreadDot.remove();
                });
                
                // Update badge
                updateNotificationBadge(0);
                
                // Show confirmation
                showToast('Semua notifikasi ditandai telah dibaca', 'success');
                playSound('success');
            });
        }
        
        // Mark individual as read
        document.addEventListener('click', (e) => {
            const notificationItem = e.target.closest('.notification-item');
            if (notificationItem && notificationItem.classList.contains('new')) {
                notificationItem.classList.remove('new');
                const unreadDot = notificationItem.querySelector('.notification-unread');
                if (unreadDot) unreadDot.remove();
                
                // Update badge
                const unreadCount = document.querySelectorAll('.notification-item.new').length;
                updateNotificationBadge(unreadCount);
            }
        });
    }
    
    // Auto-update notifications
    setInterval(updateNotifications, 60000);
}

function updateNotificationBadge(count) {
    const badge = document.getElementById('notification-count');
    if (!badge) return;
    
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    
    // Add animation for new notifications
    if (count > parseInt(badge.dataset.prevCount || 0)) {
        badge.classList.add('pulse');
        setTimeout(() => badge.classList.remove('pulse'), 1000);
    }
    
    badge.dataset.prevCount = count;
}

function animateNotificationPanel() {
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('slide-in');
    });
}

function setupThemeSystem() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('edunusantara_theme') || 'dark';
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        
        themeToggle.addEventListener('click', function() {
            const isLightMode = document.body.classList.toggle('light-mode');
            const icon = this.querySelector('i');
            
            if (isLightMode) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('edunusantara_theme', 'light');
                showToast('Mode terang diaktifkan', 'info');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('edunusantara_theme', 'dark');
                showToast('Mode gelap diaktifkan', 'info');
            }
            
            playSound('theme-toggle');
            saveData();
        });
    }
    
    // Add smooth transition for theme change
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

function setupClassSelection() {
    const classSelect = document.getElementById('class-select');
    const classCards = document.querySelectorAll('.class-card');
    const megaMenuClass = document.getElementById('mega-menu-class');
    
    if (classSelect) {
        classSelect.value = appData.currentClass;
        
        // Enhanced change handler
        classSelect.addEventListener('change', function() {
            const selectedClass = parseInt(this.value);
            appData.currentClass = selectedClass;
            
            // Update UI elements
            updateClassDisplay(selectedClass);
            
            // Animate change
            animateClassChange(selectedClass);
            
            // Update data
            saveData();
            updateDashboard();
            updateAllProgressBars();
            
            // Show feedback
            showToast(`Kelas ${selectedClass} dipilih`, 'success');
            playSound('class-change');
        });
    }
    
    // Class cards interaction
    classCards.forEach(card => {
        card.addEventListener('click', function() {
            const selectedClass = parseInt(this.dataset.class);
            
            if (selectedClass === appData.currentClass) return;
            
            appData.currentClass = selectedClass;
            
            // Update selector
            if (classSelect) classSelect.value = selectedClass;
            
            // Update active state with animation
            classCards.forEach(c => {
                c.classList.remove('active');
                c.style.transform = 'scale(0.95)';
            });
            
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            // Reset animation
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            updateClassDisplay(selectedClass);
            saveData();
            updateDashboard();
            updateAllProgressBars();
            
            showToast(`Berpindah ke Kelas ${selectedClass}`, 'success');
            playSound('click');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

function updateClassDisplay(selectedClass) {
    const classDisplay = document.getElementById('current-class-display');
    const megaMenuClass = document.getElementById('mega-menu-class');
    
    if (classDisplay) {
        classDisplay.textContent = `Kelas ${selectedClass}`;
        classDisplay.classList.add('updated');
        setTimeout(() => classDisplay.classList.remove('updated'), 500);
    }
    
    if (megaMenuClass) {
        megaMenuClass.textContent = selectedClass;
    }
}

function animateClassChange(selectedClass) {
    const elements = document.querySelectorAll('[data-class]');
    elements.forEach(el => {
        const elClass = parseInt(el.dataset.class);
        if (elClass === selectedClass) {
            el.style.animation = 'pulse 0.5s ease';
            setTimeout(() => el.style.animation = '', 500);
        }
    });
}

function setupMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-close');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.add('show');
            document.body.style.overflow = 'hidden';
            playSound('menu-open');
        });
        
        if (mobileClose) {
            mobileClose.addEventListener('click', function() {
                mobileNav.classList.remove('show');
                document.body.style.overflow = '';
                playSound('menu-close');
            });
        }
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (mobileNav.classList.contains('show') && 
                !mobileNav.contains(e.target) && 
                !hamburger.contains(e.target)) {
                mobileNav.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('show')) {
                mobileNav.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
}

function setupInteractiveElements() {
    // Quick view buttons
    document.querySelectorAll('.btn-quick-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const course = this.dataset.course;
            showQuickView(course);
            playSound('modal-open');
        });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            filterCourses(filter);
            
            playSound('click');
        });
    });
    
    // Hero buttons
    const startLearningBtn = document.getElementById('start-learning');
    const exploreCoursesBtn = document.getElementById('explore-courses');
    
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            // Add click animation
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
            
            // Start with highest progress subject
            const subjects = Object.keys(appData.progress);
            let highestSubject = 'matematika';
            let highestProgress = 0;
            
            subjects.forEach(subject => {
                const progress = appData.progress[subject][`kelas${appData.currentClass}`] || 0;
                if (progress > highestProgress) {
                    highestProgress = progress;
                    highestSubject = subject;
                }
            });
            
            // Redirect with animation
            playSound('navigation');
            setTimeout(() => {
                window.location.href = `${highestSubject}.html`;
            }, 500);
        });
    }
    
    if (exploreCoursesBtn) {
        exploreCoursesBtn.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
            
            playSound('click');
            
            // Smooth scroll to courses
            const coursesSection = document.querySelector('.courses-section');
            if (coursesSection) {
                coursesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight courses section
                coursesSection.classList.add('highlighted');
                setTimeout(() => coursesSection.classList.remove('highlighted'), 2000);
            }
        });
    }
    
    // Course card hover effects
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

function setupHeroAnimations() {
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
        el.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Pulse animation for circles
    const pulseCircles = document.querySelectorAll('.pulse-circle');
    pulseCircles.forEach((circle, index) => {
        circle.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Stats counter animation
    animateStatsCounter();
}

function animateStatsCounter() {
    const stats = [
        { element: '.stat-number:nth-child(1)', target: 10, suffix: '' },
        { element: '.stat-number:nth-child(2)', target: 3, suffix: '' },
        { element: '.stat-number:nth-child(3)', target: 100, suffix: '+' }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.element);
        if (!element) return;
        
        let current = 0;
        const increment = stat.target / 30; // 30 frames
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + stat.suffix;
        }, 50);
    });
}

function setupPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            // Handle scroll-based animations
            updateScrollAnimations();
        }, 100);
    });
}

// ===== DASHBOARD ENHANCEMENTS =====
function initializeDashboard() {
    console.log('📊 Initializing Enhanced Dashboard...');
    
    // Initial animations
    setTimeout(() => {
        updateDashboard();
        updateAllProgressBars();
        updateClassCards();
        updateLeaderboard('weekly');
        
        // Animate elements in sequence
        animateDashboardElements();
    }, 500);
    
    // Setup study streak
    checkStudyStreak();
    
    // Setup real-time updates
    setupDashboardUpdates();
    
    // Setup enhanced event listeners
    setupDashboardEventListeners();
}

function animateDashboardElements() {
    const elements = [
        '.hero-section',
        '.class-cards',
        '.stats-grid',
        '.courses-grid',
        '.events-grid',
        '.leaderboard-section'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.animationDelay = `${index * 0.2}s`;
            element.classList.add('fade-in-up');
        }
    });
}

function updateDashboard() {
    console.log('Updating enhanced dashboard for class', appData.currentClass);
    
    // Calculate total progress for current class
    let totalProgress = 0;
    let completedSubjects = 0;
    let totalScore = 0;
    let subjectCount = 0;
    
    Object.keys(appData.progress).forEach(subject => {
        const progress = appData.progress[subject][`kelas${appData.currentClass}`] || 0;
        totalProgress += progress;
        if (progress === 100) completedSubjects++;
        
        const score = appData.quizScores[subject][`kelas${appData.currentClass}`];
        if (score !== null) {
            totalScore += score;
        }
        subjectCount++;
    });
    
    const avgProgress = Math.round(totalProgress / subjectCount);
    
    // Update stats with animations
    updateStatElement('overall-progress-bar', avgProgress);
    updateStatElement('total-progress', avgProgress, '%');
    updateStatElement('completed-courses', `${completedSubjects}/${subjectCount}`);
    updateStatElement('completion-bar', (completedSubjects / subjectCount * 100));
    updateStatElement('total-score', totalScore);
    
    // Update study time
    const studyTimeEl = document.getElementById('study-time');
    if (studyTimeEl) {
        const hours = Math.floor(appData.studyTime / 60);
        const minutes = appData.studyTime % 60;
        studyTimeEl.textContent = hours > 0 ? `${hours} jam ${minutes} menit` : `${minutes} menit`;
    }
    
    // Update streak
    updateStreakDisplay();
}

function updateStatElement(elementId, value, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (elementId.includes('progress-bar') || elementId.includes('completion-bar')) {
        // Animate progress bar
        const currentWidth = parseFloat(element.style.width) || 0;
        animateValue(currentWidth, value, 1000, (val) => {
            element.style.width = val + '%';
        });
    } else if (elementId.includes('progress') || elementId.includes('score')) {
        // Animate number counter
        const currentValue = parseInt(element.textContent) || 0;
        animateValue(currentValue, value, 1000, (val) => {
            element.textContent = Math.round(val) + suffix;
        });
    } else {
        element.textContent = value + suffix;
    }
}

function animateValue(start, end, duration, callback) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);
        const value = start + (end - start) * eased;
        
        callback(value);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuad(t) {
    return t * (2 - t);
}

function updateStreakDisplay() {
    const streakElement = document.querySelector('.streak-days');
    if (streakElement) {
        streakElement.textContent = appData.streakDays;
        
        // Add streak animation if streak is high
        if (appData.streakDays >= 7) {
            streakElement.classList.add('streak-hot');
        } else if (appData.streakDays >= 3) {
            streakElement.classList.add('streak-warm');
        }
    }
}

function updateAllProgressBars() {
    const subjects = ['matematika', 'indonesia', 'ipa', 'ips', 'english', 'ppkn', 'senibudaya', 'pjok', 'prakarya', 'informatika'];
    
    subjects.forEach(subject => {
        const progress = appData.progress[subject][`kelas${appData.currentClass}`] || 0;
        
        // Update main course cards
        updateProgressBar(`${subject}-progress`, progress);
        updateProgressText(`${subject}-progress-text`, progress);
        
        // Update navbar progress
        updateProgressBar(`nav-${subject}-progress`, progress);
        updateProgressText(`nav-${subject}-percent`, progress);
    });
}

function updateProgressBar(barId, progress) {
    const bar = document.getElementById(barId);
    if (bar) {
        const currentWidth = parseFloat(bar.style.width) || 0;
        animateValue(currentWidth, progress, 800, (val) => {
            bar.style.width = val + '%';
        });
    }
}

function updateProgressText(textId, progress) {
    const text = document.getElementById(textId);
    if (text) {
        const currentValue = parseInt(text.textContent) || 0;
        animateValue(currentValue, progress, 800, (val) => {
            text.textContent = Math.round(val) + '%';
        });
    }
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 0.1}s`;
        bar.classList.add('progress-animate');
    });
}

function setupDashboardUpdates() {
    // Update dashboard every minute
    setInterval(updateDashboard, 60000);
    
    // Update notifications every 30 seconds
    setInterval(updateNotifications, 30000);
    
    // Simulate real-time updates for demo
    simulateRealTimeUpdates();
}

function simulateRealTimeUpdates() {
    // Simulate progress updates
    setInterval(() => {
        if (Math.random() > 0.8) {
            const subjects = Object.keys(appData.progress);
            const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
            const currentProgress = appData.progress[randomSubject][`kelas${appData.currentClass}`] || 0;
            
            if (currentProgress < 100) {
                const newProgress = Math.min(currentProgress + Math.random() * 5, 100);
                appData.progress[randomSubject][`kelas${appData.currentClass}`] = Math.round(newProgress);
                
                // Update UI
                updateProgressBar(`${randomSubject}-progress`, newProgress);
                updateProgressText(`${randomSubject}-progress-text`, newProgress);
                
                // Show notification
                if (newProgress % 25 === 0) {
                    showToast(`Progress ${randomSubject} mencapai ${Math.round(newProgress)}%!`, 'success');
                }
                
                saveData();
            }
        }
    }, 15000);
}

function setupDashboardEventListeners() {
    // Leaderboard filter
    const leaderboardFilter = document.getElementById('leaderboard-filter');
    if (leaderboardFilter) {
        leaderboardFilter.addEventListener('change', function() {
            updateLeaderboard(this.value);
            playSound('filter-change');
        });
    }
    
    // Event card interactions
    document.querySelectorAll('.event-card').forEach(card => {
        const btn = card.querySelector('.btn-event');
        if (btn) {
            btn.addEventListener('click', function() {
                const eventTitle = card.querySelector('h4').textContent;
                showToast(`Event "${eventTitle}" ditambahkan ke agenda`, 'success');
                playSound('event-add');
                
                // Add animation
                this.textContent = '✓ Ditambahkan';
                this.classList.add('added');
                setTimeout(() => {
                    this.textContent = this.textContent.replace('✓ ', '');
                    this.classList.remove('added');
                }, 2000);
            });
        }
    });
}

// ===== QUICK VIEW MODAL - ENHANCED =====
function showQuickView(course) {
    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('quick-view-content');
    
    const courseNames = {
        matematika: 'Matematika',
        indonesia: 'Bahasa Indonesia',
        ipa: 'IPA',
        ips: 'IPS',
        english: 'Bahasa Inggris',
        ppkn: 'PPKn',
        senibudaya: 'Seni Budaya',
        pjok: 'PJOK',
        prakarya: 'Prakarya',
        informatika: 'Informatika'
    };
    
    const progress = appData.progress[course][`kelas${appData.currentClass}`] || 0;
    const score = appData.quizScores[course][`kelas${appData.currentClass}`];
    const completedLessons = appData.completedLessons[course][`kelas${appData.currentClass}`].length;
    
    content.innerHTML = `
        <div class="quick-view-content">
            <div class="quick-view-header">
                <div class="subject-icon-large">
                    <i class="fas fa-${getSubjectIcon(course)}"></i>
                </div>
                <div>
                    <h2>${courseNames[course]}</h2>
                    <p class="subject-class">Kelas ${appData.currentClass}</p>
                </div>
            </div>
            
            <div class="quick-stats-grid">
                <div class="quick-stat">
                    <div class="stat-circle" style="--progress: ${progress}%">
                        <span class="stat-value">${progress}%</span>
                    </div>
                    <span class="stat-label">Progress</span>
                </div>
                <div class="quick-stat">
                    <div class="stat-circle" style="--progress: ${score || 0}%">
                        <span class="stat-value">${score || '-'}</span>
                    </div>
                    <span class="stat-label">Nilai Quiz</span>
                </div>
                <div class="quick-stat">
                    <div class="stat-circle">
                        <span class="stat-value">${completedLessons}/5</span>
                    </div>
                    <span class="stat-label">Materi Selesai</span>
                </div>
            </div>
            
            <div class="progress-breakdown">
                <h3>Detail Progress</h3>
                ${getProgressBreakdown(course)}
            </div>
            
            <div class="quick-actions">
                <a href="${course}.html?kelas=${appData.currentClass}" class="btn-course primary">
                    <i class="fas fa-play-circle"></i> Lanjutkan Belajar
                </a>
                <button class="btn-course secondary" onclick="startQuiz('${course}')">
                    <i class="fas fa-question-circle"></i> Kerjakan Quiz
                </button>
                <button class="btn-course outline" onclick="showCourseDetails('${course}')">
                    <i class="fas fa-info-circle"></i> Detail Materi
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    
    // Animate modal entrance
    setTimeout(() => {
        content.classList.add('loaded');
    }, 100);
    
    // Setup close button
    const closeBtn = document.getElementById('close-quick-view');
    if (closeBtn) {
        closeBtn.onclick = () => closeQuickView();
    }
    
    // Close on escape
    document.addEventListener('keydown', function quickViewKeyHandler(e) {
        if (e.key === 'Escape') {
            closeQuickView();
            document.removeEventListener('keydown', quickViewKeyHandler);
        }
    });
}

function getSubjectIcon(subject) {
    const icons = {
        matematika: 'calculator',
        indonesia: 'book',
        ipa: 'flask',
        ips: 'globe-asia',
        english: 'language',
        ppkn: 'landmark',
        senibudaya: 'palette',
        pjok: 'running',
        prakarya: 'hammer',
        informatika: 'laptop-code'
    };
    return icons[subject] || 'book';
}

function getProgressBreakdown(course) {
    const modules = getCourseModules(course);
    const completed = appData.completedLessons[course][`kelas${appData.currentClass}`];
    
    return modules.map((module, index) => `
        <div class="module-progress-item ${completed.includes(`lesson-${index}`) ? 'completed' : ''}">
            <div class="module-check">
                <i class="fas fa-${completed.includes(`lesson-${index}`) ? 'check-circle' : 'circle'}"></i>
            </div>
            <div class="module-info">
                <span class="module-name">${module}</span>
                <div class="module-status">
                    ${completed.includes(`lesson-${index}`) ? 
                        '<span class="status-completed">✓ Selesai</span>' : 
                        '<span class="status-pending">● Belum dimulai</span>'}
                </div>
            </div>
            <button class="btn-module" onclick="openLesson('${course}', 'lesson-${index}')">
                <i class="fas fa-play"></i>
            </button>
        </div>
    `).join('');
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('quick-view-content');
    
    content.classList.remove('loaded');
    
    setTimeout(() => {
        modal.classList.remove('show');
    }, 300);
    
    playSound('modal-close');
}

// ===== LEADERBOARD ENHANCEMENTS =====
function updateLeaderboard(period) {
    const leaderboardList = document.querySelector('.leaderboard-list');
    if (!leaderboardList) return;
    
    // Show loading state
    leaderboardList.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Memuat data peringkat...</p>
        </div>
    `;
    
    // Simulate API delay
    setTimeout(() => {
        const leaderboardData = getLeaderboardData(period);
        renderLeaderboard(leaderboardData, leaderboardList);
    }, 800);
}

function getLeaderboardData(period) {
    // Sample data - in real app, this would come from API
    return [
        { id: 1, name: 'Siti Nurhaliza', class: '9A', avatar: 'S', points: 3120, games: 45, rank: 1, isCurrentUser: false },
        { id: 2, name: 'Budi Santoso', class: '8B', avatar: 'B', points: 2870, games: 38, rank: 2, isCurrentUser: false },
        { id: 3, name: 'Ahmad Rizki', class: '7C', avatar: 'A', points: 2650, games: 42, rank: 3, isCurrentUser: false },
        { id: 4, name: 'Andi Wijaya', class: '9A', avatar: 'A', points: 2450, games: 35, rank: 4, isCurrentUser: false },
        { id: 5, name: 'Rina Agustina', class: '8C', avatar: 'R', points: 2300, games: 31, rank: 5, isCurrentUser: false },
        { id: 6, name: 'Dedi Kurniawan', class: '7B', avatar: 'D', points: 2150, games: 28, rank: 6, isCurrentUser: false },
        { id: 7, name: 'Maya Sari', class: '9B', avatar: 'M', points: 2000, games: 25, rank: 7, isCurrentUser: false },
        { id: 8, name: 'Fajar Nugroho', class: '8A', avatar: 'F', points: 1850, games: 28, rank: 8, isCurrentUser: true }
    ];
}

function renderLeaderboard(data, container) {
    let html = '';
    
    data.forEach(student => {
        const isYou = student.isCurrentUser;
        
        html += `
            <div class="leaderboard-item ${isYou ? 'you' : ''}" data-id="${student.id}">
                <div class="rank ${student.rank <= 3 ? 'top-rank' : ''}">
                    ${student.rank}
                </div>
                <div class="student-info">
                    <div class="student-avatar ${isYou ? 'current-user' : ''}">
                        ${student.avatar}
                        ${student.rank === 1 ? '<i class="crown fas fa-crown"></i>' : ''}
                    </div>
                    <div class="student-details">
                        <h4>${student.name} ${isYou ? '<span class="you-badge">(Kamu)</span>' : ''}</h4>
                        <p class="student-class">${student.class} • ${student.games} game dimainkan</p>
                        <div class="student-stats">
                            <span class="win-rate">${Math.floor(Math.random() * 30) + 70}% win rate</span>
                            <span class="streak">${Math.floor(Math.random() * 10) + 1}🔥</span>
                        </div>
                    </div>
                </div>
                <div class="score">
                    <div class="score-value">${student.points}</div>
                    <div class="score-label">points</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Add animations
    setTimeout(() => {
        const items = container.querySelectorAll('.leaderboard-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('slide-in-right');
        });
    }, 100);
}

// ===== ENHANCED FILTERING =====
function filterCourses(filter) {
    const courseCards = document.querySelectorAll('.course-card');
    const filterValue = filter === 'all' ? filter : filter.replace('kelas-', '');
    
    // Animate filtering
    courseCards.forEach(card => {
        const classData = card.dataset.class;
        const shouldShow = filter === 'all' || classData.includes(filterValue);
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('visible');
            }, 100);
        } else {
            card.classList.remove('visible');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Update counter
    const visibleCount = document.querySelectorAll('.course-card.visible').length;
    updateCourseCounter(visibleCount);
}

function updateCourseCounter(count) {
    let counter = document.getElementById('course-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'course-counter';
        counter.className = 'course-counter';
        document.querySelector('.courses-section .section-header').appendChild(counter);
    }
    
    const total = document.querySelectorAll('.course-card').length;
    counter.textContent = `${count} dari ${total} mata pelajaran`;
    counter.classList.add('updated');
    
    setTimeout(() => counter.classList.remove('updated'), 500);
}

// ===== STUDY STREAK SYSTEM =====
function checkStudyStreak() {
    const today = new Date().toDateString();
    
    if (!appData.lastStudyDate) {
        appData.lastStudyDate = today;
        appData.streakDays = 1;
        saveData();
        return;
    }
    
    if (appData.lastStudyDate === today) return;
    
    const lastDate = new Date(appData.lastStudyDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        // Consecutive day
        appData.streakDays++;
        showStreakNotification(appData.streakDays);
    } else if (diffDays > 1) {
        // Streak broken
        if (appData.streakDays > 1) {
            showToast(`Streak ${appData.streakDays} hari terputus!`, 'warning');
        }
        appData.streakDays = 1;
    }
    
    appData.lastStudyDate = today;
    saveData();
    updateStreakDisplay();
}

function showStreakNotification(streakDays) {
    if (streakDays === 1) return;
    
    const messages = {
        3: "🔥 Streak 3 hari! Pertahankan!",
        7: "🎉 Streak 1 minggu! Luar biasa!",
        14: "🚀 Streak 2 minggu! Kamu hebat!",
        30: "🏆 Streak 1 bulan! Legenda!"
    };
    
    if (messages[streakDays]) {
        showToast(messages[streakDays], 'success');
        playSound('achievement');
    } else if (streakDays % 5 === 0) {
        showToast(`Streak ${streakDays} hari! Teruskan!`, 'info');
    }
}

// ===== ACHIEVEMENT SYSTEM =====
function checkAchievements() {
    const achievements = getAchievementDefinitions();
    const unlocked = [];
    
    achievements.forEach(achievement => {
        if (!appData.achievements.includes(achievement.id) && achievement.condition()) {
            appData.achievements.push(achievement.id);
            unlocked.push(achievement);
        }
    });
    
    if (unlocked.length > 0) {
        showAchievementNotification(unlocked);
        saveData();
    }
}

function getAchievementDefinitions() {
    return [
        {
            id: 'pemula',
            title: 'Pemula',
            description: 'Selesaikan 1 materi pertama',
            icon: '🥚',
            condition: () => {
                let totalLessons = 0;
                Object.keys(appData.completedLessons).forEach(subject => {
                    totalLessons += appData.completedLessons[subject][`kelas${appData.currentClass}`].length;
                });
                return totalLessons >= 1;
            }
        },
        {
            id: 'rajin',
            title: 'Rajin Belajar',
            description: 'Selesaikan 10 materi',
            icon: '📚',
            condition: () => {
                let totalLessons = 0;
                Object.keys(appData.completedLessons).forEach(subject => {
                    totalLessons += appData.completedLessons[subject][`kelas${appData.currentClass}`].length;
                });
                return totalLessons >= 10;
            }
        },
        {
            id: 'quiz-master',
            title: 'Quiz Master',
            description: 'Dapatkan nilai 90+ di quiz',
            icon: '🏆',
            condition: () => {
                let hasHighScore = false;
                Object.keys(appData.quizScores).forEach(subject => {
                    const score = appData.quizScores[subject][`kelas${appData.currentClass}`];
                    if (score >= 90) hasHighScore = true;
                });
                return hasHighScore;
            }
        }
    ];
}

function showAchievementNotification(achievements) {
    achievements.forEach((achievement, index) => {
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-content">
                    <h4>🏆 Achievement Unlocked!</h4>
                    <h3>${achievement.title}</h3>
                    <p>${achievement.description}</p>
                </div>
                <button class="close-achievement">&times;</button>
            `;
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 5000);
            
            // Close button
            notification.querySelector('.close-achievement').onclick = () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            };
            
            // Play sound
            playSound('achievement');
            
        }, index * 500);
    });
}

// ===== AUDIO FEEDBACK =====
function playSound(type) {
    if (!window.audioEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    switch(type) {
        case 'click':
            playTone(440, 0.1, 'sine');
            break;
        case 'success':
            playTone(523.25, 0.3, 'sine');
            break;
        case 'notification-open':
            playTone(659.25, 0.2, 'sine');
            break;
        case 'achievement':
            playTone(783.99, 0.5, 'triangle');
            break;
        case 'theme-toggle':
            playTone(587.33, 0.2, 'sawtooth');
            break;
    }
}

function playTone(frequency, duration, type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.log('Audio not supported');
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(toast => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${getToastIcon(type)}"></i>
        </div>
        <div class="toast-content">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-remove after 5 seconds
    const timeout = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 5000);
    
    // Close button
    toast.querySelector('.toast-close').onclick = () => {
        clearTimeout(timeout);
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    };
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ===== KEYBOARD SHORTCUTS =====
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key.toLowerCase()) {
            case '1':
                if (e.ctrlKey) {
                    e.preventDefault();
                    appData.currentClass = 7;
                    updateClassDisplay(7);
                    updateDashboard();
                    showToast('Pindah ke Kelas 7', 'info');
                }
                break;
                
            case '2':
                if (e.ctrlKey) {
                    e.preventDefault();
                    appData.currentClass = 8;
                    updateClassDisplay(8);
                    updateDashboard();
                    showToast('Pindah ke Kelas 8', 'info');
                }
                break;
                
            case '3':
                if (e.ctrlKey) {
                    e.preventDefault();
                    appData.currentClass = 9;
                    updateClassDisplay(9);
                    updateDashboard();
                    showToast('Pindah ke Kelas 9', 'info');
                }
                break;
                
            case 'n':
                if (e.ctrlKey) {
                    e.preventDefault();
                    const notificationBtn = document.getElementById('notification-btn');
                    if (notificationBtn) notificationBtn.click();
                }
                break;
                
            case 't':
                if (e.ctrlKey) {
                    e.preventDefault();
                    const themeToggle = document.getElementById('theme-toggle');
                    if (themeToggle) themeToggle.click();
                }
                break;
                
            case 'escape':
                closeAllModals();
                break;
                
            case 'f':
                if (e.ctrlKey && e.shiftKey) {
                    e.preventDefault();
                    const searchInput = document.querySelector('.search-input');
                    if (searchInput) searchInput.focus();
                }
                break;
        }
    });
}

// ===== PERFORMANCE MONITORING =====
function setupPerformanceMonitoring() {
    if ('performance' in window) {
        // Monitor page load performance
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        if (loadTime > 3000) {
            console.warn(`Page load time: ${loadTime}ms - Consider optimizing`);
        }
    }
    
    // Monitor FPS
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS(currentTime) {
        frameCount++;
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            frameCount = 0;
            lastTime = currentTime;
            
            if (fps < 30) {
                console.warn(`Low FPS: ${fps}`);
            }
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
}

// ===== SCROLL ANIMATIONS =====
function updateScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
            element.classList.add('animated');
        }
    });
}

// ===== INITIALIZE =====
// Enable audio by default
window.audioEnabled = true;

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes progress-animation {
        from {
            width: 0;
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    .slide-in-right {
        animation: slideInRight 0.4s ease forwards;
        opacity: 0;
    }
    
    .progress-animate {
        animation: progress-animation 1s ease-out;
    }
    
    .pulse {
        animation: pulse 0.5s ease;
    }
    
    .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--dark-light);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 9999;
        backdrop-filter: blur(10px);
    }
    
    .toast.show {
        transform: translateX(0);
    }
    
    .toast-success {
        border-left: 4px solid var(--success);
    }
    
    .toast-error {
        border-left: 4px solid var(--danger);
    }
    
    .toast-warning {
        border-left: 4px solid var(--warning);
    }
    
    .toast-info {
        border-left: 4px solid var(--secondary);
    }
    
    .achievement-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, var(--primary), var(--primary-light));
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        min-width: 400px;
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        transition: transform 0.3s ease;
    }
    
    .achievement-notification.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .achievement-icon {
        font-size: 3rem;
    }
    
    .course-card {
        transition: all 0.3s ease;
    }
    
    .course-card.visible {
        opacity: 1;
    }
    
    .course-counter {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        transition: all 0.3s ease;
    }
    
    .course-counter.updated {
        color: var(--secondary);
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

console.log('🚀 EduNusantara SMP Platform Ready with Enhanced Features!');

// Export functions to global scope
window.showAllSubjects = function() {
    // Your existing function implementation
    const modal = document.getElementById('all-subjects-modal');
    const grid = document.getElementById('all-subjects-grid');
    
    if (!modal || !grid) return;
    
    const allSubjects = [
        { name: 'Matematika', icon: 'calculator', color: 'math' },
        { name: 'Bahasa Indonesia', icon: 'book', color: 'indonesia' },
        { name: 'IPA', icon: 'flask', color: 'ipa' },
        { name: 'IPS', icon: 'globe-asia', color: 'ips' },
        { name: 'Bahasa Inggris', icon: 'language', color: 'english' },
        { name: 'PPKn', icon: 'landmark', color: 'ppkn' },
        { name: 'Seni Budaya', icon: 'palette', color: 'seni' },
        { name: 'PJOK', icon: 'running', color: 'pjok' },
        { name: 'Prakarya', icon: 'hammer', color: 'prakarya' },
        { name: 'Informatika', icon: 'laptop-code', color: 'informatika' }
    ];
    
    let html = '';
    allSubjects.forEach(subject => {
        const subjectKey = subject.name.toLowerCase().replace(' ', '');
        const progress = appData.progress[subjectKey]?.[`kelas${appData.currentClass}`] || 0;
        
        html += `
            <a href="${subjectKey}.html" class="subject-card">
                <i class="fas fa-${subject.icon}" style="color: var(--${subject.color})"></i>
                <h4>${subject.name}</h4>
                <div class="subject-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%; background: var(--${subject.color})"></div>
                    </div>
                    <span class="progress-text">${progress}%</span>
                </div>
            </a>
        `;
    });
    
    grid.innerHTML = html;
    modal.classList.add('show');
    playSound('modal-open');
};

window.closeAllSubjects = function() {
    const modal = document.getElementById('all-subjects-modal');
    if (modal) {
        modal.classList.remove('show');
        playSound('modal-close');
    }
};

// Export other needed functions
window.selectQuizAnswer = selectQuizAnswer;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.submitQuiz = submitQuiz;
window.closeQuiz = closeQuiz;
window.closeLesson = closeLesson;
window.markLessonComplete = markLessonComplete;
window.startQuiz = startQuiz;
window.openLesson = openLesson;
window.filterCourses = filterCourses;