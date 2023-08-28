document.addEventListener("DOMContentLoaded", function() {
    const clickableElements = document.querySelectorAll('.clickable');
  
    clickableElements.forEach(function(svg) {
      svg.addEventListener('click', function(event) {
        const parentDiv = svg.closest('.flexRow');
        const span = parentDiv.querySelector('span');
        const textToCopy = span ? span.textContent : '';
  
        if (textToCopy) {
          copyToClipboard(textToCopy);
        }
      });
    });
  });
  
  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
  
    try {
      document.execCommand('copy'); 
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
    return true;
  }
  