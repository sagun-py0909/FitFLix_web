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
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
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
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Toast notification system
function showToast(title, description) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 0.25rem;">${title}</div>
            <div style="font-size: 0.875rem; color: var(--muted-foreground);">${description}</div>
        `;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Diet & Nutrition functionality
function logMeal(event) {
    if (event) {
        event.preventDefault();
    }
    
    const form = document.getElementById('meal-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const mealName = form.querySelector('input[type="text"]').value;
    const calories = form.querySelector('input[type="number"]').value;
    const mealType = form.querySelector('select').value;
    
    if (mealName && calories) {
        showToast('Meal Logged!', `${mealName} (${calories} cal) has been added to your ${mealType}.`);
        
        // Clear form
        form.reset();
        
        // Update progress bars (simulate data update)
        updateNutritionProgress();
    } else {
        showToast('Error', 'Please fill in meal name and calories.');
    }
}

function updateNutritionProgress() {
    // Simulate updating nutrition progress bars
    const progressBars = document.querySelectorAll('#diet-nutrition-page .progress-fill');
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width) || 0;
        const newWidth = Math.min(100, currentWidth + Math.random() * 10);
        bar.style.width = newWidth + '%';
    });
}

// Exercise Tracker functionality
let isWorkoutActive = false;
let workoutTimer = 0;
let timerInterval;

function startWorkout(programName) {
    isWorkoutActive = true;
    workoutTimer = 0;
    
    // Update UI
    const activeWorkoutCard = document.querySelector('#active-workout');
    if (activeWorkoutCard) {
        activeWorkoutCard.innerHTML = `
            <div class="text-center">
                <div style="margin-bottom: 1rem;">
                    <h3 style="color: var(--primary); margin-bottom: 0.5rem;">${programName}</h3>
                    <div class="stat-number" id="timer-display">0:00</div>
                    <div class="stat-label">elapsed time</div>
                </div>
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
                    <button class="btn btn-primary" onclick="completeWorkout('${programName}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20,6 9,17 4,12"/>
                        </svg>
                        Complete
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
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        showToast('Workout Paused', 'Timer paused. Click Reset to restart or Complete to finish.');
    }
}

function resetWorkout() {
    clearInterval(timerInterval);
    isWorkoutActive = false;
    workoutTimer = 0;
    timerInterval = null;
    
    // Reset UI
    const activeWorkoutCard = document.querySelector('#active-workout');
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

function completeWorkout(programName) {
    const minutes = Math.floor(workoutTimer / 60);
    const estimatedCalories = Math.round(workoutTimer * 5.5); // Rough estimation
    
    clearInterval(timerInterval);
    isWorkoutActive = false;
    timerInterval = null;
    
    // Reset UI
    resetWorkout();
    
    // Update today's progress
    updateTodaysProgress(minutes, estimatedCalories);
    
    showToast('Workout Completed!', `Great job! You completed ${programName} in ${minutes} minutes and burned approximately ${estimatedCalories} calories.`);
}

function updateTodaysProgress(minutes, calories) {
    // Update the progress stats on exercise tracker page
    const progressStats = document.querySelectorAll('#exercise-tracker-page .stat-number');
    if (progressStats.length >= 4) {
        // Update minutes active
        const currentMinutes = parseInt(progressStats[0].textContent) || 0;
        progressStats[0].textContent = currentMinutes + minutes;
        
        // Update calories burned
        const currentCalories = parseInt(progressStats[1].textContent) || 0;
        progressStats[1].textContent = currentCalories + calories;
        
        // Update exercises completed (increment by estimated number)
        const currentExercises = parseInt(progressStats[2].textContent) || 0;
        progressStats[2].textContent = currentExercises + Math.ceil(minutes / 4);
        
        // Update workouts done
        const currentWorkouts = parseInt(progressStats[3].textContent) || 0;
        progressStats[3].textContent = currentWorkouts + 1;
    }
}

function showStartWorkoutOptions() {
    showToast('Select Program', 'Choose a workout program below to get started.');
}

// Leaderboard functionality
const leaderboardData = [
    { rank: 1, name: 'Sarah Johnson', points: 2450, workouts: 45, streak: 12 },
    { rank: 2, name: 'Mike Chen', points: 2380, workouts: 42, streak: 8 },
    { rank: 3, name: 'Emma Wilson', points: 2290, workouts: 38, streak: 15 },
    { rank: 4, name: 'David Garcia', points: 2180, workouts: 36, streak: 6 },
    { rank: 5, name: 'Lisa Brown', points: 2050, workouts: 33, streak: 9 },
    { rank: 12, name: 'You', points: 1840, workouts: 28, streak: 5 }
];

function loadLeaderboards() {
    // This would populate the leaderboard when implemented
    console.log('Leaderboard data loaded:', leaderboardData);
}

// Profile functionality
function updateProfile() {
    showToast('Profile Updated', 'Your profile information has been saved successfully.');
}

function editProfile() {
    showToast('Edit Mode', 'Profile editing mode activated. You can now modify your information.');
}

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
    if (element) {
        element.style.transition = 'width 1s ease-out';
        element.style.width = targetWidth + '%';
    }
}

// Initialize progress bars animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 100);
    });
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    // Simulate live data updates every 30 seconds
    setInterval(() => {
        if (currentPage === 'leaderboards') {
            // Simulate leaderboard position changes
            const currentUserPoints = document.querySelector('.leaderboard-item.current-user .points');
            if (currentUserPoints) {
                const points = parseInt(currentUserPoints.textContent) || 1840;
                currentUserPoints.textContent = `${points + Math.floor(Math.random() * 10)} pts`;
            }
        }
    }, 30000);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Set initial page
    showPage('home');
    
    // Load initial data
    loadLeaderboards();
    
    // Initialize progress bar animations
    setTimeout(initializeProgressBars, 500);
    
    // Start real-time updates
    simulateRealTimeUpdates();
    
    // Add click handlers for workout program cards
    const workoutCards = document.querySelectorAll('.workout-program-card');
    workoutCards.forEach(card => {
        card.addEventListener('click', function() {
            const programName = this.querySelector('.workout-name').textContent;
            startWorkout(programName);
        });
    });
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenuBtn && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Add form submission handler
    const mealForm = document.getElementById('meal-form');
    if (mealForm) {
        mealForm.addEventListener('submit', logMeal);
    }
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('FitPulse app initialized successfully!');
});

// Export functions for global access
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.logMeal = logMeal;
window.startWorkout = startWorkout;
window.pauseWorkout = pauseWorkout;
window.resetWorkout = resetWorkout;
window.completeWorkout = completeWorkout;
window.showStartWorkoutOptions = showStartWorkoutOptions;
window.updateProfile = updateProfile;
window.editProfile = editProfile;

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload images and other assets during idle time
        const imageUrls = [
            // Add any image URLs that need preloading
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    });
}

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker here if needed for PWA
        console.log('Service Worker support detected');
    });
}