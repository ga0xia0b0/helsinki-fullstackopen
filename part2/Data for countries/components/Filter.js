import Detail from "./Detail"

const Filter = ({filtered,setFilter})=>{
    if(filtered.length>10)
    return <p>Too many matches,specify another filter</p>
    else if(filtered.length>1)
    return filtered.map(elem=>
      <p key={elem.area}>
        {elem.name.common}
        <button onClick={()=>setFilter(elem.name.common)}>show</button>
      </p>
    )
    else if(filtered.length===1)
    return <Detail country={filtered[0]}/>
}

export default Filter