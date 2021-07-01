Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div');
    }

    const footer = document.createElement('div');
    footer.classList.add('modal__footer');

    buttons.forEach((btn) => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.classList.add('button');
        button.classList.add(`button_bg-color_${btn.bgColor || 'blue'}`);
        button.onclick = btn.handler || noop;

        footer.appendChild(button);
    })

    return footer;
}

function _createModal(options) {
    const defaultWidth = '600px';

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" data-close="true">
        <div class="modal__window" style="width: ${options.width + 'px' || defaultWidth}">
            <div class="modal__header">
                <div class="modal__title">${options.title || 'Заголовок'}</div>
                ${options.closable ? 
                `<div class="modal-close">
                    <button class="button button__close" data-close="true"></button>
                </div>` : ''}
            </div>
            <div class="modal__body" data-content>
                ${options.content || 'Основной текст модального окна.'}
            </div>
<!--            <div class="modal__footer">-->
<!--                <button class="button button_bg-color_green">Ok</button>-->
<!--                <button class="button button_bg-color_red">Cancel</button>-->
<!--            </div>-->
        </div>
    </div>
    `);

    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal);

    return modal;
}


base.modal = (options) => {
    const modal = _createModal(options);
    let destroyed = false;

    const modalMethod = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed');
            }
            modal.classList.add('open');
        },
        close() {
            modal.classList.remove('open');
        },
    }

    const listener = (event) => {
        console.log('Clicked', event.target.dataset.close);

        if (event.target.dataset.close) {
            modalMethod.close();
        }
    }

    modal.addEventListener('click', listener);

    return Object.assign(modalMethod, {
        destroy() {
            modal.parentNode.removeChild(modal);
            modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            modal.querySelector('[data-content]').innerHTML = html;
        }
    });
}
