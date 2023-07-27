function openModal(modalSelector, modalTimerId) {
    let modalContent = document.querySelector(modalSelector);
    modalContent.classList.add('show', 'fade')
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId)
    if (modalTimerId) {
        clearInterval(modalTimerId);
    } 

};

function closeModal(modalSelector) {
    let modalContent = document.querySelector(modalSelector);
    modalContent.classList.remove('show', 'fade');
    document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    let modalButtons = document.querySelectorAll(triggerSelector),
        modalContent = document.querySelector(modalSelector);

    modalButtons.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modalContent.addEventListener('click', (event) => {
        if (event.target === modalContent || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalContent.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // иногда надо добавлять -1 после scrollHeight
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};