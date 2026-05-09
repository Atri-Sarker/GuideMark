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