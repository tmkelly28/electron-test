import './index.scss'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {readdir, read, isDir} from './utils'

class Main extends Component {
  state = {
    files: [],
    content: ''
  }

  componentDidMount () {
    readdir('./')
      .then(files => Promise.all(
        files.map(
          file => isDir(file)
            .then(dir => dir ? {type: 'dir', path: file} : {type: 'file', path: file})
        )
      ))
      .then(files => this.setState({files}))
  }

  handleClick = (evt) => {
    read(evt.target.dataset.value)
      .then(content => this.setState({content}))
  }

  render () {
    return (
      <div className='container'>
        <div className='col-2'>
          <ul>
            {
              this.state.files.map(
                file => <li
                  data-value={file.path}
                  className={file.type}
                  key={file.path}
                  onClick={this.handleClick}>
                  {file.path}
                </li>
              )
            }
          </ul>
        </div>
        <div className='col-10'>
          {
            this.state.content.split('\n').map((line, idx) => <p key={idx}>{line}</p>)
          }
        </div>
      </div>
    )
  }
}

render(
  <Main />,
  document.getElementById('app')
)
