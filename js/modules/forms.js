import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    let forms = document.querySelectorAll(formSelector);

    let message = {
        loadind: 'img/spinner.svg',
        success: 'Thanks! We Will Call You Back Soon',
        failur: 'Something went wrong'
    }

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loadind;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            let formData = new FormData(form);

            let json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.textContent = message.success;
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failur);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal(message) {
        let prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        let thanksModal = document.createElement('div');
        thanksModal.classList.add('.modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div data-close class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;