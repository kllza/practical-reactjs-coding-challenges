import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState } from 'react'

import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'
import Checkbox from '../Checkbox'
import './index.css'

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8)

  const [checkboxes, setCheckboxes] = useState([
    { id: 'uppercase', label: 'Uppercase', checked: false },
    { id: 'lowercase', label: 'Lowercase', checked: false },
    { id: 'numbers', label: 'Numbers', checked: false },
    { id: 'special chars', label: 'Special Characters', checked: false },
  ])

  const onChangePasswordLength = (value: number | number[]) => {
    setPasswordLength(value as number)
  }

  const generator = () => {
    if (checkboxes[0].checked) {
      console.log('hola')
    }
  }

  const onChangeCheckbox = (changedId: any) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === changedId) {
        return { ...checkbox, checked: !checkbox.checked }
      }
      return checkbox
    })
    setCheckboxes(updatedCheckboxes)
  }

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value="B9QI4PDBYY" />
          <Refresh onClick={generator} />
        </div>
        <button className="copy-btn">
          <Copy /> Copy
        </button>
      </div>
      <span className="fw-500">Weak</span> {/* esto hay que cambiarlo luego */}
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        {checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            id={checkbox.id}
            label={checkbox.label}
            checked={checkbox.checked}
            name={checkbox.id}
            onChange={() => onChangeCheckbox(checkbox.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default PasswordGenerator
