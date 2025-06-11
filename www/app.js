function showCalculator(name, buttonElement) {
  const tile = buttonElement.parentElement; // Get the parent tile element
  const isExpanded = tile.classList.contains('expanded'); // Check if already expanded

  if (isExpanded) {
    // Add collapsing class for animation
    tile.classList.remove('expanded');
    tile.classList.add('collapsing');

    // Wait for the animation to complete before clearing content
    setTimeout(() => {
      tile.classList.remove('collapsing');
      const calculatorContent = tile.querySelector('.calculator-content');
      calculatorContent.innerHTML = ''; // Clear calculator content
      calculatorContent.style.display = 'none'; // Hide the content after clearing
    }, 300); // Match the CSS transition duration (0.3s)
  } else {
    // Expand the tile and load the calculator
    const calculatorContent = tile.querySelector('.calculator-content');
    calculatorContent.style.display = 'block'; // Ensure content is visible
    tile.classList.add('expanded');
    fetch(`calculators/${name}.html`)
      .then(response => response.text())
      .then(data => {
        calculatorContent.innerHTML = data;

        const script = document.createElement('script');
        script.src = `calculators/${name}.js`;
        document.body.appendChild(script);
      })
      .catch(err => console.error('Error loading calculator:', err));
  }
}
