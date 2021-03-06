import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { IconWrapper } from 'components/add/UserTags'
import Icon from 'components/Icon'
import { RankData } from 'hooks/useRecordsHandler'
import theme from 'theme'

const Wrapper = styled.div`
  padding: 5px 0;
  flex-grow: 234;
  overflow: auto;
`

const Title = styled.div`
  margin: 5px 0;
  padding: 0 8px;
  font-size: 12px;
  color: #757575;
`

const RankList = styled.ul`
  overflow: auto;
`

const RankItem = styled.li`
  padding: 8px;
  display:flex;
  &:active {
    background: #E0E0E0;
  }
`

const IconContainer = styled(IconWrapper)`
   margin: 0;
   padding: 0;
   background: ${ (props: IconWrapperProps) => props.backgroundColor };
   width: 30px; height: 30px;
  .icon {
    fill: #fff;
    width: 24px;  height: 24px;
  }
`

const RankContent = styled.div`
  flex-grow: 909;
  display:flex;
  margin: 4px;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  > p {
    color: #787878;
    > span {
      float: left;
      margin-left: 6px;
      &:last-child {
        float: right;
        color: #D47B81;
        margin-right: 6px;
      }
    }
  }
`

type ProportionBarProps = {
  percentage: number
}

const ProportionBar = styled.div`
  background: #E0E0E0;
  height: 4px;
  border-radius: 2px;
  position: relative;
  &:after {
    position: absolute;
    left: 0; top: 0;
    content: '';
    display: inline-block;
    height: 4px;
    border-radius: 2px;
    background: #D47B81;
    width: ${ (props: ProportionBarProps) => props.percentage * 100 + '%' };
  }
`

type Props = {
  amountType: AmountType
  rankData: RankData
  year: number
  month: number
}

export default (props: Props) => {

  const history = useHistory()

  const onRankItemClick = (tag: TagItem) => {
    history.push(`/rankDetail?title=${ tag.title }&value=${ tag.value }&year=${ props.year }&month=${ props.month }&amountType=${ encodeURIComponent(props.amountType) }`)
  }

  const renderRank = (rankData: RankData) => {
    return Object.values(rankData)
      .sort((a, b) => b.amount - a.amount)
      .map(data =>
        <RankItem key={ data.tag.value } onClick={ () => onRankItemClick(data.tag) }>
          <IconContainer backgroundColor={ `${ theme.tagColors[data.tag.value] }` }>
            <Icon name={ `${ data.tag.value }` } />
          </IconContainer>
          <RankContent>
            <p>
              <span>{ data.tag.title }</span>
              <span>{ data.count }笔</span>
              <span>{ (data.percentage * 100).toFixed(1) }%</span>
              <span>{ data.amount }</span>
            </p>
            <ProportionBar percentage={ data.percentage } />
          </RankContent>
        </RankItem>)
  }

  return (
    <Wrapper>
      <Title>{ props.amountType === '+' ? '收入' : '支出' }排行榜</Title>
      <RankList>
        { renderRank(props.rankData) }
      </RankList>
    </Wrapper>
  )
}