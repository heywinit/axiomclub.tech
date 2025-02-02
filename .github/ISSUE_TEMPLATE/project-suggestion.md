---
name: Project Suggestion
about: Suggest us something the club should work on!
title: ''
labels: ''
assignees: ''

---

name: "Project Idea Suggestion"
description: "Propose a new project idea for our club."
title: "[Project Idea] <Descriptive Title>"
labels: ["project-idea"]
assignees: []

body:
  - type: markdown
    attributes:
      value: "### 🚀 **Project Idea Submission**\nThank you for suggesting a project idea! Please fill out the details below."

  - type: input
    id: project_name
    attributes:
      label: "📌 Project Name"
      placeholder: "Enter a short and descriptive project name"
    validations:
      required: true

  - type: textarea
    id: project_description
    attributes:
      label: "📝 Project Description"
      description: "Provide a clear and concise description of the project."
      placeholder: "What is the project about? What problem does it solve?"
    validations:
      required: true

  - type: textarea
    id: features
    attributes:
      label: "🌟 Key Features"
      description: "List the main features or functionalities this project should include."
      placeholder: "- Feature 1\n- Feature 2\n- Feature 3"
    validations:
      required: false

  - type: textarea
    id: tech_stack
    attributes:
      label: "🛠️ Suggested Tech Stack"
      description: "What programming languages, frameworks, or tools should be used?"
      placeholder: "- Python, Django\n- React, Node.js\n- Arduino, Raspberry Pi"
    validations:
      required: false

  - type: dropdown
    id: complexity
    attributes:
      label: "⚡ Complexity Level"
      description: "How complex is this project?"
      options:
        - "Beginner"
        - "Intermediate"
        - "Advanced"
    validations:
      required: true

  - type: dropdown
    id: category
    attributes:
      label: "🎯 Project Category"
      description: "Select the relevant category for this project."
      options:
        - "Web Development"
        - "Mobile App"
        - "AI/ML"
        - "Embedded Systems"
        - "Cybersecurity"
        - "Game Development"
        - "Other"
    validations:
      required: true

  - type: textarea
    id: potential_impact
    attributes:
      label: "🌍 Potential Impact"
      description: "How will this project benefit users, the community, or the industry?"
      placeholder: "Describe the real-world impact."
    validations:
      required: false

  - type: textarea
    id: additional_notes
    attributes:
      label: "💡 Additional Notes"
      description: "Any other details or references you'd like to share?"
      placeholder: "Links, research papers, similar p
