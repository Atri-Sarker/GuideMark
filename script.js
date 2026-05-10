// Variable for current screen

// Object for representing an editable guide
// A guide has:
// - editable title
// - list of steps
// - each step has:
//   - editable headline
//   - editable paragraph
//   - checkmark to mark it as a readthrough / require an image submission


// All screens + Descriptions
// Guide List Screen
// All guides are listed here.
// Each guide box has a title, start button, and edit button
// Clicking the edit button takes you to a screen, where you can edit each of the steps and add new steps.
// Clicking the start button, starts the guide, places an in-progress guide in the inprogress section, and take you an in-progress guide screen for following the guide
// In-Progress Guide Screen
// List of all the guides that are in progress.
// Each guide has a continue button, and shows a progress bar, showing how many steps were completed
// Completed Screen
// List of all the guides that were completed

// Guide Edit Screen
// Editable Guide title
// Bars [steps] that you can drag around to change the order
// Each bar [step] has an editable headline, and an editable paragraph, and a checkmark to mark it as a readthrough step, or a step that requires an image submission

// Additional thing: Profiles/vaults
// Profile is changeable, and each profile has it's own unique environment
// Ignored for now, but the system is designed around the later existene of this feature

// index.html is ignored, all elements and ids will be created through the script

// Top part of the screen contains the profile button, allowing for switching between profiles with a dropdown
// Bottom part is a radio selection between Guide List, In Progress, and Completed
// Guide screen is a separate screen, that has a back button to return to the guide list
// Edits are automatically saved if in edit mode,
// Progress is automatically saved if in progress mode.
// If it's a readthrough step. Clicking a button takes user to next step.
// If it's a submission step, there's a button to submit an image, and after submission, it takes user to next step.

const screenTypes = {
    GUIDE_LIST: "guideList",
    IN_PROGRESS: "inProgress",
    COMPLETED: "completed",
    GUIDE_EDIT: "guideEdit",
    GUIDE_IN_PROGRESS: "guideInProgress"
}

// CLASS NAMES
const classNames = {
    GUIDE_BOX: "guide-box",
    EDIT_BUTTON: "edit-button",
    START_BUTTON: "start-button",
    PROGRESS_BAR: "progress-bar",
    CONTINUE_BUTTON: "continue-button",
    DELETE_BUTTON: "delete-button",
    ADD_STEP_BUTTON: "add-step-button",
    SAVE_BUTTON: "save-button",
    EXIT_BUTTON: "exit-button",
    NEW_GUIDE_BUTTON: "new-guide-button",
    START_BUTTON: "start-button"
}

// Variables for selection
// Variable for guide being edited
let currentGuideEdit = null;
// Variable for guide being followed
let currentGuideInProgress = null;

// Variable for current screen
let currentScreen = screenTypes.GUIDE_LIST;

// SCREEN REFERENCES
// Guide Edit Screen reference
const guideEditScreen = document.getElementById("guideEditScreen");
const guideListScreen = document.getElementById("guideListScreen");
const inProgressScreen = document.getElementById("inProgressScreen");
const guideInProgressScreen = document.getElementById("guideInProgressScreen");
// Footer Radio
const guideListRadio = document.getElementById("guideListRadio");
const inProgressRadio = document.getElementById("inProgressRadio");
const footer = document.getElementById("footerRadio");
// Function for switching screens
function switchScreen(screenType) {
    renderInProgressGuideList()
    // Hide all screens
    guideEditScreen.style.display = "none";
    inProgressScreen.style.display = "none";
    guideInProgressScreen.style.display = "none";
    guideListScreen.style.display = "none";
    footer.style.display = "none";
    // Show the selected screen
    if (screenType === screenTypes.GUIDE_EDIT) {
        guideEditScreen.style.display = "block";
    } else if (screenType === screenTypes.IN_PROGRESS) {
        inProgressScreen.style.display = "block";
        footer.style.display = "block";
        // Set the in progress radio to checked
        inProgressRadio.checked = true;
    } else if (screenType === screenTypes.GUIDE_IN_PROGRESS) {
        guideInProgressScreen.style.display = "block";
    } else if (screenType === screenTypes.GUIDE_LIST) {
        guideListScreen.style.display = "block";
        // Set the guide list radio to checked        
        guideListRadio.checked = true;
        footer.style.display = "block";
    }
    currentScreen = screenType;
}

// Function for creating unique ids for guides and steps
let num = 0;
function generateId() {
    num++;
    return num;
}

