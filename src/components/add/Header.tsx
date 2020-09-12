import React from 'react'
import RadioMenu, { RadioMenuProps } from 'components/RadioMenu'
import Icon from 'components/Icon'
import { useHistory } from 'react-router-dom'
import Header from 'components/Header'

export default (props: RadioMenuProps) => {
  const history = useHistory()
  return (
    <Header>
      <Icon name="back" onClick={() => history.goBack()}/>
      <RadioMenu values={props.values} onSelect={props.onSelect} defaultValue={props.defaultValue}/>
      <span />
    </Header>
  )
}