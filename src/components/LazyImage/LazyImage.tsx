import cx from 'classnames'
import { Icon } from 'components'
import React, { useEffect, useRef, useState } from 'react'
import styles from './LazyImage.less'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function LazyImage(props: LazyImageProps) {
  // 这里解构出 unselectable 是因为 lib 本身有 type bug
  const { src, className, unselectable, ...imageProps } = props

  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  const fetchImage = (url: string) => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = url
      image.onload = resolve
      image.onerror = reject
    })
  }

  const loadImage = async (target: HTMLImageElement) => {
    const src = target.dataset.src
    if (!src) return
    await fetchImage(src)
    target.src = src
    setLoaded(true)
  }

  useEffect(
    function() {
      let intersection$: IntersectionObserver | null = null
      if ('IntersectionObserver' in window) {
        const configs = {
          root: null,
          rootMargin: '0px',
          threshold: 0.01,
        }
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
          entries.forEach(async (entry: IntersectionObserverEntry) => {
            if (entry.intersectionRatio > 0) {
              if (intersection$) intersection$.unobserve(entry.target)
              await loadImage(entry.target as HTMLImageElement)
            }
          })
        }
        intersection$ = new IntersectionObserver(handleIntersection, configs)
        intersection$.observe(ref.current!)
      } else {
        void loadImage(ref.current!)
      }
    },
    [src],
  )

  return (
    <div className={cx(className, styles.container)}>
      {!loaded && <Icon className={styles.placeholder} type={require('svg/placeholder.svg')} size="sm" />}
      <img
        {...imageProps}
        className={loaded ? styles.image : styles.imageHidden}
        ref={ref}
        data-src={src}
        src=""
        alt="Xianghuanji"
        title="Xianghuanji"
      />
    </div>
  )
}

export default LazyImage
