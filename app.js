document.addEventListener('DOMContentLoaded', () => {
  function prognroll(options) {
    const settings = Object.assign(
      {
        height: 5, //Progress bar height
        color: '#50bcb6', //Progress bar background color
        custom: false, //If you make it true, you can add your custom div and see it's scroll progress on the page.
      },
      options
    );

    const progressBar = document.createElement('span');
    progressBar.classList.add('prognroll-bar');
    document.body.insertBefore(progressBar, document.body.firstChild);

    const style = progressBar.style;
    style.position = 'fixed';
    style.top = '0';
    style.left = '0';
    style.width = '0';
    style.height = settings.height + 'px';
    style.backgroundColor = settings.color;
    style.zIndex = '9999999';

    const globals = {
      windowScrollTop: window.pageYOffset,
      windowInnerHeight: window.innerHeight,
      bodyHeight: document.body.scrollHeight,
    };

    function bindWindowScroll() {
      window.addEventListener('scroll', () => {
        globals.windowScrollTop = window.pageYOffset;
        globals.windowInnerHeight = window.innerHeight;
        globals.bodyHeight = document.body.scrollHeight;

        const total =
          (globals.windowScrollTop /
            (globals.bodyHeight - globals.windowInnerHeight)) *
          100;

        style.width = total + '%';
      });
    }

    if (!settings.custom) {
      bindWindowScroll();
    } else {
      if (style.maxHeight === 'none') {
        bindWindowScroll();
      } else {
        const el = document.querySelector(settings.custom);
        el.addEventListener('scroll', () => {
          const customScrollTop = el.scrollTop;
          const customOuterHeight = el.offsetHeight;
          const customScrollHeight = el.scrollHeight;

          const total =
            (customScrollTop / (customScrollHeight - customOuterHeight)) * 100;
          style.width = total + '%';
        });
      }
    }

    const total =
      (globals.windowScrollTop /
        (globals.bodyHeight - globals.windowInnerHeight)) *
      100;
    style.width = total + '%';
  }
  prognroll();
});
