// UEFTool JavaScript - Interactive Features and Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollAnimations();
    initMobileMenu();
    initContactForm();
    initParticleBackground();
    initSmoothScrolling();
    initTypingEffect();
    initCountUpAnimation();
    initParallaxEffect();
    initAutoKhoanhDemo();
    // Delay để đảm bảo DOM load xong
    setTimeout(() => {
        initTestimonialsCarousel();
    }, 100);
    initFeedbackForm();
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('bg-white/95', 'shadow-lg');
            nav.classList.remove('bg-white/90');
        } else {
            nav.classList.add('bg-white/90');
            nav.classList.remove('bg-white/95', 'shadow-lg');
        }
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
            
            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
    }
    
    // Close mobile menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars text-xl';
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease forwards`;
                            card.style.animationDelay = `${index * 0.1}s`;
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .process-step, .pricing-card');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !phone || !message) {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang gửi...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Particle background effect
function initParticleBackground() {
    const heroSection = document.querySelector('#home');
    
    if (heroSection) {
        // Create particle container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('#home h1');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Count up animation for statistics
function initCountUpAnimation() {
    const counters = document.querySelectorAll('.text-3xl.font-bold');
    
    const animateCounter = (counter) => {
        const target = counter.textContent;
        const isNumber = !isNaN(parseInt(target));
        
        if (isNumber) {
            const finalNumber = parseInt(target);
            let currentNumber = 0;
            const increment = finalNumber / 50;
            
            const updateCounter = () => {
                if (currentNumber < finalNumber) {
                    currentNumber += increment;
                    counter.textContent = Math.ceil(currentNumber) + (target.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        }
    };
    
    // Observe counters for animation
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('#home');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroSection && heroVisual) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// CTA Button interactions
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button, .secondary-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle button actions
            if (this.classList.contains('cta-button')) {
                showNotification('Chuyển hướng đến trang đặt mua...', 'info');
                // Here you would typically redirect to a payment page
                setTimeout(() => {
                    window.location.href = '#pricing';
                }, 1000);
            } else if (this.classList.contains('secondary-button')) {
                showNotification('Mở video demo...', 'info');
                // Here you would typically open a modal with demo video
            }
        });
    });
});

// Add ripple effect CSS
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading state management
function showLoadingState() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center';
    loader.innerHTML = `
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Đang tải...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoadingState() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.remove();
    }
}

// Initialize loading state
window.addEventListener('load', function() {
    hideLoadingState();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            const icon = document.querySelector('#mobile-menu-btn i');
            if (icon) {
                icon.className = 'fas fa-bars text-xl';
            }
        }
    }
});

