(function () {
  const DEFAULT_ENDPOINT = "/api/dummy";

  function getStatusElement(form) {
    let status = form.querySelector(".contact__status");

    if (!status) {
      status = document.createElement("p");
      status.className = "contact__status";
      status.setAttribute("aria-live", "polite");
      status.setAttribute("role", "status");
      form.appendChild(status);
    }

    return status;
  }

  function setStatus(form, type, message) {
    const status = getStatusElement(form);
    status.className = `contact__status contact__status--${type}`;
    status.textContent = message;
  }

  function clearStatus(form) {
    const status = getStatusElement(form);
    status.className = "contact__status";
    status.textContent = "";
  }

  function getPayload(form) {
    const data = new FormData(form);

    return {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
  }

  async function readResponseMessage(response) {
    try {
      const body = await response.json();
      return body.message || "Something went wrong. Please try again.";
    } catch (error) {
      return "Something went wrong. Please try again.";
    }
  }

  function initContactForm(form) {
    if (form.dataset.contactReady === "true") {
      return;
    }

    form.dataset.contactReady = "true";

    const submitButton = form.querySelector(".contact__submit");
    const originalButtonHtml = submitButton ? submitButton.innerHTML : "";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearStatus(form);

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(form, "error", "Please complete the required fields before sending.");
        return;
      }

      const endpoint = form.dataset.endpoint || DEFAULT_ENDPOINT;
      const payload = getPayload(form);

      if (!payload.name || !payload.email || !payload.message) {
        setStatus(form, "error", "Please fill in all fields before sending.");
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(await readResponseMessage(response));
        }

        const body = await response.json();
        setStatus(form, "success", body.message || "Thanks, your message has been sent.");
        form.reset();
      } catch (error) {
        setStatus(
          form,
          "error",
          error.message || "We could not send your message. Please try again."
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonHtml;
        }
      }
    });
  }

  function initContactForms() {
    document.querySelectorAll(".contact__form").forEach(initContactForm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForms);
  } else {
    initContactForms();
  }
}());
