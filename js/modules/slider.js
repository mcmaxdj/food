function slider({container, slide, prevArrow, nextArrow, totalCouner, currentCounter, wrapper, field}) {
    let slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCouner),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    let dots = document.createElement('ol'),
        indicators = [];
    dots.classList.add('carousel-dots');
    
    dots.style.cssText = 
        `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = 
        `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        indicators.push(dot);
    }

    function removePx(str) {
        return +str.replace(/\D/g, '');
    }

    function setCurrentIndex() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }
    }

    function setDots() {
        indicators.forEach(dot => dot.style.opacity = '.5');
        indicators[slideIndex - 1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == removePx(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += removePx(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCurrentIndex();
        setDots();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = removePx(width) * (slides.length - 1);
        } else {
            offset -= removePx(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setCurrentIndex();
        setDots();
    });

    indicators.forEach(dot => {
        dot.addEventListener('click', (e) => {
            let slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = removePx(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrentIndex();
            setDots();
        })
    })
}

export default slider;