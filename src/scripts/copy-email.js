// The footer email button: hovering shows "copy email", clicking copies the
// address to the clipboard and shows "email copied" for two seconds.
// Replaces clipboard.js with the browser's Clipboard API.

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for non-secure contexts (e.g. plain http).
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  textarea.remove();
  if (!ok) throw new Error('copy failed');
}

for (const label of document.querySelectorAll('[data-copy-email]')) {
  const email = label.dataset.clipboardText;
  label.addEventListener('mouseover', () => {
    label.textContent = 'copy email';
  });
  label.addEventListener('mouseout', () => {
    label.textContent = email;
  });
  label.addEventListener('click', async () => {
    try {
      await copyText(email);
      label.textContent = 'email copied';
      window.setTimeout(() => {
        label.className = 'bttn__label';
        label.textContent = email;
      }, 2000);
    } catch {
      console.log("couldn't copy");
    }
  });
}
