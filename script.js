// Demo version - No PHP, all static data

// Sample data for demonstration
const sampleData = {
  recipes: [
    {
      title: "Mediterranean Pasta Salad",
      image_url: "../Resources/images/12.jpg",
      description: "A refreshing pasta salad with olives, feta, and sun-dried tomatoes.",
      cuisine: "Italian",
      diet: "Vegetarian",
      difficulty: "Easy",
      time: "25 mins"
    },
    {
      title: "Thai Green Curry",
      image_url: "../Resources/images/13.jpg",
      description: "Aromatic and spicy curry with coconut milk and fresh vegetables.",
      cuisine: "Thai",
      diet: "Vegan",
      difficulty: "Medium",
      time: "40 mins"
    },
    {
      title: "Beef Wellington",
      image_url: "../Resources/images/14.jpg",
      description: "Classic British dish with tender beef wrapped in puff pastry.",
      cuisine: "British",
      diet: "None",
      difficulty: "Hard",
      time: "2 hrs 30 mins"
    }
  ],
  
  communityPosts: [
    {
      id: 1,
      username: "chef_alex",
      caption: "Made this amazing Somtum today! #homemade",
      image_path: "../Resources/images/recipes/som-tum.jpg",
      like_count: 24,
      comment_count: 5,
      created_at: "2025-05-15",
      comments: [
        { username: "food_lover", text: "Looks delicious!" },
        { username: "cooking_novice", text: "Can you share the recipe?" }
      ]
    },
    {
      id: 2,
      username: "maria_cooks",
      caption: "Fresh bread straight from the oven 🥖",
      image_path: "../Resources/images/recipes/bruschetta.jpg",
      like_count: 42,
      comment_count: 8,
      created_at: "2025-05-14",
      comments: [
        { username: "baker_queen", text: "Perfect crust!" }
      ]
    }
  ],
  
  users: [
    { email: "demo@foodfusion.com", password: "demo123" }
  ]
};

// Cookie Consent Logic
window.addEventListener("load", () => {
  // Check if user is new (no session and not dismissed welcome modal)
  const isNewUser = !localStorage.getItem("welcomeModalDismissed") && !localStorage.getItem("cookiesAccepted");

  // Show cookie consent if not accepted
  if (!localStorage.getItem("cookiesAccepted")) {
    document.getElementById("cookieConsent").style.display = "block";
  }

  // Show welcome modal for new users
  if (isNewUser) {
    document.getElementById("joinModal").style.display = "block";
  }

  // Cookie consent buttons
  document.getElementById("acceptCookies").onclick = () => {
    localStorage.setItem("cookiesAccepted", "true");
    document.getElementById("cookieConsent").style.display = "none";
  };

  document.getElementById("declineCookies").onclick = () => {
    document.getElementById("cookieConsent").style.display = "none";
  };

  // Close welcome modal handler
  const welcomeCloseBtn = document.querySelector(".welcome-modal .close-modal");
  if (welcomeCloseBtn) {
    welcomeCloseBtn.onclick = () => {
      const modal = document.getElementById("joinModal");
      if (modal) modal.style.display = "none";
      localStorage.setItem("welcomeModalDismissed", "true");
    };
  }

  document.getElementById("mobile-menu").addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
  });
  
  // Initialize page-specific functions
  if (window.location.pathname.includes('recipes.html')) {
    displayRecipes();
  }
  
  if (window.location.pathname.includes('community.html')) {
    loadCommunityContent();
  }
  
  checkLoginStatus();
});

// Modal Controls
function closeModals() {
  document.querySelectorAll(".modal").forEach(m => {
    m.style.display = "none";
    if (m.classList.contains("welcome-modal")) {
      localStorage.setItem("welcomeModalDismissed", "true");
    }
  });
}

window.onclick = function (event) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (event.target === modal) modal.style.display = "none";
  });
};

document.querySelectorAll(".close-modal").forEach(btn => {
  btn.addEventListener("click", closeModals);
});

document.getElementById("joinBtn")?.addEventListener("click", () => {
  document.getElementById("joinModal").style.display = "block";
});

document.getElementById("loginBtn")?.addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "block";
});

document.getElementById("joinHeroBtn")?.addEventListener("click", () => {
  document.getElementById("joinModal").style.display = "block";
});

document.getElementById("joinCtaBtn")?.addEventListener("click", () => {
  document.getElementById("joinModal").style.display = "block";
});

// Show Login handler
document.getElementById("showLogin")?.addEventListener("click", (e) => {
  e.preventDefault();
  closeModals();
  document.getElementById("loginModal").style.display = "block";
});

// Forgot password link opens the reset modal
document.getElementById("forgotPasswordLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  closeModals();
  document.getElementById("forgotPasswordModal").style.display = "block";
});

// Switch between login and join modals
document.getElementById("switchToLogin")?.addEventListener("click", (e) => {
  e.preventDefault();
  closeModals();
  document.getElementById("loginModal").style.display = "block";
});

