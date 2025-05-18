// 🔧 Set this to 1, 2, or any module number you want to load
const queryParams = new URLSearchParams(window.location.search);
const moduleNumber = queryParams.get("module") || "1";  // Default to 1 if not provided
const jsonPath = `data/module${moduleNumber}.json`;

fetch(jsonPath)
  .then(response => response.json()) 
  .then(data => {
    // Set the module title
    document.getElementById("module-title").textContent = data.title;

    // Get containers
    const toc = document.getElementById("module-toc");
    const contentContainer = document.getElementById("module-content");

    // Loop through each section in the module
    data.sections.forEach((section, index) => {
      const sectionElement = document.createElement("section");
      sectionElement.classList.add("module-section");

      // Create section heading
      const heading = document.createElement("h2");
      heading.textContent = section.heading;

      // Set a unique ID so the ToC can link to it
      const sectionId = `section-${index}`;
      heading.id = sectionId;

      // Create content body
      const body = document.createElement("div");
      body.classList.add("module-body");
      body.innerHTML = section.content;

      // Append heading and content to the section
      sectionElement.appendChild(heading);
      sectionElement.appendChild(body);
      contentContainer.appendChild(sectionElement);

      // Create the ToC link
      const tocLink = document.createElement("a");
      tocLink.href = `#${sectionId}`;
      tocLink.textContent = section.heading;
      tocLink.classList.add("toc-link");
      toc.appendChild(tocLink);
    });
    // Add the quiz link at the end of the ToC
    const quizLink = document.createElement("a");
    quizLink.href = 'quiz.html?module=${moduleNumber}'; // Link to your quiz page
    quizLink.textContent = "Take the Quiz";
    quizLink.className = 'toc-quiz-link';
    toc.appendChild(quizLink);

  })
  .catch(error => {
    console.error("Error loading module:", error);
    document.getElementById("module-title").textContent = "Failed to load module.";
  });