// Step "object"
const Step = {
    headline: "New Step",
    paragraph: "Step description goes here. Readthrough = read step. Submission = image submission.",
    // "READ" or "SUBMISSION"
    type: "READ"
};
// Guide "object"
const Guide = {
    id: null,
    title: "New Guide",
    steps: [{
    headline: "New Step",
    paragraph: "Step description goes here. Readthrough = read step. Submission = image submission.",
    // "READ" or "SUBMISSION"
    type: "READ"
}]
};

// Guide list
let guideList = [];

// Function for creating a new guide within the guide list
// Connected to a PLUS button
function createNewGuide() {
    // Create a new guide object
    // Id is generated based on timestamp
    // Clone the guide object template
    const newGuide = JSON.parse(JSON.stringify(Guide));
    newGuide.id = generateId();
    // Add the new guide to the guide list
    addGuideToGuideList(newGuide); 
}

// Function for adding a guide to the guide list
function addGuideToGuideList(guide) {
    guideList.push(guide);
}

// Function for editing a guide
function editGuide(guideId) {
    // Switchover to the guide edit screen
    switchScreen(screenTypes.GUIDE_EDIT);
    // Set the current guide edit variable to the guide being edited
    currentGuideEdit = guideList.find(guide => guide.id === guideId);
    // Create the guide edit form based on the current guide edit variable
    createGuideEditForm();
}

// Function that creates a form based on the current guide being edited, and allows for editing the guide
function createGuideEditForm() {
    // Create a div for the form
    const formDiv = document.createElement("div");

    // Create an input for the guide title
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = currentGuideEdit.title;
    formDiv.appendChild(titleInput);

    // Create a div for containing the steps
    const stepsDiv = document.createElement("div");
    
    // Function that creates a step input div
    function createStepInput(stepNum, headline, paragraph, type) {
        const stepDiv = document.createElement("div");
        // Step Number
        const stepNumDiv = document.createElement("div");
        stepNumDiv.innerText = stepNum;
        stepDiv.appendChild(stepNumDiv);
        // Input for headline
        const headlineInput = document.createElement("input");
        headlineInput.type = "text";
        headlineInput.value = headline;
        stepDiv.appendChild(headlineInput);
        // Textarea for paragraph
        const paragraphInput = document.createElement("textarea");
        paragraphInput.value = paragraph;
        stepDiv.appendChild(paragraphInput);
        // Select for type
        const typeSelect = document.createElement("select");
        const readOption = document.createElement("option");
        readOption.value = "READ";
        readOption.text = "Readthrough";
        const submissionOption = document.createElement("option");
        submissionOption.value = "SUBMISSION";
        submissionOption.text = "Submission";
        typeSelect.appendChild(readOption);
        typeSelect.appendChild(submissionOption);
        typeSelect.value = type;
        stepDiv.appendChild(typeSelect);
        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete Step";
        deleteButton.addEventListener("click", () => {
            stepsDiv.removeChild(stepDiv);
            // After deleting the step, update the step numbers of the remaining steps
            for (let i = 0; i < stepsDiv.children.length; i++) {
                const stepDiv = stepsDiv.children[i];
                const stepNumDiv = stepDiv.children[0];
                stepNumDiv.innerText = i + 1;
            }
        });
        stepDiv.appendChild(deleteButton);
        // Up and Down Buttons
        const upButton = document.createElement("button");

        // Add the step div to the steps div
        stepsDiv.appendChild(stepDiv);
    }

    // Loop through the steps of the current guide being edited, and create inputs for each step
    currentGuideEdit.steps.forEach((step, index) => {
        createStepInput(index + 1, step.headline, step.paragraph, step.type);
    });

    formDiv.appendChild(stepsDiv);

    // Create a button for adding a new step
    const addStepButton = document.createElement("button");
    addStepButton.innerText = "Add Step";
    addStepButton.addEventListener("click", () => {
        createStepInput(stepsDiv.children.length + 1, "New Step", "Step description goes here. Readthrough = read step. Submission = image submission.", "READ");
    });
    formDiv.appendChild(addStepButton);
    // Create a save button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    formDiv.appendChild(saveButton);
    // Save Function
    saveButton.addEventListener("click", () => {
        // Update the current guide edit variable with the new values from the form
        currentGuideEdit.title = titleInput.value;
        currentGuideEdit.steps = [];
        // Loop through the steps div, and update the steps of the current guide edit variable
        for (let i = 0; i < stepsDiv.children.length; i++) {
            const stepDiv = stepsDiv.children[i];
            const headline = stepDiv.children[1].value;
            const paragraph = stepDiv.children[2].value;
            const type = stepDiv.children[3].value;
            currentGuideEdit.steps.push({
                headline,
                paragraph,
                type
            });
        }
        renderGuideListScreen();
    });
    // Create a save button
    const save2Button = document.createElement("button");
    save2Button.innerText = "Save + Exit";
    formDiv.appendChild(save2Button);
    // Save Function
    save2Button.addEventListener("click", () => {
        // Update the current guide edit variable with the new values from the form
        currentGuideEdit.title = titleInput.value;
        currentGuideEdit.steps = [];
        // Loop through the steps div, and update the steps of the current guide edit variable
        for (let i = 0; i < stepsDiv.children.length; i++) {
            const stepDiv = stepsDiv.children[i];
            const headline = stepDiv.children[1].value;
            const paragraph = stepDiv.children[2].value;
            const type = stepDiv.children[3].value;
            currentGuideEdit.steps.push({
                headline,
                paragraph,
                type
            });
        }
        renderGuideListScreen();
        // Switch back to the guide list screen
        switchScreen(screenTypes.GUIDE_LIST);
        // Clear the current guide edit variable
        currentGuideEdit = null;
    });
    
    // Exit Button
    const exitButton = document.createElement("button");
    exitButton.innerText = "Exit";
    formDiv.appendChild(exitButton);
    exitButton.addEventListener("click", () => {
        // Switch back to the guide list screen
        switchScreen(screenTypes.GUIDE_LIST);
        // Clear the current guide edit variable
        currentGuideEdit = null;
    });

    // Add the form div to the guide edit screen [Remove previous form if it exists]
    guideEditScreen.innerHTML = "";
    guideEditScreen.appendChild(formDiv);
}

