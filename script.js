// Navigation and page management
let currentPage = 'home';

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }
    
    // Update navigation active states
    updateNavActiveStates(pageId);
}

function updateNavActiveStates(activePageId) {
    // Desktop navigation
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
        const pageName = link.getAttribute('data-page');
        if (pageName === activePageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Mobile navigation
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        const pageName = link.getAttribute('data-page');
        if (pageName === activePageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Toast notification system
function showToast(title, description) {
    const toast = document.getElementById('toast');
    toast.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 0.25rem;">${title}</div>
        <div style="font-size: 0.875rem; color: var(--muted-foreground);">${description}</div>
    `;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Diet & Nutrition functionality
function logMeal() {
    const mealName = document.querySelector('input[placeholder="e.g., Grilled Chicken"]').value;
    const calories = document.querySelector('input[placeholder="0"]').value;
    const type = document.querySelector('select').value;
    
    if (mealName && calories) {
        showToast('Meal Logged!', 'Your meal has been added to today\'s nutrition log.');
        
        // Clear form
        document.querySelector('input[placeholder="e.g., Grilled Chicken"]').value = '';
        document.querySelector('input[placeholder="0"]').value = '';
        document.querySelector('select').selectedIndex = 0;
    } else {
        showToast('Error', 'Please fill in meal name and calories.');
    }
}

// Exercise Tracker functionality
let isWorkoutActive = false;
let workoutTimer = 0;
let timerInterval;

function startWorkout(programName) {
    isWorkoutActive = true;
    workoutTimer = 0;
    
    // Update UI
    const activeWorkoutCard = document.querySelector('#exercise-tracker-page .card:nth-child(2) .card-content');
    if (activeWorkoutCard) {
        activeWorkoutCard.innerHTML = `
            <div class="text-center">
                <div class="stat-number" id="timer-display">0:00</div>
                <div class="stat-label">elapsed time</div>
                <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
                    <button class="btn btn-outline" onclick="pauseWorkout()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="6" y="4" width="4" height="16"/>
                            <rect x="14" y="4" width="4" height="16"/>
                        </svg>
                        Pause
                    </button>
                    <button class="btn btn-outline" onclick="resetWorkout()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                            <path d="M21 3v5h-5"/>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                            <path d="M8 16H3v5"/>
                        </svg>
                        Reset
                    </button>
                </div>
            </div>
        `;
    }
    
    // Start timer
    timerInterval = setInterval(updateTimer, 1000);
    
    showToast('Workout Started!', `${programName} is now active. Give it your best!`);
}

function updateTimer() {
    workoutTimer++;
    const minutes = Math.floor(workoutTimer / 60);
    const seconds = workoutTimer % 60;
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function pauseWorkout() {
    clearInterval(timerInterval);
    showToast('Workout Paused', 'Timer paused. Click start to resume.');
}

function resetWorkout() {
    clearInterval(timerInterval);
    isWorkoutActive = false;
    workoutTimer = 0;
    
    // Reset UI
    const activeWorkoutCard = document.querySelector('#exercise-tracker-page .card:nth-child(2) .card-content');
    if (activeWorkoutCard) {
        activeWorkoutCard.innerHTML = `
            <div class="text-center">
                <div style="font-size: 1.125rem; color: var(--muted-foreground); margin-bottom: 1rem;">
                    No active workout
                </div>
                <button class="btn btn-primary" onclick="showStartWorkoutOptions()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5,3 19,12 5,21 5,3"/>
                    </svg>
                    Start Workout
                </button>
            </div>
        `;
    }
    
    showToast('Workout Reset', 'Timer has been reset.');
}

function showStartWorkoutOptions() {
    showToast('Select Program', 'Choose a workout program below to get started.');
}

// Leaderboard functionality
function loadLeaderboards() {
    // Simulated leaderboard data
    const leaderboardData = [
        { rank: 1, name: 'Sarah Johnson', points: 2450, workouts: 45, streak: 12 },
        { rank: 2, name: 'Mike Chen', points: 2380, workouts: 42, streak: 8 },
        { rank: 3, name: 'Emma Wilson', points: 2290, workouts: 38, streak: 15 },
        { rank: 4, name: 'David Garcia', points: 2180, workouts: 36, streak: 6 },
        { rank: 5, name: 'Lisa Brown', points: 2050, workouts: 33, streak: 9 }
    ];
    
    // This would populate the leaderboard when implemented
    console.log('Leaderboard data:', leaderboardData);
}

// Profile functionality
function updateProfile() {
    showToast('Profile Updated', 'Your profile information has been saved.');
}

function editProfile() {
    showToast('Edit Mode', 'Profile editing mode activated.');
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Set initial page
    showPage('home');
    
    // Load initial data
    loadLeaderboards();
    
    // Add click handlers for workout program cards
    const workoutCards = document.querySelectorAll('.workout-program-card');
    workoutCards.forEach(card => {
        card.addEventListener('click', function() {
            const programName = this.querySelector('h3').textContent;
            startWorkout(programName);
        });
    });
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    console.log('FitPulse app initialized successfully!');
});

// Utility functions
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function calculateProgress(current, target) {
    return Math.min(100, Math.max(0, (current / target) * 100));
}

function animateProgressBar(element, targetWidth) {
    element.style.transition = 'width 1s ease-out';
    element.style.width = targetWidth + '%';
}

// Export functions for global access
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.logMeal = logMeal;
window.startWorkout = startWorkout;
window.pauseWorkout = pauseWorkout;
window.resetWorkout = resetWorkout;
window.showStartWorkoutOptions = showStartWorkoutOptions;
window.updateProfile = updateProfile;
window.editProfile = editProfile;