import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { Dropdown } from 'react-bootstrap'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const MessageItem = ({ message }) => {
  const [starred, setStarred] = useState(message.starred || false)

  const toggleStar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setStarred(!starred)
  }

  const getAvatar = () => {
    if (message.avatar) {
      return (
        <img
        width="50"
          src={message.avatar}
          alt={message.sender}
          className="avatar rounded-circle"
        />
      )
    } else {
      // Generate initial avatar with background color
      const initials = message.sender
        .split(' ')
        .map(name => name[0])
        .join('')
        .substring(0, 2)

      // Generate color based on sender's name
      const colorIndex = message.sender.charCodeAt(0) % colors.length

      return (
        <div
          className="avatar-placeholder"
          style={{ backgroundColor: colors[colorIndex] }}
        >
          {initials}
        </div>
      )
    }
  }

  return (
    <div className="message-row d-flex align-items-center py-3 px-2">
      <div className="form-check me-1">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={`message-${message.id}`}
        />
      </div>

      <div className="ms-2 me-3 cursor-pointer" onClick={toggleStar}>
        <FontAwesomeIcon
          icon={starred ? faStarSolid : faStarRegular}
          className={starred ? 'starred' : 'text-muted'}
        />
      </div>

      <div className="d-flex align-items-center flex-grow-1">
        <div className="me-3">
          {getAvatar()}
        </div>

        <div className="flex-grow-1 text-truncate">
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 fw-bold">{message.sender}</p>
            <span className="text-muted small">{message.time}</span>
          </div>
          <p className="mb-0 text-truncate text-muted">
            {message.content}
          </p>
        </div>
      </div>

      <div className="ms-3">
        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="cursor-pointer">
            <FontAwesomeIcon icon={faEllipsisV} className="text-muted" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Reply</Dropdown.Item>
            <Dropdown.Item>Forward</Dropdown.Item>
            <Dropdown.Item>Mark as unread</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

// Generate colors for avatars
const colors = [
  '#e11d48', // red
  '#ea580c', // orange
  '#16a34a', // green
  '#0284c7', // blue
  '#7c3aed', // purple
  '#db2777', // pink
]

export default MessageItem
