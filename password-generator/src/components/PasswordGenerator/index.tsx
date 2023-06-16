import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState } from 'react'
import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'
import Checkbox from '../Checkbox'
import './index.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8)
  const [checkboxes, setCheckboxes] = useState([
    { id: 'uppercase', label: 'Uppercase', checked: false },
    { id: 'lowercase', label: 'Lowercase', checked: false },
    { id: 'numbers', label: 'Numbers', checked: false },
    { id: 'symbols', label: 'Symbols', checked: false },
  ])
  const [generatedPassword, setGeneratedPassword] = useState<string>('')
  const [passwordStrength, setPasswordStrength] = useState<string>('')

  const onChangePasswordLength = (value: number | number[]) => {
    setPasswordLength(value as number)
  }

  const generateRandomCharacter = (string: string) => {
    const randomIndex = Math.floor(Math.random() * string.length)
    return string.charAt(randomIndex)
  }

  const generator = () => {
    const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked)
    if (selectedCheckboxes.length === 0) {
      alert('Error: No checkboxes')
      return
    }

    const checkboxStrings: { [key: string]: string } = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*-_+=~.,;:?/\\|(){}[]<>',
    }

    let generatedKey = ''
    for (let i = 0; i < passwordLength; i++) {
      const randomCheckbox =
        selectedCheckboxes[Math.floor(Math.random() * selectedCheckboxes.length)]
      const characterString = checkboxStrings[randomCheckbox.id]
      const randomCharacter = generateRandomCharacter(characterString)
      generatedKey += randomCharacter
    }

    setGeneratedPassword(generatedKey)
    const strength = getPasswordStrength(generatedKey)
    setPasswordStrength(strength)
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

  const getPasswordStrength = (password: string) => {
    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*()\-+]/.test(password)
    const minLength = 8

    if (password.length < minLength) return 'weak'

    let strengthScore = 0

    if (hasLowerCase) strengthScore++
    if (hasUpperCase) strengthScore++
    if (hasDigit) strengthScore++
    if (hasSpecialChar) strengthScore++

    if (strengthScore >= 4) {
      return 'strong'
    } else if (strengthScore >= 2) {
      return 'medium'
    } else {
      return 'weak'
    }
  }

  const getPasswordColor = (strength: string) => {
    switch (strength) {
      case 'weak':
        return 'var(--danger-color)'
      case 'medium':
        return 'var(--warning-color)'
      case 'strong':
        return 'var(--success-color)'
      default:
        return ''
    }
  }

  const handleCopy = () => {
    if (generatedPassword) {
      navigator.clipboard
        .writeText(generatedPassword)
        .then(() => {
          toast.success('Password copied to clipboard!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        })
        .catch((error) => {
          console.error('Failed to copy password:', error)
          toast.error('Failed to copy password.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        })
    }
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
          <input type="text" placeholder="your password" value={generatedPassword} readOnly />
          <Refresh onClick={generator} />
        </div>
        <button className="copy-btn" onClick={handleCopy}>
          <Copy /> Copy
        </button>
      </div>
      <span className={`fw-500`} style={{ color: getPasswordColor(passwordStrength) }}>
        {passwordStrength}
      </span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={8}
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
