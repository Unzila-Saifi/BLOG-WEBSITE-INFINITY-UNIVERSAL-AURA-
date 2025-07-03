//nav-bar
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close-btn");

  // Navbar and sidebar with same menu 
  const menuItems = document.getElementById("menu-items").innerHTML;
  document.getElementById("nav-links").innerHTML = menuItems;
  document.getElementById("sidebar-links").innerHTML = menuItems;

  // Sidebar open 
  menuToggle.addEventListener("click", function () {
      sidebar.style.left = "0";
      sidebar.style.visibility = "visible";
  });

  // Sidebar close 
  closeBtn.addEventListener("click", function () {
      sidebar.style.left = "-100%";
      sidebar.style.visibility = "hidden";
  });

  //  when Screen resize sidebar automatically close
  window.addEventListener("resize", function () {
      if (window.innerWidth > 768) { 
          sidebar.style.left = "-100%";
          sidebar.style.visibility = "hidden";
      }
  });
});

// image slider
let currentIndex = 0;

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slider = document.querySelector('.slider');
const cards = document.querySelectorAll('.card');

// Update the slider position and button states
function updateSlider() {
  // Calculate card width including horizontal margins (30px total)
  const cardWidth = cards[0].offsetWidth + 30;
  // Get the slider container width
  const containerWidth = document.querySelector('.slider-container').offsetWidth;
  // Determine how many cards are visible at once
  const visibleCards = Math.floor(containerWidth / cardWidth);
  // Calculate the maximum index to move so the last card is fully visible
  const maxIndex = cards.length - visibleCards;
  
  // Update the slider transform property
  slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
  
  // Enable/disable navigation buttons
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex >= maxIndex;
}

// Function to move the slider by one card
function moveSlide(step) {
  const cardWidth = cards[0].offsetWidth + 30;
  const containerWidth = document.querySelector('.slider-container').offsetWidth;
  const visibleCards = Math.floor(containerWidth / cardWidth);
  const maxIndex = cards.length - visibleCards;

  // Prevent moving beyond boundaries
  if ((step === 1 && currentIndex >= maxIndex) || (step === -1 && currentIndex === 0)) {
    return;
  }

  currentIndex += step;
  updateSlider();
}

// Event listeners for navigation buttons
prevButton.addEventListener('click', () => moveSlide(-1));
nextButton.addEventListener('click', () => moveSlide(1));

// Initial slider setup
updateSlider();

//  view count
document.addEventListener("DOMContentLoaded", function () {
  
    const readMoreButtons = document.querySelectorAll(".read_more");

    readMoreButtons.forEach((button) => {
        button.addEventListener("click", function () {
           
            const miniCard = button.closest(".mini-card");
            const viewCountSpan = miniCard.querySelector(".view-count");


            let currentCount = parseInt(viewCountSpan.textContent, 10);
            viewCountSpan.textContent = currentCount + 1;
        });
    });
});

// comment box for comment

// Open Comment Section
document.querySelectorAll('.open-comments').forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.mini-card').querySelector('.comment-section').style.bottom = '0';
    });
});

// Close Comment Section
document.querySelectorAll('.close-comments').forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.comment-section').style.bottom = '-100%';
    });
});

// Update total comment count
function updateCommentCount(section) {
    let count = section.querySelectorAll('.comment').length;
    section.querySelector('.comment-count').textContent = count;

    // Update count next to comment icon
    let card = section.closest('.mini-card');
    if (card) {
        let commentIcon = card.querySelector('.open-comments .comment-icon-count');
        if (commentIcon) {
            commentIcon.textContent = count;
        }
    }
}

