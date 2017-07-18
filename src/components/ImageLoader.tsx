import * as React from 'react'

export interface Props {
  src: string
  placeholderSrc?: string
  spinner?: boolean
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
  alt?: string
  placeholderClassName?: string
  placeholderStyle?: React.CSSProperties
  loaderClassName?: string
  loaderStyle?: React.CSSProperties
}

export interface State {
  loaded: boolean
}

class ImageLoader extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)

    this.state = { loaded: false }
  }

  public componentDidMount(): void {
    const image = new Image()
    image.src = this.props.src
    image.onload = () => {
      this.setState({ loaded: true })
    }
  }

  public render(): JSX.Element {
    const { loaded } = this.state
    const {
      src,
      placeholderSrc,
      style,
      alt,
      className,
      placeholderClassName,
      placeholderStyle,
      wrapperClassName,
      wrapperStyle,
      loaderClassName,
      loaderStyle
    } = this.props

    const calcedPlaceholderStyles = loaded
                                  ? { ...styles.loadedPlaceholder, ...placeholderStyle }
                                  : { ...styles.placeholder, ...placeholderStyle }

    const placeholder = (
      <img src={ placeholderSrc } className={ placeholderClassName } style ={ calcedPlaceholderStyles } />
    )

    const main = (
      <img src={ src } style={ style } className={ className } alt={ alt } />
    )

    return (
      <div style={ wrapperStyle } className={ wrapperClassName }>
        { !loaded && <div className={ loaderClassName} style={ { ...styles.loader, ...loaderStyle } }>I AM LOADING NOW</div>}
        { placeholder }
        { loaded && main }
      </div>
    )
  }
}

export default ImageLoader

const styles: { [index: string]: React.CSSProperties } = {
  loader: {
    width: '100%',
    height: '100%'
  },
  image: {
  },
  placeholder: {
    transition: 'opacity 3.3s ease-in-out',
    zIndex: 10
  },
  loadedPlaceholder: {
    opacity: 0,
    position: 'absolute',
    transition: 'opacity 3.3s ease-in-out',
    pointerEvents: 'none'
  }
}
