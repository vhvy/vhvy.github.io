class LazyLoadImg {
    constructor() {
        this.options = {
            threshold: .25
        };
        this.observer = new IntersectionObserver(this.handle.bind(this), this.options);
        this.init();
    }

    handle(entries) {
        entries.forEach(({ isIntersecting, target }) => {
            isIntersecting && this.loadImg(target);
        })
    }

    loadImg(el) {
        this.observer.unobserve(el);
        const src = el.getAttribute('data-original');
        let image = new Image();
        image.onload = () => {
            el.onload = () => {
                el.removeAttribute('data-original');
            }
            el.setAttribute('src', src);
            image = null;
        }

        image.src = src;
    }

    init() {
        Array.from(document.querySelectorAll('img[data-original]'))
            .map(el => {
                this.observer.observe(el);
            });
    }
}

new LazyLoadImg;