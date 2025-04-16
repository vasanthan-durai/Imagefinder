import React, {useState}from 'react';

function UserInfo()
{
    const  [userName, setUserName] =  useState("");
    const  [surName, setSurName] =  useState("");
    const  [topic, setTopic] =  useState("Travel");
    const  [manualTopic, setManualTopic] =  useState(false);
    const[lstImg,setImg]=useState([]);
    const[hideandshow,sethideAndShow]=useState(true);
    const[showAcceptedImage,setshowAcceptedImage]=useState(false);
    const[selectedImg,setselectedImg]=useState(false);
    const ASSKey = "g8TGL0wWTXP-ZUyh8A-Ew-EVlV5byz8E3g3NBhgck8Y";

    const textOnChangeLoadImg=(event)=>{
    setTopic(event.target.value);
    }
    const handelUsername=(e)=>
    {
        setUserName(e.target.value);
    }
    const handelSurname=(e)=>
    {
        setSurName(e.target.value);
    }

    const handleTopic=(event)=>{
    setTopic(event.target.value);
    if(event.target.value=="Other")
    {
    setManualTopic(true);
    }
    else
    {
    setManualTopic(false);
    }

    }

    const heandleImageLoadNewView=(e)=>{
    sethideAndShow(false);
    getCallImageLoad(e,topic);
    }
    const HideAndShowbackToSearch=(e)=>{
        setUserName('');
        setSurName('');
    sethideAndShow(true);
    }


    function getCallImageLoad(e,searchKeyword)
    {
    if(searchKeyword!="" && searchKeyword!=undefined && searchKeyword!=null){
    e.preventDefault();
    fetch(
    `https://api.unsplash.com/search/photos?client_id=${ASSKey}&query=${searchKeyword}&per_page=10&orientation=landscape`
    ).then(json=>json.json()).then((json)=>{
    setImg(json.results);
    }).catch((error)=>{
    console.log(error);
    });
    }
    }
    const acceptImage=(e,urls)=>{
    setshowAcceptedImage(true);
    sethideAndShow(true);
    setselectedImg(urls.urls.small);
    }
    const backtoSearch=(e)=>{
        sethideAndShow(true);
        setshowAcceptedImage(false);
    }

    return(<> 
    <div className='centerScreen'>
    {
    hideandshow==true&&showAcceptedImage==false &&  <div>
    <div>
    <h3>Image Finder</h3>
    </div>
    <div className='row'>
    <div className='col-md-2' >
    Name
    <input className='form-control' type="text" value={userName} onChange={(e)=>handelUsername(e)} />
    </div>
    <div className='col-md-2' >
    SurName
    <input className='form-control' type="text" value={surName} onChange={(e)=>handelSurname(e)} />
    </div>
    <div className='col-md-2' >
    Topic
    <select
    className='form-select' 
    value={topic}
    onChange={(event) => {
    handleTopic(event);
    }}
    >

    <option value="Travel">
    Travel
    </option>
    <option value="Cars">
    Cars
    </option>
    <option value="Wildlife">
    Wildlife
    </option>
    <option value="Technology">
    Technology
    </option>
    <option value="Other">
    Other
    </option>
    </select>

    </div>
    { manualTopic==true &&
    <div className=' col-md-2'>
    Enter Topic
    <input className='form-control' type="text" onChange={(e)=>textOnChangeLoadImg(e)} />
    </div>
    }
 <button style={{float:"right",  height: "40px",marginTop: "24px"}} type="button" class="btn btn-success col-md-2" onClick={(e)=> heandleImageLoadNewView(e)}>Load Images</button>

    </div>
    </div>
    }

    { hideandshow==false&&showAcceptedImage==false &&
    <div className="container">
    <br></br>
    <div className="parent">
    {
    lstImg.map((image) => (
    <div>
    <div className='row'> 
    <img  style={{ cursor: "pointer",width:"500px" ,height:"300px" }}
    src={image.urls.small}
    alt=""  /> 
    </div>

    <button style={{width:'50%'}} className='btn btn-success' onClick={(e)=>acceptImage(e,image)}>Accept</button><button style={{width:'50%'}} onClick={(e)=>HideAndShowbackToSearch(e)}  className='btn btn-primary'>Reject</button>
    </div>
    ))}
    </div>
    </div>
    }

    { showAcceptedImage==true&&
    <div class="card" style={{width:'18rem'}}>
    <img  style={{ cursor: "pointer",width:'100%' }}
     src={selectedImg}
    alt=""  /> 

    <div class="card-body">
        <h5 class="card-title">{userName} {surName}</h5>
        <p class="card-text">{topic}</p>
        <button  className='btn btn-success' onClick={(e)=>backtoSearch(e)}>Back To Seacrh</button>
    </div>
    </div>
    }

    </div>


    </>);
    }
    export default UserInfo;