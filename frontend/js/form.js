
function addHyperLink() {
  const hyperLinkField = document.getElementById('HyperLinkField');
  const newIndex = hyperLinkField.querySelectorAll('.HyperLink-entry').length; // Get the new index
  const newHyperLinkEntry = document.createElement('div'); // Create a form element
  newHyperLinkEntry.className = 'HyperLink-entry';
  newHyperLinkEntry.setAttribute('data-index', newIndex);
  newHyperLinkEntry.innerHTML = `
      <input type="url" name="Hyperlinks[${newIndex}]" placeholder="Hyper-Links" >
  `;
  hyperLinkField.appendChild(newHyperLinkEntry);
}


function addEducation() {
    const educationFields = document.getElementById('educationFields');
    const newIndex = educationFields.children.length-2; // Get the new index
    const newEducationEntry = document.createElement('div'); // Create a form element
    newEducationEntry.className = 'education-entry';
    newEducationEntry.setAttribute('data-index', newIndex);
    newEducationEntry.innerHTML = `
        <input type="text" name="educations[${newIndex}][degree]" placeholder="Degree">
        <input type="text" name="educations[${newIndex}][school]" placeholder="School">
        <label>From Year:</label>
        <input type="number" name="educations[${newIndex}][fromYear]" placeholder="From Year" min="1900" max="2100">
        <label>To Year:</label>
        <input type="number" name="educations[${newIndex}][toYear]" placeholder="To Year" min="1900" max="2100">
    `;
    educationFields.appendChild(newEducationEntry);
}

function addSkill() {
    const skillField = document.getElementById('skillField');
    const newIndex = skillField.children.length-2; // Get the new index
    const newSkillEntry = document.createElement('div'); // Create a form element
    newSkillEntry.className = 'skills-entry';
    newSkillEntry.setAttribute('data-index', newIndex);
    newSkillEntry.innerHTML = `
        <input type="text" name="skills[${newIndex}]" placeholder="Skill">
    `;
    skillField.insertBefore(newSkillEntry, skillField.lastChild);
}

function addCertification() {
    const certificationFields = document.getElementById('certificationFields');
    const newIndex = certificationFields.children.length-2; // Get the new index
    const newCertificationEntry = document.createElement('div'); // Create a form element
    newCertificationEntry.className = 'certification-entry';
    newCertificationEntry.setAttribute('data-index', newIndex);
    newCertificationEntry.innerHTML = `
        <input type="text" name="certifications[${newIndex}][course]" placeholder="Course">
        <input type="text" name="certifications[${newIndex}][institute]" placeholder="Institute">
    `;
    certificationFields.appendChild(newCertificationEntry);
}

function addProject() {
    const projectField = document.getElementById('projectField');
    const newIndex = projectField.children.length-2; // Get the new index
    const newProjectEntry = document.createElement('div'); // Create a form element
    newProjectEntry.className = 'project-entry';
    newProjectEntry.setAttribute('data-index', newIndex);
    newProjectEntry.innerHTML = `
        <input type="text" name="projects[${newIndex}][name]" placeholder="Project Name">
        <input type="date" name="projects[${newIndex}][date]" placeholder="Project Date">
        <input type="text" name="projects[${newIndex}][location]" placeholder="Project Location">
        <textarea name="projects[${newIndex}][description]" placeholder="Project Description"></textarea>
        <input type="url" name="projects[${newIndex}][hyperlink]" placeholder="Project Hyperlink">
    `;
    projectField.insertBefore(newProjectEntry, projectField.lastChild);
}



document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    submitForm();
});




function submitForm() {
  // Get form data
  const formData = new FormData(document.getElementById('myForm'));

  // Convert FormData to a plain object
  const formObject = {};
  formData.forEach((value, key) => {
      formObject[key] = value;
  });

  // Construct the data object in the desired format
  const data = {
      name: formObject.name,
      phone: formObject.phone,
      email: formObject.email,
      address: formObject.Address,
      hyperlinks: [], 
      summary: formObject.summary,
      educations: [],
      skills: [],
      certifications: [],
      projects: []
  };

  let hyperLinkIndex = 0;
while (formObject[`Hyperlinks[${hyperLinkIndex}]`] !== undefined) {
    data.hyperlinks.push(formObject[`Hyperlinks[${hyperLinkIndex}]`]);
    hyperLinkIndex++;
}

  // Populate the educations array
  let educationIndex = 0;
  while (formObject[`educations[${educationIndex}][degree]`] !== undefined) {
      data.educations.push({
          degree: formObject[`educations[${educationIndex}][degree]`],
          school: formObject[`educations[${educationIndex}][school]`],
          fromYear: formObject[`educations[${educationIndex}][fromYear]`],
          toYear: formObject[`educations[${educationIndex}][toYear]`]
      });
      educationIndex++;
  }

  // Populate the skills array
  let skillIndex = 0;
  while (formObject[`skills[${skillIndex}]`] !== undefined) {
      data.skills.push({
          skill: formObject[`skills[${skillIndex}]`]
      });
      skillIndex++;
  }

  // Populate the certifications array
  let certificationIndex = 0;
  while (formObject[`certifications[${certificationIndex}][institute]`] !== undefined) {
      data.certifications.push({
          course: formObject[`certifications[${certificationIndex}][course]`],
          institute: formObject[`certifications[${certificationIndex}][institute]`]
      });
      certificationIndex++;
  }

  // Populate the projects array
  let projectIndex = 0;
  while (formObject[`projects[${projectIndex}][name]`] !== undefined) {
      data.projects.push({
          name: formObject[`projects[${projectIndex}][name]`],
          date: formObject[`projects[${projectIndex}][date]`],
          location: formObject[`projects[${projectIndex}][location]`],
          description: formObject[`projects[${projectIndex}][description]`],
          hyperlink: formObject[`projects[${projectIndex}][hyperlink]`]
      });
      projectIndex++;
  }

  

  // Log the data object to the console (you can replace this with your desired action)
  console.log(data);
    
            const json_data = JSON.stringify(data);
    
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000/form-submissions");
            xhr.setRequestHeader('Content-Type', 'application/json');
    
            xhr.onload = function () {
                if (xhr.status == 201) {
                    console.log("Request success");
                    console.log(xhr.responseText);
                } else {
                    console.log("Request failed. Status: ", xhr.status);
                }
            };
    
            xhr.onerror = function () {
                console.log("Request failed");
            };
    
            xhr.send(json_data);
        
    



}


        var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:3000/getpost");
            xhr.setRequestHeader('Content-Type', 'application/json');
    
            xhr.onload = function () {
                if (xhr.status == 200) {
                    console.log("Request success");
                    console.log(xhr.responseText);
                    const responseData = JSON.parse(xhr.responseText);
                        console.log(responseData); 
                } else {
                    console.log("Request failed. Status: ", xhr.status);
                }
            };
    
            xhr.onerror = function () {
                console.log("Request failed");
            };
    
            xhr.send();  

