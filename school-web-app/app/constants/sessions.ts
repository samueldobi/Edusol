export interface TermsPropTypes{
  id:string,
  name:string,
  start:string,
  end:string
}
export interface SessionsPropTypes{
    id:string,
    name:string,
    year:string,
    terms:TermsPropTypes[]
}
export default [
    {   
        id:"1",
        name:"Academic Session",
        year:"2020/2021",
        terms:[
            {
                id:"1",
                name:"1st Term",
                start:"1st Sep 2021",
                end:"5th Dec 2021"
            },
            {
                id:"2",
                name:"2nd Term",
                start:"9th Jan 2021",
                end:"5th April 2021"
            },
            {
                id:"3",
                name:"3rd Term",
                start:"5th May 2021",
                end:"27th July 2021"
            }
        ]
    },
    {   
        id:"2",
        name:"Academic Session",
        year:"2021/2022",
        terms:[
            {
                id:"1",
                name:"1st Term",
                start:"1st Sep 2022",
                end:"5th Dec 2022"
            },
            {
                id:"2",
                name:"2nd Term",
                start:"9th Jan 2022",
                end:"5th April 2022"
            },
            {
                id:"3",
                name:"3rd Term",
                start:"5th May 2022",
                end:"27th July 2022"
            }
        ]
    },
    {   
        id:"3",
        name:"Academic Session",
        year:"2022/2023",
        terms:[
            {
                id:"1",
                name:"1st Term",
                start:"1st Sep 2023",
                end:"5th Dec 2023"
            },
            {
                id:"2",
                name:"2nd Term",
                start:"9th Jan 2023",
                end:"5th April 2023"
            },
            {
                id:"3",
                name:"3rd Term",
                start:"5th May 2023",
                end:"27th July 2023"
            }
        ]
    }
]