document.getElementById("switchToJoin")?.addEventListener("click", (e) => {
  e.preventDefault();
  closeModals();
  document.getElementById("joinModal").style.display = "block";
});

// Registration handler (demo version)
async function handleFormSubmission(formData) {
  // Simulate successful registration
  setTimeout(() => {
    closeModals();
    alert("Welcome! Your account has been created. (Demo version - no data saved)");
  }, 500);
}

// For the welcome form
const welcomeJoinForm = document.getElementById("welcome-joinForm");
if (welcomeJoinForm) {
  welcomeJoinForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    alert("Registration successful! (Demo version)");
    closeModals();
  });
}

// For the regular join form
const joinForm = document.getElementById("joinForm");
if (joinForm) {
  joinForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    alert("Registration successful! (Demo version)");
    closeModals();
  });
}

// Login handler (demo version)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    // Demo login - accept any credentials
    setTimeout(() => {
      // Store login state in localStorage for demo
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      
      closeModals();
      alert("Login successful! (Demo version)");
      
      // Update UI
      const authButtons = document.getElementById("authButtons");
      const userProfile = document.getElementById("userProfile");
      const profileEmail = document.getElementById("profileEmail");
      
      if (authButtons) authButtons.style.display = "none";
      if (userProfile) userProfile.style.display = "block";
      if (profileEmail) profileEmail.textContent = email;
      
      if (window.location.pathname.includes("community.html")) {
        loadCommunityContent();
      }
    }, 500);
  });
}

// Reset Password Functionality (demo)
const resetPasswordForm = document.getElementById("resetPasswordForm");
if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const messageBox = document.getElementById("resetMessage");
    
    messageBox.textContent = "Password reset email sent! (Demo version)";
    messageBox.style.color = "green";
    setTimeout(() => {
      closeModals();
    }, 1500);
  });
}

// Dropdown toggle functionality
const profileDropdown = document.getElementById('profileDropdown');
if (profileDropdown) {
    profileDropdown.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle('show');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function() {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
    });
});

// Logout handler
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userEmail");
    
    const authButtons = document.getElementById("authButtons");
    const userProfile = document.getElementById("userProfile");
    
    if (authButtons) authButtons.style.display = "flex";
    if (userProfile) userProfile.style.display = "none";
    
    alert("Logged out successfully");
    
    if (window.location.pathname.includes("community.html")) {
      loadCommunityContent();
    }
  });
}

// Recipe Search and Filter (demo)
// Recipe Search and Filter (demo) - Loading images directly from Resources
function displayRecipes() {
  const container = document.getElementById('recipeResults');
  if (!container) return;
  
  const searchEl = document.getElementById('searchBox');
  const cuisineEl = document.getElementById('filterCuisine');
  const dietEl = document.getElementById('filterDiet');
  const difficultyEl = document.getElementById('filterDifficulty');
  
  if (!searchEl || !cuisineEl || !dietEl || !difficultyEl) return;

  const search = searchEl.value.toLowerCase();
  const cuisine = cuisineEl.value;
  const diet = dietEl.value;
  const difficulty = difficultyEl.value;

  let filtered = sampleData.recipes.filter(recipe => {
    return (search === '' || recipe.title.toLowerCase().includes(search)) &&
           (cuisine === '' || recipe.cuisine === cuisine) &&
           (diet === '' || recipe.diet === diet) &&
           (difficulty === '' || recipe.difficulty === difficulty);
  });

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = '<p class="text-center">No recipes found matching your criteria.</p>';
    return;
  }

  filtered.forEach(recipe => {
    const card = `
      <div class="recipe-card">
        <div class="recipe-image">
          <img src="${recipe.image_url}" alt="${recipe.title}">
          <span class="difficulty ${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
        </div>
        <div class="recipe-info">
          <h3>${recipe.title}</h3>
          <div class="recipe-meta">
            <span><i class="fas fa-clock"></i> ${recipe.time}</span>
            <span><i class="fas fa-utensils"></i> ${recipe.cuisine}</span>
          </div>
          <p>${recipe.description}</p>
          <button class="btn btn-outline" onclick="alert('View recipe feature coming soon!')">View Recipe</button>
        </div>
      </div>`;
    container.innerHTML += card;
  });
}

// Recipe filter event listeners
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById('searchBox')?.addEventListener('input', displayRecipes);
  document.getElementById('filterCuisine')?.addEventListener('change', displayRecipes);
  document.getElementById('filterDiet')?.addEventListener('change', displayRecipes);
  document.getElementById('filterDifficulty')?.addEventListener('change', displayRecipes);
});

// Check login state and update navbar
function checkLoginStatus() {
    const authButtons = document.getElementById("authButtons");
    const userProfile = document.getElementById("userProfile");
    const profileEmail = document.getElementById("profileEmail");
    
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    const email = localStorage.getItem("userEmail") || "user@demo.com";

    if (isLoggedIn) {
        if (authButtons) authButtons.style.display = "none";
        if (userProfile) userProfile.style.display = "block";
        if (profileEmail) profileEmail.textContent = email;
    } else {
        if (authButtons) authButtons.style.display = "flex";
        if (userProfile) userProfile.style.display = "none";
    }
}