// Auto khoanh demo functionality
function initAutoKhoanhDemo() {
    const quizContainer = document.getElementById('quiz-container');
    
    // Danh sách câu hỏi từ các ngành học UEF
    const questions = [
        {
            subject: "Quản trị kinh doanh",
            question: "Trong quản trị doanh nghiệp, chức năng nào sau đây là quan trọng nhất?",
            options: ["A", "B", "C", "D"],
            answers: ["Hoạch định", "Tổ chức", "Lãnh đạo", "Kiểm soát"],
            correct: "A"
        },
        {
            subject: "Marketing",
            question: "4P trong Marketing Mix bao gồm:",
            options: ["A", "B", "C", "D"],
            answers: ["Product, Price, Place, Promotion", "People, Process, Physical evidence, Promotion", "Product, People, Place, Process", "Price, Place, People, Physical evidence"],
            correct: "A"
        },
        {
            subject: "Tài chính - Ngân hàng",
            question: "Tỷ lệ ROE (Return on Equity) được tính bằng:",
            options: ["A", "B", "C", "D"],
            answers: ["Lợi nhuận ròng / Vốn chủ sở hữu", "Lợi nhuận ròng / Tổng tài sản", "Doanh thu / Vốn chủ sở hữu", "Lợi nhuận ròng / Doanh thu"],
            correct: "A"
        },
        {
            subject: "Luật kinh tế",
            question: "Hợp đồng dân sự có hiệu lực khi:",
            options: ["A", "B", "C", "D"],
            answers: ["Có đủ các điều kiện theo quy định pháp luật", "Được ký kết bằng văn bản", "Có chứng thực của cơ quan nhà nước", "Được đăng ký tại cơ quan có thẩm quyền"],
            correct: "A"
        },
        {
            subject: "Công nghệ thông tin",
            question: "Trong lập trình hướng đối tượng, tính chất nào sau đây cho phép che giấu thông tin?",
            options: ["A", "B", "C", "D"],
            answers: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
            correct: "A"
        },
        {
            subject: "Kế toán",
            question: "Nguyên tắc kế toán nào yêu cầu ghi nhận doanh thu khi hàng hóa được giao?",
            options: ["A", "B", "C", "D"],
            answers: ["Nguyên tắc phù hợp", "Nguyên tắc thận trọng", "Nguyên tắc nhất quán", "Nguyên tắc trọng yếu"],
            correct: "A"
        },
        {
            subject: "Ngôn ngữ Anh",
            question: "Trong câu điều kiện loại 2, động từ chính ở mệnh đề if được chia như thế nào?",
            options: ["A", "B", "C", "D"],
            answers: ["Past simple", "Present simple", "Past perfect", "Present perfect"],
            correct: "A"
        },
        {
            subject: "Tâm lý học",
            question: "Theo thuyết phát triển nhận thức của Piaget, giai đoạn tiền thao tác cụ thể (2-7 tuổi) có đặc điểm:",
            options: ["A", "B", "C", "D"],
            answers: ["Tư duy trực quan, chưa có khả năng bảo tồn", "Tư duy logic, có khả năng bảo tồn", "Tư duy trừu tượng", "Tư duy cảm tính"],
            correct: "A"
        }
    ];
    
    let currentQuestionIndex = 0;
    
    // Hiển thị câu hỏi với animation
    function displayQuestion(questionData, isInitial = false) {
        if (isInitial) {
            const questionHtml = `
                <div class="question-card active">
                    <div class="text-xs text-blue-600 font-semibold mb-1">${questionData.subject}</div>
                    <div class="text-sm font-semibold text-gray-800">${questionData.question}</div>
                    <div class="space-y-2">
                        ${questionData.options.map((option, index) => `
                            <div class="flex items-center space-x-2 p-2 rounded border option" data-answer="${option}">
                                <span class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">${option}</span>
                                <span class="text-sm">${questionData.answers[index]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            quizContainer.innerHTML = questionHtml;
        } else {
            // Ẩn card hiện tại trước
            const currentCard = quizContainer.querySelector('.question-card');
            if (currentCard) {
                currentCard.classList.add('slide-out');
                
                // Sau khi ẩn xong, hiển thị card mới
                setTimeout(() => {
                    const questionHtml = `
                        <div class="question-card slide-in">
                            <div class="text-xs text-blue-600 font-semibold mb-1">${questionData.subject}</div>
                            <div class="text-sm font-semibold text-gray-800">${questionData.question}</div>
                            <div class="space-y-2">
                                ${questionData.options.map((option, index) => `
                                    <div class="flex items-center space-x-2 p-2 rounded border option" data-answer="${option}">
                                        <span class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">${option}</span>
                                        <span class="text-sm">${questionData.answers[index]}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                    quizContainer.innerHTML = questionHtml;
                }, 300); // Đợi animation slide-out hoàn thành
            }
        }
    }
    
    // Reset tất cả options về trạng thái ban đầu
    function resetOptions() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            const circle = option.querySelector('span');
            circle.className = 'w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold';
            option.className = 'flex items-center space-x-2 p-2 rounded border option';
        });
    }
    
    // Auto khoanh đáp án đúng với animation mượt mà
    function autoKhoanh() {
        const currentQuestion = questions[currentQuestionIndex];
        resetOptions();
        
        // Tìm option có đáp án đúng
        const correctOption = document.querySelector(`[data-answer="${currentQuestion.correct}"]`);
        if (correctOption) {
            const circle = correctOption.querySelector('span');
            
            // Animation khoanh đáp án với hiệu ứng đẹp
            setTimeout(() => {
                // Hiệu ứng scale và màu sắc
                circle.style.transform = 'scale(1.2)';
                circle.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    circle.className = 'w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white';
                    correctOption.className = 'flex items-center space-x-2 p-2 rounded border-2 border-green-500 bg-green-50 option';
                    circle.style.transform = 'scale(1)';
                    
                    // Thêm hiệu ứng pulse và glow
                    circle.style.animation = 'pulse 0.6s ease-in-out, glow 1s ease-in-out';
                    correctOption.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.3)';
                }, 200);
            }, 800);
        }
    }
    
    // Chuyển sang câu hỏi tiếp theo
    function nextQuestion() {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        displayQuestion(questions[currentQuestionIndex]);
    }
    
    // Bắt đầu với câu hỏi đầu tiên
    displayQuestion(questions[0], true);
    
    // Bắt đầu auto khoanh sau 1.5 giây
    setTimeout(() => {
        autoKhoanh();
    }, 1500);
    
    // Lặp lại mỗi 3 giây (hiển thị câu mới + auto khoanh)
    setInterval(() => {
        nextQuestion();
        setTimeout(() => {
            autoKhoanh();
        }, 800);
    }, 3000);
}

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up
            console.log('Swipe up detected');
        } else {
            // Swipe down
            console.log('Swipe down detected');
        }
    }
}

