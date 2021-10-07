export const loadImage = $wrapper => {
  $wrapper.classList.remove('lazy');
  const lazyImage = $wrapper.querySelector('img');
  const placeholder = $wrapper.querySelector('.img-placeholder');

  lazyImage.src = lazyImage.dataset.src;
  // img 태그가 로드될때
  lazyImage.onload = () => {
    // 서서히 사라지는 효과
    placeholder.classList.add('fade-out');
    placeholder.ontransitionend = () => placeholder.remove();
  };
};

export default function lazyLoad(options = {}) {
  // root : observer를 설치할 element, rootMargin : 뷰포트 500픽셀 이내를 기준으로함
  const { root = document, rootMargin = '500px', threshold = 0 } = options;
  const lazyImageWrappers = Array.from(
    document.querySelectorAll('.img-wrapper.lazy')
  );
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // 뷰포트에서 500px 벗어나는 위치에 있는 요소들까지 로드
          if (entry.isIntersecting) {
            const $wrapper = entry.target;
            loadImage($wrapper);
            // observe 중지
            lazyImageObserver.unobserve($wrapper);
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );
    lazyImageWrappers.forEach(wrapper => {
      lazyImageObserver.observe(wrapper);
    });
  }
}
