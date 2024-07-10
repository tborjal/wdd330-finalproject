// join.js
import { createElement, validateEmail, validatePassword } from "./utils";

async function join() {
  const joinTitle = createElement("h2", { textContent: "JOIN OUR COMMUNITY" });
  const joinContainer = createElement("div", { className: "join-container" });

  // Form
  const joinForm = createElement("form", { id: "join-form" }, [
    createElement("label", { for: "username", textContent: "Username: " }), // Add a space after the colon
    createElement("input", {
      type: "text",
      id: "username",
      name: "username",
      required: true,
    }),
    createElement("br", {}, []),

    createElement("label", { for: "email", textContent: "Email: " }), // Add a space after the colon
    createElement("input", {
      type: "email",
      id: "email",
      name: "email",
      required: true,
    }),
    createElement("br", {}, []),

    createElement("label", { for: "password", textContent: "Password: " }), // Add a space after the colon
    createElement("input", {
      type: "password",
      id: "password",
      name: "password",
      required: true,
    }),
    createElement("br", {}, []),

    createElement("label", {
      for: "petType",
      textContent: "Select your pet type: ",
    }), // Add a space after the colon
    createElement("select", { id: "petType", name: "petType" }, [
      createElement("option", { value: "dog", textContent: "Dog" }),
      createElement("option", { value: "cat", textContent: "Cat" }),
    ]),
    createElement("br", {}, []),

    createElement("label", {
      for: "petBreed",
      textContent: "Enter your pet breed: ",
    }), // Add a space after the colon
    createElement("input", { type: "text", id: "petBreed", name: "petBreed" }),
    createElement("br", {}, []),

    createElement("button", { type: "submit", textContent: "Join Now" }),
  ]);

  window.addEventListener("load", () => {
    const storedData = JSON.parse(localStorage.getItem("joinFormData")) || {};
    document.getElementById("username").value = storedData.username || "";
    document.getElementById("email").value = storedData.email || "";
    document.getElementById("petType").value = storedData.petType || "dog";
    document.getElementById("petBreed").value = storedData.petBreed || "";
  });

  // Event listener for form submission
  joinForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Validate form fields
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const petType = document.getElementById("petType").value;
    const petBreed = document.getElementById("petBreed").value.trim();

    // Basic validation
    if (username === "" || email === "" || password === "" || petBreed === "") {
      alert("All fields must be filled out");
      return;
    }

    // Additional validation
    if (!validateEmail(email)) {
      alert("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const formData = {
      username,
      email,
      petType,
      petBreed,
    };
    localStorage.setItem("joinFormData", JSON.stringify(formData));

    // If all validations pass, you can proceed with form submission or other actions
    alert(`Welcome, ${username}! Join successful!`); // Include username in the alert

    // Clear the form after displaying the alert
    clearForm();
  });

  // Function to clear the form
  function clearForm() {
    joinForm.reset(); // This resets the form to its initial state
  }

  // Append elements to the join container
  joinContainer.append(joinForm);

  return createElement("div", { className: "join-section" }, [
    joinTitle,
    joinContainer,
  ]);
}

export default join;