// ===== COMMUNITY COOKBOOK FUNCTIONALITY (demo) ===== //

// Load community content when page loads
if (window.location.pathname.includes('community.html')) {
    document.addEventListener('DOMContentLoaded', loadCommunityContent);
}

async function loadCommunityContent() {
    const communityContent = document.getElementById('communityContent');
    if (!communityContent) return;
    
    communityContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading community...</div>';

    try {
        const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

        let html = '';

        // Add post form for logged in users
        if (isLoggedIn) {
            html += `
                <div class="post-form">
                    <h3>Share Your Recipe</h3>
                    <form id="communityPostForm" enctype="multipart/form-data">
                        <div class="form-group">
                            <textarea name="caption" placeholder="Share your cooking experience..." required></textarea>
                        </div>
                        <div class="form-group">
                            <input type="file" name="image" id="imageInput" accept="image/*">
                        </div>
                        <div class="form-group">
                            <img id="imagePreview" src="#" alt="Image Preview" style="display:none; max-width: 300px; max-height: 300px;"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Post</button>
                    </form>
                </div>
            `;
        } else {
            html += `
                <div class="login-prompt">
                    <p>Please <a href="../index.html">sign in</a> to share your recipes and interact with the community.</p>
                </div>
            `;
        }

        // Add posts feed
        html += '<div class="posts-feed">';
        sampleData.communityPosts.forEach(post => {
            html += `
                <div class="post-card" data-post-id="${post.id}">
                    <div class="post-header">
                        <div class="post-user">
                            <i class="fas fa-user-circle"></i>
                            <span>${post.username}</span>
                        </div>
                        <div class="post-time">
                            ${post.created_at}
                        </div>
                    </div>
                    
                    <div class="post-image">
                     <img src="${post.image_path}" alt="Recipe image">
                    </div>
                    
                    <div class="post-caption">
                        <p>${post.caption}</p>
                    </div>
                    
                    <div class="post-actions">
                        <a href="#" class="like-btn" data-post-id="${post.id}">
                            <i class="fas fa-heart"></i> 
                            <span class="like-count">${post.like_count}</span>
                        </a>
                        <a href="#" class="comment-btn">
                            <i class="fas fa-comment"></i> 
                            <span>${post.comment_count}</span>
                        </a>
                    </div>
                    
                    <div class="post-comments">
                    ${post.comments.map(comment => `
                    <div class="comment">
                    <strong>${comment.username}:</strong> ${comment.text}
                    </div>
                    `).join('')}
                    ${isLoggedIn ? 
                      `<form class="comment-form" data-post-id="${post.id}">
                          <input type="text" name="comment" placeholder="Write a comment..." required />
                          <button type="submit" class="btn btn-outline">Comment</button>
                       </form>` : ''}
                    </div>
                  </div>`;
        });
        html += '</div>';

        communityContent.innerHTML = html;

        //comment form handlers
        document.querySelectorAll('.comment-form').forEach(form => {
          form.addEventListener('submit', async function (e) {
            e.preventDefault();
            if (!isLoggedIn) {
              alert('Please log in to comment');
              return;
            }
            alert('Comment added! (Demo version)');
            this.reset();
          });
        });

        // Post form handler
        if (isLoggedIn) {
            const postForm = document.getElementById('communityPostForm');
            if (postForm) {
                postForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Post created! (Demo version)');
                    this.reset();
                    document.getElementById('imagePreview').style.display = 'none';
                });
            }
            
            const imageInput = document.getElementById('imageInput');
            const imagePreview = document.getElementById('imagePreview');
            if (imageInput && imagePreview) {
              imageInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                  };
                  reader.readAsDataURL(file);
                } else {
                  imagePreview.src = '#';
                  imagePreview.style.display = 'none';
                }
              });
            }
          }
          
        if (communityContent) {
          communityContent.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('.like-btn');
            if (likeBtn) {
              e.preventDefault();
              if (!isLoggedIn) {
                alert('Please log in to like posts');
                return;
              }
              const likeCount = likeBtn.querySelector('.like-count');
              const currentCount = parseInt(likeCount.textContent);
              if (likeBtn.classList.contains('liked')) {
                likeBtn.classList.remove('liked');
                likeCount.textContent = currentCount - 1;
              } else {
                likeBtn.classList.add('liked');
                likeCount.textContent = currentCount + 1;
              }
            }
         });
        }

    } catch (error) {
        communityContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Failed to load community posts. Please try again later.
            </div>
        `;
        console.error('Error loading community content:', error);
    }
}

// Contact Us Form Submission (demo)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const messageBox = document.getElementById("contactMessage");
    
    messageBox.textContent = "Thank you! Your message has been received. (Demo version)";
    messageBox.style.display = "block";
    messageBox.style.color = "green";
    contactForm.reset();
    
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000);
  });
}

// Newsletter form handler
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing! (Demo version)');
    this.reset();
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});