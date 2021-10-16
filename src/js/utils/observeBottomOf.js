export default function observeBottomOf(
  element = document.body,
  onBottom,
  options = {}
) {
  const { root = document, rootMargin = '600px' } = options;
  // Observer 로 탐지할 요소
  const $observer = document.createElement('div');
  $observer.className = 'observer';
  element.append($observer);

  // observer 해제
  const unobserve = () => {
    observer.unobserve($observer);
    $observer.remove();
  };

  // IntersectionObserver cb
  const cb = entries => {
    // 탐지요소를 지나쳤으면
    if (entries[0].isIntersecting) {
      // 사용자 로직 후 옵져버 제거
      onBottom(unobserve);
    }
  };

  // observer 인스턴스 생성
  const observer = new IntersectionObserver(cb, {
    root,
    rootMargin,
  });
  // 탐지할 대상 지정
  observer.observe($observer);
}
