import * as ReactDOM from 'react-dom'
import * as React from 'react'

import { ImageLoader } from './index'

const Dev = (props) => {
  return (
    <div>
      <ImageLoader
        src='https://upload.wikimedia.org/wikipedia/commons/2/24/Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg'
        placeholderSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Small-city-symbol.svg/348px-Small-city-symbol.svg.png'
      />
    </div>
  )
}

ReactDOM.render(
  <Dev />,
  document.getElementById('mount')
)
