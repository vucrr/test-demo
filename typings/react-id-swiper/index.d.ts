declare module 'react-id-swiper' {
  import React from 'react'

  interface SwiperOptions {
    // parallax
    parallax: boolean
    parallaxEl: Partial<{
      el: string
      value: string
    }>

    // swiper parameter
    init: boolean
    initialSlide: number
    direction: string
    rtl: boolean
    speed: number
    setWrapperSize: boolean
    virtualTranslate: boolean
    width: number
    height: number
    autoHeight: boolean
    roundLengths: boolean
    nested: boolean
    uniqueNavElements: boolean
    effect: string
    runCallbacksOnInit: boolean

    // slides grid
    spaceBetween: number
    slidesPerView: any
    slidesPerColumn: number
    slidesPerColumnFill: string
    slidesPerGroup: number
    centeredSlides: boolean
    slidesOffsetBefore: number
    slidesOffsetAfter: number
    normalizeSlideIndex: boolean

    // grab cursor
    grabCursor: boolean

    // touches
    touchEventsTarget: string
    touchRatio: number
    touchAngle: number
    simulateTouch: boolean
    shortSwipes: boolean
    longSwipes: boolean
    longSwipesRatio: number
    longSwipesMs: number
    followFinger: boolean
    allowTouchMove: boolean
    threshold: number
    touchMoveStopPropagation: boolean
    iOSEdgeSwipeDetection: boolean
    iOSEdgeSwipeThreshold: number
    touchReleaseOnEdges: boolean
    passiveListeners: boolean

    // touch resistance
    resistance: boolean
    resistanceRatio: number

    // swiping / no swiping
    allowSlidePrev: boolean
    allowSlideNext: boolean
    noSwiping: boolean
    noSwipingClass: string
    swipeHandler: any

    // clicks
    preventClicks: boolean
    preventClicksPropagation: boolean
    slideToClickedSlide: boolean

    // freemode
    freeMode: boolean
    freeModeMomentum: boolean
    freeModeMomentumRatio: number
    freeModeMomentumVelocityRatio: number
    freeModeMomentumBounce: boolean
    freeModeMomentumBounceRatio: number
    freeModeMinimumVelocity: number
    freeModeSticky: boolean

    // progress
    watchSlidesProgress: boolean
    watchSlidesVisibility: boolean

    // images
    preloadImages: boolean
    updateOnImagesReady: boolean

    // loop
    loop: boolean
    loopAdditionalSlides: number
    loopedSlides: number
    loopFillGroupWithBlank: boolean

    // breakpoints
    breakpoints: object

    // observer
    observer: boolean
    observeParents: boolean

    // namespace
    containerModifierClass: string
    slideClass: string
    slideActiveClass: string
    slideDuplicatedActiveClass: string
    slideVisibleClass: string
    slideDuplicateClass: string
    slideNextClass: string
    slideDuplicatedNextClass: string
    slidePrevClass: string
    slideDuplicatedPrevClass: string

    // autoplay
    autoplay:
      | boolean
      | Partial<{
          delay: number
          stopOnLast: boolean
          disableOnInteraction: boolean
        }>

    // pagination
    pagination: Partial<{
      el: string
      type: string
      bulletElement: string
      dynamicBullets: boolean
      hideOnClick: boolean
      clickable: boolean
      renderBullet: Function
      renderFraction: Function
      renderProgressbar: Function
      renderCustom: Function
      bulletClass: string
      bulletActiveClass: string
      modifierClass: string
      currentClass: string
      totalClass: string
      hiddenClass: string
      progressbarFillClass: string
      clickableClass: string
    }>

    // scrollbar
    scrollbar: Partial<{
      el: any
      hide: boolean
      draggable: boolean
      snapOnRelease: boolean
      dragSize: string | number
    }>

    // navigation
    navigation: Partial<{
      nextEl: string
      prevEl: string
      hideOnClick: boolean
      disabledClass: string
      hiddenClass: string
    }>

    // a11y
    a11y:
      | boolean
      | Partial<{
          prevSlideMessage: string
          nextSlideMessage: string
          firstSlideMessage: string
          lastSlideMessage: string
          paginationBulletMessage: string
          notificationClass: string
        }>

    // zoom
    zoom:
      | boolean
      | Partial<{
          maxRatio: number
          minRatio: number
          toggle: boolean
          containerClass: string
          zoomedSlideClass: string
        }>

    // keyboard
    keyboard: boolean

    // mousewheel
    mousewheel:
      | boolean
      | Partial<{
          forceToAxis: boolean
          releaseOnEdges: boolean
          invert: boolean
          sensitivity: number
          eventsTarged: string
        }>

    // hashNavigation
    hashNavigation:
      | boolean
      | Partial<{
          watchState: boolean
          replaceState: boolean
        }>

    // history
    history:
      | boolean
      | Partial<{
          key: string
          replaceState: boolean
        }>

    // lazy
    lazy:
      | boolean
      | Partial<{
          loadPrevNext: boolean
          loadPrevNextAmount: number
          loadOnTransitionStart: boolean
          elementClass: string
          loadingClass: string
          loadedClass: string
          preloaderClass: string
        }>

    // fadeEffect
    fadeEffect: {
      crossFade: boolean
    }

    // coverflowEffect
    coverflowEffect: Partial<{
      slideShadows: boolean
      rotate: number
      stretch: number
      depth: number
      modifier: number
    }>

    // flipEffect
    flipEffect: Partial<{
      slideShadows: boolean
      limitRotation: boolean
    }>

    // cubeEffect
    cubeEffect: Partial<{
      slideShadows: boolean
      shadow: boolean
      shadowOffset: number
      shadowScale: number
    }>

    // controller
    controller:
      | boolean
      | Partial<{
          control: any
          inverse: boolean
          by: string
        }>

    // events
    on: Partial<{
      init: Function
      beforeDestroy: Function
      slideChange: Function
      slideChangeTransitionStart: Function
      slideChangeTransitionEnd: Function
      slideNextTransitionStart: Function
      slideNextTransitionEnd: Function
      slidePrevTransitionStart: Function
      slidePrevTransitionEnd: Function
      transitionStart: Function
      onTransitionEnd: Function
      touchStart: Function
      touchMove: Function
      touchMoveOpposite: Function
      sliderMove: Function
      touchEnd: Function
      click: Function
      tap: Function
      doubleTap: Function
      imagesReady: Function
      progress: Function
      reachBeginning: Function
      reachEnd: Function
      fromEdge: Function
      setTranslate: Function
      setTransition: Function
      resize: Function
    }>
  }

  interface ReactIdSwiperProps {
    ContainerEl: string
    containerClass: string
    WrapperEl: string
    wrapperClass: string
    slideClass: string
    shouldSwiperUpdate: boolean
    rebuildOnUpdate: boolean
    noSwiping: boolean
    activeSlideKey: string | number
    renderPrevButton: Function
    renderNextButton: Function
    renderScrollbar: Function
    renderPagination: Function
    renderParallax: Function
  }

  export type SwiperProps = Partial<SwiperOptions & ReactIdSwiperProps>

  export default class Swiper extends React.Component<SwiperProps> {}
}
