const widget = document.getElementById('telegramWidget');
const hint = document.getElementById('hint');

const TELEGRAM_BOT_USERNAME = 'glnt_auth_bot';

requestAnimationFrame(() => {
  document.documentElement.classList.add('loaded');
});

function setHint(text = '') {
  if (hint) hint.textContent = text;
}

function getReturnUrl() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('return') || params.get('next');

  if (fromQuery && fromQuery.startsWith('/')) {
    sessionStorage.setItem('glnt_auth_return', fromQuery);
    return fromQuery;
  }

  const saved = sessionStorage.getItem('glnt_auth_return');
  if (saved && saved.startsWith('/')) return saved;

  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.origin === window.location.origin && !ref.pathname.startsWith('/auth')) {
      return ref.pathname + ref.search + ref.hash;
    }
  } catch {}

  return '/';
}

function saveUser(user) {
  localStorage.setItem('glnt_user', JSON.stringify(user));
  localStorage.setItem('glnt_logged_in', 'true');
}

function redirectAfterLogin() {
  const target = getReturnUrl();
  sessionStorage.removeItem('glnt_auth_return');
  window.location.href = target;
}

function renderWidget() {
  if (!widget) return;

  const script = document.createElement('script');

  script.async = true;
  script.src = 'https://telegram.org/js/telegram-widget.js?22';

  script.setAttribute('data-telegram-login', TELEGRAM_BOT_USERNAME);
  script.setAttribute('data-size', 'large');
  script.setAttribute('data-radius', '14');
  script.setAttribute('data-userpic', 'false');
  script.setAttribute('data-request-access', 'write');
  script.setAttribute('data-lang', 'ru');
  script.setAttribute('data-onauth', 'onTelegramAuth(user)');

  widget.appendChild(script);
}

window.onTelegramAuth = async function(user) {
  try {
    setHint('Авторизация...');

    saveUser({
      id: user.id,
      first_name: user.first_name,
      username: user.username,
      photo_url: user.photo_url,
      auth_date: user.auth_date
    });

    setHint('Успешный вход через Telegram.');

    setTimeout(() => {
      redirectAfterLogin();
    }, 500);

  } catch (error) {
    console.error(error);
    setHint('Ошибка авторизации Telegram.');
  }
};

getReturnUrl();
renderWidget();