function main() {
    // Initially switch to the guide list screen
    switchScreen(screenTypes.GUIDE_LIST);
    // Render
    renderGuideListScreen()
}

// Function that renders the guide list screen
function renderGuideListScreen() {
    guideListScreen.innerHTML = "";
    // Function that creates a guide box for a guide
    function createGuideBox(guide) {
        // New div
        const guideBox = document.createElement("div");
        // Assign class name for styling
        guideBox.className = classNames.GUIDE_BOX;
        // Guide title
        const guideTitle = document.createElement("h2");
        guideTitle.innerText = guide.title;
        guideBox.appendChild(guideTitle);
        // Guide Edit Button
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        // Assign class
        editButton.className = classNames.EDIT_BUTTON;
        editButton.addEventListener("click", () => {
            editGuide(guide.id);
        }
        );
        guideBox.appendChild(editButton);
        // Guide Start Button
        const startButton = document.createElement("button");
        startButton.innerText = "Start";
        // Assign class
        startButton.className = classNames.START_BUTTON;
        // Start Function
        startButton.addEventListener("click", () => {
            let newId = startGuide(guide.id);
            continueGuide(newId);
        });
        guideBox.appendChild(startButton);
        // Add the guide box to the guide list screen
        guideListScreen.appendChild(guideBox);
    }
    // Create guide box for each guide in the guide list
    guideList.forEach(guide => {
        createGuideBox(guide);
    }
    );
    // Button for creating a new guide
    const newGuideButton = document.createElement("button");
    newGuideButton.innerText = "Create New Guide";
    // Assign class name for styling
    newGuideButton.className = classNames.NEW_GUIDE_BUTTON;
    newGuideButton.addEventListener("click", () => {
        createNewGuide();
        renderGuideListScreen();
    });
    guideListScreen.appendChild(newGuideButton);
}

// List of in-progress guides
const inProgressGuides = [];

// Function that adds a guide to the in-progress guide list
function startGuide(guideId) {
    const guide = guideList.find(guide => guide.id === guideId);
    let newId = generateId();
    if (guide) {
        inProgressGuides.push({
            id: newId,
            title: guide.title,
            steps: guide.steps,
            images: {},
            current_page: 0,
            progress: 0
        });
    }
    return newId
}

// Function for continuing a guide
function continueGuide(guideId) {
    // Switchover to the guide reading screen
    switchScreen(screenTypes.GUIDE_IN_PROGRESS);
    // Set the current guide in progress variable to the guide being progressed
    currentGuideInProgress = inProgressGuides.find(guide => guide.id === guideId);
    // Progress on the current guide
    renderProgress();
}

