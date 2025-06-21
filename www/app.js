function showCalculator(name, buttonElement) {
  const tile = buttonElement.parentElement;
  const calculatorContent = tile.querySelector('.calculator-content');
  const isExpanded = tile.classList.contains('expanded');

  if (isExpanded) {
    tile.classList.remove('expanded');
    tile.classList.add('collapsing');

    setTimeout(() => {
      tile.classList.remove('collapsing');
      calculatorContent.innerHTML = '';
    }, 500); 
  } else {
    tile.classList.add('expanded');

    fetch(`calculators/${name}.html`)
      .then(response => response.text())
      .then(data => {
        calculatorContent.innerHTML = data;

        requestAnimationFrame(() => {
          calculatorContent.classList.add('visible');
        });

        const script = document.createElement('script');
        script.src = `calculators/${name}.js`;
        document.body.appendChild(script);
      })
      .catch(err => console.error('Error loading calculator:', err));
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("background-overlay");

  const isSidebarOpen = sidebar.style.left === "0px";

  if (isSidebarOpen) {
    sidebar.style.left = "-300px";
    overlay.style.display = "none";
  } else {
    sidebar.style.left = "0px";
    overlay.style.display = "block";
  }
}

function toggleSettings() {
    const settingsPage = document.getElementById("settings-page");
    
    const isVisible = settingsPage.style.right === "0px";

    if (isVisible) {
        settingsPage.style.right = "-150%";
    } else {
        settingsPage.style.right = "0px";
    }
}

function toggleAbout() {
    const aboutPage = document.getElementById("about-page");

    const isVisible = aboutPage.style.right === "0px";

    if (isVisible) {
        aboutPage.style.right = "-150%";
    } else {
        aboutPage.style.right = "0px";
    }
}

function filterTiles() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach(tile => {
        const tileName = tile.getAttribute("data-name").toLowerCase();
        const buttonText = tile.querySelector("button").textContent.toLowerCase();

        if (tileName.includes(searchInput) || buttonText.includes(searchInput)) {
            tile.style.display = "flex";
        } else {
            tile.style.display = "none"; 
        }
    });
}

function handleSettingsClick(sectionName) {
    alert(`You clicked on ${sectionName}`);
    // Add logic here to navigate or perform actions based on the section clicked
}

