// utils/consent.ts

// Function to parse cookie string
const getCookie = (name: string) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const checkInitialConsent = (): { [key: string]: boolean } => {
  // Check for a specific consent cookie
  // Example: "userConsent=analytics:true,preferences:false"
  const consentCookie = getCookie("userConsent");
  const consent = {
    analytics: false,
    preferences: false,
    essential: true, // Essential cookies are typically always allowed
  };

  if (consentCookie) {
    const parsedConsents = consentCookie.split(",").reduce((acc, curr) => {
      const [key, value] = curr.split(":");
      acc[key] = value === "true";
      return acc;
    }, {});

    return { ...consent, ...parsedConsents };
  }

  return consent;
};