function renderProgress() {
    // Function for saving progress
    function saveProgress() {
        // Get progress up to the current page, up until the last submitted image
        let tempProgress = 0;
        for (let i = 1; i <= currentGuideInProgress.current_page; i++) {
            if (currentGuideInProgress.steps[i].type === "SUBMISSION") {
                if (currentGuideInProgress.images[i]) {
                    tempProgress++;
                } else {
                    break;
                }
            } else {
                tempProgress++;
            }
        }
        currentGuideInProgress.progress = Math.max(currentGuideInProgress.progress, tempProgress);
        renderProgress();
    }
    // Empty the guide in progress screen
    guideInProgressScreen.innerHTML = "";
    // Create a div for the content of current step
    const stepContent = document.createElement("div");
    const currentStep = currentGuideInProgress.steps[currentGuideInProgress.current_page];
    // Create a headline for the step
    const stepHeadline = document.createElement("h2");
    // Append number and title of step to the headline
    stepHeadline.innerText = currentGuideInProgress.current_page + 1 + ": " + currentStep.headline;
    stepContent.appendChild(stepHeadline);
    // Append the paragraph for the step to the content div
    const stepParagraph = document.createElement("p");
    stepParagraph.innerText = currentStep.paragraph;
    stepContent.appendChild(stepParagraph);
    // If the step type is SUBMISSION, add an image submission button
    if (currentStep.type === "SUBMISSION") {
        let isImage = false;
        const imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.accept = "image/*";
        // If there is already an image submitted for the current page, show the image instead of the submission button
        if (currentGuideInProgress.images[currentGuideInProgress.current_page]) {
            const submittedImage = document.createElement("img");
            submittedImage.src = currentGuideInProgress.images[currentGuideInProgress.current_page];
            // Set size to small
            submittedImage.class = "small-image";
            submittedImage.width = 100;
            submittedImage.height = 100;
            stepContent.appendChild(submittedImage);
            isImage = true;
        } else {
            stepContent.appendChild(imageInput);
        }
        // Connect image submission to adding the image to .images
        // using the current page as the key for the image
        function readImage() {

            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                currentGuideInProgress.images[currentGuideInProgress.current_page] = reader.result;
                saveProgress();
            }
            
            if (file) {
                reader.readAsDataURL(file);
            }
        }
        imageInput.addEventListener("change", () => readImage());
        
    } else {
        // Do Nothing
    }
    // Progress Bar
    const progressBar = document.createElement("progress");
    progressBar.value = 1 + currentGuideInProgress.progress;
    // Max is the total amount of steps
    progressBar.max = currentGuideInProgress.steps.length;
    // Text in progress bar showing current progress
    const progressText = document.createElement("div");
    progressText.innerText = `Progress: ${currentGuideInProgress.progress + 1} / ${currentGuideInProgress.steps.length}`;
    stepContent.appendChild(progressText);
    stepContent.appendChild(progressBar);
    // Back and Next Buttons for switching the current pages
    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    stepContent.appendChild(backButton);
    stepContent.appendChild(nextButton);
    backButton.addEventListener("click", () => {
        if (currentGuideInProgress.current_page > 0) {
            currentGuideInProgress.current_page--;
            renderProgress();
        }
    });
    nextButton.addEventListener("click", () => {
        if (currentGuideInProgress.current_page < currentGuideInProgress.steps.length - 1) {
            currentGuideInProgress.current_page++;
            // Get progress up to the current page, up until the last submitted image
            let tempProgress = 0;
            for (let i = 1; i <= currentGuideInProgress.current_page; i++) {
                if (currentGuideInProgress.steps[i].type === "SUBMISSION") {
                    if (currentGuideInProgress.images[i]) {
                        tempProgress++;
                    } else {
                        break;
                    }
                } else {
                    tempProgress++;
                }
            }
           saveProgress();
        }
    });
    // Append the buttons to the content div
    stepContent.appendChild(backButton);
    stepContent.appendChild(nextButton);
    // Append an exit button that takes you back to the in progress guide list
    const exitButton = document.createElement("button");
    exitButton.innerText = "Exit";
    exitButton.addEventListener("click", () => {
        switchScreen(screenTypes.IN_PROGRESS);
        currentGuideInProgress = null;
    });
    if (currentGuideInProgress.progress+1 === currentGuideInProgress.steps.length) {
        exitButton.className += " complete";
    }
    stepContent.appendChild(exitButton);
    // Append the step content to the guide in progress screen
    guideInProgressScreen.appendChild(stepContent);
}

