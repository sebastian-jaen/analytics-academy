const queryParams = new URLSearchParams(window.location.search);
const moduleNumber = queryParams.get("module") || "1";  // Default to 1 if not provided
const jsonPath = `data/module${moduleNumber}.json`;

fetch(jsonPath)
  .then(response => response.json()) 
  .then(data => {
    document.getElementById("module-title").textContent = data.title;

    const toc = document.getElementById("module-toc");
    const contentContainer = document.getElementById("module-content");

    data.sections.forEach((section, index) => {
      const sectionElement = document.createElement("section");
      sectionElement.classList.add("module-section");


      const heading = document.createElement("h2");
      heading.textContent = section.heading;

      const sectionId = `section-${index}`;
      heading.id = sectionId;


      const body = document.createElement("div");
      body.classList.add("module-body");
      body.innerHTML = section.content;

      sectionElement.appendChild(heading);
      sectionElement.appendChild(body);
      contentContainer.appendChild(sectionElement);


      const tocLink = document.createElement("a");
      tocLink.href = `#${sectionId}`;
      tocLink.textContent = section.heading;
      tocLink.classList.add("toc-link");
      toc.appendChild(tocLink);
    });

    const quizLink = document.createElement("a");
    quizLink.href = 'quiz.html?module=${moduleNumber}'; 
    quizLink.textContent = "Take the Quiz";
    quizLink.className = 'toc-quiz-link';
    toc.appendChild(quizLink);

  })
  .catch(error => {
    console.error("Error loading module:", error);
    document.getElementById("module-title").textContent = "Failed to load module.";
  });
