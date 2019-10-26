import {
  CREATE_EVENT,
  EDIT_EVENT
} from '../actions'

// {
//   "id": 3,
//   "h4": "中居正広が子どもに付けたい名前は「カナ」理由は回文",
//   "p": "",
//   "time": "2019年9月",
//   "ul": ["中居正広が22日の番組で、子どもができたら「カナ」と名付けたいと明かした", "「上から読んでも下から読んでも『ナカイカナ』なの」と回文になると得意げ", "すると山里亮太が「今の話聞いて思った、結婚遠いな」と厳しくツッコんだ"],
//   "tmb": "",
//   "url": "https://news.livedoor.com/topics/detail/17124314/"
// }

const works = (state = [],action) => {

  switch(action.type){
    
    case CREATE_EVENT:{

      const work = action.info
      const id = state[0].id + 1

      return [{id,...work},...state]
    }
    case EDIT_EVENT:{

      state = state.map(work =>{
        return work.id === action.id ? {id:action.id,...action.info} : work
      })

      return state
    }
    default:
      return state
  }
}

export default works
