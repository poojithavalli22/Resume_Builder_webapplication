document.addEventListener('DOMContentLoaded', function() {
  // Tab Functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to current button and content
      button.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Next & Previous Button Navigation
  const nextButtons = document.querySelectorAll('.next-tab');
  const prevButtons = document.querySelectorAll('.prev-tab');
  
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentTab = document.querySelector('.tab-content.active');
      const currentIndex = Array.from(tabContents).indexOf(currentTab);
      
      if (currentIndex < tabContents.length - 1) {
        // Hide current tab
        currentTab.classList.remove('active');
        tabButtons[currentIndex].classList.remove('active');
        
        // Show next tab
        tabContents[currentIndex + 1].classList.add('active');
        tabButtons[currentIndex + 1].classList.add('active');
        
        // Scroll to top of the new tab
        window.scrollTo(0, tabContents[currentIndex + 1].offsetTop - 100);
      }
    });
  });
  
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentTab = document.querySelector('.tab-content.active');
      const currentIndex = Array.from(tabContents).indexOf(currentTab);
      
      if (currentIndex > 0) {
        // Hide current tab
        currentTab.classList.remove('active');
        tabButtons[currentIndex].classList.remove('active');
        
        // Show previous tab
        tabContents[currentIndex - 1].classList.add('active');
        tabButtons[currentIndex - 1].classList.add('active');
        
        // Scroll to top of the new tab
        window.scrollTo(0, tabContents[currentIndex - 1].offsetTop - 100);
      }
    });
  });
  
  // Initialize event listeners for "Currently Studying" checkboxes
  document.querySelectorAll('.edu-current').forEach(checkbox => {
    const endDateInput = checkbox.closest('.form-group').querySelector('.edu-end-date');
    
    checkbox.addEventListener('change', () => {
      endDateInput.disabled = checkbox.checked;
      if (checkbox.checked) {
        endDateInput.value = '';
      }
    });
  });
  
  // Initialize event listeners for "Currently Working" checkboxes
  document.querySelectorAll('.exp-current').forEach(checkbox => {
    const endDateInput = checkbox.closest('.form-group').querySelector('.exp-end-date');
    
    checkbox.addEventListener('change', () => {
      endDateInput.disabled = checkbox.checked;
      if (checkbox.checked) {
        endDateInput.value = '';
      }
    });
  });
  
  // Dynamic Form Fields
  // Education
  const addEducationBtn = document.getElementById('add-education');
  const educationEntries = document.getElementById('education-entries');
  
  addEducationBtn.addEventListener('click', () => {
    const educationEntry = document.createElement('div');
    educationEntry.className = 'education-entry';
    const entryId = document.querySelectorAll('.education-entry').length + 1;
    
    educationEntry.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label for="degree-${entryId}"><i class="fas fa-graduation-cap"></i> Degree/Certificate</label>
          <input type="text" class="degree" id="degree-${entryId}" placeholder="B.Sc. Computer Science" />
        </div>
        <div class="form-group">
          <label for="institution-${entryId}"><i class="fas fa-university"></i> Institution</label>
          <input type="text" class="institution" id="institution-${entryId}" placeholder="University of Technology" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="edu-start-date-${entryId}"><i class="fas fa-calendar"></i> Start Date</label>
          <input type="month" class="edu-start-date" id="edu-start-date-${entryId}" />
        </div>
        <div class="form-group">
          <label for="edu-end-date-${entryId}"><i class="fas fa-calendar-check"></i> End Date</label>
          <input type="month" class="edu-end-date" id="edu-end-date-${entryId}" />
          <div class="checkbox-group">
            <input type="checkbox" class="edu-current" id="edu-current-${entryId}" />
            <label for="edu-current-${entryId}">Currently Studying</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="edu-description-${entryId}"><i class="fas fa-align-left"></i> Description (Optional)</label>
        <textarea class="edu-description" id="edu-description-${entryId}" placeholder="Relevant coursework, achievements, etc." rows="3"></textarea>
      </div>
      
      <button type="button" class="remove-entry remove-btn"><i class="fas fa-trash-alt"></i> Remove</button>
      <hr>
    `;
    
    educationEntries.appendChild(educationEntry);
    
    // Add event listener to the "Currently Studying" checkbox
    const currentCheckbox = educationEntry.querySelector('.edu-current');
    const endDateInput = educationEntry.querySelector('.edu-end-date');
    
    currentCheckbox.addEventListener('change', () => {
      endDateInput.disabled = currentCheckbox.checked;
      if (currentCheckbox.checked) {
        endDateInput.value = '';
      }
    });
    
    // Add event listener to remove button
    const removeBtn = educationEntry.querySelector('.remove-entry');
    removeBtn.addEventListener('click', () => {
      educationEntry.remove();
    });
  });
  
  // Experience
  const addExperienceBtn = document.getElementById('add-experience');
  const experienceEntries = document.getElementById('experience-entries');
  
  addExperienceBtn.addEventListener('click', () => {
    const experienceEntry = document.createElement('div');
    experienceEntry.className = 'experience-entry';
    const entryId = document.querySelectorAll('.experience-entry').length + 1;
    
    experienceEntry.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label for="job-title-${entryId}"><i class="fas fa-briefcase"></i> Job Title</label>
          <input type="text" class="job-title" id="job-title-${entryId}" placeholder="Frontend Developer" />
        </div>
        <div class="form-group">
          <label for="company-${entryId}"><i class="fas fa-building"></i> Company</label>
          <input type="text" class="company" id="company-${entryId}" placeholder="XYZ Corporation" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="exp-start-date-${entryId}"><i class="fas fa-calendar"></i> Start Date</label>
          <input type="month" class="exp-start-date" id="exp-start-date-${entryId}" />
        </div>
        <div class="form-group">
          <label for="exp-end-date-${entryId}"><i class="fas fa-calendar-check"></i> End Date</label>
          <input type="month" class="exp-end-date" id="exp-end-date-${entryId}" />
          <div class="checkbox-group">
            <input type="checkbox" class="exp-current" id="exp-current-${entryId}" />
            <label for="exp-current-${entryId}">Currently Working</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="job-description-${entryId}"><i class="fas fa-tasks"></i> Job Responsibilities & Achievements</label>
        <textarea class="job-description" id="job-description-${entryId}" placeholder="• Developed responsive web applications using React.js&#10;• Improved site performance by 40% through code optimization&#10;• Collaborated with UX team to implement new design system" rows="4"></textarea>
      </div>
      
      <button type="button" class="remove-entry remove-btn"><i class="fas fa-trash-alt"></i> Remove</button>
      <hr>
    `;
    
    experienceEntries.appendChild(experienceEntry);
    
    // Add event listener to the "Currently Working" checkbox
    const currentCheckbox = experienceEntry.querySelector('.exp-current');
    const endDateInput = experienceEntry.querySelector('.exp-end-date');
    
    currentCheckbox.addEventListener('change', () => {
      endDateInput.disabled = currentCheckbox.checked;
      if (currentCheckbox.checked) {
        endDateInput.value = '';
      }
    });
    
    // Add event listener to remove button
    const removeBtn = experienceEntry.querySelector('.remove-entry');
    removeBtn.addEventListener('click', () => {
      experienceEntry.remove();
    });
  });
  
  // Projects
  const addProjectBtn = document.getElementById('add-project');
  const projectEntries = document.getElementById('project-entries');
  
  addProjectBtn.addEventListener('click', () => {
    const projectEntry = document.createElement('div');
    projectEntry.className = 'project-entry';
    const entryId = document.querySelectorAll('.project-entry').length + 1;
    
    projectEntry.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label for="project-name-${entryId}"><i class="fas fa-project-diagram"></i> Project Name</label>
          <input type="text" class="project-name" id="project-name-${entryId}" placeholder="E-commerce Website" />
        </div>
        <div class="form-group">
          <label for="project-url-${entryId}"><i class="fas fa-link"></i> Project URL (Optional)</label>
          <input type="url" class="project-url" id="project-url-${entryId}" placeholder="https://github.com/username/project" />
        </div>
      </div>

      <div class="form-group">
        <label for="project-date-${entryId}"><i class="fas fa-calendar-alt"></i> Date</label>
        <input type="text" class="project-date" id="project-date-${entryId}" placeholder="Jan 2023 - Mar 2023" />
      </div>

      <div class="form-group">
        <label for="project-description-${entryId}"><i class="fas fa-info-circle"></i> Project Description</label>
        <textarea class="project-description" id="project-description-${entryId}" placeholder="• Built a full-stack e-commerce platform with React & Node.js&#10;• Implemented secure payment processing with Stripe API&#10;• Added inventory management system for store owners" rows="4"></textarea>
      </div>
      
      <button type="button" class="remove-entry remove-btn"><i class="fas fa-trash-alt"></i> Remove</button>
      <hr>
    `;
    
    projectEntries.appendChild(projectEntry);
    
    // Add event listener to remove button
    const removeBtn = projectEntry.querySelector('.remove-entry');
    removeBtn.addEventListener('click', () => {
      projectEntry.remove();
    });
  });
  
  // Languages
  const addLanguageBtn = document.getElementById('add-language');
  const languagesEntries = document.getElementById('languages-entries');
  
  addLanguageBtn.addEventListener('click', () => {
    const languageEntry = document.createElement('div');
    languageEntry.className = 'language-entry form-row';
    const entryId = document.querySelectorAll('.language-entry').length + 1;
    
    languageEntry.innerHTML = `
      <div class="form-group">
        <input type="text" class="language-name" id="language-name-${entryId}" placeholder="Language" />
      </div>
      <div class="form-group">
        <select class="language-level" id="language-level-${entryId}">
          <option value="">-- Proficiency --</option>
          <option value="Native">Native</option>
          <option value="Fluent">Fluent</option>
          <option value="Advanced">Advanced</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Basic">Basic</option>
        </select>
      </div>
      <button type="button" class="remove-language remove-btn"><i class="fas fa-times"></i></button>
    `;
    
    languagesEntries.appendChild(languageEntry);
    
    // Add event listener to remove button
    const removeBtn = languageEntry.querySelector('.remove-language');
    removeBtn.addEventListener('click', () => {
      languageEntry.remove();
    });
  });
  
  // Skills Input
  const skillInput = document.getElementById('skill-input');
  const skillsContainer = document.getElementById('skills-container');
  const skills = new Set();
  
  skillInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const skill = skillInput.value.trim();
      
      if (skill && !skills.has(skill)) {
        skills.add(skill);
        
        const skillBadge = document.createElement('div');
        skillBadge.className = 'skill-badge';
        skillBadge.innerHTML = `${skill} <i class="fas fa-times remove-skill"></i>`;
        
        skillsContainer.appendChild(skillBadge);
        skillInput.value = '';
        
        // Add event listener to remove skill
        const removeSkillBtn = skillBadge.querySelector('.remove-skill');
        removeSkillBtn.addEventListener('click', () => {
          skills.delete(skill);
          skillBadge.remove();
        });
      }
    }
  });
  
  // Form Submission & Resume Generation
  const resumeForm = document.getElementById('resume-form');
  const resumeOutput = document.getElementById('resume-output');
  const resumeContent = document.getElementById('resume-content');
  
  resumeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    generateResume();
  });
  
  function generateResume() {
    // Personal Information
    document.getElementById('out-name').textContent = document.getElementById('name').value || 'Your Name';
    document.getElementById('out-title').textContent = document.getElementById('title').value || 'Professional Title';
    document.getElementById('out-email').textContent = document.getElementById('email').value || 'email@example.com';
    document.getElementById('out-phone').textContent = document.getElementById('phone').value || '123-456-7890';
    document.getElementById('out-location').textContent = document.getElementById('location').value || 'City, State';
    document.getElementById('out-website').textContent = document.getElementById('website').value || 'yourwebsite.com';
    document.getElementById('out-summary').textContent = document.getElementById('summary').value || 'No summary provided';
    
    // Education
    const educationOutput = document.getElementById('out-education');
    educationOutput.innerHTML = '';
    
    document.querySelectorAll('.education-entry').forEach((entry) => {
      const degree = entry.querySelector('.degree').value;
      const institution = entry.querySelector('.institution').value;
      const startDate = entry.querySelector('.edu-start-date').value;
      const endDate = entry.querySelector('.edu-end-date').value;
      const isCurrent = entry.querySelector('.edu-current').checked;
      const description = entry.querySelector('.edu-description').value;
      
      if (degree || institution) {
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        
        let formattedStartDate = '';
        if (startDate) {
          const startDateObj = new Date(startDate);
          formattedStartDate = startDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
        
        let formattedEndDate = '';
        if (isCurrent) {
          formattedEndDate = 'Present';
        } else if (endDate) {
          const endDateObj = new Date(endDate);
          formattedEndDate = endDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
        
        let dateRange = '';
        if (formattedStartDate || formattedEndDate) {
          dateRange = `${formattedStartDate} - ${formattedEndDate}`;
        }
        
        educationItem.innerHTML = `
          <div class="item-header">
            <div>
              <div class="item-title">${degree || 'Degree'}</div>
              <div class="item-subtitle">${institution || 'Institution'}</div>
            </div>
            <div class="item-date">${dateRange}</div>
          </div>
          ${description ? `<div class="item-description">${description}</div>` : ''}
        `;
        
        educationOutput.appendChild(educationItem);
      }
    });
    
    // Experience
    const experienceOutput = document.getElementById('out-experience');
    experienceOutput.innerHTML = '';
    
    document.querySelectorAll('.experience-entry').forEach((entry) => {
      const jobTitle = entry.querySelector('.job-title').value;
      const company = entry.querySelector('.company').value;
      const startDate = entry.querySelector('.exp-start-date').value;
      const endDate = entry.querySelector('.exp-end-date').value;
      const isCurrent = entry.querySelector('.exp-current').checked;
      const description = entry.querySelector('.job-description').value;
      
      if (jobTitle || company) {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        
        let formattedStartDate = '';
        if (startDate) {
          const startDateObj = new Date(startDate);
          formattedStartDate = startDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
        
        let formattedEndDate = '';
        if (isCurrent) {
          formattedEndDate = 'Present';
        } else if (endDate) {
          const endDateObj = new Date(endDate);
          formattedEndDate = endDateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
        
        let dateRange = '';
        if (formattedStartDate || formattedEndDate) {
          dateRange = `${formattedStartDate} - ${formattedEndDate}`;
        }
        
        experienceItem.innerHTML = `
          <div class="item-header">
            <div>
              <div class="item-title">${jobTitle || 'Job Title'}</div>
              <div class="item-subtitle">${company || 'Company'}</div>
            </div>
            <div class="item-date">${dateRange}</div>
          </div>
          ${description ? `<div class="item-description">${description}</div>` : ''}
        `;
        
        experienceOutput.appendChild(experienceItem);
      }
    });
    
    // Skills
    const skillsOutput = document.getElementById('out-skills');
    skillsOutput.innerHTML = '';
    
    skills.forEach((skill) => {
      const skillBadge = document.createElement('div');
      skillBadge.className = 'skill-badge';
      skillBadge.textContent = skill;
      skillsOutput.appendChild(skillBadge);
    });
    
    // Languages
    const languagesOutput = document.getElementById('out-languages');
    languagesOutput.innerHTML = '';
    
    document.querySelectorAll('.language-entry').forEach((entry) => {
      const languageName = entry.querySelector('.language-name').value;
      const languageLevel = entry.querySelector('.language-level').value;
      
      if (languageName) {
        const languageItem = document.createElement('div');
        languageItem.className = 'language-item';
        
        languageItem.innerHTML = `
          <span>${languageName}</span>
          ${languageLevel ? `<span>${languageLevel}</span>` : ''}
        `;
        
        languagesOutput.appendChild(languageItem);
      }
    });
    
    // Projects
    const projectsOutput = document.getElementById('out-projects');
    projectsOutput.innerHTML = '';
    
    document.querySelectorAll('.project-entry').forEach((entry) => {
      const projectName = entry.querySelector('.project-name').value;
      const projectUrl = entry.querySelector('.project-url').value;
      const projectDate = entry.querySelector('.project-date').value;
      const projectDescription = entry.querySelector('.project-description').value;
      
      if (projectName) {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        
        projectItem.innerHTML = `
          <div class="item-header">
            <div>
              <div class="item-title">
                ${projectName}
                ${projectUrl ? `<a href="${projectUrl}" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
              </div>
            </div>
            ${projectDate ? `<div class="item-date">${projectDate}</div>` : ''}
          </div>
          ${projectDescription ? `<div class="item-description">${projectDescription}</div>` : ''}
        `;
        
        projectsOutput.appendChild(projectItem);
      }
    });
    
    // Additional Information sections
    // Certifications
    const certificationsContent = document.getElementById('certifications').value;
    const certificationsOutput = document.getElementById('out-certifications');
    certificationsOutput.innerHTML = certificationsContent ? `<div class="additional-content">${certificationsContent}</div>` : '';
    document.getElementById('certifications-section').style.display = certificationsContent ? 'block' : 'none';
    
    // Volunteer Experience
    const volunteerContent = document.getElementById('volunteer').value;
    const volunteerOutput = document.getElementById('out-volunteer');
    volunteerOutput.innerHTML = volunteerContent ? `<div class="additional-content">${volunteerContent}</div>` : '';
    document.getElementById('volunteer-section').style.display = volunteerContent ? 'block' : 'none';
    
    // Awards & Achievements
    const awardsContent = document.getElementById('awards').value;
    const awardsOutput = document.getElementById('out-awards');
    awardsOutput.innerHTML = awardsContent ? `<div class="additional-content">${awardsContent}</div>` : '';
    document.getElementById('awards-section').style.display = awardsContent ? 'block' : 'none';
    
    // Interests
    const interestsContent = document.getElementById('interests').value;
    const interestsOutput = document.getElementById('out-interests');
    interestsOutput.innerHTML = interestsContent ? `<div class="additional-content">${interestsContent}</div>` : '';
    document.getElementById('interests-section').style.display = interestsContent ? 'block' : 'none';
    
    // Show the generated resume
    resumeForm.classList.add('hidden');
    resumeOutput.classList.remove('hidden');
    
    // Scroll to the top of the resume
    window.scrollTo(0, resumeOutput.offsetTop - 50);
  }
  
  // Edit Resume Button
  document.getElementById('edit-resume').addEventListener('click', () => {
    resumeOutput.classList.add('hidden');
    resumeForm.classList.remove('hidden');
  });
  
  // Print Resume Button
  document.getElementById('print-resume').addEventListener('click', () => {
    window.print();
  });
  
  // Download as PDF
  document.getElementById('download-resume').addEventListener('click', () => {
    // Alert user that browser print to PDF will be used
    alert('To save as PDF, use your browser\'s print function (Ctrl+P or Cmd+P) and select "Save as PDF" as the destination.');
    window.print();
  });
  
  // Template Selection
  const chooseTemplateBtn = document.getElementById('choose-template');
  const templatesContainer = document.querySelector('.templates-container');
  const templateCards = document.querySelectorAll('.template-card');
  const applyTemplateBtn = document.getElementById('apply-template');
  
  chooseTemplateBtn.addEventListener('click', () => {
    resumeOutput.classList.add('hidden');
    templatesContainer.classList.remove('hidden');
  });
  
  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      templateCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
  
  applyTemplateBtn.addEventListener('click', () => {
    const selectedTemplate = document.querySelector('.template-card.active');
    const templateName = selectedTemplate.getAttribute('data-template');
    
    // Remove all template classes
    resumeContent.className = '';
    // Add selected template class
    resumeContent.classList.add(`${templateName}-template`);
    
    templatesContainer.classList.add('hidden');
    resumeOutput.classList.remove('hidden');
  });
});

// Add custom CSS for print media
const printStyles = document.createElement('style');
printStyles.textContent = `
  @media print {
    body * {
      visibility: hidden;
    }
    #resume-content, #resume-content * {
      visibility: visible;
    }
    #resume-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 0;
      margin: 0;
    }
    .resume-actions {
      display: none;
    }
  }
`;
document.head.appendChild(printStyles);