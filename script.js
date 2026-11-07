
// =====================================
// 森境空間設計 SENJING INTERIOR
// Website Interactive Functions
// =====================================

document.addEventListener("DOMContentLoaded", function () {

  // 1. 手機版選單
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. 作品集分類篩選
  const filterButtons = document.querySelectorAll(".filter-btn");
  const workCards = document.querySelectorAll(".work-card");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      const filter = button.dataset.filter;

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      workCards.forEach(function (card) {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });

    });
  });

  // 3. 滾動淡入效果
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });

    }, {
      threshold: 0.12
    });

    revealElements.forEach(function (element) {
      observer.observe(element);
    });

  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  // 4. 回到頂端按鈕
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {

    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

  }

  // 5. 自動更新年份
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 6. 圖片載入失敗提示
  document.querySelectorAll(".work-image img").forEach(function (img) {
    img.addEventListener("error", function () {
      console.error("圖片載入失敗：" + img.src);
    });
  });

  console.log("森境空間設計網站已成功載入！");

  // 7. 客戶設計諮詢表單
  const consultationForm = document.getElementById("consultationForm");

  if (consultationForm) {
    consultationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("customerName").value.trim();
      const phone = document.getElementById("customerPhone").value.trim();
      const space = document.getElementById("spaceType").value;
      const budget = document.getElementById("customerBudget").value;
      const message = document.getElementById("customerMessage").value.trim();

      if (!name || !phone || !space || !budget) {
        alert("請完整填寫姓名、電話、空間類型及預算！");
        return;
      }

      const subject = "森境空間設計｜客戶設計諮詢";

      const body =
        "客戶姓名：" + name + "\n" +
        "聯絡電話：" + phone + "\n" +
        "空間類型：" + space + "\n" +
        "預算範圍：" + budget + "\n" +
        "設計需求：" + (message || "尚未填寫");

      const email =
        "mailto:taiwanese10103@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = email;
    });
  }

});


/* 作品圖片點擊放大功能 */
function enableImageZoom() {
    const images = document.querySelectorAll(".work-image img");

    images.forEach(function (img) {
        img.style.cursor = "zoom-in";

        img.addEventListener("click", function () {
            const overlay = document.createElement("div");

            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99999;
                cursor: zoom-out;
                padding: 20px;
            `;

            const largeImage = document.createElement("img");
            largeImage.src = img.src;

            largeImage.style.cssText = `
                max-width: 90%;
                max-height: 85vh;
                object-fit: contain;
            `;

            const closeButton = document.createElement("button");
            closeButton.textContent = "×";

            closeButton.style.cssText = `
                position: absolute;
                top: 15px;
                right: 25px;
                color: white;
                font-size: 45px;
                background: none;
                border: none;
                cursor: pointer;
            `;

            function closeZoom() {
                overlay.remove();
                document.removeEventListener("keydown", handleKey);
            }

            function handleKey(event) {
                if (event.key === "Escape") {
                    closeZoom();
                }
            }

            closeButton.addEventListener("click", closeZoom);

            overlay.addEventListener("click", function (event) {
                if (event.target === overlay) {
                    closeZoom();
                }
            });

            document.addEventListener("keydown", handleKey);

            overlay.appendChild(largeImage);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enableImageZoom);
} else {
    enableImageZoom();
}