// Add comment
document.querySelectorAll('.send-comment').forEach(button => {
    button.addEventListener('click', function () {
        let section = this.closest('.comment-section');
        let commentText = section.querySelector('.new-comment').value;
        if (commentText.trim() === '') return;

        let commentContainer = section.querySelector('.comments-container');
        let commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <p><strong>You:</strong> ${commentText}</p>
            <div class="comment-actions">
                <span class="reply-btn">Reply (<span class="reply-count">0</span>)</span>
                <div class="like-section">
                    <span class="like-btn">\u2764\uFE0F:</span>
                    <span class="like-count">0</span>
                </div>
            </div>
            <div class="reply-container" style="display: none;">
                <input type="text" class="reply-input" placeholder="Write a reply...">
                <button class="send-reply"><i class="fa-solid fa-arrow-up"></i></button>
            </div>
            <div class="replies">
                <span class="show-replies" style="display: none;">View Replies</span>
                <div class="replies-list"></div>
            </div>
        `;

        commentContainer.appendChild(commentDiv);
        section.querySelector('.new-comment').value = '';
        addCommentEvents(commentDiv);
        updateCommentCount(section);
    });
});

// Add like and reply functionality
function addCommentEvents(commentDiv) {
    let likeBtn = commentDiv.querySelector('.like-btn');
    let likeCount = commentDiv.querySelector('.like-count');
    let replyBtn = commentDiv.querySelector('.reply-btn');
    let replyContainer = commentDiv.querySelector('.reply-container');
    let sendReplyBtn = commentDiv.querySelector('.send-reply');
    let replyInput = commentDiv.querySelector('.reply-input');
    let replyCount = commentDiv.querySelector('.reply-count');
    let showRepliesBtn = commentDiv.querySelector('.show-replies');
    let repliesList = commentDiv.querySelector('.replies-list');

    likeBtn.addEventListener('click', function () {
        let count = parseInt(likeCount.textContent);
        likeCount.textContent = count + 1;
    });

    replyBtn.addEventListener('click', function () {
        replyContainer.style.display = replyContainer.style.display === 'block' ? 'none' : 'block';
    });

    sendReplyBtn.addEventListener('click', function () {
        let replyText = replyInput.value;
        if (replyText.trim() === '') return;

        let replyDiv = document.createElement('div');
        replyDiv.classList.add('reply');
        replyDiv.innerHTML = `
            <p><strong>You:</strong> ${replyText}</p>
            <div class="like-section">
                <span class="reply-like-btn">\u2764\uFE0F:</span>
                <span class="reply-like-count">0</span>
            </div>
        `;

        repliesList.appendChild(replyDiv);
        replyInput.value = '';

        let replyLikeBtn = replyDiv.querySelector('.reply-like-btn');
        let replyLikeCount = replyDiv.querySelector('.reply-like-count');

        replyLikeBtn.addEventListener('click', function () {
            let count = parseInt(replyLikeCount.textContent);
            replyLikeCount.textContent = count + 1;
        });

        let count = parseInt(replyCount.textContent);
        replyCount.textContent = count + 1;
        showRepliesBtn.style.display = 'block';
    });

    showRepliesBtn.addEventListener('click', function () {
        let isVisible = repliesList.style.display === 'block';
        repliesList.style.display = isVisible ? 'none' : 'block';
        showRepliesBtn.textContent = isVisible ? 'View Replies' : 'Hide Replies';
    });
}

//blog card like counting

  document.addEventListener("DOMContentLoaded", function () {
      // Like Button Functionality
      document.querySelectorAll(".blog_like_button").forEach(button => {
          button.addEventListener("click", function () {
              let likeCountSpan = this.querySelector(".like-count");
              let currentCount = parseInt(likeCountSpan.innerText) || 0;
              likeCountSpan.innerText = currentCount + 1; //  Count Increment
          });
      });

      //  View Count Increment (On Page Load)
      document.querySelectorAll(".view-count").forEach(viewSpan => {
          let currentCount = parseInt(viewSpan.innerText) || 0;
          viewSpan.innerText = currentCount + 1; // Auto-Increment Views
      });

      document.querySelectorAll(".open-comments").forEach(commentButton => {
          commentButton.addEventListener("click", function () {
              let commentCountSpan = this.querySelector(".comment-icon-count");
              let currentCount = parseInt(commentCountSpan.innerText) || 0;
              commentCountSpan.innerText = currentCount + 1; // Count Increment
           });
      });
  });