// Testimonials Carousel với Swiper
function initTestimonialsCarousel() {
    // Tạo lại cấu trúc HTML cho Swiper
    const swiperContainer = document.querySelector('.testimonials-swiper .swiper-wrapper');
    if (!swiperContainer) return;
    
    // Lấy tất cả testimonials
    const testimonials = swiperContainer.querySelectorAll('.bg-white.rounded-2xl');
    if (testimonials.length === 0) return;
    
    // Xóa nội dung cũ
    swiperContainer.innerHTML = '';
    
    // Tạo slides mới - mỗi feedback là một slide
    testimonials.forEach(testimonial => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.appendChild(testimonial.cloneNode(true));
        swiperContainer.appendChild(slide);
    });
    
    // Khởi tạo Swiper
    const swiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}


// Feedback Form
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    const starRatings = document.querySelectorAll('.star-rating');
    let selectedRating = 0;

    // Star rating functionality
    starRatings.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStarDisplay();
        });

        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
        });
    });

    // Reset stars on mouse leave
    const starContainer = document.querySelector('.flex.space-x-2.mb-4');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', () => {
            updateStarDisplay();
        });
    }

    function updateStarDisplay() {
        starRatings.forEach((star, index) => {
            if (index < selectedRating) {
                star.classList.add('text-yellow-500');
                star.classList.remove('text-gray-400');
            } else {
                star.classList.add('text-gray-400');
                star.classList.remove('text-yellow-500');
            }
        });
    }

    function highlightStars(rating) {
        starRatings.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('text-yellow-500');
                star.classList.remove('text-gray-400');
            } else {
                star.classList.add('text-gray-400');
                star.classList.remove('text-yellow-500');
            }
        });
    }

    // Form submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('feedback-name').value;
            const major = document.getElementById('feedback-major').value;
            const message = document.getElementById('feedback-message').value;

            if (!message.trim()) {
                alert('Vui lòng nhập feedback của bạn!');
                return;
            }

            if (selectedRating === 0) {
                alert('Vui lòng đánh giá sao!');
                return;
            }

            // Giả lập gửi feedback thành công
            alert('Cảm ơn bạn đã gửi feedback! Chúng tôi sẽ xem xét và có thể sử dụng để cải thiện dịch vụ.');
            
            // Reset form
            feedbackForm.reset();
            selectedRating = 0;
            updateStarDisplay();
        });
    }
}
