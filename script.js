
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

});

