(function () {
  const PASSWORD = 'ketchup';
  const KEY = 'blvd_auth';

  if (sessionStorage.getItem(KEY) === '1') return;

  const css = `
    #blvd-gate {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: #0A0A0A;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    #blvd-gate-eyebrow {
      font-size: 14px;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.45);
      margin-bottom: 32px;
      line-height: 1.6;
      text-align: center;
    }
    #blvd-gate-input {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      color: #fff;
      font-family: inherit;
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 0;
      padding: 12px 20px;
      text-align: center;
      width: 220px;
      outline: none;
      display: block;
      transition: border-color 0.2s;
    }
    #blvd-gate-input::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }
    #blvd-gate-input:focus {
      border-color: rgba(255, 255, 255, 0.3);
    }
    #blvd-gate-error {
      margin-top: 14px;
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.04em;
      color: rgba(255, 90, 90, 0.65);
      height: 14px;
      text-align: center;
    }
    @keyframes blvd-shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-7px); }
      40%       { transform: translateX(7px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
    #blvd-gate-input.blvd-shake {
      animation: blvd-shake 0.35s ease;
    }
    @keyframes blvd-fade-out {
      to { opacity: 0; }
    }
    #blvd-gate.blvd-bye {
      animation: blvd-fade-out 0.3s ease forwards;
    }
    #blvd-gate-close {
      position: absolute;
      top: 28px;
      right: 32px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: rgba(255, 255, 255, 0.3);
      line-height: 1;
      transition: color 0.2s;
    }
    #blvd-gate-close:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  document.addEventListener('DOMContentLoaded', function () {
    const gate = document.createElement('div');
    gate.id = 'blvd-gate';
    gate.innerHTML = `
      <button id="blvd-gate-close" aria-label="Go back">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <div id="blvd-gate-eyebrow">This case study is shared privately.<br>Enter the password to continue.</div>
      <input id="blvd-gate-input" type="text" autocomplete="off" readonly spellcheck="false" placeholder="* * * * * * *" />
      <div id="blvd-gate-error"></div>
    `;
    document.body.appendChild(gate);

    const input = document.getElementById('blvd-gate-input');
    const error = document.getElementById('blvd-gate-error');
    document.getElementById('blvd-gate-close').addEventListener('click', () => history.back());

    input.focus();
    input.removeAttribute('readonly');

    function attempt() {
      if (input.value.trim().toLowerCase() === PASSWORD) {
        sessionStorage.setItem(KEY, '1');
        gate.classList.add('blvd-bye');
        gate.addEventListener('animationend', () => gate.remove(), { once: true });
      } else {
        error.textContent = 'wrong password';
        input.value = '';
        input.classList.remove('blvd-shake');
        void input.offsetWidth;
        input.classList.add('blvd-shake');
        input.addEventListener('animationend', () => input.classList.remove('blvd-shake'), { once: true });
      }
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') attempt();
      if (error.textContent) error.textContent = '';
    });
  });
})();
