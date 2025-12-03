// ===== DOM Elements =====
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")
const contactForm = document.getElementById("contactForm")
const successModal = document.getElementById("successModal")

// ===== Navigation Scroll Effect =====
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  // Add/remove scrolled class
  if (currentScroll > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
  document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : ""
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = ""
  })
})

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ===== Scroll Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll(
  ".service-card, .sale-card, .portfolio-card, .section-header, .hero-content, .hero-visual, .contact-info, .contact-form-wrapper",
)

animateElements.forEach((el) => {
  el.classList.add("fade-in")
  observer.observe(el)
})

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll("section[id]")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// ===== Form Submission Handler =====
// Update the _next field with current URL for redirect after submission
const nextInput = contactForm.querySelector('input[name="_next"]')
if (nextInput) {
  nextInput.value = window.location.href
}

// Show success modal on form submission (when returning from FormSubmit)
if (window.location.search.includes("success") || document.referrer.includes("formsubmit.co")) {
  showModal()
}

function showModal() {
  successModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  successModal.classList.remove("active")
  document.body.style.overflow = ""
  // Clean URL
  if (window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname)
  }
}

// Close modal on backdrop click
successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    closeModal()
  }
})

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && successModal.classList.contains("active")) {
    closeModal()
  }
})

// ===== Button Ripple Effect =====
const buttons = document.querySelectorAll(".btn")

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect()
    const ripple = document.createElement("span")

    ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `

    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = e.clientX - rect.left - size / 2 + "px"
    ripple.style.top = e.clientY - rect.top - size / 2 + "px"

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})

// Add ripple animation keyframes
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// ===== Parallax Effect on Hero =====
const heroCard = document.querySelector(".hero-card")

if (heroCard && window.innerWidth > 768) {
  window.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50
    const y = (window.innerHeight / 2 - e.pageY) / 50

    heroCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`
  })
}

// ===== Loading Animation =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger initial animations
  setTimeout(() => {
    document.querySelectorAll(".hero-content, .hero-visual").forEach((el) => {
      el.classList.add("visible")
    })
  }, 100)
})

// ===== Console Welcome Message =====
console.log("%c Welcome to Devnix! 🚀", "color: #007AFF; font-size: 20px; font-weight: bold;")
console.log("%c Built with passion by Ayomide Emmanuel", "color: #6E6E73; font-size: 14px;")
