import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Icon from 'components/Icon'
import { userIncomeTags, userOutlayTags } from 'constants/userDefaultTags'
import useUserTags from 'hooks/useUserTags'
import theme from 'theme'

const Wrapper = styled.div`
  flex-grow: 99;
  box-shadow: 0 0 1px rgba(0, 0, 0, .25);
  overflow: auto;
  background: #FDFAF1;
`

export const Tags = styled.ul`
  display:flex;
  flex-wrap: wrap;
  padding: 30px 8px 10px 8px;
  overflow: auto;
`

export const TagItem = styled.li`
  margin-bottom: 20px;
  width: 20%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    width: 28px; height: 28px;
    fill: #747777;
  }
`

export const IconWrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  background: #ECF0EF;
  height: 40px; width: 40px;  
  border-radius: 50%;
  margin-bottom: 10px;
  &.active {
    background: ${ (props: IconWrapperProps) => props.backgroundColor };
    > .icon {
      fill: #fff;
    }
  }
  &.define {
    background: #ECF0EF;
    border: 1px dashed #AAAAA8;
    > .icon {
      fill: #747777;
    }
  }
`

export const Title = styled.span`
  font-size: 12px;
  color: #816E6F;
`

type Props = {
  type: '-' | '+'
  defaultTag?: TagItem
  onSelect: (tag: TagItem) => void
}

export default (props: Props) => {

  const [userTags, setUserTags] = useState<TagItem[]>([])
  const [selectedTag, setSelectedTag] = useState()
  const { get, set } = useUserTags(props.type === '-' ? 'userOutlayTags' : 'userIncomeTags')

  const history = useHistory()

  useEffect(() => {
    let tags: TagItem[] = []
    if (get().length === 0) {
      tags = props.type === '-' ? userOutlayTags : userIncomeTags
    } else {
      tags = get()
    }
    // 没有传入默认选中的tag 则默认选中选对应类型tag列表的第一个
    if (!props.defaultTag) {
      setSelectedTag(tags[0])
      props.onSelect(tags[0])
    } else {
      setSelectedTag(props.defaultTag)
      props.onSelect(props.defaultTag)
    }
    const dbUserTags = get()
    // 数据库没有 则设置默认值
    if (dbUserTags.length === 0) {
      setUserTags(tags)
      set(tags)
    } else {
      setUserTags(dbUserTags)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type])

  const onTagClick = (tag: TagItem) => {
    if (tag.value !== 'define') {
      setSelectedTag(tag)
      props.onSelect(tag)
    } else {
      history.push(`/tags?type=${ encodeURIComponent(props.type) }`)
    }
  }

  return (
    <Wrapper>
      <Tags>
        {
          userTags.map(tag => {
            return (<TagItem key={ tag.value } onClick={ () => onTagClick(tag) }>
              <IconWrapper
                backgroundColor={ theme.tagColors[tag.value] }
                className={ `${ selectedTag.value === tag.value ? 'active' : '' } ${ tag.value === 'define' ? 'define' : '' }` }
              >
                <Icon name={ tag.value } />
              </IconWrapper>
              <Title>{ tag.title }</Title>
            </TagItem>)
          })
        }
      </Tags>
    </Wrapper>
  )
}