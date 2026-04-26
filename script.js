
// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
  ring.style.left = mx - 18 + 'px';
  ring.style.top = my - 18 + 'px';
});

document.querySelectorAll('a,button,.project-card,.skill-category').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; ring.style.transform = 'scale(1.5)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)'; });
});

// SCROLL PROGRESS
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-progress').style.width = scrolled + '%';
});

// CANVAS BACKGROUND (animated neural network)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

const nodes = [];
const N = 60;
for (let i = 0; i < N; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1
  });
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,245,196,0.6)';
    ctx.fill();
  });
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0,245,196,${0.15 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawCanvas);
}
drawCanvas();

// TYPED EFFECT
const phrases = ['Data Scientist', 'ML Engineer', 'AI Researcher', 'Python Developer', 'Insight Generator'];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const word = phrases[pi];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// INTERSECTION OBSERVER
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      // Animate timeline
      if (e.target.classList.contains('timeline-item')) {
        e.target.classList.add('visible');
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => io.observe(el));

// COUNTER ANIMATION
function animateCounter(el) {
  const target = +el.dataset.target;
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 25);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(animateCounter);
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObs.observe(statsEl);

// NAV MOBILE
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ACTIVE NAV
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

// FORM SUBMIT

// document.getElementById('sendBtn').addEventListener('click', () => {
//   const name = document.getElementById('fName').value;
//   const email = document.getElementById('fEmail').value;
//   const subject = document.getElementById('fSubject').value;
//   const message = document.getElementById('fMessage').value;

//   if (!name || !email || !message) {
//     alert('Please fill in your name, email, and message.');
//     return;
//   }

//   // Your email where messages should be sent
//   const yourEmail = "shashwatnigam25@gmail.com";

//   // Create mailto link
//   const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject || "Portfolio Contact")}&body=${encodeURIComponent(
//     `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
//   )}`;

//   // Open email client
//   window.location.href = mailtoLink;

//   // Toast message
//   const toast = document.getElementById('toast');
//   toast.classList.add('show');

//   setTimeout(() => toast.classList.remove('show'), 3500);

//   // Clear form
//   document.getElementById('fName').value = '';
//   document.getElementById('fEmail').value = '';
//   document.getElementById('fSubject').value = '';
//   document.getElementById('fMessage').value = '';
// });






document.getElementById('sendBtn').addEventListener('click', () => {
  const name = document.getElementById('fName').value;
  const email = document.getElementById('fEmail').value;
  const subject = document.getElementById('fSubject').value;
  const message = document.getElementById('fMessage').value;

  if (!name || !email || !message) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  const yourEmail = "shashwatnigam25@gmail.com";

  const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(
    subject || "Portfolio Contact"
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;

  // Opens in same browser tab
  window.open(mailtoLink, "_self");

  // Toast message
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);

  // Clear form
  document.getElementById('fName').value = '';
  document.getElementById('fEmail').value = '';
  document.getElementById('fSubject').value = '';
  document.getElementById('fMessage').value = '';
});



// RESUME DOWNLOAD
// Resume download using Google Drive link

document.getElementById('downloadResume').addEventListener('click', function () {
  window.open(
    'https://drive.google.com/uc?export=download&id=1yuzpmbAnT_amKl7Z018BiCY29B6N6Rrt',
    '_blank'
  );
});
