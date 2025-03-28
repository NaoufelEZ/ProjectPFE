import { useState } from 'react'
import { Button, Card, Dropdown, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faTrash,
  faEnvelope,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import MessageItem from '../../../Components/MessageItem'
import { Helmet } from 'react-helmet-async'

const MOCK_MESSAGES = [
  {
    id: 1,
    sender: 'Roy Fendley',
    avatar: 'https://ext.same-assets.com/110683079/2370240543.jpeg',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: '11:01 AM',
    starred: false
  },
  {
    id: 2,
    sender: 'Bonnie Green',
    avatar: 'https://ext.same-assets.com/110683079/1879266023.jpeg',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: '10:23 AM',
    starred: true
  },
  {
    id: 3,
    sender: 'Scott Anderson',
    avatar: '',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: '10:01 AM',
    starred: true
  },
  {
    id: 4,
    sender: 'Ronnie Buchanan',
    avatar: 'https://ext.same-assets.com/110683079/3148642571.jpeg',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: '07:45 AM',
    starred: false
  },
  {
    id: 5,
    sender: 'Jane Rinehart',
    avatar: '',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: '07:30 AM',
    starred: false
  },
  {
    id: 6,
    sender: 'William Ginther',
    avatar: '',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: '06:10 AM',
    starred: false
  },
  {
    id: 7,
    sender: 'George Driskell',
    avatar: '',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: 'Mar 18',
    starred: false
  },
  {
    id: 8,
    sender: 'Ronnie Buchanan',
    avatar: 'https://ext.same-assets.com/110683079/3148642571.jpeg',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: 'Mar 16',
    starred: false
  },
  {
    id: 9,
    sender: 'Jane Rinehart',
    avatar: '',
    content: 'Long time no see - Can we help you set up email forwarding? We\'ve noticed you haven\'t set up email forwarding and we could help you',
    time: 'Mar 15',
    starred: true
  }
]

const Messages = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES)

  return (
    <>
    <Helmet>
      <title>Message|Dashboard</title>
    </Helmet>
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-0">
        {/* Toolbar */}
        <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
          <div>
            <Button variant="primary" className="compose-btn">
              <FontAwesomeIcon icon={faPen} className="me-2" />
              Compose
            </Button>
          </div>

          <div className="d-flex">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="light" className="text-muted" id="actions-dropdown">
                <FontAwesomeIcon icon={faEnvelope} className="me-1" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Mark as read</Dropdown.Item>
                <Dropdown.Item>Mark as unread</Dropdown.Item>
                <Dropdown.Item>Mark as important</Dropdown.Item>
                <Dropdown.Item>Mark as not important</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="light" className="text-muted me-2">
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Button variant="light" className="text-muted">
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </div>

        {/* Message List */}
        <div>
          {messages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center p-3 border-top">
          <div>Showing 1 - 9 of 289</div>
          <div>
            <Button variant="light" className="text-muted me-2">
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Button variant="light" className="text-muted">
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
    </>
  )
}

export default Messages
