/**
 * ========================================================
 *  CVVFR BIO - PURE MONOCHROME (BLACK & WHITE)
 * ========================================================
 */

const CONFIG = {
  // Video Source (Full HD 1080p local file):
  videoSource: "background.mp4",

  // Avatar / Logo:
  logoUrl: "https://cdn.discordapp.com/avatars/687036384556744739/a_cae52e8277374defba13fabf4ddcb880.gif",

  // Profile Details:
  displayName: "dontdestroymeagain",
  discordHandle: "dontdestroymeagain",
  customStatusText: '"lost in the static"',
  discordInviteUrl: "https://discord.gg/novasoftware",
  discordServerTag: "discord.gg/novasoftware",

  // YouTube Details:
  youtubeUrl: "https://www.youtube.com/@e9tc",
  youtubeTag: "youtube.com/@e9tc"
};

/* ========================================================
   INITIALIZE DOM
   ======================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Populate profile info
  const nameEl = document.getElementById("display-name");
  if (nameEl) {
    nameEl.textContent = CONFIG.displayName;
    nameEl.setAttribute("data-text", CONFIG.displayName);
  }
  document.getElementById("discord-handle").textContent = CONFIG.discordHandle;
  document.getElementById("custom-status-text").textContent = CONFIG.customStatusText;

  const joinBtn = document.getElementById("discord-join-link");
  if (joinBtn) {
    joinBtn.href = CONFIG.discordInviteUrl;
    const urlSpan = joinBtn.querySelector(".btn-url");
    if (urlSpan) urlSpan.textContent = CONFIG.discordServerTag;
  }

  const ytBtn = document.getElementById("youtube-link");
  if (ytBtn) {
    ytBtn.href = CONFIG.youtubeUrl;
    const ytUrlSpan = document.getElementById("youtube-url-text");
    if (ytUrlSpan) ytUrlSpan.textContent = CONFIG.youtubeTag;
  }

  // Ensure native video playback starts
  const bgVideo = document.getElementById("bg-video");
  if (bgVideo) {
    bgVideo.play().catch(() => {});
  }

  initLogo(CONFIG.logoUrl);
  initEnterOverlay();
  initCopyHandle();
  initSecurity();
});

// Run security immediately
initSecurity();

/* ========================================================
   CLICK TO ENTER OVERLAY
   ======================================================== */
function initEnterOverlay() {
  const overlay = document.getElementById("enter-overlay");
  const bgVideo = document.getElementById("bg-video");

  if (!overlay) return;

  overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");

    // Play video with audio enabled
    if (bgVideo) {
      bgVideo.play().catch(() => {});
      bgVideo.muted = false;
      bgVideo.volume = 1.0;
    }
  });
}

/* ========================================================
   LOGO / AVATAR HANDLER
   ======================================================== */
function initLogo(url) {
  const avatarEl = document.getElementById("discord-avatar");
  if (!avatarEl) return;

  avatarEl.src = url || "avatar.svg";
  avatarEl.onerror = () => {
    avatarEl.src = "avatar.svg";
  };
}

/* ========================================================
   COPY DISCORD HANDLE TO CLIPBOARD
   ======================================================== */
function initCopyHandle() {
  const btn = document.getElementById("copy-handle-btn");
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");
  let timer = null;

  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.discordHandle);
    } catch {
      const input = document.createElement("input");
      input.value = CONFIG.discordHandle;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    if (toast && toastText) {
      toastText.textContent = `Copied: ${CONFIG.discordHandle}`;
      toast.classList.add("show");
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove("show"), 2500);
    }
  });
}

/* ========================================================
   SECURITY & ANTI-INSPECTION PROTECTION
   ======================================================== */
function initSecurity() {
  // Prevent duplicate event listeners
  if (window._securityInitialized) return;
  window._securityInitialized = true;

  // 1. Disable Right Click (Context Menu)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. Disable DevTools & Source Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    const key = e.key ? e.key.toUpperCase() : "";
    const keyCode = e.keyCode || e.which;
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;

    // F12
    if (key === "F12" || keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / J / C / K (Inspect, Console, Elements, DevTools)
    if (isCtrlOrMeta && e.shiftKey && (key === "I" || key === "J" || key === "C" || key === "K")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U (View Page Source)
    if (isCtrlOrMeta && key === "U") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S (Save Page)
    if (isCtrlOrMeta && key === "S") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+P (Print Page)
    if (isCtrlOrMeta && key === "P") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+A (Select All)
    if (isCtrlOrMeta && key === "A") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. Disable Dragging of Images and Media
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 4. Disable Mouse Selection Dragging
  document.addEventListener("selectstart", (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 5. Console Deterrent & Periodic Clear
  try {
    console.clear();
    console.log(
      "%cSTOP!",
      "color: #ffffff; font-size: 36px; font-weight: 900; background: #000000; padding: 4px 10px; border: 2px solid #ffffff; font-family: monospace;"
    );
    console.log(
      "%c[ ACCESS DENIED ]\nThis source code and assets are protected.",
      "color: #888888; font-size: 13px; font-family: monospace; font-weight: bold;"
    );
  } catch (err) {}

  setInterval(() => {
    try {
      console.clear();
    } catch (err) {}
  }, 2500);

  // 6. Anti-Debugger Trap (freezes execution if DevTools is opened via browser menu)
  setInterval(() => {
    (function() {
      Function("debugger")();
    })();
  }, 100);
}

