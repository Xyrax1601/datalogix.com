// Carousel functionality
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function showSlide(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPrevSlide);

// Automatic slideshow
setInterval(showNextSlide, 4000); // Change slide every 4 seconds

// Initial carousel position
showSlide(currentIndex);

// Bio toggle functionality
const bioContents = document.querySelectorAll('.bio-content');
const teamMembers = document.querySelectorAll('.team-member');
const bioToggles = document.querySelectorAll('.bio-toggle');
const menuIcon = document.querySelector('.menu-icon');
const navButtons = document.querySelector('.nav-buttons');

document.addEventListener('click', (event) => {
    const isClickInside = event.target.closest('.team-member') || event.target.closest('.bio-content') || event.target.closest('.bio-toggle');
    
    if (!isClickInside) {
        // Close all open bio contents if the click is outside
        bioContents.forEach(bio => {
            bio.style.display = 'none';
            const teamMember = bio.closest('.team-member');
            const image = teamMember.querySelector('img');
            image.classList.remove('hidden');
        });
    }
});

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navButtons.classList.toggle('active');
});

bioToggles.forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        
        bioContents.forEach(bio => {
            if (bio !== button.nextElementSibling) {
                bio.style.display = 'none';
                const teamMember = bio.closest('.team-member');
                const image = teamMember.querySelector('img');
                image.classList.remove('hidden');
            }
        });

        const bioContent = button.nextElementSibling;
        const teamMember = button.closest('.team-member');
        const image = teamMember.querySelector('img');

        if (bioContent.style.display === 'block') {
            bioContent.style.display = 'none';
            image.classList.remove('hidden');
        } else {
            bioContent.style.display = 'block';
            image.classList.add('hidden');
        }
    });
});

document.querySelectorAll('.close-bio').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const bioContent = button.closest('.bio-content');
        const teamMember = button.closest('.team-member');
        const image = teamMember.querySelector('img');

        bioContent.style.display = 'none';
        image.classList.remove('hidden');
    });
});

// Chatbot functionality
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');
const closeChatbot = document.querySelector('.close-chatbot');
const sendButton = document.querySelector('.send-button');
const input = document.querySelector('.chatbot-input');
const messages = document.querySelector('.messages');

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    chatbotToggle.style.display = 'none';
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    chatbotToggle.style.display = 'block';
});

sendButton.addEventListener('click', () => {
    const messageText = input.value.trim();
    
    if (messageText) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = messageText;
        
        // Use DocumentFragment to batch updates
        const fragment = document.createDocumentFragment();
        fragment.appendChild(userMessage);
        
        messages.appendChild(fragment);
        
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.textContent = "Thank you for your message!";
            
            fragment.appendChild(botMessage);
            messages.appendChild(fragment);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    }
});

document.querySelectorAll('.question-button').forEach(button => {
    button.addEventListener('click', function () {
        const response = this.getAttribute('data-response');
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = this.textContent;
        
        const fragment = document.createDocumentFragment();
        fragment.appendChild(userMessage);

        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.textContent = response;
            
            fragment.appendChild(botMessage);
            messages.appendChild(fragment);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
        
        this.style.display = 'none';
    });
});