// Function for rendering the in-progress guide list
function renderInProgressGuideList() {
    inProgressScreen.innerHTML = "";
    // For each in-progress guide, create a div showing the title, progress bar, and a continue button that takes you to the guide in progress screen for that guide
    inProgressGuides.forEach(guide => {
        const guideBox = document.createElement("div");
        guideBox.className = classNames.GUIDE_BOX;
        const guideTitle = document.createElement("h2");
        guideTitle.innerText = guide.title;
        guideBox.appendChild(guideTitle);
        const progressBar = document.createElement("progress");
        progressBar.value = guide.progress +  1;
        progressBar.max = guide.steps.length;
        guideBox.appendChild(progressBar);
        const progressText = document.createElement("div");

        const continueButton = document.createElement("button");
        continueButton.innerText = "Continue";
        continueButton.addEventListener("click", () => {
            continueGuide(guide.id);
        });
        guideBox.appendChild(continueButton);

        // Add a delete button
        // Label it "complete" if the guide is fully completed, and "delete" if it's not fully completed
        const deleteButton = document.createElement("button");
        if (guide.progress + 1 === guide.steps.length) {
            deleteButton.innerText = "Complete!";
            deleteButton.className += " complete";
        } else {
            deleteButton.innerText = "Delete";
        }
        deleteButton.addEventListener("click", () => {
            const index = inProgressGuides.findIndex(g => g.id === guide.id);
            if (index !== -1) {
                inProgressGuides.splice(index, 1);
                renderInProgressGuideList();
            }
        });
        guideBox.appendChild(deleteButton);
        inProgressScreen.appendChild(guideBox);
    });
}

// Connect radios
guideListRadio.addEventListener("change", () => {
    switchScreen(screenTypes.GUIDE_LIST);
});

inProgressRadio.addEventListener("change", () => {
    switchScreen(screenTypes.IN_PROGRESS);
});

// PREFABRICATED GUIDES //

// CLEANING DISHES
addGuideToGuideList({
    id: generateId(),
    title: "CLEANING DISHES IN THE SINK",
    steps: [
        {
            headline: "Go to Sink",
            paragraph: "Go to Sink. Wear gloves. Equip Sponge.",
            type: "READ"
        },
        {
            headline: "SCRUB!",
            paragraph: "Scrub the dishes with the sponge, hot water, and dish soap. Put the clean dishes aside away from the sink one-by-one.",
            type: "READ"
        },
        {
            headline: "Completion GOAL",
            paragraph: "Continue cleaning until all dishes are cleaned. Submit a picture of the clean sink. No dishes remaining.",
            type: "SUBMISSION"
        }
    ]
});

// MAKING A GRILLED CHEESE SANDWICH
addGuideToGuideList({
    id: generateId(),
    title: "GRILLED CHEESE QUEST",
    steps: [
        {
            headline: "ACQUIRE BREAD",
            paragraph: "Go acquire 2 slices of square bread.",
            type: "READ"
        },
        {
            headline: "ACQUIRE CHEESE",
            paragraph: "Acquire a cheese single. Alternatively, acquire 50g of shredded cheese.",
            type: "READ"
        },
        {
            headline: "ASSEMBLE",
            paragraph: "Place cheese between the two slices of bread. Submit a photo of the ultimatum assembly",
            type: "SUBMISSION"
        },
        {
            headline: "FORGE",
            paragraph: "Aggregate a heated metal surface with butter. Place the bread figure on it.",
            type: "READ"
        },
        {
            headline: "FLIP",
            paragraph: "Once one side reahes the perfect texture-taste equilibrium, flip the bread figure pi radians.",
            type: "READ"
        },
        {
            headline: "ADMIRE",
            paragraph: "Once both sides are done. Retract the bread figure. Admire it. Submit a photo of the masterpiece.",
            type: "SUBMISSION"
        },
        {
            headline: "EAT",
            paragraph: "Yum, Yum, Yum. As the Humans say... Truly Marvelous.",
            type: "READ"
        }

    ]
});

// MORAL BOOST
addGuideToGuideList({
    id: generateId(),
    title: "NEW ENCOUNTERS",
    steps: [
        {
            headline: "Exchange",
            paragraph: "Go talk to a stranger. After a minute of conversation, high-five them.",
            type: "READ"
        },
        {
            headline: "King of TriParity",
            paragraph: "Go talk to a stranger and challenge them to rock-paper-scissors. If you lose, repeat with another stranger.",
            type: "READ"
        },
        {
            headline: "Memories",
            paragraph: "Go take a picture with a stranger. Make a funny pose. Sumbit the photo.",
            type: "SUBMISSION"
        }
    ]
});

// EXERCISE
addGuideToGuideList({
    id: generateId(),
    title: "INFINITE STRENGTH GLITCH",
    steps: [
        {
            headline: "Run",
            paragraph: "Run a distance of 100m.",
            type: "READ"
        },
        {
            headline: "Push ups",
            paragraph: "Extends arms to raise oneself against the pull of a celestial body. Retract. Do this 30 times.",
            type: "READ"
        },
        {
            headline: "Shower",
            paragraph: "Submit a photo of the shampoo bottle.",
            type: "SUBMISSION"
        }
    ]
});



main();